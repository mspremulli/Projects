import React, {Component} from 'react';
import './App.css';

class App extends Component {
  state = {
    parsedData:[]
  }

  componentDidMount() {
    let xhr = new XMLHttpRequest();
    xhr.onabort = err => {
        console.log('The request has been aborted', err, err.message);

    }
    
    let apiURL = 'https://jsonplaceholder.typicode.com/users',
        reqMethod ='GET',
        asyncBool = true;
    xhr.open(reqMethod, apiURL, asyncBool);

    xhr.onload = () => {
        let rawResponseData = xhr.responseText;
        this.setState({
          parsedData:JSON.parse(rawResponseData)
        })
        
    }
    
    xhr.send();
    
  }
  render(){
    const display = this.state.parsedData.map(user => {
      return(
        <ul>
          <li>name: {user.name}</li>
          <li>username: {user.username}</li>
          <li>email: {user.email}</li>
        </ul>
      )
    })
   
    return (
      <div>
       {display}
      </div>
    );
  }
}

export default App;
