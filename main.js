//Build all datas from pokeapi.co
const P = new Pokedex.Pokedex()
let list = []
let typeList = []
let detailsList = []
var index = 0;
var colorSpecies = []
var timer = false

// Get n pokemons details on the pokemon list 
async function getPokemons(n){
    timer = false
    let limit = index+n
    while (index < limit) {
        if (index < list.length) {
            let _ = await P.resource(list[index].url).then(async res => {
                let _ = await P.resource(res.species.url).then(response => {
                    res.color = response.color.name
                    detailsList.push(res)
                })
            })
            index++
        } else {

        }
    }
    timer = true
    if(detailsList.length == list.length){
        alert("Tous les pokemons ont été chargés !")
    }
}


var app = new Vue({
    el: '#app',
    data: {
        pokemons: detailsList,
        search: ""
    },
    computed: {
        filteredProducts() {
            return this.pokemons.filter(p => {
                return p.name.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
            });
        }
    }
})

// Get the full list of the pokemons and request for all the data progressively
P.getPokemonsList().then(res => {
    list = res.results
    getPokemons(30)
})

//Lazy loading while scrolling
document.onscroll = function(){
    if(timer){
        var h = window.outerHeight
        if (window.scrollY + h > document.body.scrollHeight) {
            getPokemons(30)
            timer = false
        }
    }
}
