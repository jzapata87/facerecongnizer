import React, { Component } from 'react';
import Navbar from './Navbar.js';
import InfoForms from './InfoForms.js';
import FaceRecognition from './FaceRecognition.js';
import 'tachyons'

class App extends Component {


  constructor() {
    super();
    this.state = {
      route: 'Sign In',
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  updateEntries = (data) => {
    console.log(data);
    this.setState(Object.assign(this.state.user, { entries: data }))
  };

  loadUser = (user) => {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined
      }
    })

  };

  onRouteChange = (route) => {
    if (route === 'signout') {

    }
    this.setState({route: route })
  };

  render() {
    return (


        <div >




            <Navbar route={this.state.route} onRouteChange={this.onRouteChange}/>
            <p>{this.state.user.entries}</p>
            { this.state.route === ('Home') ?
            (<FaceRecognition user={this.state.user} updateEntries={this.updateEntries}/>) :

            (<InfoForms loadUser={this.loadUser} route={this.state.route} onRouteChange={this.onRouteChange}/>)

          }
        </div>

    );
  }
}

export default App;
