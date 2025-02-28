import React, { Component } from "react";
import Nav from "./Nav";
import Comment from "./Comment";
import { getComments } from "./getdata";
import Counting from "./buttonClick";
import Clock from "./clock";
import Form from "./form";
import UnsplashSearch from "./unsplash";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: getComments(5),
    };
  }

  render() {
    return (
      <>
        <Nav />
        <UnsplashSearch />
        {/* <br></br> */}
        {/* <Form />
        <Clock /> */}

        {/* <Counting /> */}
        {/* <input type="number" min={5} style={{ border: "3px solid" }} /> */}
        {/* <h2>{new Date().toString()}</h2> */}
        {/* <div className="ui comments">
          <h3 className="ui dividing header">Comments</h3>
          {this.state.comments.map((comment, index) => (
            <Comment key={index} {...comment} />
          ))}
        </div> */}
      </>
    );
  }
}

export default App;
