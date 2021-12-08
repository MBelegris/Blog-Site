import React, {Component} from "react";
import apis from "../api/api";
const bcrypt = require('bcryptjs');

class UpdateUser extends Component {

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

    // Sets the values of the users values based on the id saved in session storage so that the user can modify them
    componentDidMount = async () => {
        const user = await apis.getUserById(sessionStorage.getItem("id"));

        this.setState({
            name: user.data.data.name,
            dob: user.data.data.dob,
            phone: user.data.data.phone,
            username: user.data.data.username,
            password: user.data.data.password,
        });
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
        Hashes the password so that it can be sent to the backend
        Alerts success once a response is found and redirects the user back to viewAccount
     */
    handleUpdateUser = async () => {
        const { name, dob, phone, username, password} = this.state;

        const id = sessionStorage.getItem("id");

        bcrypt.hash(password, 5, async (error, password) => {
            const payload = { name, dob, phone, username, password};

            await apis.updateUserById(id, payload).then(res => {
                window.alert(`Successfully updated details: ${name}`);
                this.setState({
                    name: "",
                    phone: "",
                    dob: "",
                    username: "",
                    password: ""
                });
            });
            window.location.href = `/viewAccount`;
        });
    }

    render() {

        const {name, dob, phone, username} = this.state;

        return (
            <div>
                <h1>Update User Page!</h1>
                <br/>
                <label>Name: </label>
                <input type="text" placeholder="name" value={name} onChange={this.handleChangeName}/>
                <br/>
                <label>Date of Birth: </label>
                <input type="text" placeholder="dob" value={dob} onChange={this.handleChangeDob}/>
                <br/>
                <label>Phone Number: </label>
                <input type="text" placeholder="phone" value={phone} onChange={this.handleChangePhone}/>
                <br/>
                <label>Username: </label>
                <input type="text" placeholder="username" value={username} onChange={this.handleChangeUsername}/>
                <br/>
                <label>Password: </label>
                <input type="text" placeholder="pwd" onChange={this.handleChangePassword}/>
                <br/>
                <button onClick={this.handleUpdateUser}>Update</button>
                <br/>
            </div>
        );
    }


}

export default UpdateUser;