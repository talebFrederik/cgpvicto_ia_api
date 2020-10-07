import React from 'react';
import './App.css';
import Axios from 'axios';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      file: '',
      img: '',
      imgData: '',
      analyse: [],
      is_monkey: false,
    }

    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleAnalyseClick = this.handleAnalyseClick.bind(this);
  }

  handleImageChange(e) {
    let reader = new FileReader();
    let file = e.target.files[0]

    reader.onloadend = () => {
      this.setState({
        file: file,
        img: reader.result,
        imgData: reader.result.slice(reader.result.indexOf(',') + 1),

      });
    }

    reader.readAsDataURL(file);
  }

  handleAnalyseClick() {
    let data = {
      "requests": [
        {
          "image": {
            "content": this.state.imgData,
          },
          "features": [
            {
              "type": "LABEL_DETECTION",
            },
            {
              "type": "FACE_DETECTION",
            },
            {
              "type": "LANDMARK_DETECTION",
            }
          ]
        }
      ]
    };

    Axios.post("https://vision.googleapis.com/v1/images:annotate?key=MaCleAPIici", data)
      .then((response) => {
        console.log(response.data);
        this.setState({ analyse: response.data.responses[0] });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleAfficherClick(){
    this.state.analyse.labelAnnotations.array.forEach(this.verification);
  }

  verification(value){
    let is_monkey = value.description.contains("Wrestler");
    
  }

  render() {

    return (
      <div className="App" >
        <div>
          <input type="file" onChange={this.handleImageChange} />
        </div>
        <div>
          <img src={this.state.img} alt="aucune" />
        </div>
        <div>
          <button onClick={this.handleAnalyseClick}>Analyser</button>
        </div>
        <div>
          <button >Afficher les résultats</button>
        </div>
        <div>
          {analyse.map}
        </div>
      </div>
    );
  }

}

export default App;
