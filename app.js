const cardBodyImg = document.querySelector(".card-header-img");
const container = document.querySelector("main");
const cardBodyTitle = document.querySelector(".card-title");
const pokeForm = document.getElementById("pokeForm");
let url = "https://pokeapi.co/api/v2/pokemon/";
const fragment = document.createDocumentFragment();
const rowCards = document.getElementById("rowCards");
const modal = document.querySelector("#modal");

const containerPaginacion = document.querySelector("#paginacion");
let btnNext = document.getElementById("next");
let btnPreviou = document.getElementById("previou");

const templateCard = document.querySelector("#templateCard");

const colors = {
    fire: '#FFA05D',
    // grass: '#8FD594',
    grass: '#9DC652',
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

const tipos = {
    normal: "/images/tipo/Icon_Normal.png",
    fighting: "/images/tipo/Icon_Lucha.png",
    flying: "/images/tipo/Icon_Volador.png",
    poison: "/images/tipo/Icon_Veneno.png",
    ground: "/images/tipo/Icon_Tierra.png",
    rock: "/images/tipo/Icon_Roca.png",
    bug: "/images/tipo/Icon_Bicho.png",
    ghost: "/images/tipo/Icon_Fantasma.png",
    steel: "/images/tipo/Icon_Acero.png",
    fire: "/images/tipo/Icon_Fuego.png",
    water: "/images/tipo/Icon_Agua.png",
    grass: "/images/tipo/Icon_Planta.png",
    electric: "/images/tipo/Icon_Eléctrico.png",
    psychic: "/images/tipo/Icon_Psíquico.png",
    ice: "/images/tipo/Icon_Hielo.png",
    dragon: "/images/tipo/Icon_Dragón.png",
    dark: "/images/tipo/Icon_Siniestro.png",
    fairy: "/images/tipo/Icon_Hada.png",
    unknown: "/images/tipo/Icon_Normal.png",
    shadow: "/images/tipo/Icon_Fantasma.png",
}

document.addEventListener("DOMContentLoaded", () => {
    FetchData(url);
});


const FetchData = async (url) => {
    
    try {
        loadingData(true);
        
        const repuesta = await fetch(url);
        const data = await repuesta.json();
        
        console.log(data);
        
        dataPokemon(data);

        btnNext = data.next ? `<a class="btn btn-outline-secondary" href="#" id="next" data-url=${data.next}>→</a>` : ""; 
        btnPreviou = data.previous ? `<a class="btn btn-outline-secondary btn-previou mx-2" href="#" id="previou" data-url=${data.previous}>←</a>` : "";
        containerPaginacion.innerHTML = btnPreviou + " " + btnNext;

    } catch (error) {
        console.log(error);
    }finally{
        
        setTimeout(()=> {
            loadingData(false);
        },1500);
    }
    
}


const dataPokemon = async(data) => {
    
    rowCards.textContent = "";

    try {
        
        for(let index of data.results){
            
            const resp = await fetch(index.url);
            const result = await resp.json();
            
            setTimeout(()=>{
                pintarPokemon(result);
            }, 1500);
        }
    } catch (error) {
        // console.log(error);
        console.error(error.name + ':' + error.message + ":" + error.lineNumber);
    }
}

const loadingData = (estado) => {
    const containerLoading = document.querySelector(".container-loading");

    console.log(containerLoading.classList);

    estado ? containerLoading.classList.remove("d-none") : containerLoading.classList.add("d-none");
}

const pintarPokemon = (pokemon) => {
    
    const arrayColoresTipo = Object.keys(colors);
    const pokeTipo = pokemon.types.map(type => type.type.name);
    const tipoColor = arrayColoresTipo.find(tipo => pokeTipo.indexOf(tipo) > -1);
    const color = colors[tipoColor];
    
    const arrayTipo = Object.keys(tipos);
    const indiceTipo1 = arrayTipo.find(tipo => pokeTipo[0] === tipo);  
    const indiceTipo2 = arrayTipo.find(tipo => pokeTipo[1] === tipo);  
    
    const tipo1 = tipos[indiceTipo1];
    const tipo2 = tipos[indiceTipo2];
    
    const clone = templateCard.content.cloneNode(true);
    
    if(color != null){
        
        clone.querySelector(".card").style.backgroundColor = color;
    }else{
        clone.querySelector(".card").style.backgroundColor = "#FFFFFF";
    }
    clone.querySelector(".card-header-img").setAttribute("src", pokemon.sprites.other.dream_world.front_default);
    clone.querySelector("h6").textContent = pokemon.name;
    clone.querySelector(".card-id").textContent = `N° ${pokemon.id}`;
    
    if(pokeTipo.length === 1){

        clone.querySelector(".imgTipo1").setAttribute("src", tipo1);
        clone.querySelector(".imgTipo2").classList.add("d-none");
        
    }else if(pokeTipo.length === 2){
        clone.querySelector(".imgTipo2").classList.remove("d-none");
        clone.querySelector(".imgTipo1").setAttribute("src", tipo1);
        clone.querySelector(".imgTipo2").setAttribute("src", tipo2);
    }
    
    
    fragment.appendChild(clone);
    
    rowCards.appendChild(fragment);
}

// Paginacion

containerPaginacion.addEventListener("click", (e) => {
    
    url = e.target.dataset.url
    
    if(e.target.matches("#next")){
        FetchData(url);
    }
    
    if(e.target.matches("#previou")){
        FetchData(url);
    }
});

// Buscador

const inputBusqueda = document.querySelector("#inputBusqueda");
const btnBuscar = document.querySelector("#btnBuscar");

const buscadorPokemon = async() => {

    try {
        const texto = inputBusqueda.value.toLowerCase();

        if(texto != ""){
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${texto.toLowerCase()}`);
            const data = await res.json();

            rowCards.textContent = "";
            pintarPokemon(data);
            
            btnNext.classList.add("d-none");
            btnPreviou.classList.add("d-none");


        }else{
            FetchData(url);
        }
        
    } catch (error) {
        console.log(error);
    }
}

btnBuscar.addEventListener("click", (e) =>{

    e.preventDefault();
    buscadorPokemon();
});