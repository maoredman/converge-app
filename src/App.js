import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CriterionList from './CriterionList';
import FMList from './FMList';

class App extends Component {
  constructor(props) { // takes props.addtoDone/Undone
    super(props);
    this.state = {
      mode: 'set',
      operator: 'AND',
      fulfilled: [],
      clickedFMs: [],
      FMCriteria: [], // will expand into [[],[],...]
      FMCriteriaNames: [], // will expand into [[],[],...]
      FMs: [], // ids of FMs
      FMcount: 0, // doesn't decrease when FM is deleted
      Cris: [],
      Cricount: 0,
    };
    this.handleFMClick = this.handleFMClick.bind(this);
    this.handleModeClick = this.handleModeClick.bind(this);
    this.handleCriClick = this.handleCriClick.bind(this);
    this.deleteFM = this.deleteFM.bind(this);
    this.addFM = this.addFM.bind(this);
    this.addCri = this.addCri.bind(this);
    this.deleteCri = this.deleteCri.bind(this);
    this.handleOperatorClick = this.handleOperatorClick.bind(this);
  }

  handleFMClick(id){
    if (this.state.mode === "set") {
      const position = this.state.clickedFMs.indexOf(id);
      if (position !== -1) { // this FM has already been selected before
        let new_clickedFMs = this.state.clickedFMs;
        new_clickedFMs.splice(position, 1);
        this.setState({ clickedFMs: new_clickedFMs });
      } else {
        let new_clickedFMs = this.state.clickedFMs;
        new_clickedFMs.push(id);
        this.setState({ clickedFMs: new_clickedFMs });
      }
    }
  }

  handleModeClick() {
    const nextMode = (this.state.mode === 'set') ? 'check' : 'set';
    if (nextMode === 'check') {
      this.setState({ clickedFMs: [] });
    } else { // nextMode is 'set'
      this.setState({ fulfilled: [] });
    }
    this.setState({ mode: nextMode });
  }
  
  handleOperatorClick() {
    const nextOperator = (this.state.operator === 'AND') ? 'OR' : 'AND';
    this.setState({ operator: nextOperator });
  }

  handleCriClick(id, criName){
    if (this.state.mode === "set") {
      var new_FMCriteria = this.state.FMCriteria;
      var new_FMCriteriaNames = this.state.FMCriteriaNames;
      for (var a = 0; a < this.state.clickedFMs.length; a++) {
        const FMIndex = this.state.clickedFMs[a]; // FMIndex is id of clicked FM
        const position = new_FMCriteria[FMIndex].indexOf(id);
        if (position !== -1) { // this id is already in FM's criteria
          new_FMCriteria[FMIndex].splice(position, 1);
          new_FMCriteriaNames[FMIndex].splice(position, 1);
        } else {
          new_FMCriteria[FMIndex].push(id);
          new_FMCriteriaNames[FMIndex].push(criName + ', ');
        }
      }
      this.setState({ FMCriteria: new_FMCriteria, FMCriteriaNames: new_FMCriteriaNames });
    } else { // mode is 'check'
      let new_fulfilled = this.state.fulfilled;
      const position = new_fulfilled.indexOf(id);
      if (position !== -1) { // this id is already in (new_)fulfilled
        new_fulfilled.splice(position, 1);
      } else {
        new_fulfilled.push(id);
      }
      this.setState({ fulfilled: new_fulfilled });
    }
  }

  addFM() {
    const newFMs = this.state.FMs;
    newFMs.push(this.state.FMcount);
    const newFMCriteria = this.state.FMCriteria;
    newFMCriteria.push([]);
    const newFMCriteriaNames = this.state.FMCriteriaNames;
    newFMCriteriaNames.push([]);
    this.setState({ FMcount: this.state.FMcount + 1, FMs: newFMs, FMCriteria: newFMCriteria, FMCriteriaNames: newFMCriteriaNames });
  }

  deleteFM(key) {
    const FMs = this.state.FMs.filter((id) => {
      return key !== id;
    });
    const clickedFMs = this.state.clickedFMs.filter((id) => {
      return key !== id;
    });
    
    this.setState({ FMs, clickedFMs }); // ESlint-required shorthand
  }

  addCri() {
    const newCris = this.state.Cris;
    newCris.push(this.state.Cricount);
    this.setState({ Cricount: this.state.Cricount + 1, Cris: newCris });
  }

  deleteCri(key) {
    const Cris = this.state.Cris.filter((id) => {
      return key !== id;
    });
    this.setState({ Cris });

    var new_FMCriteria = this.state.FMCriteria;
    var new_FMCriteriaNames = this.state.FMCriteriaNames;
    for (var a = 0; a < this.state.FMs.length; a++) {
      const FMIndex = this.state.FMs[a];
      const position = new_FMCriteria[FMIndex].indexOf(key);
      if (position !== -1) { // this id is already in FM's criteria
        new_FMCriteria[FMIndex].splice(position, 1); // remove this id
        new_FMCriteriaNames[FMIndex].splice(position, 1);
      }
    }

    this.setState({ FMCriteria: new_FMCriteria, FMCriteriaNames: new_FMCriteriaNames });
  }


  render() {
    let operatorExplain = '';
    if (this.state.operator === 'OR') {
      operatorExplain = 'At least one of its criterion fulfilled';
    } else if (this.state.operator === 'AND') {
      operatorExplain = 'All its criteria fulfilled';
    }
    return (
      <div>
        <div className="center-align">Mode: {this.state.mode}</div>
        <div className="center-align">Highlighted FMs: {operatorExplain}</div>

        <div className="center-align section">
          <a className="waves-effect waves-light btn top-btn teal lighten-2" onClick={this.addFM}>Add FulfillMe</a>
          <a className="waves-effect waves-light btn top-btn teal darken-1" onClick={this.handleModeClick}>Change mode</a>
          <a className="waves-effect waves-light btn top-btn teal darken-1" onClick={this.handleOperatorClick}>Change operator</a>
          <a className="waves-effect waves-light btn top-btn teal lighten-2" onClick={this.addCri}>Add Criterion</a>
        </div>

        <div className="row">
          <FMList ids={this.state.FMs} deleteFM={this.deleteFM} fulfilled={this.state.fulfilled} mode={this.state.mode} FMCriteria={this.state.FMCriteria} handleFMClick={this.handleFMClick} allcriteriaNames={this.state.FMCriteriaNames} operator={this.state.operator}/>
          
          <CriterionList ids={this.state.Cris} deleteCri={this.deleteCri} handleCriClick={this.handleCriClick} mode={this.state.mode} placeholder="Criterion Name..." />
        </div>
      </div>
    );
  }
}

export default App;
