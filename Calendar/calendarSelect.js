import Html from './htmlGenerators.js';

let dateRightNow = new Date();
var DateObj = {
    day : dateRightNow.getDate(),
    month : dateRightNow.getMonth(),
    year: dateRightNow.getFullYear()
}
const monthLast = [0,31,28,31,30,31,30,31,31,30,31,30,31];

function selectY(){
    DateObj.year = selectYear.value;
    dateDisplay();
    checkDay();
}

function selectM(){
     switch(selectMonth.value){
        case 'January': DateObj.month = 1
        break;
        case'February':DateObj.month = 2
        break;
        case 'March' :DateObj.month = 3
        break;
        case 'April':DateObj.month = 4
        break;
        case 'May':DateObj.month = 5
        break;
        case 'June':DateObj.month = 6
        break;
        case 'July':DateObj.month = 7
        break;
        case 'August':DateObj.month = 8
        break;
        case 'September':DateObj.month = 9
        break;
        case 'October':DateObj.month = 10
        break;
        case 'November':DateObj.month = 11
        break;
        default: DateObj.month = 12
    };
    checkDay();
    dateDisplay();
}


function checkDay(){
    if (DateObj.day > monthLast[DateObj.month]){
        DateObj.day = monthLast[DateObj.month];
        selectDay.value = monthLast[DateObj.month];
    }
}

function selectD(){
    DateObj.day = selectDay.value;
    checkDay();
    dateDisplay();
}

function dateDisplay(){
    document.getElementById('dateDiv').innerHTML='';
    document.getElementById('dateDiv').appendChild(Html.createHeading({text: `${DateObj.year}/${DateObj.month}/${DateObj.day}`, size:1}));
     
}

function setUp(){
    let mainDiv = Html.createDivElement({id: 'mainDiv'});
    let dateDiv = Html.createDivElement({id: 'dateDiv'});
    
    let years = [],
        month = 1,
        days=[],
        months=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        lastDay=31;
    for(let i=2020;i >= 1920 ;i--){
        years.push(i);
    }
    for(let i=0;i <= lastDay ;i++){
        days.push(i);
    }
    let selectYear = Html.createSelectElement({array: years, id:'selectYear', defaultText:'Select a Year'});
    selectYear.onchange = selectY;
    let selectMonth = Html.createSelectElement({array: months, id:'selectMonth', defaultText:'Select a Month'});
    selectMonth.onchange = selectM;
    let selectDay = Html.createSelectElement({array: days, id:'selectDay', defaultText:'Select a Day'});
    selectDay.onchange = selectD;


    document.body.appendChild(dateDiv);    
    document.body.appendChild(mainDiv);
    dateDisplay()
    document.getElementById('mainDiv').appendChild(selectYear);
    document.getElementById('mainDiv').appendChild(selectMonth);
    document.getElementById('mainDiv').appendChild(selectDay);

    
    
}

setUp();