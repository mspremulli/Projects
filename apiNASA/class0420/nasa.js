import Html from './htmlGenerators.js';
import Key from './key.js';

const monthList=
    ['January', 
    'Februay',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'];
let lastDay=[31,28,31,30,31,30,31,30,30,31,30,31];

let currentDate = new Date();
    let year=currentDate.getFullYear(),
        month=currentDate.getMonth()+1,
        day=currentDate.getDate();


window.onload = () => {
    
    //create select year list
    let yearList=[];
    while (year > 1994){
        yearList.push(year);
        year--;
    }

    //create slect year dropdown
    let yearSelect = Html.createSelectElement({
        change: yearSelected, 
        id:'yearSelected',
        defaultText: 'Select a Year',
        array: yearList
    });
    document.body.appendChild(yearSelect);
    


    //create button to show image and hide it
    let startSelection = Html.createButton({
        text: 'Select Date',
         id:'startBtn', 
         click: startSequence
    })
    document.body.appendChild(startSelection);
    document.getElementById('startBtn').style.display = 'none';
}

function startSequence() {
    //show image
    document.getElementById('startBtn').style.display ='none';
    let monthNum = monthList.indexOf(month)+1;
    console.log(year,monthNum,day);

 
    //set the date in format nasa API requires YYYY-MM-DD
    //fix leading 0s
    let nasaDate=`${year}-${monthNum}-${day}`;

    let xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.nasa.gov/planetary/apod?api_key=${Key}&date=${nasaDate}&hd=true`, true);
  
    xhr.onload = () => {
        
          let url = JSON.parse(xhr.responseText)
          displayApod(url);
        
    }
    
    xhr.send();

    //  console.log(nasaDate);
}

function displayApod(data){
    if(data.code != undefined){
        alert(`Error Code:${data.code}\nErrorMessage: ${data.msg}`)
        console.log(data.code,data.msg);
     }
    else if(data.media_type == 'video'){
        //add video
        console.log(data.url)
    }
    else {
        let image = Html.createImageElement({src:data.url, height:500, width:500, alt:'loading image'})
        document.body.appendChild(image);
    }

}

function yearSelected() {
    year = this.value;
    document.getElementById('yearSelected').style.display ='none';
    let monthList1 = monthList;

    //remove any future months
    if(year == currentDate.getFullYear()){
        monthList1 = monthList.slice(0,currentDate.getMonth()+1);
    }

    // remove any months before the first post
    if(year == 1995){
        monthList1 = monthList.slice(5,12);
    }
   
    //create select month element
    let monthSelect = Html.createSelectElement({
        change: monthSelected, 
        defaultText: 'Select a Month',
        id:'monthSelected',
        array: monthList1
    });
    document.body.appendChild(monthSelect);


    document.getElementById('monthSelected').style.display ='initial';
}

function monthSelected() {
    month = this.value;
    document.getElementById('monthSelected').style.display ='none';
    
    
    //set february for leap year
    lastDay[1] = ((year % 4 == 0 && year % 100 !=0) || year % 400 == 0) ? 29 : 28;

    let dayList=[];
    let lastDate = lastDay[monthList.indexOf(month)];
    let firstDay = 1;
   
    // console.log(year, currentDate.getFullYear(),monthList.indexOf(month) ,currentDate.getMonth())
    // remove any future days
    if(year == currentDate.getFullYear() && monthList.indexOf(month) == currentDate.getMonth()){
        lastDate = currentDate.getDate();   
        console.log(currentDate.getDate(),lastDate); 
    }
   
    //remove any days before the first image
    if(year == 1995 && month == 'June'){
        firstDay = 20;
    }
    
    //put the days in the select dropdown
    for(let day=firstDay; day <= lastDate; day++){
        dayList.push(day);
    }

    //create select day element
    let daySelect = Html.createSelectElement({
        change: daySelected, 
        defaultText: 'Select a Day',
        id:'daySelected',
        array: dayList
    });
    document.body.appendChild(daySelect);
}

function daySelected() {
    day = this.value;
    document.getElementById('daySelected').style.display ='none';
    document.getElementById('startBtn').style.display ='initial';
}