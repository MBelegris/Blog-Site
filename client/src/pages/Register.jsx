import React, {Component} from "react";
import apis from "../api/api";
import {Link} from "react-router-dom";
//import styled from "styled-components";

class register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            dob: "",
            phone: "",
            username: "",
            password: "",
        }
    }

    handleChangeName = async event => {
        const name = event.target.value;
        this.setState({name});
    }
    handleChangeDob = async event => {
        const dob = event.target.value;
        this.setState({dob});
    }
    handleChangePhone = async event => {
        const phone = event.target.value;
        this.setState({phone});
    }
    handleChangeUsername = async event => {
        const username = event.target.value;
        this.setState({username});
    }
    handleChangePassword = async event => {
        const password = event.target.value;
        this.setState({password});
    }

    handleCreateUser = async () => {
        const { name, dob, phone, username, password} = this.state;
        const payload = { name, dob, phone, username, password};

        await apis.insertUser(payload).then( res => {
            window.alert(`User added successfully`);
            this.setState({
                name: "",
                dob: "",
                phone: "",
                username: "",
                password: ""
                }
            );
        });
    }

    render() {
        return(
            <div>
                <h1>Register Page!</h1>
                <br/>
                <label>Name: </label>
                <input type="text" placeholder="name" onChange={this.handleChangeName}/>
                <br/>
                <label>Date of Birth: </label>
                <input type="text" placeholder="dob" onChange={this.handleChangeDob}/>
                <br/>
                <label>Phone Number: </label>
                <input type="text" placeholder="phone" onChange={this.handleChangePhone}/>
                <br/>
                <label>Username: </label>
                <input type="text" placeholder="username" onChange={this.handleChangeUsername}/>
                <br/>
                <label>Password: </label>
                <input type="text" placeholder="pwd" onChange={this.handleChangePassword}/>
                <br/>
                <button onClick={this.handleCreateUser}>Register</button>
                <br/>
                <br/>
                <Link to="/login" className="btn btn-primary">Sign In</Link>
            </div>
        );
    }
}

export default register;