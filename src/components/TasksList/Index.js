import React, { Component } from 'react';


class TasksList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing:false,
            error:""
        }
    }
    renderLists(){
        if(this.state.isEditing){
            return(
                <div>
                    <div className = "lists-content black-text">
                         <input type="text" className="lists-title" ref="taskName" defaultValue={this.props.tasks.name} />
          </div>
     <div className="lists-action">
            <div className="row center">
              <div className="col s6 m6 l6">
                <i className="fa fa-floppy-o small blue-text action-bar" onClick={this.onSave.bind(this)}/>
              </div>
              <div className="col s6 m6 l6">
                <i className="fa fa-times small red-text action-bar" onClick={this.onCancel.bind(this)}/>
              </div>
            </div>
          </div>
        </div>
      )
    }
    if(!this.props.tasks.isDone){
        return(
        <div>
            <div className="lists-content black-text">
                <span className="lists-title bold-text center" ref="taskName">{this.props.tasks.name}</span>
                <p className="center">Created At: {tis.props.tasks.CreatedDate}</p>
            </div>
            <div className="lists-action">
            <div className="row center">
                <div className="col s4 m4 l4">
                <i className="fa fa-pencil-square-o small blue-text action-bar" onClick={this.handleEditTodo.bind(this)}/>
              </div>
              <div className="col s4 m4 l4">
                <i className="fa fa-check-square-o small black-text action-bar" onClick={this.completion.bind(this)} />
              </div>
              <div className="col s4 m4 l4">
                <i className="fa fa-trash small red-text action-bar" onClick={this.props.delete.bind(this, this.props.tasks._id)} />
              </div>
            </div>
          </div>
        </div>
      )
    }
    else {
      return (
        <div>
          <div className="lists-content white-text finished">
            <span className="lists-title" ref="taskName">{this.props.tasks.name}</span>
            <p className="center">Created: {this.props.tasks.createdDate}</p>
          </div>
          <div className="lists-action">
            <div className="row center">
              <div className="col s6 m6 l6">
                <i className="fa fa-square-o small green-text action-bar" onClick={this.completion.bind(this)}/>
              </div>
              <div className="col s6 m6 l6">
                <i className="fa fa-trash small red-text action-bar" onClick={this.props.delete.bind(this, this.props.tasks._id)} />
              </div>
            </div>
          </div>
        </div>
      )
    }
    
  }
  render() {
    return (
      <div>
        {
          this.props.tasks.isDone ?
            <div className="col s12 m6 l4">
              <div className="lists grey darken-3">
                {this.renderLists()}
              </div>
            </div>
          :
          <div className="col s12 m6 l4">
            <div className="lists yellow lighten-3">
              {this.renderLists()}
            </div>
          </div>
        }
      </div>
    );
  }
 handleEditTodo() {
    this.setState({
      isEditing: true
    })
  }
   onSave() {
    var newEntry = this.refs.taskName.value;
    this.props.saveEditedTask(this.props.tasks._id, newEntry);
    this.setState({
      isEditing: false
    })
  }

  completion() {
    this.props.finishedTask(this.props.tasks._id)
  }

  onCancel() {
    this.setState({
      isEditing: false
    })
  }
}

export default TasksList;
   