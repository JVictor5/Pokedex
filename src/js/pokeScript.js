const pokemonNome = document.querySelector(".pokemonNome");
const pokemonNum = document.querySelector(".pokemonNum");
const pokemonIMG = document.querySelector(".pokemonIMG");
const pokemonType = document.querySelector(".pokemonTipos");

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  const data = await APIResponse.json();
  return data;
};

const renderPokemon = async (pokemon) => {
  const data = await fetchPokemon(pokemon);
  pokemonNome.innerHTML = data.name;
  pokemonNum.innerHTML = data.id;

  pokemonIMG.src =
    data["sprites"]["other"]["official-artwork"][
      "front_default"
    ]; /* pokemon com a arte official */
  // const types = data.types.map((typeSlot) => typeSlot.type.name).join("  ");
  // pokemonType.innerHTML = types;
  // const tipo = data.types[1].type.name;
  // pokemonType.innerHTML = `Tipo: <span class="tipo-${tipo} tipo-${tipo}">${tipo}${tipo}</span>`;

  const tipos = data.types.map((typeSlot) => typeSlot.type.name);

  tipos.forEach((tipo) => {
    const tipoElement = document.createElement("span");
    tipoElement.textContent = tipo;
    tipoElement.classList.add("tipo-" + tipo);
    pokemonType.appendChild(tipoElement);
  });
};

renderPokemon("6");

// pokemonIMG.src =
//   data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
//     "front_default"
//   ];
