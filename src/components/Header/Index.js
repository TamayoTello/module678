import React, { Component } from 'react';
import axios from 'axios';

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userData: ""
    }
  }

  headerRendering() {
    if((this.state.userData.firstName === "") || (this.state.userData.lastName === "")) {
      return(
        <h2 className="center white-text">{this.state.userData.username}</h2>
      )
    }
    return (
      <h2 className="center white-text">{this.state.userData.firstName} {this.state.userData.lastName}</h2>
    )
  }
  render() {
    return (
        <section className="black">
        <br />
            {this.headerRendering()}
            <p className="center white-text">{this.state.userData.email}</p>
        <br />
            <div className="container center">
                <a className="btn-flat center red white-text center" href ="/auth/logout">
                <i className="fa">Logout</i></a>
            </div>
        <br />
        </section>
    );
  }
  compAboutToMount() {
    axios.get("/api/user").then(res => {
      this.setState({
        userData: res.data
      })
    })
  }
}

export default Header;