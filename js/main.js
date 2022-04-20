/*
Practica para concretar: tiempo max 40 min

Apoyandose de los datos de la aPI:
https://api.covid19api.com/summary

haga una aplicacion Javascript que permita
tener 2 opciones de consulta:
1. que se pueda cargar en una lista seleccionable
todas los paises. y que cuando se toque alguna
de los paises me cargue en una tabla el resto de datos.

2. solicitar desde una caja de texto 
escribir el pais a buscar
y me arroje en una tabla los siguientes datos:
- codigo de pais
- nuevos casos confirmados de COVID
- Muertes en total de es pais
- total de recuperados de es pais

*/

const apiURL = "https://api.covid19api.com/summary";
const select = document.getElementById("country-select");
let countries = [];

// * Fetch api
fetch(apiURL)
  .then((res) => res.json())
  .then((data) => {
    countries = data.Countries;
    addCountriesSelect();
  });

// * Agregar option al select por cada país
const addCountriesSelect = () => {
  countries.map((country) => {
    let opt = document.createElement("option");
    opt.value = country.Country;
    opt.innerHTML = country.Country;
    select.appendChild(opt);
  });
};

// * Buscar y agregar datos resultantes del país buscado
const searchCountryData = (value) => {
  document.getElementById("results").innerHTML = "";
  let country = countries.find(
    (country) => country.Country.toLowerCase() == value.toLowerCase()
  );

  if (country === undefined) {
    return document
      .getElementById("alert")
      .setAttribute("class", "alert alert-warning d-block");
  }

  document.getElementById("alert").setAttribute("class", "d-none");

  let result = `<tr>
  <td>${country.CountryCode}</td>
  <td>${country.NewConfirmed}</td>
  <td>${country.TotalDeaths}</td>
  <td>${country.TotalRecovered}</td>
  </tr>`;

  document.getElementById("results").innerHTML = result;
};

// ? Escuchar evento onChange del select y correr función de busqueda
select.addEventListener("change", () => searchByOption());

// * Tomar el value del option selected en el select y correr searchCountryData
const searchByOption = () => {
  let value = select.value;
  if (value === "Open this select country") {
    return (document.getElementById("results").innerHTML = "");
  }
  searchCountryData(value);
};

// * Tomar el value del text input y correr searchCountryData
const searchByInput = () => {
  let value = document.querySelector("input").value;
  searchCountryData(value);
};
