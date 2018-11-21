import React, { Component } from "react";
import { Col } from "reactstrap";
import NavMenu from "../../common/NavMenu";
import PropTypes from "prop-types";
import "./index.css";

class Sidebar extends Component {
  state = {
    posts: []
  };
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  componentDidMount() { }

  render() {
    return (
      <Col sm={12} md={12} lg={3} className="sidebar">
        <div
          className="logo"
          onClick={() => this.context.router.history.push("/")}
        />
        <br />

        <NavMenu />
      </Col>
    );
  }
}

export default Sidebar;
