import React, { Component } from "react";
import _superagent from "superagent";
import { Container, Row, Col } from "reactstrap";
import Background from "../../../components/common/background";
import { withRouter } from "react-router-dom";
import { Button } from "semantic-ui-react";
import _ from "lodash";

import { connect } from "react-redux";

const PropTypes = require("prop-types");
const download_btn1 = require("../../../assets/download_btn1.png");
const download_btn2 = require("../../../assets/download_btn2.png");
const ph_image = require("../../../assets/placeholder_3x2.jpg");

const mapStateToProps = state => ({
  tags: state.api.search.tags
});

const mapDispatchToProps = dispatch => ({
  clear: () => dispatch({ type: "CLEAR_POSTS_LIST" })
});

class PartnersPage extends Component {
  color = "#fff";
  state = {
    loaded: false,
    posts: []
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  componentDidMount() { }
  componentWillUnmount() {
    this.props.clear();
  }
  contentBlock = post => {
    return (
      <div className="text">
        <p>
          <h3>Description</h3>
          <span
            dangerouslySetInnerHTML={{
              __html:
                post.content.rendered.length > 0
                  ? post.content.rendered
                  : "no description"
            }}
          />
        </p>
        <p>
          {" "}
          <h3>Keywords</h3>
          <span>
            {post.tags.length > 0
              ? post.tags.map(tag => (
                <Button> {_.find(this.props.tags, { id: tag }).name}</Button>
              ))
              : "no keywords"}
          </span>
        </p>
      </div>
    );
  };
  render() {
    const { parent, slug } = this.context.router.route.match.params;
    console.log(this.props);
    if (this.props.data) {
      return (
        <Background className="partners_page">
          <div className="content">
            <div className="title_text">{slug}</div>
            {this.props.data.length
              ? this.props.data.map((post, i) => (
                <Container key={post.id} fluid>
                  {i % 2 == 0 ? (
                    <div className="bucket">
                      <Row>
                        <Col md={12}>
                          <h2>{post.title.rendered}</h2>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6} className="img_and_title">
                          <img
                            src={
                              post.better_featured_image
                                ? post.better_featured_image.media_details
                                  .sizes.medium_large.source_url
                                : ph_image
                            }
                          />
                        </Col>

                        <Col md={5} className="info_and_btn vertical-align">
                          {this.contentBlock(post)}
                        </Col>
                        <Col md={1} className="downloadbtn_holder">
                          <a href={post.download_link} target="_blank">
                            <img src={download_btn1} />
                          </a>
                        </Col>
                      </Row>
                      <Row />
                    </div>
                  ) : (
                      ""
                    )}

                  {i % 2 !== 0 ? (
                    <div className="bucket">
                      <Row>
                        <Col md={12} style={{ textAlign: "right" }}>
                          <h2>{post.title.rendered}</h2>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={1} className="downloadbtn_holder">
                          <a href={post.download_link} target="_blank">
                            <img src={download_btn2} />
                          </a>
                        </Col>
                        <Col md={5} className="info_and_btn vertical-align">
                          {this.contentBlock(post)}
                        </Col>

                        <Col
                          md={6}
                          className="img_and_title"
                          style={{ textAlign: "right" }}
                        >
                          <img
                            src={
                              post.better_featured_image
                                ? post.better_featured_image.source_url
                                : ph_image
                            }
                          />
                        </Col>
                      </Row>
                      <Row />
                    </div>
                  ) : (
                      ""
                    )}
                </Container>
              ))
              : "no posts"}
          </div>
        </Background>
      );
    }
    return null;
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PartnersPage)
);
