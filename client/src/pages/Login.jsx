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
        Will send to the backend the values received from the user
        Checks if what was entered is valid and returns if it was a success or not
        If not it outputs that it was a failure
        Otherwise it adds the id and username to session storage as well as logged-in which is true
        It redirects the user to the viewAccount page
     */
    handleCheckUser = async () => {
        let {username, password} = this.state;

        await apis.getUser(username, password)
            .then(res => {
                if (res.data.success === false){
                    window.alert(`Failed to log in: ${res.data.error}`);
                }
                else{
                    sessionStorage.setItem("logged-in", "True");
                    sessionStorage.setItem("id", res.data.data._id);
                    sessionStorage.setItem("username", res.data.data.username);

                    window.alert("Successfully logged in "+sessionStorage.getItem("username"));
                    window.location.href = '/viewAccount';
                }
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
                    <input type="password" placeholder="pwd" onChange={this.handleChangePassword}/>
                </div>
                <button type="submit" onClick={this.handleCheckUser}>Login</button>
            </div>
        );
    }
}

export default Login;