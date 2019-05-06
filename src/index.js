import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

//Component for all drum machine buttons
class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentDidMount() {
    //Listen for when user pushes key
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnmount() {
    //Remove listener when component unmounts
    document.removeEventListener("keydown", this.handleKeyPress);
  }
  handleKeyPress(event) {
    //If keyboard key pressed matches drum key call handleClick()
    if (event.keyCode === this.props.keyCode) {
      this.handleClick();
    }
  }
  //Play the clip linked to by this components audio element
  handleClick() {
    let soundElem = document.getElementById(this.props.id);
    soundElem.play();
    this.props.setDisplay(this.props.inst);
  }
  render() {
    return (
      <div class="drum-pad" id={this.props.inst} onClick={this.handleClick}>
        {this.props.id}
        <audio id={this.props.id} class="clip" src={this.props.src} />
      </div>
    );
  }
}

//Main container for drum machine
class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //Display for last instrument clicked
      display: "",
      //Objects representing each button
      drumInfo: [
        {
          id: "Q",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
          keyCode: 81,
          inst: "Chord-1"
        },
        {
          id: "W",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
          keyCode: 87,
          inst: "Chord-2"
        },
        {
          id: "E",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
          keyCode: 69,
          inst: "Chord-3"
        },
        {
          id: "A",
          url:
            "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
          keyCode: 65,
          inst: "Shaker"
        },
        {
          id: "S",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
          keyCode: 83,
          inst: "Open-HH"
        },
        {
          id: "D",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
          keyCode: 68,
          inst: "Closed-HH"
        },
        {
          id: "Z",
          url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
          keyCode: 90,
          inst: "Kick"
        },
        {
          id: "X",
          url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
          keyCode: 88,
          inst: "Rimshot"
        },
        {
          id: "C",
          url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
          keyCode: 67,
          inst: "Snare"
        }
      ]
    };
    this.setDisplay = this.setDisplay.bind(this);
  }
  //Set the display to the current instrument
  setDisplay(instrument) {
    this.setState({ display: instrument });
  }
  render() {
    //Map all drum info (through props) onto DrumPad components
    const pads = this.state.drumInfo.map(x => {
      return (
        <DrumPad
          onClick={this.handleClick}
          key={x.id + 1}
          keyCode={x.keyCode}
          id={x.id}
          src={x.url}
          inst={x.inst}
          setDisplay={this.setDisplay}
        />
      );
    });

    return (
      <div id="container">
        <h1>Drum Machine</h1>
        <div id="drum-machine">{pads}</div>
        <div id="display">{this.state.display}</div>
        <p>Made with React.js</p>
      </div>
    );
  }
}

ReactDOM.render(<DrumMachine />, document.getElementById("root"));
