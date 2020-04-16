import React, {Component} from 'react';
import Select from 'react-select'
class Calendar extends Component {
  state = {
      day: '01',
      month: '01',
      year: '2000',
      parsedData:''
  }


  dayList = [{label:'01'},
    {label:'02'},
    {label:'03'} ];

  monthList = [
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
  
  yearList = [{label: 2020},
    {label: 2019},
    {label: 2018}
  ];



  showPicture = () => {
   let xhr = new XMLHttpRequest();
  //add leading zeros to day and month
  

  //set the date in format nasa API requires YYYY-MM-DD
  let nasaDate=`${this.state.year}-${this.state.month}-${this.state.day}`

  // console.log(nasaDate)
  xhr.open('GET', `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${nasaDate}`);

  xhr.onload = () => {
      this.setState({
        parsedData:JSON.parse(xhr.responseText).url
      })
  }
  
  xhr.send();
  
  }

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
    return (
     <div>
        <h1>{this.state.month}-{this.state.day}-{this.state.year}</h1>
        <br/>
        <div >
          <Select  onChange={this.handleYear} options = {this.yearList} />
          <Select  onChange={this.handleMonth} options = {this.monthList} />
          <Select  onChange={this.handleDay} options = {this.dayList} />
          <button onClick={this.showPicture}>Show Picture</button>
          <br/>
          <img src={this.state.parsedData} />
        </div>
      </div> 
    );
  }
}

export default Calendar;
