import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

let leftFaceCharacters = [ 
    {"label":"None","value": ""},
    {"label":"ʕ","value": "ʕ"},
    {"label":"✿","value": "✿"},
    {"label":"꒰","value": "꒰"},
    {"label":":","value": ":"},
    {"label":"{","value": "{"},
    {"label":"|","value": "|"},
    {"label":"[","value": "["},
    { "label":"(", "value":"(" }
    ];
    let eyeCharacters = [
    {"label":"None","value": ""},
    {"label":"◕","value": "◕"},
    {"label":"👁","value": "👁"},
    {"label":"ಥ","value": "ಥ"},
    {"label":"♥","value": "♥"},
    {"label": "ʘ̚","value":  "ʘ̚"},
    {"label": "X","value":  "X"},
    {"label":"⊙","value": "⊙"},
    {"label":"˘","value": "˘"},
    {"label":"ಠ","value": "ಠ"},
    {"label":"◉","value": "◉"},
    {"label":"⚆","value": "⚆"},
    {"label":"¬","value": "¬"},
    { "label":"^", "value":"^" }
    ];
    let mouthCharacters = [ 
    {"label":"None","value": ""},
    {"label":"ᴥ","value": "ᴥ"},
    {"label":"益","value": "益"},
    {"label":"෴","value": "෴"},
    {"label":"ʖ","value": "ʖ"},
    {"label":"ᆺ","value": "ᆺ"},
    {"label":".","value": "."},
    { "label":"o", "value":"o" } 
    ];
    let rightFaceCharacters = [ 
    {"label":"None","value": ""},
    {"label":"ʔ","value": "ʔ"},
    {"label":"✿","value": "✿"},
    {"label":"꒱","value": "꒱"},
    {"label":":","value": ":"},
    {"label":"}","value": "}"},
    { "label":"|", "value":"|" } 
    ];


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '10ch',
    },
  },
}));

export default function MultilineTextFields({onUpdateLeftFace, onUpdateLeftEye, onUpdateNose, onUpdateRightEye, onUpdateRightFace}) {
  const classes = useStyles();
  const [currency, setCurrency] = React.useState('EUR');
  const [leftFace, setLeftFace] = React.useState('');
  const handleLeftFace = (event) => {
    setLeftFace(event.target.value);
    onUpdateLeftFace(event.target.value);
  }
  const [leftEye, setLeftEye] = React.useState('');
  const handleLeftEye = (event) => {
    setLeftEye(event.target.value);
    onUpdateLeftEye(event.target.value);
  }
  const [nose, setNose] = React.useState('');
  const handleNose = (event) => {
    setNose(event.target.value);
    onUpdateNose(event.target.value);
  }
  const [rightEye, setRightEye] = React.useState('');
  const handleRightEye = (event) => {
    setRightEye(event.target.value);
    onUpdateRightEye(event.target.value);
  }
  const [rightFace, setRightFace] = React.useState('');
  const handleRightFace = (event) => {
    setRightFace(event.target.value);
    onUpdateRightFace(event.target.value);
  }
  


  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="standard-select-currency"
          select
          label="Left Face"
          value={leftFace}
          onChange={handleLeftFace}
        >
          {leftFaceCharacters.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="standard-select-currency"
          select
          label="Left Eye"
          value={leftEye}
          onChange={handleLeftEye}
        >
          {eyeCharacters.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="standard-select-currency"
          select
          label="Mouth"
          value={nose}
          onChange={handleNose}
        >
          {mouthCharacters.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="standard-select-currency"
          select
          label="Right Eye"
          value={rightEye}
          onChange={handleRightEye}
        >
          {eyeCharacters.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="standard-select-currency"
          select
          label="Right Face"
          value={rightFace}
          onChange={handleRightFace}
        >
          {rightFaceCharacters.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </form>
  );
}
