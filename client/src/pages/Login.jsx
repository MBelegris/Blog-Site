import React, {Component} from "react";
import apis from "../api/api";

class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        }
    }

    handleChangeUsername = async event => {
        const username = event.target.value;
        this.setState({username});
    }

    handleChangePassword = async event => {
        const password = event.target.value;
        this.setState({password});
    }

    handleCheckUser = async () => {
        let {username, password} = this.state;

        await apis.getUser(username, password)
            .then(res => {
                //(res.data.data.{id, username, pwd})
                console.log(`Logged-in: ${sessionStorage.getItem("logged-in")}`);

                sessionStorage.setItem("logged-in", "True");
                sessionStorage.setItem("id", res.data.data._id);
                sessionStorage.setItem("name", res.data.data.name);

                console.log(`Id: ${sessionStorage.getItem("id")}`);
                console.log(`Name: ${sessionStorage.getItem("name")}`);
                console.log(`Logged-in: ${sessionStorage.getItem("logged-in")}`);

                window.alert("Successfully logged in");

        }).catch(err => {
            console.log(`${err}`);
        });
    }

    render() {
        return(
            <div>
                <h1>Login Page!</h1>
                <br/>
                <div>
                    <label>Username: </label>
                    <input type="text" placeholder="username"
                           onChange={this.handleChangeUsername}/>
                </div>
                <div>
                    <label>Password: </label>
                    <input type="text" placeholder="pwd" onChange={this.handleChangePassword}/>
                </div>
                <button type="submit" onClick={this.handleCheckUser}>Register</button>
            </div>
        );
    }
}

export default Login;