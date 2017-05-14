import React, { Component } from 'react';
import EditableText from './EditableText';

class Criterion extends Component {
  constructor(props) { // takes props.addtoDone/Undone
    super(props);
    this.state = {
      highlight: false,
      name: '',
    };
    this.handleCriClick = this.handleCriClick.bind(this);
    this.setCriName = this.setCriName.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.mode === 'set') {
        this.setState({ highlight: false });
    }
  }

  handleCriClick() {
    this.props.handleCriClick(this.props.accessKey, this.state.name);
    if (this.props.mode === 'check') {
      this.setState({ highlight: !this.state.highlight });
    }
  }

  setCriName(newName) {
    this.setState({ name: newName });
  }

  render() {
    let highlightClass = '';
    if (this.state.highlight && this.props.mode === 'check') {
      highlightClass = 'cyan lighten-3 ';
    }
    return (
      <li className={highlightClass + "collection-item"}>
        <i className="material-icons left hoverhand" onClick={this.handleCriClick}>select_all</i>
        <i className="material-icons right hoverhand" onClick={() => this.props.deleteCri(this.props.accessKey)}>delete</i>
        <span onClick={this.handleCriClick} className="hoverhand">
          <EditableText setCriName={this.setCriName} textCategory="criterion" placeholder={this.props.placeholder} />
        </span>
      </li>
    );
  }
}

export default Criterion;