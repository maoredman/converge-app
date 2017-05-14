import React, { Component } from 'react';
import FulfillMe from './FulfillMe';

class FMList extends Component {
  constructor(props) { // takes props.addtoDone/Undone
    super(props);
  }

  render() {
    const ids = this.props.ids;
    const FMList = ids.map((id) =>
      <FulfillMe key={id.toString()} accessKey={id} deleteFM={this.props.deleteFM} fulfilled={this.props.fulfilled} mode={this.props.mode} handleFMClick={this.props.handleFMClick} placeholder="FM Name..." criteria={this.props.FMCriteria[id]} criteriaNames={this.props.allcriteriaNames[id]} operator={this.props.operator}/>
    );
    return (
      <ul className="collapsible col s6" data-collapsible="expandable">
        {FMList}
      </ul>
    );
  }
}

export default FMList;