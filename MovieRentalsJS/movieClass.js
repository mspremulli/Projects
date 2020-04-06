import Html from './htmlGenerators.js';
import allMovies from './movieList.js';
import movieRental from './movieRental.js';

function setupPage(){
    createInitialDivs();
    createTitleBar();
    displayMovies();
    sideBar();
};
function createTitleBar(){
    let title = Html.createHeading({text: 'Movie Rental', size: 1});
    titleContainer.appendChild(title);
}


function createInitialDivs(){
    const   mainContainer = Html.createDivElement({id:'mainContainer'}),
            titleContainer = Html.createDivElement({id:'titleContainer'}),
            movieContainer = Html.createDivElement({id:'movieContainer'}),
            rentedDiv = Html.createDivElement({id:'rentedDiv', class:'movieList'}),
            availableDiv = Html.createDivElement({id:'availableDiv', class:'movieList'}),
            sideBar = Html.createDivElement({id:'sideBar'});

            document.body.appendChild(titleContainer);
            document.body.appendChild(mainContainer);
           

            let rentHeading = Html.createHeading({text:"Rent a Movie"});
            let rentedHeading = Html.createHeading({text:'Currently Out of Stock'});
            
           

            mainContainer.appendChild(movieContainer);
            document.getElementById('movieContainer').appendChild(rentHeading);
            movieContainer.appendChild(availableDiv);
            document.getElementById('movieContainer').appendChild(rentedHeading);
            movieContainer.appendChild(rentedDiv);
            mainContainer.appendChild(sideBar);      
}

function sideBar(){
    let sideTitle = Html.createHeading({text:"Available Movies"});
        function func() {
            movieRental.rentRandomMovie();
            refreshMovies();
        }
    let randomMovieButton = Html.createButton({text:"Surprise me",  click:func});
    let selectMovie = Html.createSelectElement({
        array:allMovies.filter(e => e.available).map(e => e.title)
    });

    document.getElementById('sideBar').appendChild(sideTitle);
    document.getElementById('sideBar').appendChild(randomMovieButton);
    document.getElementById('sideBar').appendChild(selectMovie);

}


//clears movie divs and reuploads them
function refreshMovies(){
    document.getElementById('rentedDiv').innerHTML = '';
    document.getElementById('availableDiv').innerHTML = '';
    displayMovies();

}
//display all rented movies
function displayMovies(){
    

    allMovies.forEach(movie => {

        function func() {
            movieRental.transferMovie(movie.title);
            refreshMovies();
        }

        
        let movieDiv = Html.createDivElement({class:'singleMovie'});
        movieDiv.style.backgroundColor = '#'+ Math.floor(Math.random()*16777215).toString(16);


        let movieImgDiv = Html.createDivElement({class: 'movieImgDiv'})
        let clickMeText = Html.createHeading({text:'Double Click to Rent',size:5});

        let header = Html.createHeading({text:movie.title, size:2});
        let releaseDate = Html.createHeading({text:movie.release.toString(),size:4});
        let img = Html.createImageElement({className: 'imgClass', width:100, height:200, src:movie.img, alt:'no image',click:func});
        let link = Html.createLinkElement({text: movie.title, href: movie.imbd});
        
        document.body.appendChild(movieDiv);

        movieDiv.appendChild(header);
        
        
        movieDiv.appendChild(releaseDate);
        movieDiv.appendChild(movieImgDiv);
        movieImgDiv.appendChild(img);
        movieImgDiv.appendChild(clickMeText);
        movieDiv.appendChild(link);

        if(movie.available >0){
            document.getElementById('availableDiv').appendChild(movieDiv);
        }
        else if(movie.available === 0){
            document.getElementById('rentedDiv').appendChild(movieDiv);
            
        }

    });
    
}
setupPage();
