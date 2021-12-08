import React, {Component} from "react";
import apis from "../api/api";

class createPost extends Component{
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: "",
        }
    }
    // will trigger everytime the input box for the title is changed, i.e. when the user enters the title
    handleChangeTitle = async event => {
        const title = event.target.value;
        this.setState({title});
    }

    // will trigger everytime the input box for the content is changed, i.e. when the user enters the content of the post
    handleChangeContent = async event => {
        const content = event.target.value;
        this.setState({content});
    }

    /*
        Will Create the Post to be sent to the backend
        It determines whether the author is logged-in so that it can use the username as the author
        Gets the current date and time
        Sends the payload to insertPost and then redirects user to the home page
     */
    handleCreatePost = async () => {
        const {title, content} = this.state;

        let author = sessionStorage.getItem("username");
        if (author===null){
            author = "anonymous";
        }

        //example: time,date-> 25/11/2021 at 11:23
        const date = new Date();
        const datePosted = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear() + " at " +
            date.getHours() + ":" + date.getMinutes();

        const payload = {title, content, author, datePosted};

        await apis.insertPost(payload).then(res => {
            window.alert("Successfully created a Post");
            this.setState( {
                title: "",
                content:""
            });
            window.location.href = "/";
        }).catch(error => {
            console.log(error);
        })

    }

    render() {
        return (
            <div>
                <h1>Create A Post</h1>
                <br/>
                <br/>
                <label>Title: </label>
                <input type="text" placeholder="Title" onChange={this.handleChangeTitle}/>
                <br/>
                <label >Content: </label>
                <br/>
                <textarea name="content" id="content" cols="30" rows="10"
                          placeholder="Content" onChange={this.handleChangeContent}/>
                <br/>
                <button onClick={this.handleCreatePost} type="submit">Post</button>
            </div>
        );
    }
}

export default createPost;