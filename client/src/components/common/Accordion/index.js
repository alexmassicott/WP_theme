import React, { Component } from "react";
import { Collapse, Row } from "reactstrap";
import { Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

export default class Accordion extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
      <div className="accordion">
        <h3
          onClick={() =>
            this.context.router.history.push("/categories/" + this.props.label)
          }
          style={{ color: this.props.color }}
        >
          {this.props.label + " partners"}
        </h3>

        <Collapse isOpen={this.state.collapse}>
          <Row
            className="align-items-center"
            style={{
              justifyContent: "center"
            }}
          >
            {this.props.children}
          </Row>
        </Collapse>
        <div
          className="carrot"
          onClick={this.toggle}
          style={{ color: this.props.color, borderColor: this.props.color }}
        >
          <Icon
            name={
              this.state.collapse ? "chevron circle up" : "chevron circle down"
            }
          />
        </div>
      </div>
    );
  }
}
