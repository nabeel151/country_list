const params = new URLSearchParams(window.location.search);
const name = params.get("name");

const container = document.getElementById("details");

// console.log(container);

async function getCountryDetails() {
    const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    const data = await res.json();

    const country = data[0];
    // console.log(country);

    container.innerHTML = `
  <div class="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10">

    <!-- Title -->
    <h1 class="text-4xl font-bold text-gray-800 mb-6 text-center">
      ${country.name.common}
    </h1>

    <!-- Flag -->
    <div class="flex justify-center mb-6">
      <img 
        src="${country.flags.png}" 
        class="w-30 h-16 object-cover rounded-lg shadow-md border"
      >
    </div>

    <!-- Info -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">

      <div class="bg-gray-50 p-4 rounded-lg">
        <p class="text-sm text-gray-500">Capital</p>
        <p class="text-lg font-semibold">
          ${country.capital?.[0] || "N/A"}
        </p>
      </div>

      <div class="bg-gray-50 p-4 rounded-lg">
        <p class="text-sm text-gray-500">Region</p>
        <p class="text-lg font-semibold">
          ${country.region}
        </p>
      </div>

      <div class="bg-gray-50 p-4 rounded-lg md:col-span-2">
        <p class="text-sm text-gray-500">Population</p>
        <p class="text-xl font-bold text-blue-600">
          ${country.population.toLocaleString()}
        </p>
      </div>

    </div>

  </div>
`;
}

getCountryDetails();


// console.log(name);
