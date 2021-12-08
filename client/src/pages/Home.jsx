import React, {Component} from "react";
import apis from "../api/api";
import {Link} from "react-router-dom";

class home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    // Will get all the posts from the database
    componentDidMount = async () => {
        await apis.getAllPosts().then(res => {
            this.setState({
                posts: res.data.data,
            });
        });
    }

    //Prints out to the page every post
    fillOutPost = () => {
        const {posts} = this.state;

        // Gets an element with the id of "posts" that will be able to pass in each of the posts
        let list = document.getElementById("posts");

        // title, content, author, datePosted
        posts.forEach((post) => {
            let li = document.createElement("li");
            let text = post.title + "\n" + post.content + "\n" + post.author + "\n" + post.datePosted + "\n\n";
            li.innerText = text;
            list.appendChild(li);
        });
    }

    render() {

        return(
            <div>
                <h1>
                    Hello User
                </h1>
                <br/>
                <div>
                    <Link to="/CreatePost">
                        <button type="button">
                            Create Post
                        </button>
                    </Link>
                </div>
                <br/>
                <ul id="posts">{this.fillOutPost()}</ul>
            </div>
        );
    }
}

export default home;