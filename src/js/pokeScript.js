const pokemonNome = document.querySelector(".pokemonNome");
const pokemonNum = document.querySelector(".pokemonNum");
const pokemonIMG = document.querySelector(".pokemonIMG");
const pokemonType = document.querySelector(".pokemonTipos");

const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

let searchPokemon = 149;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  if (APIResponse.status == 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonNome.innerHTML = "Loading...";

  pokemonType.innerHTML = "";

  const data = await fetchPokemon(pokemon);
  if (data) {
    pokemonNome.innerHTML = data.name;
    pokemonNum.innerHTML = data.id;
    searchPokemon = data.id;
    pokemonIMG.style.display = "block";
    pokemonIMG.src =
      data["sprites"]["other"]["official-artwork"][
        "front_default"
      ]; /* pokemon com a arte official */

    const tipos = data.types.map((typeSlot) => typeSlot.type.name);

    tipos.forEach((tipo) => {
      const tipoElement = document.createElement("span");
      tipoElement.textContent = tipo;
      tipoElement.classList.add("tipo-" + tipo);
      pokemonType.appendChild(tipoElement);

      input.value = "";
    });
  } else {
    pokemonIMG.style.display = "none";
    pokemonNome.innerHTML = "Not found ;-;";
    pokemonNum.innerHTML = " ";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
