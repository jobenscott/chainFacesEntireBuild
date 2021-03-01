import logo from './logo.svg';
import React, { Component } from "react";
import './App.css';
//Homepage.js
import MultilineTextFields from './Search';
import SimpleCard from './Card';
import CurrentCard from './CurrentCards';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';







const App = () => {
  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
  


  const [cards, setCards] = React.useState([]);

  const [leftFace, setLeftFace] = React.useState('');
  const [leftEye, setLeftEye] = React.useState('');
  const [nose, setNose] = React.useState('');
  const [rightEye, setRightEye] = React.useState('');
  const [rightFace, setRightFace] = React.useState('');
  const [faceQuery, setFaceQuery] = React.useState([
    '?left_face='+leftFace+'&',
    'left_eye='+leftEye+'&',
    'nose='+nose+'&',
    'right_eye='+rightEye+'&',
    'right_face='+rightFace
  ]);

  const callApi = async (query) => {
    setCards([]);
    console.log('cards!');
    console.log(cards);
    query = query.replace(',', '');
    query = query.replace(',', '');
    query = query.replace(',', '');
    query = query.replace(',', '');
    console.log(query);
    const response = await fetch(encodeURI("/health"+query));
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  const populateCards = (faces) => {
    // document.querySelector('.card-container').innerHTML = '';
    setCards([]);
    console.log('faces');
    console.log(faces);
    console.log('faces end');
    if(faces.length > 0) {
      for(let item in faces) {
        let face = faces[item];
        let random_value = Math.random().toString(36).substring(7);
        cards.push(
        // <Card key={item} variant="outlined">
        //   <CardContent>
        //     <Typography color="textSecondary" gutterBottom>
        //       {face.full_face}
        //     </Typography>
        //   </CardContent>
        //   <CardActions>
        //     <Button size="small">Learn More</Button>
        //   </CardActions>
        // </Card>
        
        <SimpleCard  item={face.full_face+random_value} full_face={face.full_face} face_id={face.id} />
        // <div key={item}><h3>{face.full_face}</h3></div>
        )
        
        // console.log(cards);
      }
      setCards(cards);
    } else {
      cards.push(<h1>No matching faces found.</h1>)
    }
    

    
  }

  const updateLeftFace = (char) => {
    setLeftFace(char);
    let query = [
      '?left_face='+char+'&',
      'left_eye='+leftEye+'&',
      'nose='+nose+'&',
      'right_eye='+rightEye+'&',
      'right_face='+rightFace
    ];
    setFaceQuery(query)
    
    callApi(query.join())
      .then(res => {
        populateCards(res);
      })
      .catch(err => console.log(err));
  }
  
  const updateLeftEye = (char) => {
    setLeftEye(char);
    let query = [
      '?left_face='+leftFace+'&',
      'left_eye='+char+'&',
      'nose='+nose+'&',
      'right_eye='+rightEye+'&',
      'right_face='+rightFace
    ];
    setFaceQuery(query);
    callApi(query.join())
      .then(res => {
        populateCards(res);
      })
      .catch(err => console.log(err));
  }
  
  const updateNose = (char) => {
    setNose(char);
    let query = [
      '?left_face='+leftFace+'&',
      'left_eye='+leftEye+'&',
      'nose='+char+'&',
      'right_eye='+rightEye+'&',
      'right_face='+rightFace
    ];
    setFaceQuery(query);
    console.log(query);
    console.log(query.join());
    callApi(query.join())
      .then(res => {
        populateCards(res);
      })
      .catch(err => console.log(err));
  }
  
  const updateRightEye = (char) => {
    setRightEye(char);
    let query = [
      '?left_face='+leftFace+'&',
      'left_eye='+leftEye+'&',
      'nose='+nose+'&',
      'right_eye='+char+'&',
      'right_face='+rightFace
    ];
    setFaceQuery(query);
    callApi(query.join())
      .then(res => {
        populateCards(res);;
      })
      .catch(err => console.log(err));
  }
  
  const updateRightFace = (char) => {
    setRightFace(char);
    let query = [
      '?left_face='+leftFace+'&',
      'left_eye='+leftEye+'&',
      'nose='+nose+'&',
      'right_eye='+rightEye+'&',
      'right_face='+char
    ];
    setFaceQuery(query)
    callApi(query.join())
      .then(res => {
        populateCards(res);
      })
      .catch(err => console.log(err));
  }



  // render() {
    return <div className="App">
      {/* <h1>{this.state.test}</h1> */}
      <MultilineTextFields
        onUpdateLeftFace={updateLeftFace}
        onUpdateLeftEye={updateLeftEye}
        onUpdateNose={updateNose}
        onUpdateRightEye={updateRightEye}
        onUpdateRightFace={updateRightFace}
      />
      <hr></hr>
      {/* <div> */}
      {/* {cards.map((value, index) => value)} */}
      <CurrentCard cards={cards} />
      {/* </div> */}
      </div>;
  // }
}

// class App extends Component {
//   state = {
//     test: "Not yet..."
//   };

  


//   componentDidMount() {
//     callApi()
//       .then(res => this.setState({ test: "good" }))
//       .catch(err => console.log(err));
//   }

//   callApi = async () => {
//     const response = await fetch("/health");
//     const body = await response.json();
//     if (response.status !== 200) throw Error(body.message);

//     return body;
//   };

//   // render() {
//   //   return <div className="App">
//   //     <h1>{this.state.test}</h1>
//   //     <MultilineTextFields
//   //       onUpdateLeftFace={updateLeftFace}
//   //       onUpdateLeftEye={updateLeftEye}
//   //       onUpdateNose={updateNose}
//   //       onUpdateRightEye={updateRightEye}
//   //       onUpdateRightFace={updateRightFace}
//   //     />
//   //     </div>;
//   // }
// }

export default App;