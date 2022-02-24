Vue.component('pokemon-card',{
    props: {
        name : {
            type : String
        },
        color : {
            type : String
        },
        image : {
            type : String
        },
        stats : {
            type : Array
        },
        id: {
            type : Number
        },
        types : {
            type : Array
        }
    },
    template : 
    /*html*/
    `<div class="pokemon">
        <img v-bind:src="image" v-bind:alt="name" class="sprites">
        <h3 class="namePokemon">{{name.toUpperCase()}}</h3>
        <p>id : {{id}}</p>
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" v-bind:data-bs-target="'#detailPokemon' + id">
            Details
        </button>
        <!-- Modal -->
        <div class="modal fade" v-bind:id="'detailPokemon' + id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <img v-bind:src="image" v-bind:alt="name" class="sprites">
                <h5 class="modal-title" id="exampleModalLabel">{{name}}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p v-for="stat in stats">{{stat.stat.name.toUpperCase()}} : {{stat.base_stat}}</p>
                <span>TYPE : </span>
                <span v-for="type in types">{{type.type.name}} </span>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Fermer</button>
            </div>
            </div>
        </div>
        </div>
    </div>`
})