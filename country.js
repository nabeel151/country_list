const baseurl = " https://restcountries.com/v3.1/all?fields=name,capital,currencies,population,region,flags";

const countryContainer = document.getElementById("countryContainer");

const paginationContainer = document.getElementById("pagination");

let countriesData = [];

let currentPage = 1;

const itemsPerPage = 12;

async function getCountries() {
  try {
    let response = await fetch(baseurl);
     countriesData = await response.json();
    console.log(countriesData);

    renderCountries();
  } catch (error) {
    console.log("Error:", error);
  }
}

function renderCountries(){
     countryContainer.innerHTML = "";
     const start = (currentPage -1)*itemsPerPage;
     const end = start +itemsPerPage;

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

        <button class="w-full border mt-3 py-2 rounded-lg hover:bg-blue-500 text-lg">
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

  for (let i = 1; i <= totalPages; i++) {
    paginationContainer.innerHTML += `
      <button 
        onclick="changePage(${i})"
        class="px-3 py-1 border rounded ${i === currentPage ? 'bg-blue-500 text-white' : ''}"
      >
        ${i}
      </button>
    `;
  }
}

function changePage(page) {
  currentPage = page;
  renderCountries();
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