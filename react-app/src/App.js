import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
function BoilingVerdict(props) {
  if (props.celsius >=100) {
    return <p>水会烧开</p>;
  } else return <p>水不会烧开</p>;
}
function toCelsius (fahrenheit) {
  return (fahrenheit-32)*5/9;
}
function toFahrenheit (celsius) {
  return celsius*9/5+32;
}
function tryConvert(temperature, convert) {
  const input = Number.parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output*1000)/1000;
  return rounded.toString();
}
const scaleNames = {
  'c': '摄氏度',
  'f': '华氏度'
}

class TemperatureInput extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }
  render(){
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>输入{scaleNames[scale]}</legend>
        <input type="text" value={temperature} onChange={this.handleChange}/>
      </fieldset>
    );
  }
}

class Calculator extends Component {
  constructor (props) {
    super(props);
    this.state = {
      temperature: '',
      scale: 'c'
    }
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
  }
  handleCelsiusChange(temperature){
    this.setState({scale: 'c', temperature});
  }
  handleFahrenheitChange(temperature){
    this.setState({scale: 'f', temperature});
  }
  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale==='f'? tryConvert(temperature, toCelsius): temperature;
    const fahrenheit = scale==='c'? tryConvert(temperature, toFahrenheit): temperature;
    return (
      <div>
        <TemperatureInput 
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange}/>
        <TemperatureInput 
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}/>
        <BoilingVerdict celsius={celsius}></BoilingVerdict>
      </div>
    );
  }
}

export default Calculator;
