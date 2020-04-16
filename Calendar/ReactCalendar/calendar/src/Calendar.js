import React, {Component} from 'react';
import Select from 'react-select'
class Calendar extends Component {
  state = {
      day: '01',
      month: '01',
      year: '2000',
      parsedData:''
  }


 //updates the state URL from NASA's daily image API
  showPicture = () => {
   let xhr = new XMLHttpRequest();
 
  //set the date in format nasa API requires YYYY-MM-DD
  let nasaDate=`${this.state.year}-${this.state.month}-${this.state.day}`

  xhr.open('GET', `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${nasaDate}`);

  xhr.onload = () => {
      this.setState({
        parsedData:JSON.parse(xhr.responseText).url
      })
  }
  
  xhr.send();
  
  }

  //updates the state when the date is changed
  handleYear = (selected) => {
    this.setState({
      year:selected.label
    })
  }
  handleMonth = (selected) => {
    this.setState({
      month:selected.value
    })  
  }
  handleDay = (selected) => {
    this.setState({
      day:selected.label
    })
    
  }
   
  
  render(){
    //set the list of years
    let y=[];
    for(let i=2020;i>1990;i--){
      y.push(i)
    }
    const yearList = y.map(e => {return ({label: `${e}`})});

    //set the list of months
    const monthList = [
      {label: 'January', value:'01'},
      {label: 'Februay', value:'02'},
      {label:'March', value:'03'},
      {label:'April', value:'04'},
      {label:'May', value:'05'},
      {label:'June', value:'06'},
      {label:'July', value:'07'},
      {label:'August', value:'08'},
      {label:'September', value:'09'},
      {label:'October', value:'10'},
      {label:'November', value:'11'},
      {label:'December', value:'12'},
    ];

    //set the length of each month depending on leap year
    let monthLast = [0,31,28,31,30,31,30,31,31,30,31,30,31];

    if((this.state.year % 4 === 0 && this.state.year % 100 !==0) || this.state.year % 400 === 0){
      monthLast[2] = 29;
    }
    else monthLast[2] =28;

    //set the number of days depending on what month it is
    let d=[];
    for(let i=1; i <= monthLast[Number.parseInt(this.state.month)]; i++){
      d.push(i)
    }

    const dayList = d.map(e => {
      if(e<10){
        return  ({label:`0${e}`})
      }

      else{
        return({ label: `${e}`})
      }
    });



    return (
     <div>
        <h1>{this.state.month}-{this.state.day}-{this.state.year}</h1>
        <br/>
        <div >
          <Select  onChange={this.handleYear} options = {yearList} />
          <Select  onChange={this.handleMonth} options = {monthList} />
          <Select  onChange={this.handleDay} options = {dayList} />
          <button onClick={this.showPicture}>Show Picture</button>
          <br/>
          <img alt='No image loaded yet' src={this.state.parsedData} />
        </div>
      </div> 
    );
  }
}

export default Calendar;
