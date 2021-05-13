
// Attraverso una chiamata ajax all’API di boolean https://flynn.boolean.careers/exercises/api/array/music avremo a disposizione una decina di dischi musicali. Utilizzando vue, stampiamo a schermo una card per ogni album.
// BONUS:
// Creare una select con tutti i generi dei dischi. In base a cosa scegliamo nella select, vedremo i corrispondenti cd.

// BONUS 2: Ordinare i dischi per anno di uscita.




/*
    - dobbiamo recuperare la lista degli album dal server
        - url da chiamare: https://flynn.boolean.careers/exercises/api/array/music
    - Una volta effettuata la chiamata, il server mi ritorna un JSON di questo tipo:
        "success": true,
        "response": [{
            "poster": "https://www.onstageweb.com/wp-content/uploads/2018/09/bon-jovi-new-jersey.jpg",
            "title": "New Jersey",
            "author": "Bon Jovi",
            "genre": "Rock",
            "year": "1988"
        }]
    - Da questi dati dovrò recuperare il valore della chiave "response"
    - I dati recuperati li devo salvare in una variabile.
        - Questa variabile, siccome la dovrò usare nell'html, dovrà essere creata
            all'interno di "data"
            - Quale sarà il valore iniziale di questa variabile? 
                - Se lo setto come array vuoto = [] allora nell'html potrò usare .length
                - Se lo setto come null, allora nell'html potrò usare !nomeVariabile
*/

new Vue({
    el: '#app',
    data: {
        albumList: [],
        filteredData: [],
        genresList: [],
        genreToFilter: "",

    },
    methods: {


        onSelectChange() {
            if (this.genreToFilter === "") {
                this.filteredData = this.albumList
                return
            }
            const newFilteredData = this.albumList.filter((album) => {
                return album.genre === this.genreToFilter
            })
            this.filteredData = newFilteredData
        },

        createGenreOptions() {

            this.albumList.forEach((album) => {
                if (!this.genresList.includes(album.genre)) {
                    this.genresList.push(album.genre);
                }

            })


        }
    },
    mounted() {



        axios.get("https://flynn.boolean.careers/exercises/api/array/music")
            .then((resp) => {
                const incomingAlbumList = resp.data.response;

                //ARRAY DI OGGETTI CON LE SEGUENTI CHIAVI
                // Poster
                // Title
                // Author
                // Genre
                // Year
                this.albumList.push(...incomingAlbumList)
                this.filteredData.push(...incomingAlbumList)
                this.createGenreOptions()


            })



        /*
           una  volta ricevuti i dati dal server, 
           prima ancora di salvarli nella variabile di vue, 
           posso eseguire il sort in modo da salvare poi i dati già ordinati
       */



    }

})

