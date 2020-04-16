import React, {Component} from 'react';
import Select, {components} from 'react-select'
class Calendar extends Component {
  state = {
      day: 1,
      month: 1,
      year: 2000,
      parsedData:''
  }



// componentDidUpdate() {
//   // let xhr = new XMLHttpRequest();
//   //add leading zeros to day and month
//   if(Number.isInteger(this.state.month) && this.state.month < 10){
//     this.setState({
//       month: `0${this.state.month}`
//     })
//   }
//   // if(this.state.day < 10){
//     this.setState({
//       // day: `0${this.state.day}`
//       day: '02'
//     })  
//   // }

//   //set the date in format nasa API requires YYYY-MM-DD
//   let nasaDate=`${this.state.year}-${this.state.month}-${this.state.day}`

//   console.log(nasaDate)
//   // xhr.open('GET', `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${nasaDate}`);

//   // xhr.onload = () => {
//   //     this.setState({
//   //       parsedData:JSON.parse(xhr.responseText)
//   //     })
//   //     console.log(this.state.parsedData.url);
//   // }
  
//   // xhr.send();
  
// }


  dayList = [{label:1},
    {label:2},
    {label:3} ];

  monthList = [
    {label: 'January'},
    {label: 'Februay'},
    {label:'March'},
    {label:'April'},
    {label:'May'},
    {label:'June'},
    {label:'July'},
    {label:'August'},
    {label:'September'},
    {label:'October'},
    {label:'November'},
    {label:'December'},
  ];
  
  yearList = [{label: 2020},
    {label: 2019},
    {label: 2018}
  ];

  handleYear = (selected) => {
    this.setState({
      year:selected.label
    })
  }
  handleMonth = (selected) => {
    this.setState({
      month:selected.label
    })  
  }
  handleDay = (selected) => {
    this.setState({
      day:selected.label
    })
  }
   
  
  
 showPicture = () => {
   console.log(this.state.day)
   console.log(this.state.month)
   console.log(this.state.year)
 }

  render(){
    return (
     <div>
        <h1>{this.state.month}-{this.state.day}-{this.state.year}</h1>
        <br/>
        <div >
          <Select  onChange={this.handleChange} options = {this.yearList} />
          <Select  onChange={this.handleChange} options = {this.monthList} />
          <Select  onChange={this.handleChange} options = {this.dayList} />
          <button onSubmit={showPicture}>Show Picture</button>
        </div>
      </div> 
    );
  }
}

export default Calendar;
