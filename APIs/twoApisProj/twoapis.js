
import Html from './htmlGenerators.js';

window.onload = () => {

    requestDogPictures()
    
}

function requestDogPictures(){

    //xhr
    let breed ='malamute'
    let count = 0;
    let maxCount = 3;
    let dataArray=[];
    while(count < maxCount){
        let xhr = new XMLHttpRequest();
        
        
        const endpoint = `https://dog.ceo/api/breed/${breed}/images/random`
        xhr.open('GET',endpoint,true)

        xhr.onload = () => {
            let data = JSON.parse(xhr.responseText);
            dataArray.push(data.message);

           if(dataArray.length == maxCount){
                requestUserData(dataArray);
           }
        }


        xhr.send();

        count++;
    }
    
    //get picture
    
    //store them

}


function requestUserData(picsArray) {
    console.log(picsArray);


    let xhr = new XMLHttpRequest(),
        endpoint = 'https://jsonplaceholder.typicode.com/users';

    xhr.open('GET', endpoint,true);
    xhr.onload = () => {
        let allUsers = JSON.parse(xhr.responseText);

        for(let i =0;i<allUsers.length;i++){
            displayIndUser(allUsers[i],picsArray[i])
        }

    
     }

     xhr.send();
}

function displayIndUser(userObj,imgUrl){
    console.log(imgUrl)
    const userImg = Html.createImageElement({src:imgUrl, height:400, width:400})
    const userName = Html.createHeading({text:userObj.name, size:2})
    const userWeb = Html.createLinkElement({href:`http://${userObj.website}`, text:`${userObj.name}'s Website`})

    document.body.appendChild(userImg);
    document.body.appendChild(userName);
    document.body.appendChild(userWeb);
}