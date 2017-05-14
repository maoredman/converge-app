import React, { Component } from 'react';
import Criterion from './Criterion';

class CriterionList extends Component {
  constructor(props) { // takes props.addtoDone/Undone
    super(props);
    this.state = {
      showPrompt: false,
    };
  }

  componentWillReceiveProps(nextProps){
    if (this.props.mode === 'set' && nextProps.mode === 'check') {
      this.setState({ showPrompt: true });
    } else {
      this.setState({ showPrompt: false });
    }
  }

  render() {
    const ids = this.props.ids;
    const CriterionList = ids.map((id) =>
      <Criterion key={id.toString()} accessKey={id} deleteCri={this.props.deleteCri} handleCriClick={this.props.handleCriClick} mode={this.props.mode} placeholder="Criterion Name..." />
    );
    const promptClass = (this.state.showPrompt) ? 'center-align yellow lighten-3' : 'hidden';
    return (
      <ul className="collection col s6">
        <h5 className={promptClass}>Click on criteria to start converging!</h5>
        {CriterionList}
      </ul>
    );
  }
}

export default CriterionList;