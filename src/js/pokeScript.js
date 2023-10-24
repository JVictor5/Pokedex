const pokemonNome = document.querySelector(".pokemonNome");
const pokemonNum = document.querySelector(".pokemonNum");
const pokemonIMG = document.querySelector(".pokemonIMG");

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
    data["sprites"][
      "front_default"
    ];
};

renderPokemon("1010");
