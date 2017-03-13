import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {text:'',list:[],filterStatus:0}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.isDone = this.isDone.bind(this)
    this.onFilterCheck = this.onFilterCheck.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }

  handleChange(e){
    this.setState({text:e.target.value})
  }

  handleSubmit(e){
    e.preventDefault()
    let list = this.state.list.slice()
    list.push({desc:this.state.text,done:0})
    this.setState({
      list: list,
      text: ''
    })
  }

  isDone(index){
    var data = this.state.list
    var taskStatus = data[index].done
		let newData = data.slice(0, index).concat([{...data[index], done:!taskStatus}]).concat(data.slice(index+1))
    this.setState({list:newData})
  }

  onFilterCheck(e){
    console.log(e.target.checked)
    this.setState({
      filterStatus: e.target.checked
    })
  }

  onDelete(index){
    var data = this.state.list
		let newData = data.slice(0,index).concat(data.slice(index+1))
    this.setState({list:newData})
  }

  render() {
    return (
      <div>
        <h1>The n^n-th Todo List</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} value={this.state.text} />
          <button type="submit">ADD</button>
          <FilterDone onFilter={this.onFilterCheck} filterStatus={this.state.filterStatus}/>
        </form>
        <Lister list={this.state.list} isDone={this.isDone} filterStatus={this.state.filterStatus} deleter={this.onDelete}/>
      </div>
    );
  }
}

function FilterDone(props){
  return(
    <div className="filter">
      <input type="checkbox" name="filterStatus" onChange={props.onFilter} checked={props.filterStatus}/><label>Hide done</label>
    </div>
  )
}

function Lister(props){
  var listings = props.list.map((v,i)=>{
      const list_item = <li className={v.done?"done":""} key={i}>
                          <div onClick={props.isDone.bind(this,i)}>{v.desc}</div>
                          <span className="del_btn" onClick={props.deleter.bind(this,i)}>-</span>
                        </li>
      return (
          (props.filterStatus && v.done)?'':list_item
        )
    })
    return(
      <ul className="tasks">{listings}</ul>
    )
}

export default App;
