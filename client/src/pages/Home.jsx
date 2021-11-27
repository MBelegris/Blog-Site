import React, {Component} from "react";
import {Link} from "react-router-dom";

//import styled from "styled-components";

class home extends Component {
    render() {
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
}

export default home;