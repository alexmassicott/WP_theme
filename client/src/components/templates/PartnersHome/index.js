import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./index.css";
const getColor = parent => {
  let color;
  switch (parent.toLowerCase()) {
    case "brand":
      color = "#bfeb3d";
      break;
    case "tech":
      color = "#ff27b2";
      break;

    case "insights":
      color = "#b17bb9";
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

  return { color: color };
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  clear: () => dispatch({ type: "CLEAR_SUBCAT_LIST" })
});

export class CategoryPage extends Component {
  color = "#fff";
  state = {};

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  componentDidMount() { }
  componentWillUnmount() {
    this.props.clear();
  }
  render() {
    const { slug, id } = this.context.router.route.match.params;
    console.log(this.props.data);
    if (this.props.data) {
      return (
        <div className="category_page">
          <div className="content">
            <h2 style={getColor(slug)}>{slug + " partners"}</h2>
            <Container>
              <Row>
                {this.props.data.map(partner => (
                  <Col
                    className="partner"
                    md={{ size: 2, offset: 1 }}
                    key={partner.id}
                    onClick={() =>
                      this.context.router.history.push(
                        "/categories/" + slug + "/" + partner.slug
                      )
                    }
                  >
                    <img
                      src={
                        partner.media_details
                          ? partner.media_details.medium
                          : null
                      }
                      width="100%"
                    />
                  </Col>
                ))}
              </Row>
            </Container>
          </div>
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
  )(CategoryPage)
);
