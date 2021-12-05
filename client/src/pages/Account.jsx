import React, {Component} from "react";
import apis from "../api/api";

class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            dob: "",
            phone: "",
            username: "",
            password: ""
        }
    }

    componentDidMount = async () => {

        await apis.getUserById(sessionStorage.getItem("id")).then(res => {
            this.setState({
                name: res.data.data.name,
                dob: res.data.data.dob,
                phone: res.data.data.phone,
                username: res.data.data.username,
                password: res.data.data.password
            });
        })
    }

    logout = () => {
        this.setState({
            name: "",
            dob: "",
            phone: "",
            username: "",
            password: ""
        });
        sessionStorage.setItem("logged-in", null);
        sessionStorage.setItem("id", null);
        sessionStorage.setItem("username", "anonymous");
    }

    deleteAccount = async () => {
        await apis.deleteUserById(sessionStorage.getItem("id")).then(res => {
            this.setState({
                name: "",
                dob: "",
                phone: "",
                username: "",
                password: ""
            });
            sessionStorage.setItem("logged-in", null);
            sessionStorage.setItem("id", null);
            sessionStorage.setItem("username", null);
        });
    }

    updateUser = () => {
        window.location.href = `/updateUser`;
    }

    render() {
        const {name, dob, phone, username, password} = this.state;
        return (
            <div>
                <h1>
                    View Account Page
                </h1>
                <br/>
                <div>
                    <p>Name: {name}</p>
                    <p>Date of Birth: {dob}</p>
                    <p>Phone: {phone}</p>
                    <p>Username: {username}</p>
                    <p>Password: {password}</p>
                </div>
                <br/>
                <button type="submit" onClick={this.logout}>Logout</button>
                <button type="submit" onClick={this.deleteAccount}>Delete Account</button>
                <button type="submit" onClick={this.updateUser}>Edit Details</button>
            </div>
        );
    }


}

export default Account;