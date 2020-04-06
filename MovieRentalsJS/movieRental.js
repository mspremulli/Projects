import allMovies from './movieList.js';

let movieRental = { 

    //returns the index of a movie. returns -1 if not found. Is case insensitive, but punctuation and spacing must be correct
    getMovieIndex(title){
        return allMovies
                .map(e => e.title.toUpperCase())
                .indexOf(title.toUpperCase());
    },

     //rent a movie by title if it is availible
     transferMovie(title) {
        let movieIndex = movieRental.getMovieIndex(title);
         if(movieIndex != -1) {
            if(allMovies[movieIndex].available > 0){
                allMovies[movieIndex].available--;
            }
        }
        else {console.log('We don\'t carry that movie.') }
    },

    //rent a random movie
    rentRandomMovie() {
        let list = allMovies.filter(obj => obj.available);
        if(list.length > 0){
            let num = Math.floor(Math.random() * list.length);
            movieRental.transferMovie(list[num].title);
            console.log("Your random movie is:  " + list[num].title);
        }
        else{  console.log('no movies are available'); }
       
    }
    
}

export default movieRental;