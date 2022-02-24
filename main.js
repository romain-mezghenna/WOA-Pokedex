//Build all datas from pokeapi.co
const P = new Pokedex.Pokedex()
let list = []
let typeList = []
let detailsList = []
var index = 0;
var colorSpecies = []
var timer = false

// builds the order of the pokemon
async function getPokemons(){
    let limit = index+25
    while(index<limit){
            let _ = await P.resource(list[index].url).then(async res => {
                let _ = await P.resource(res.species.url).then(response => {
                    res.color = response.color.name
                    detailsList.push(res)
                })
                
            })
        index++
    }
    timer = true
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
    getPokemons()
})

document.onscroll = function(){
    if(timer){
        var h = window.outerHeight
        if (window.scrollY + h > document.body.scrollHeight) {
            getPokemons()
            timer = false
        }

    }
}
