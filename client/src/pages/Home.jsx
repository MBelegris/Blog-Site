import React, {Component} from "react";

//import styled from "styled-components";

class home extends Component {
    render() {
        return(
            <div style={{
                display: 'flex',
                justifyContent: 'Left',
                alignItems: 'Right',
                height: '100vh'
            }}>
                <h1>
                    Home Page!
                </h1>
            </div>
        );
    }
}

export default home;