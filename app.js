const cardBodyImg = document.querySelector(".card-header-img");
const container = document.querySelector("main");
const cardBodyTitle = document.querySelector(".card-title");
const btnTipo2 = document.querySelector("#btnTipo2");
const pokeForm = document.getElementById("pokeForm");
const url = "https://pokeapi.co/api/v2/pokemon/";
const fragment = document.createDocumentFragment();


const colors = {
    fire: '#FFA05D',
    grass: '#8FD594',
    electric: '#FFE43B',
    water: '#7E97C0',
    ground: '#CAAC4D',
    rock: '#90642D',
    poison: '#9D5B9B',
    bug: '#EAFD71',
    dragon: '#97b3e6',
    psychic: '#FF96B5',
    flying: '#CDCDCD',
    fighting: '#FF5D5D',
    normal: '#FFFFFF'
}

document.addEventListener("DOMContentLoaded", () => {
    FetchData(url);
});


const FetchData = async (url) => {
    
    try {
        const repuesta = await fetch(url);
        const data = await repuesta.json();
        
        console.log(data);
        
        // buscadorPokemon(data.results);
        dataPokemon(data);
        
    } catch (error) {
        console.log(error);
    }
    
}


const dataPokemon = async(data) => {
    
    try {
        // pintarPaginacion(data);
        
        for(let index of data.results){
            
            const resp = await fetch(index.url);
            const result = await resp.json();
            
            pintarPokemon(result);
        }
        
        pintarPaginacion(data);

    } catch (error) {
        // console.log(error);
        console.error(error.name + ':' + error.message + ":" + error.lineNumber);
    }
}

const pintarPokemon = (pokemon) => {
    const rowCards = document.getElementById("rowCards");
    // rowCards.textContent = ""
    
    const templateCard = document.querySelector("#templateCard").content;
    const arrayColoresTipo = Object.keys(colors);
    const pokeTipo = pokemon.types.map(type => type.type.name);
    const tipo = arrayColoresTipo.find(tipo => pokeTipo.indexOf(tipo) > -1);
    const color = colors[tipo];
    
    
    const clone = templateCard.cloneNode(true);

    clone.querySelector(".card").style.backgroundColor = color;
    clone.querySelector(".card-header-img").setAttribute("src", pokemon.sprites.other.dream_world.front_default);
    clone.querySelector("h6").textContent = pokemon.name;
    clone.querySelector(".card-id").textContent = `N° ${pokemon.id}`;
    clone.querySelector(".btn-outline-secondary").textContent = pokemon.types[0].type.name;
    
    
    fragment.appendChild(clone);
    
    rowCards.appendChild(fragment);
}

// Paginacion
let contador = 0;

const pintarPaginacion = (data) => {

    contador++;
    
    const templatePaginacion = document.querySelector("#template-paginacion").content;
    const containerPaginacion = document.querySelector("#paginacion");
    const btnNext = document.getElementById("next");
    const btnPreviou = document.getElementById("previou");
    // containerPaginacion.textContent = "";
    
    // const btnPreviou = document.querySelector("#previou");
    
    const clone = templatePaginacion.cloneNode(true);
    
    fragment.appendChild(clone);
    console.log(btnNext,btnPreviou)
    
    // data.next? btnNext.className.remove("d-none") : btnNext.className.add("d-none");
    // data.previous? btnPreviou.className.remove("d-none") : btnPreviou.className.add("d-none");
    
    containerPaginacion.appendChild(fragment);
    
    containerPaginacion.addEventListener("click", (e) => {
        if(e.target.matches("#next")){
            FetchData(data.next);
        }
        
        if(e.target.matches("#previou")){
            FetchData(data.previous);
        }
    });

    console.log(contador);
}

const buscadorPokemon = (pokemon) => {

    const inputBusqueda = document.querySelector("#inputBusqueda");
    const btnBuscar = document.querySelector("#btnBuscar");
    
    btnBuscar.addEventListener("submit", (e) => {
        
        e.preventDefault();
        console.log(inputBusqueda.value);
        console.log("click");
    });
};
