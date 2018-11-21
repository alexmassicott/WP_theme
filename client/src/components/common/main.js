import React, { Component } from "react";
import { RecentPosts } from "./recentsection";
import Partners from "./partners";
import _superagent from "superagent";
import { API_URL } from "../../constants/config";
import ContentBlock from "../utilities/ContentBlock";

class Main extends Component {
  state = {
    posts: []
  };
  componentDidMount() {
    var that = this;
    _superagent
      .get(API_URL + "/?rest_route=/wp/v2/posts&per_page=4&_embed")
      .then(function (response) {
        console.log(response.body);
        that.setState({ posts: response.body });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    if (this.props.data) {
      console.log(this.props);
      const data = this.props.data;
      return (
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column"
          }}
        >
          {/* <ContentBlock content={data.content.rendered} /> */}

          <RecentPosts data={this.state.posts} />
          <Partners />
        </div>
      );
    }
    return null;
  }
}

export default Main;
