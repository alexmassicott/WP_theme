import React, { Component } from "react";
const PropTypes = require("prop-types");

export default class Background extends Component {
  color = false;
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  componentWillMount() {
    const { partner, parent } = this.context.router.route.match.params;
    switch (parent.toLowerCase()) {
      case "brand":
        this.color = "#bfeb3d";
        break;
      case "tech":
        this.color = "#ff27b2";
        break;

      case "insights":
        this.color = "#b17bb9";
        break;

      case "publisher":
        this.color = "#ff344c";
        break;

      case "platform":
        this.color = "#b17bb9";
        break;

      case "entertainment":
        this.color = "#00e7f6";
        break;

      case "events":
        this.color = "#5ec1ba";
        break;
    }
  }
  render() {
    return <div {...this.props}>{this.props.children}</div>;
  }
}
