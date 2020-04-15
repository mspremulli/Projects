import Html from './htmlGenerators.js';

var DateObj = {
    day : 1,
    month : 1,
    year: 2020,
    lastDay: false
}

const thirtyOne = new Set([1,3,5,7,8,10,12]),
      thirty = new Set([4,9,11]);


//refresh page
function refresh(){
    document.getElementById('dateDiv').innerHTML = '';
    let dateDisplay = Html.createHeading({text: `${DateObj.year}/${DateObj.month}/${DateObj.day}`, size:1});
    document.getElementById('dateDiv').appendChild(dateDisplay);
}


//checks for leap year yet
function isLeapYear(){
    let y = DateObj.year;
    if((y % 4 == 0 && y % 100 !=0) || y % 400 == 0){
        return true;
    }
    return false;
}

//checks if the day is the last day of the month
function checkLastDay(){


    if(thirtyOne.has(DateObj.month) && DateObj.day == 31){
        DateObj.lastDay = true;
    }
    else if(thirty.has(DateObj.month) && DateObj.day == 30){
        DateObj.lastDay = true;
    }
    else if(DateObj.month == 2 && DateObj.day == 28 && !isLeapYear()){
        DateObj.lastDay = true;
    }
    else if(DateObj.month == 2 && DateObj.day == 29 && isLeapYear()){
        DateObj.lastDay = true;
    }
   
    else{
        DateObj.lastDay = false;
    }
}

//moves to the next day, updates month and year if they change
function nextDay(){
    checkLastDay();
    if(!DateObj.lastDay){
        DateObj.day = DateObj.day + 1;
    }
    else{
        DateObj.day = 1;
        nextMonth(DateObj);
    }
     refresh();
}

//moves to the next month, updates year if year changes
function nextMonth(){
    if(DateObj.month !=12){
        DateObj.month = DateObj.month +  1;
    }
    else{
        DateObj.month = 1;
        nextYear(DateObj);
    }
    getLastDay()
     refresh();
}


//moves to the next year
function nextYear(){
    DateObj.year = DateObj.year + 1;
     refresh();
}


//moves to the previous day, updates month and year if they change
function previousDay(Dte){
    if(DateObj.day != 1){
        DateObj.day = DateObj.day - 1;
    }
    else{
        previousMonth(DateObj);
        if(thirtyOne.has(DateObj.month)){
            DateObj.day = 31;
        }
        else if(thirty.has(DateObj.month)){
            DateObj.day = 30;
        }
        else if(DateObj.month == 2 && !isLeapYear()){
            DateObj.day = 28;
        }
        else if(DateObj.month == 2 && isLeapYear()){
            DateObj.day = 29;
        }
        
    }
     refresh();
}

//checks in the day is beyond the last of the month.
function getLastDay(){
    if(thirtyOne.has(DateObj.month) && DateObj.day > 31){
        DateObj.day = 31;
    }
    else if(thirty.has(DateObj.month) && DateObj.day > 30){
        DateObj.day = 30;
    }
    else if(DateObj.month == 2 && !isLeapYear() && DateObj.day > 28){
        DateObj.day = 28;
    }
    else if(DateObj.month == 2 && isLeapYear() && DateObj.day > 29){
        DateObj.day = 29;
    }

}

//moves to the previous month, updates year if year changes
function previousMonth(){
    if(DateObj.month !=1){
        DateObj.month = DateObj.month -  1;
    }
    else{
        DateObj.month = 12;
        previousYear(DateObj);
    }
    getLastDay()

     refresh();
}

//moves to the previous year(does nothing if year is 0)
function previousYear(){
    if(DateObj.year > 0){
        DateObj.year = DateObj.year - 1;
        refresh();
    }
}

function currentDate(){
    let today = new Date();
    DateObj.year = today.getFullYear();
    DateObj.month = today.getMonth() + 1;
    DateObj.day = today.getDate();
    refresh();
}
function submitDate(){
     openAPI();
}

function openAPI(){
    let xhr = new XMLHttpRequest();
    if(Number.isInteger(DateObj.month) && DateObj.month <10){
        DateObj.month = `0${DateObj.month}`;
    }

    if(Number.isInteger(DateObj.day) && DateObj.day <10){
        DateObj.day = `0${DateObj.day}`;
    }

    let nasaDate=`${DateObj.year}-${DateObj.month}-${DateObj.day}`
    console.log(nasaDate)
    xhr.open('GET', `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${nasaDate}`);
    
    xhr.onload = () => {
        let data = JSON.parse(xhr.responseText);
        
        
        
      
       
        let dataDiv = Html.createImageElement({src:data.url, height:500, width:800});
    document.getElementById('photoDiv').appendChild(dataDiv);
    }
    

    
    xhr.send();

    
}

function setUp(){
    let mainDiv = Html.createDivElement({id: 'mainDiv'});
    let dateDiv = Html.createDivElement({id: 'dateDiv'});
    let photoDiv = Html.createDivElement({id: 'photoDiv'});
    let dateDisplay = Html.createHeading({text: `${DateObj.year}/${DateObj.month}/${DateObj.day}`, size:1})
    let nextDayBtn = Html.createButton({text: 'Next Day', click: nextDay}),
        nextMonthBtn = Html.createButton({text: 'Next Month', click: nextMonth}),
        nextYearBtn = Html.createButton({text: 'Next Year', click: nextYear}),
        previousDayBtn = Html.createButton({text: 'Previous Day', click:  previousDay}),
        previousMonthBtn = Html.createButton({text: 'Previous Month', click:  previousMonth}),
        previousYearBtn = Html.createButton({text: 'Previous Year', click: previousYear}),
        currentDateBtn = Html.createButton({text: 'Current Date', click: currentDate}),
        submitDateBtn = Html.createButton({text: 'Set Background', click: submitDate});



        


    document.body.appendChild(dateDiv);    
    document.body.appendChild(mainDiv);
    document.body.appendChild(photoDiv);
    document.getElementById('dateDiv').appendChild(dateDisplay);
    document.getElementById('mainDiv').appendChild(nextDayBtn);
    document.getElementById('mainDiv').appendChild(nextMonthBtn);
    document.getElementById('mainDiv').appendChild(nextYearBtn);
    document.getElementById('mainDiv').appendChild(previousDayBtn);
    document.getElementById('mainDiv').appendChild(previousMonthBtn);
    document.getElementById('mainDiv').appendChild(previousYearBtn);
    document.getElementById('mainDiv').appendChild(currentDateBtn);
    document.getElementById('mainDiv').appendChild(submitDateBtn);


    
}

setUp();