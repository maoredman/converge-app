import React, { Component } from 'react';

class EditableText extends Component {
  constructor(props) { // props.placeholder string, props.showbox bool default false
    super(props);
    this.state = { content: '', editing: true, done: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDone = this.handleDone.bind(this);
  }

  componentDidMount(){
    this.nameInput.focus();
  }

  handleChange(event) {
    this.setState({ content: event.target.value });
    if (this.props.textCategory === 'criterion') {
      this.props.setCriName(event.target.value);
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ editing: false, done: false });
  }
  handleEdit() {
    this.setState({ editing: true });
  }
  handleDone() {
    if (!this.state.editing) {
      const newDoneState = !this.state.done;
      this.setState({ done: newDoneState });
    }
  }

  render() {
    if (this.state.editing) {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              type="text"
              placeholder={this.props.placeholder}
              value={this.state.content}
              onChange={this.handleChange}
              ref={(input) => { this.nameInput = input; }}
              maxLength="24"
              required
            />
          </label>
          <i onClick={this.handleSubmit} className="material-icons right hoverhand">save</i>
        </form>
      );
    }

    return ( // not editing
      <span>
        <span className="input-text"> {this.state.content} </span>
        <i className="material-icons right" onClick={this.handleEdit}>mode_edit</i>
      </span>
    );
  }
}

export default EditableText;