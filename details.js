const params = new URLSearchParams(window.location.search);
const name = params.get("name");

const loader = document.getElementById("loader");
const container = document.getElementById("details");

// console.log(container);

async function getCountryDetails() {
    try {
        // show loader
        loader.classList.remove("hidden");
        container.classList.add("hidden");
        const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        const data = await res.json();

        const country = data[0];

        // FIRST render HTML
        container.innerHTML = `
  <div class="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10">

    <!-- TITLE (CENTER) -->
    <h1 class="text-4xl font-bold text-center text-gray-800 mb-8">
      Country Details 🌍
    </h1>

    <div class="grid md:grid-cols-2 gap-6 items-center">

      <!-- LEFT SIDE -->
      <div>

        <h2 class="text-3xl font-bold mb-4 text-blue-700">
          ${country.name.common}
        </h2>

        <img 
          src="${country.flags.png}" 
          class="w-48 h-32 object-cover rounded-lg shadow mb-5"
        >

        <div class="space-y-3 text-gray-700">

          <div class="flex justify-between border-b pb-2">
            <span class="font-semibold">Capital</span>
            <span>${country.capital?.[0] || "N/A"}</span>
          </div>

          <div class="flex justify-between border-b pb-2">
            <span class="font-semibold">Region</span>
            <span>${country.region}</span>
          </div>

          <div class="flex justify-between border-b pb-2">
            <span class="font-semibold">Population</span>
            <span>${country.population.toLocaleString()}</span>
          </div>

        </div>

      </div>

      <!-- RIGHT SIDE (MAP) -->
      <iframe
        id="map"
        class="w-full h-80 rounded-xl shadow-lg"
        loading="lazy"
      ></iframe>

    </div>
  </div>
`;
        // THEN get map AFTER HTML exists
        const lat = country.latlng?.[0];
        const lng = country.latlng?.[1];

        const mapFrame = document.getElementById("map");

        mapFrame.src = `https://www.google.com/maps?q=${lat},${lng}&z=5&output=embed`;

        //  hide loader, show content
        loader.classList.add("hidden");
        container.classList.remove("hidden");

    }
    catch (error) {
        console.log(error);
        loader.innerHTML = "Failed to load data 😢";

    }
}





getCountryDetails();


// console.log(name);
