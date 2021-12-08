import React, {Component} from "react";
import apis from "../api/api";
import {Link} from "react-router-dom";

const bcrypt = require('bcryptjs');

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

    // Will trigger everytime the user changes the name value
    handleChangeName = async event => {
        const name = event.target.value;
        this.setState({name});
    }
    // Will trigger everytime the user changes the dob value
    handleChangeDob = async event => {
        const dob = event.target.value;
        this.setState({dob});
    }
    // Will trigger everytime the user changes the phone value
    handleChangePhone = async event => {
        const phone = event.target.value;
        this.setState({phone});
    }
    // Will trigger everytime the user changes the username value
    handleChangeUsername = async event => {
        const username = event.target.value;
        this.setState({username});
    }
    // Will trigger everytime the user changes the password value
    handleChangePassword = async event => {
        const password = event.target.value;
        this.setState({password});
    }

    /*
        Will hash the value of the password
        Sends what the user entered as well as the hashed password to the backend
        Receives either success is true or false
        If it is a Success then it redirects the user to the login page to Login
        Otherwise it outputs that it failed to add user
     */
    handleCreateUser = async () => {
        const { name, dob, phone, username, password} = this.state;

        bcrypt.hash(password, 5, async (error, password) => {
            const payload = {name, dob, phone, username, password};

            await apis.insertUser(payload).then(res => {
                if (res.data.success === false) {
                    window.alert(`Failed to add user:\n${res.data.message}`);
                } else {
                    window.alert(`User added successfully`);
                    this.setState({
                            name: "",
                            dob: "",
                            phone: "",
                            username: "",
                            password: ""
                        }
                    );
                    window.location.href = '/login';
                }
            });
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
                <input type="date" placeholder="dob" onChange={this.handleChangeDob}/>
                <br/>
                <label>Phone Number: </label>
                <input type="tel" placeholder="phone" onChange={this.handleChangePhone}/>
                <br/>
                <label>Username: </label>
                <input type="text" placeholder="username" onChange={this.handleChangeUsername}/>
                <br/>
                <label>Password: </label>
                <input type="password" placeholder="password" onChange={this.handleChangePassword}/>
                <br/>
                <button onClick={this.handleCreateUser}>Register</button>
                <br/>
                <br/>
                <Link to="/login">Sign In</Link>
            </div>
        );
    }
}

export default register;