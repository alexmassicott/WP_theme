import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from "prop-types";
import "./index.css";

const mapStateToProps = state => ({
  pageList: state.api.lists.pages
});

const mapDispatchToProps = dispatch => ({
  loadPages: list => dispatch({ type: "LOAD_PAGES_LIST", payload: list })
});

class NavMenu extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  componentDidMount() { }
  render() {
    return (
      <Nav vertical className="navigation-menu">
        {this.props.pageList
          .filter(page => page.slug != "home")
          .map(page => (
            <NavItem key={page.slug}>
              <NavLink
                className="link"
                onClick={() => this.context.router.history.push("/" + page.slug)}>
                {page.slug}
              </NavLink>

            </NavItem>
          ))}
      </Nav>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NavMenu)
);
