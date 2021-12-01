import React, {Component} from "react";
import {Link} from "react-router-dom";

class home extends Component {

    render() {
        const loggedIn = sessionStorage.getItem("logged-in");

        if (loggedIn === null) {
            return(
                <div>
                    <h1>
                        Home Page!
                    </h1>
                    <div>
                        <Link to="/CreatePost">
                            <button type="button">
                                Create Post
                            </button>
                        </Link>
                    </div>
                </div>
            );
        }

        else {
            return(
                <div>
                    <h1>
                        Home Page!
                    </h1>
                    <h1>
                        Logged In!
                    </h1>
                    <div>
                        <Link to="/CreatePost">
                            <button type="button">
                                Create Post
                            </button>
                        </Link>
                    </div>
                </div>
            );
        }
    }
}

export default home;