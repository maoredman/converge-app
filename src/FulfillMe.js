import React, { Component } from 'react';
import EditableText from './EditableText';

class FulfillMe extends Component {
  constructor(props) { // takes props.addtoDone/Undone
    super(props);
    this.handleFMClick = this.handleFMClick.bind(this);
    this.state = {
      highlight: false,
      textCategory: '',
    };
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.mode === 'check') {
      if (this.props.mode === 'set') {
        this.setState({ highlight: false });
      } else { // we were already in 'check' mode
        if (nextProps.operator === 'AND') {
          this.setState({ highlight: true, textCategory: 'fulfilled' });
          for (var a = 0; a < this.props.criteria.length; a++) {
            if (nextProps.fulfilled.indexOf(this.props.criteria[a]) === -1) {
              this.setState({ highlight: false, textCategory: '' });
              break;
            }
          }
        } else { // operator is 'OR'
          this.setState({ highlight: false, textCategory: '' });
          if (this.props.criteria.length === 0) {
            this.setState({ highlight: true, textCategory: 'fulfilled' });
          } else {
            for (var a = 0; a < this.props.criteria.length; a++) {
              if (nextProps.fulfilled.indexOf(this.props.criteria[a]) !== -1) {
                this.setState({ highlight: true, textCategory: 'fulfilled' });
                break;
              }
            }
          }
        }
      }
    } else if (nextProps.mode === 'set' && this.props.mode === 'check') {
      this.setState({ highlight: false, textCategory: '' });
    }
  }

  handleFMClick() {
    if (this.props.mode === 'set') {
        this.props.handleFMClick(this.props.accessKey);
        this.setState({ highlight: !this.state.highlight });
    }
  }

  render() {
    let highlightClass = '';
    if (this.state.highlight) {
      if (this.props.mode === 'set') {
        highlightClass = 'yellow lighten-3 ';
      } else { // mode is 'check'
        highlightClass = 'green lighten-3 ';
      }
    }
    return (
      <li>
        <i className="material-icons left hoverhand" onClick={this.handleFMClick}>select_all</i>
        <div className={highlightClass + "collapsible-header"}>
          <i className="material-icons right">expand_more</i>
          <i className="material-icons right" onClick={() => this.props.deleteFM(this.props.accessKey)}>delete</i>
          <span>
            <EditableText textCategory={this.state.textCategory} placeholder={this.props.placeholder} />
          </span>
        </div>
        <div className="collapsible-body"><span>{this.props.criteriaNames}</span></div>
      </li>
    );
  }
}

export default FulfillMe;