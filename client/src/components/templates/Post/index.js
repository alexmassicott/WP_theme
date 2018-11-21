import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import _ from "lodash";

import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import "semantic-ui-css/components/button.css";

import ContentBlock from "../../utilities/ContentBlock";

import "./index.css";
const phimage_1x1 = require("../../../assets/placeholder_3x2.jpg");
const download_btn = require("../../../assets/download_btn3.png");

const mapStateToProps = state => ({
  partners: state.api.search.partners,
  tags: state.api.search.tags
});

const mapDispatchToProps = dispatch => ({
  clear: () => dispatch({ type: "CLEAR_POSTS_LIST" })
});

class Post extends Component {
  componentWillUnmount() {
    console.log("clear");
    this.props.clear();
  }
  componentDidMount() { }
  componentDidUpdate() { }
  render() {
    if (this.props.data) {
      let data = this.props.data;
      console.log(data);
      return (
        <div className="post-page">
          <div className="content">
            <hr />
            <article className={`${this.props.slug} post-template`}>
              <img
                className="hero"
                src={
                  data._embedded["wp:featuredmedia"]
                    ? data._embedded["wp:featuredmedia"][0].media_details.sizes
                      .full.source_url
                    : phimage_1x1
                }
              />

              <div className="text">
                <h1>{data.title.rendered}</h1>
                <span className="subtititle">
                  {data.categories.map(cat => (
                    <h4>
                      {this.props.partners.length
                        ? _.find(this.props.partners, { id: cat }).name
                        : cat}
                    </h4>
                  ))}
                </span>
                <br />
                <ContentBlock content={data.content.rendered} />
                <br />
                <h3>Keywords</h3>
                <span>
                  {data.tags.length
                    ? data.tags.map(tag => (
                      <Button>
                        {_.find(this.props.tags, { id: tag }).name}
                      </Button>
                    ))
                    : "no keywords"}
                </span>
              </div>
              <br />

              <a href={data.download_link} target="_blank" className="download">
                <img src={download_btn} />
              </a>
            </article>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Post)
);
