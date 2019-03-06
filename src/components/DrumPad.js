import React, { Component } from 'react';

class DrumPad extends Component {
  constructor() {
    super();
    this.state = { padStyle: false };
    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  handleKeyPress(e) {
    if (e.keyCode === this.props.keyCode) {
      this.playSound();
    }
  }
  playSound(e) {
    const sound = document.getElementById(this.props.keyTrigger);
    sound.currentTime = 0;
    sound.play();
    this.activatePad();
    setTimeout(() => this.activatePad(), 100);
    this.props.updateDisplay(this.props.id);
  }
  activatePad = () => {
    this.setState({ padStyle: !this.state.padStyle });
  };
  render() {
    return (
      <div
        id="drum-pad"
        onClick={this.playSound}
        className={this.state.padStyle ? 'drum-pad active' : 'drum-pad'}
      >
        <p>{this.props.keyTrigger}</p>
        <audio className="clip" id={this.props.keyTrigger} src={this.props.url} />
      </div>
    );
  }
}

export default DrumPad;
