//Build all datas from pokeapi.co
const P = new Pokedex.Pokedex()
let list = []
let detailsList = []
var index = 0;
var colorSpecies = []

// builds the order of the pokemon
async function getPokemons(){
    let limit = index+25
    while(index<limit){
        console.log(1);
            let _ = await P.resource(list[index].url).then(async res => {
                let _ = await P.resource(res.species.url).then(response => {
                    res.color = response.color.name
                    detailsList.push(res)
                })
                
            })
        index++
    }
}

// Get the full list of the pokemons
P.getPokemonsList().then(res => {
    list = res.results
    getPokemons().then((res) => {
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
    })
})






