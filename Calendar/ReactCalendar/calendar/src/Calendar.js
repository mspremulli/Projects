import React, {Component} from 'react';

class Calendar extends Component {
  state ={
    dateInfo: {
      day: 1,
      month: 1,
      year: 2000
    }
}
  
  nextDay = () =>{
    console.log(this.state.dateInfo)

    this.dateInfo.day = this.state.dateInfo.day+1
    
  }

  render(){
    return (
     <div>
        <h1>{this.state.dateInfo.month}-{this.state.dateInfo.day}-{this.state.dateInfo.year}</h1>
     
        <div className="btns">
          <button onClick = {this.nextDay}>Next Day</button>
          <button>Previous Day</button>
          <button>Next Month</button>
          <button>Previous Month</button>
          <button>Next Year</button>
          <button>Previous Day</button>
        </div>
      </div> 
    );
  }
}

export default Calendar;
