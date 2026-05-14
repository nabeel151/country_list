const baseurl = " https://restcountries.com/v3.1/all?fields=name,capital,currencies,population,region,flags";

const countryContainer = document.getElementById("countryContainer");

const paginationContainer = document.getElementById("pagination");

const loader = document.getElementById("loader");

const searchInput = document.getElementById("searchInput");
const regionFilter = document.getElementById("regionFilter");

let countriesData = [];

let currentPage = 1;

const itemsPerPage = 12;

async function getCountries() {
  try {
    loader.classList.remove("hidden");
    countryContainer.innerHTML = "";

    let response = await fetch(baseurl);
    countriesData = await response.json();
    console.log(countriesData);

    renderCountries();
    loader.classList.add("hidden");

  } catch (error) {
    console.log("Error:", error);
    loader.classList.add("hidden");
  }
}

function renderCountries() {
  countryContainer.innerHTML = "";
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const paginatedItems = countriesData.slice(start, end);
  paginatedItems.forEach((country) => {
    const card = `
      <div class="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition">

        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold">
            ${country.name.common}
          </h2>

          <img 
            src="${country.flags.png}" 
            alt="${country.name.common} flag"
            class="w-10 h-6 object-cover rounded shadow"
          />
        </div>

        <div class="space-y-1 text-sm mt-3">

          <div class="flex justify-between">
            <span class="text-gray-500 uppercase">Population</span>
            <span>${country.population?.toLocaleString() || "N/A"}</span>
          </div>

          <div class="flex justify-between">
            <span class="text-gray-500 uppercase">Region</span>
            <span>${country.region}</span>
          </div>

          <div class="flex justify-between">
            <span class="text-gray-500 uppercase">Capital</span>
            <span>${country.capital ? country.capital[0] : "N/A"}</span>
          </div>

        </div>

        <button 
        onclick="viewDetails('${country.name.common}')"
        class="w-full border mt-3 py-2 rounded-lg hover:bg-blue-500 text-lg"">
          View Details
        </button>

      </div>
    `;

    countryContainer.innerHTML += card;
  });

  renderPagination();
}
function renderPagination() {

  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(countriesData.length / itemsPerPage);

  let startPage = currentPage - 2;
  let endPage = currentPage + 2;

  if (startPage < 1) {
    startPage = 1;
    endPage = 5;
  }

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = totalPages - 4;
  }

  for (let i = startPage; i <= endPage; i++) {

    if (i > 0) {

      paginationContainer.innerHTML += `
      
        <button
          onclick="changePage(${i})"
          class="
            px-4 py-2 m-1 rounded-lg border
            ${i === currentPage
          ? "bg-blue-600 text-white"
          : "bg-white hover:bg-blue-100"}
          "
        >
          ${i}
        </button>

      `;
    }
  }
}
function changePage(page) {

  const totalPages = Math.ceil(countriesData.length / itemsPerPage);

  if (page < 1 || page > totalPages) return;

  currentPage = page;

  renderCountries();

  // window.scrollTo({
  //   top: 0,
  //   behavior: "smooth"
  // });
}

// function applyfilter
function applyFilters() {
  const searchValue = searchInput.value.toLowerCase();
  const selectedRegion = regionFilter.value;

  let filteredCountries = countriesData.filter((country) => {

    const countryName = country.name.common.toLowerCase();
    const capitalName = country.capital?.[0]?.toLowerCase() || "";

    const matchesSearch =
      countryName.includes(searchValue) ||
      capitalName.includes(searchValue);

    const matchesRegion =
      selectedRegion === "All" ||
      country.region === selectedRegion;

    return matchesSearch && matchesRegion;


  });

  countryContainer.innerHTML = "";


  // not found message
  if (filteredCountries.length === 0) {
    countryContainer.innerHTML = `
      <div class="col-span-full flex flex-col items-center justify-center py-16">

  <div class="bg-white shadow-lg rounded-2xl p-10 text-center border border-gray-100">

    <!-- Icon -->
    <div class="text-6xl mb-4 animate-bounce">
      🌍
    </div>

    <!-- Title -->
    <h2 class="text-2xl font-bold text-gray-700 mb-2">
      No Country Found
    </h2>

    <!-- Subtitle -->
    <p class="text-gray-500">
      Try searching with a different name or region
    </p>

  </div>

</div>
    `;
    return;

  }

  filteredCountries.forEach((country) => {

    const card = `
      <div class="bg-white rounded-2xl p-4 shadow-sm">

        <div class="flex justify-between items-center">
          <h2 class="text-xl font-bold">
            ${country.name.common}
          </h2>

          <img
            src="${country.flags.png}"
            class="w-10 h-6 rounded"
          />
        </div>

        <div class="mt-3 text-sm space-y-1">

          <p>
            Population: ${country.population.toLocaleString()}
          </p>

          <p>
            Region: ${country.region}
          </p>

          <p>
            Capital:
            ${country.capital ? country.capital[0] : "N/A"}
          </p>

        </div>

      </div>
    `;

    countryContainer.innerHTML += card;
  });
}

///view detal route
function viewDetails(countryName) {
  window.location.href = `details.html?name=${countryName}`;
}









// async function getCountries() {
//     try {
//         let response = await fetch(baseurl);
//         let data = await response.json();
//         console.log(data);

//         data.forEach((country) => {

//             const card = `  <div class="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition">

//           <!-- Country + Flag -->
//           <div class="flex items-center justify-between">

//             <h2 class="text-xl font-bold">
//               ${country.name.common}
//             </h2>
//   <img 
//     src="${country.flags.png}" 
//     alt="${country.name.common} flag"
//     class="w-10 h-6 object-cover rounded shadow"
//   />


//           </div>

//           <!-- Info -->
//           <div class="space-y-1 text-sm mt-3">

//             <div class="flex justify-between">
//               <span class="text-gray-500 uppercase">
//                 Population
//               </span>

//               <span>
//                 ${country.population?.toLocaleString() || "N/A"}

//               </span>
//             </div>

//             <div class="flex justify-between">
//               <span class="text-gray-500 uppercase">
//                 Region
//               </span>

//               <span>
//                 ${country.region}
//               </span>
//             </div>

//             <div class="flex justify-between">
//               <span class="text-gray-500 uppercase">
//                 Capital
//               </span>

//               <span>
//                 ${country.capital ? country.capital[0] : "N/A"}
//               </span>
//             </div>

//           </div>

//           <!-- Button -->
//           <button
//             class="w-full border mt-3 py-2 rounded-lg hover:bg-blue-500 text-lg"
//           >
//             View Details
//           </button>

//         </div>

//       `;

//             // Add Card
//             countryContainer.innerHTML += card;



//         });


//     }
//     catch (error) {
//         console.log("Error:", error);

//     }
// }

getCountries();