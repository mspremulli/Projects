import Html from './htmlGenerators.js';

let dateRightNow = new Date();
var DateObj = {
    day : dateRightNow.getDate(),
    month : dateRightNow.getMonth(),
    year: dateRightNow.getFullYear()
}
const monthLast = [0,31,28,31,30,31,30,31,31,30,31,30,31];

//sets the year
function selectY(){
    DateObj.year = selectYear.value;
    updateSelect();  
}

//sets the month
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
    updateSelect();
}

//sets the day
function selectD(){
    DateObj.day = selectDay.value;
    updateSelect();
}


function updateSelect(){
    //set the years, months, and days
    let years = [],
        days=[];
    const months=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    for(let i=2020;i >= 1920 ;i--){
        years.push(i);
    }
    for(let i=0;i <= monthLast[DateObj.month] ;i++){
        days.push(i);
    }

    //creates and empties the Divs
    let mainDiv = Html.createDivElement({id: 'mainDiv'});
    let dateDiv = Html.createDivElement({id: 'dateDiv'});
    document.body.appendChild(dateDiv);    
    document.body.appendChild(mainDiv);
    document.getElementById('mainDiv').innerHTML='';
    document.getElementById('dateDiv').innerHTML='';
    
    //create the 3 select dropdown elements
    let selectYear = Html.createSelectElement({array: years, id:'selectYear', defaultText:'Select a Year'});
    selectYear.onchange = selectY;
    let selectMonth = Html.createSelectElement({array: months, id:'selectMonth', defaultText:'Select a Month'});
    selectMonth.onchange = selectM;
    let selectDay = Html.createSelectElement({array: days, id:'selectDay', defaultText:'Select a Day'});
    selectDay.onchange = selectD;

    //set the select box to the current date
    // selectYear.defaultText=DateObj.year;


     //checks if the set date is impossible
     let y = DateObj.year;
     monthLast[2] = (DateObj.month == 2 && ((y % 4 == 0 && y % 100 !=0) || y % 400 == 0)) ? 29: 28;
 
     if (DateObj.day > monthLast[DateObj.month]){
         DateObj.day = monthLast[DateObj.month];
         selectDay.value = monthLast[DateObj.month];
     }

    //appends everything to the DOM
    document.getElementById('dateDiv').appendChild(Html.createHeading({text: `${DateObj.year}/${DateObj.month}/${DateObj.day}`, size:1}));
    document.getElementById('mainDiv').appendChild(selectYear);
    document.getElementById('mainDiv').appendChild(selectMonth);
    document.getElementById('mainDiv').appendChild(selectDay);

}

updateSelect();