import React from 'react';

import BoundingBox from './BoundingBox'
import './BoxFix.css'
import './div-center.css'




class FaceRecognition extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      input: '',
      imageUrl: '',
      box: {}

    }
  }

  calculateFaceLocation = (data) => {

    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    return {
      leftCol: clarifaiFace.left_col * 100,
      topRow: clarifaiFace.top_row * 100,
      rightCol: (1 - clarifaiFace.right_col) * 100,
      bottomRow: (1 - clarifaiFace.bottom_row) * 100
    }

  };

  displayFaceBox = (box) => {

    this.setState({box: box});
  };









  onButtonSubmit = () => {

    // when detect button is submitted this is run
    // the state of the input is set to imageUrl
    // the get how to use API from documentation
    // when a get request is sent to clarifai a respose is recieved
    //which will be data.  we have to do something with this data.
    // we will use this data to construct the bounding box.
    this.setState({imageUrl: this.state.input});
    fetch('http://localhost:3000/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    }).then(response => response.json())
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.props.user.id
            })
          })
          .then(response => response.json())
          .then(count => this.props.updateEntries(count))
          .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));

  };


  onInputChange = (event) => {
    // take input from form and set the state of input to the value.

    this.setState({input: event.target.value})
  };




  render() {
    const {user} = this.props;

    return (


          <div className="flex flex-column items-center">
            <div>
              <p className='f4'>Hello, {user.name}!  Your count is {user.entries}!</p>
            </div>



            <div className="inline-flex w-50-m w-50-l">
              <input className='f4 pa2 w-60-ns outline flex' type='tex' onChange={this.onInputChange}/>
              <button className='w-40-ns grow f4 link ph3 pv2 flex white bg-light-purple justify-center' onClick={this.onButtonSubmit}>
                Detect
              </button>
            </div>


            <div>
              <div className="relative">

                <img alt='' src={this.state.imageUrl} width='500px' height='auto'/>

                <BoundingBox box={this.state.box}/>

              </div>

            </div>
          </div>


    );
  }
}

export default FaceRecognition;
