import _ from 'lodash';
import React, { Component } from 'react';
import TasksList from '../TasksList';
import axios from 'axios'

class Tasks extends Component{
	constructor(props){
		super(props);
    	this.state = {
    		tasksArray: "",
		    userData: "",
		    newItem: "Default Task Name",
		    filterState: "all"
    };
  }
  handleFilter() {
  }

  renderList(){
  	return(
  		_.map(this.state.tasksArray,(allTasks, index) =>
  		<TaskList key={index} tasks={allTasks} delete={this.handleDelButton.bind(this)} save={this.save.bind(this)}
  		finishedTask={this.finishedTask.bind(this)}/>
  		))
  }
  save(oldTask, newTask){
  	var editedTask;
  	var taskId;

  	_.find(this.state.tasksArray, tasks => {
  		if(tasks._id === oldTask){
  			todoId=tasks._id;
  			editedTask={
  				name: newTask
  			}
  		}
  	});
  	var  newTask ={
  		data: editedTask
  	}
  	axios.put('/api/${taskId}',newTask).then(res=>{
  		this.setState({
  			tasksArray:res.data
  		})
  	})

  }
  finishedTask(taskId){
  	var taskId;
  	var taskStatus;
  	 _.find(this.state.tasksArray, todo => {
      if(todo._id === taskId) {
        //console.log(todo._id, taskId)
        //console.log(todo.isCompleted)
        taskId = todo._id;
        taskStatus = {
          isDone: !todo.isDone
  }
  }
	});

	var isDone={
		data:taskStatus
	}
	 axios.put(`/api/${taskId}`, isDone).then(res => {
      this.setState({
        tasksArray: res.data
      })
    })
  }
  taskChange(e){
  	if(e.target.value === ""){
  		this.setState({
  			newItem: "Default"
  		})
  	}
  	else{
  		this.setState({
  			newItem:e.target.value
  		})
  	}
  }
  addTask(e){
  	var saveData ={
  		name:this.state.newItem
  	}
  	axios.post('/api/$/this.state.userData._id/task', saveData)
  		.then(res => {
  			console.log(res.data);
  			this.setState({
  				tasksArray:res.data,
  				newItem: "Default Task Name"
  			})
  		})
  	 this.refs.taskField.value="";
  }
handleDelButton(taskToDelId) {
	var taskToDel;
	 console.log(this.props)

    _.find(this.state.tasksArray, tasks => {
      if(tasks._id === taskToDelId) {

        taskToDel = tasks._id;
}
});

	 axios.delete(`/api/${taskToDel}`).then(res => {
      console.log(res);
      this.setState({
        tasksArray: res.data
      })
    })
  }
   handleDeleteAll() {
    axios.delete(`/api/${this.state.userData._id}/deleteAll`).then(res => {
      this.setState({
        taksArray: res.data
      })
    })
  }
  compAboutToMount(){

  	axios.all([
  		axios.get('/api/user'),
  		axios.get(`/api/task/${this.state.filterState}`)
  	]).then(axios.spread((user, task) =>{
  		this.setState({
  			userData:user.data,
  			tasksArray: todo.data
  		});
  	}))
  }

  test() {
    console.log(this.state);
  }
  getTasks(){
  	axios.get('/api/task/all').then(res => {
  		this.setState({
  			tasksArray:res.data
  		})
  	})
  	this.setState({
  		filterState: "all"
  	})
  }
  getUndoneTask(){
  	axios.get('/api/task/undone').then(res => {
  		this.setState({
  			tasksArray:res.data
  		})
  	})
  	this.setState({
  		filterState:"undone"
  	})
  }

  getFinishedTask(){
  	axios.get('/api/task/finished').then(res =>{
  		this.setState({
  			tasksArray:res.data
  		})
  	})
  	this.setState({
  		filterState:"finished"
  	})

  }

   render() {
   	return (
    <div>
      <div className="container center">
      	{this.renderTotalTask()}
      	 <div className= "container center">
          {this.renderControls()}
        </div>
      </div>
      <br />
      <div className= "container center">
        <div className="row">
          <div className="col s4 m4 l4">
          <a className= "btn-flat center blue white-text center" href="#" onClick={this.getTasks.bind(this)}>
          All
          </a>
          </div>
          <div className="col s4 m4 l4">
            <a className="btn-flat center green white-text center" href="#" onClick={this.getUndoneTask.bind(this)}>
            Open</a>
          </div>
          <div className="col s4 m4 l4">
            <a className="btn-flat center grey darken-3 white-text center" href="#" onClick={this.getFinishedTask.bind(this)}>
            Completed</a>
          </div>
        </div>
      </div>
          <div id="modal1" className="modal">
              <div className="modal-content">
                <h3 className="center">Add New Todo Item</h3>
                <input type='text' placeholder='Add Task Here' name="todoField" ref="taskField" onChange={this.taskChange.bind(this)} />
              </div>
              <div className="container center">
                <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat blue white-text center" 
                onClick={this.addTask.bind(this)}>Add</a>
                <br />
              </div>
          </div>

          {this.renderConfirmDeletion()}

          <div className="row">
          	{this.renderList()}
          </div>
          </div>
    )
   }
   renderConfirmDeletion() {
   		return(
      <div id="modal2" className="modal">
        <div className="modal-content">
            <h5 className="center">Are you sure you want to delete all of your tasks?</h5>
        </div>
        <div className="container center">
          <a href="#!" className="btn-flat red white-text center" onClick={this.handleDeleteAll.bind(this)}>Delete</a>
          <br />
        </div>
        </div>
   )
   }
   renderControls(){
   	if(this.state.tasksArray.length !=0){
   		return(
   			 <div className="row">
   			  <div className="col s6 m6 l6">
   			  	<a className="btn-flat center black white-text center" href="#modal1">Add Todo Item</a>
          </div>
          <div className="col s6 m6 l6">
            <a className="btn-flat center red white-text center" href="#modal2">Delete All</a>
           </div>
        </div>
      )
    }
    return (<a className="btn-flat center black white-text center" href="#modal1">Add Todo Item</a>)
  }
  renderTotalTask(){
  	if(this.state.filterState === "all"){
  		if(this.state.tasksArray.length <= 1){
  			return(<h2 className ="center white-text">You have{this.state.tasksArray.length} Tasks </h2>
  			 )
  		}
  			return(<h2 className ="center white-text">You have{this.state.tasksArray.length} Tasks </h2>
  			 )
  	}
  	if(this.state.filterState === "undone"){
  		if(this.state.tasksArray.length <=1){
  			return (<h2 className="center white-text">You have {this.state.tasksArray.length} Open Task</h2>)
      }
      		return (<h2 className="center white-text">You have {this.state.tasksArray.length} Open Tasks</h2>)
  		}
   if (this.state.filterState === "finished") {
      if (this.state.tasksArray.length <= 1) {
        return (<h2 className="center white-text">You have {this.state.tasksArray.length} Completed Task</h2>)
      }
      return (<h2 className="center white-text">You have {this.state.tasksArray.length} Completed Tasks</h2>)
    }
  }
}

export default (Tasks);