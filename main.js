const PRE_URL = "https://pokeapi.co/api/v2/"

const form = document.querySelector("#pokemon-search");
const input = document.querySelector("#search-input");

let selectedPokemonId = 0;
const totalPokeSize = 1025;

form.addEventListener("submit", e => {
    e.preventDefault();
    console.info("Searching for : "+ input.value);
    getPokemon(input.value);
    e.target.reset();
});

const buttPrev = document.querySelector("#pokemon-previous");
const buttNext = document.querySelector("#pokemon-next");

const getPokemon = async (querry) => {
    
    const URL = `${PRE_URL}pokemon/${querry.toString().trim().toLowerCase()}`
    console.log(URL);
    const req = new Request(URL);
    
    fetch(req)
    .then((resp) => resp.json())
    .then(json => displayPokemon(json))
    .catch(err => {
        console.error(err);
        buttPrev.setAttribute("disabled", "true");
        buttNext.setAttribute("disabled", "true");
    });
}


const getPokemonImage = async (id) => {
    const URL = `${PRE_URL}pokemon-form/${id}`;
    const req = new Request(URL);

    fetch(req)
    .then((resp) => resp.json())
    .then(json => displayPokemonImage(json))
    .catch(err => console.error(err));
}

function displayPokemon(json) {
    selectedPokemonId = json.id;
    buttPrev.removeAttribute("disabled");
    buttNext.removeAttribute("disabled");
    const spanName = document.querySelector("#pokemon-name");
    const spanWeight = document.querySelector("#pokemon-weight");
    const spanHeight = document.querySelector("#pokemon-height");
    const ulTypes = document.querySelector("#pokemon-types");
    const ulAbilities = document.querySelector("#pokemon-abilities");
    const spanId = document.querySelector("#pokemon-id");
    getPokemonImage(json.id);
    
    spanName.innerHTML = capitalize(json.name);
    
    spanId.innerHTML = `n°${json.id.toString().padStart(4, "0")}`
    spanWeight.innerHTML = `${json.weight}lbs`;
    spanHeight.innerHTML = `${json.height}"`;
    
    ulTypes.innerHTML = "";
    for(let i = 0 ; i < json.types.length; i++) {
        ulTypes.innerHTML += `<li class="list-group-item">${capitalize(json.types[i].type.name)}</li>`;
        
    }
    
    ulAbilities.innerHTML = "";
    for(let i = 0; i < json.abilities.length; i++) {
        ulAbilities.innerHTML += `<li class="list-group-item">${capitalize(json.abilities[i].ability.name)}</li>`;
    };
}

function displayPokemonImage(json) {
    
    const img = document.querySelector("#pokemon-picture");
    img.setAttribute("src", json.sprites.front_default);
    img.setAttribute("alt", `${json.name} sprite`);
    img.setAttribute("class", "pixelated");
}

buttNext.addEventListener("click", () => {
    let nextId = ++selectedPokemonId;
    if(nextId > totalPokeSize) {
        nextId = 1;
    }
    getPokemon(nextId);
});

buttPrev.addEventListener("click", () => {
    let prevId = --selectedPokemonId;
    if (prevId < 1) {
        prevId = totalPokeSize;
    }
    getPokemon(prevId);
})


/**
 * 
 * @param {string} str 
 * @returns {string} capitalized string
 */
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
}