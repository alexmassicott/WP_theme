import React, { Component } from "react";
import _superagent from "superagent";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import api from "../../api";
import Accordion from "./Accordion/";

const mapStateToProps = state => ({
  partners: state.api.search.partners
});

const mapDispatchToProps = dispatch => ({
  loadPartners: list => dispatch({ type: "LOAD_PARTNERS", payload: list })
});

const getColor = parent => {
  let color;
  switch (parent.toLowerCase()) {
    case "brand":
      color = "#bfeb3d";
      break;
    case "tech":
      color = "#ff27b2";
      break;

    case "insight":
      color = "#FFEB00";
      break;

    case "publisher":
      color = "#ff344c";
      break;

    case "platform":
      color = "#b17bb9";
      break;

    case "entertainment":
      color = "#00e7f6";
      break;

    case "events":
      color = "#5ec1ba";
      break;
  }

  return color;
};

class Bucket extends Component {
  render() {
    return <div className="bucket"> Bucket</div>;
  }
}

export class Partners extends Component {
  state = {
    categories: []
  };
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  componentDidMount() {
    this.props.loadPartners(api.Content.partners());
  }
  render() {
    if (this.props.partners.length > 1) {
      return (
        <div className="partner-section">
          <Container style={{ maxWidth: 1030 }}>
            {this.props.partners
              .filter(category => category.parent == 0)
              .map(post => {
                const subcategories = this.props.partners.filter(
                  category => category.parent == post.id
                );
                return (
                  <div
                    className="partner-bucket"
                    key={post.id}
                    style={{
                      display: subcategories.length ? "block" : "none"
                    }}
                  >
                    <Accordion color={getColor(post.slug)} label={post.slug}>
                      {subcategories.map((subcategory, j) => {
                        if (j < 5)
                          return (
                            <Col
                              md={12}
                              className="partner-col"
                              style={{ clear: j % 5 == 0 ? "both" : "none" }}
                              key={subcategory.id}
                              onClick={() =>
                                this.context.router.history.push(
                                  "/categories/" +
                                    post.slug +
                                    "/" +
                                    subcategory.slug
                                )
                              }
                            >
                              <img
                                src={
                                  subcategory.media_details
                                    ? subcategory.media_details.medium
                                    : null
                                }
                              />
                              <div className="partner-name">
                                {subcategory.name}
                              </div>
                            </Col>
                          );
                        else if (j == 5)
                          return (
                            <Col md={12} key={post.id + "see"}>
                              <a
                                onClick={() =>
                                  this.context.router.history.push(
                                    "/categories/" + post.slug
                                  )
                                }
                                className="see_more link"
                              >
                                See More >
                              </a>
                            </Col>
                          );
                        else return false;
                      })}
                    </Accordion>
                  </div>
                );
              })}
          </Container>
        </div>
      );
    }
    return null;
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Partners)
);
