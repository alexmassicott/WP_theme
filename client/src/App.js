import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import AsyncChunks from "./components/utilities/AsyncLoader";
import NotFound from "./components/templates/NotFound";
import LoadTemplate from "./components/templates/LoadTemplate";
import api from "./api";
import Sidebar from "./components/layout/Sidebar";
import SearchField from "./components/common/Search";

import "./App.css";

const mapStateToProps = state => ({
  pageList: state.api.lists.pages
});

const mapDispatchToProps = dispatch => ({
  loadPages: list => dispatch({ type: "LOAD_PAGES_LIST", payload: list })
});

class App extends Component {
  constructor(props) {
    super(props);

    this.buildRoutes = pages => {
      if (this.props.pageList && this.props.pageList.length > 0) {
        return [
          <Route
            key="posts"
            render={props => (
              <LoadTemplate {...props} template="post" type="post" />
            )}
            exact
            path="/post/:slug"
          />,
          <Route
            key="partner"
            render={props => (
              <LoadTemplate {...props} template="partner" type="pages" />
            )}
            exact
            path="/categories/:parent/:slug"
          />,
          <Route
            key="category"
            render={props => (
              <LoadTemplate {...props} template="category" type="pages" />
            )}
            exact
            path="/categories/:slug"
          />,
          pages.map((route, i) => {
            // If home, set path to empty string, = '/'
            if (route.slug === "home") {
              route.path = "";
            }

            // If template is blank, set to default
            if (route.template === "") {
              route.template = "default";
            }

            // Default WP REST API expects /pages/ and /posts/ formatting
            // Custom post types are all singular (sigh)
            route.type =
              route.type === "page"
                ? "pages"
                : route.type === "post"
                  ? "posts"
                  : route.type;

            return (
              <Route
                render={props => (
                  <LoadTemplate
                    {...props}
                    template={route.template}
                    slug={route.slug}
                    type={route.type}
                  />
                )}
                exact
                key={i}
                path={`/${decodeURIComponent(route.path)}`}
              />
            );
          }),

          <Route key="not-found" component={NotFound} />
        ];
      }
    };
  }

  componentDidMount() {
    this.props.loadPages(api.Content.pageList());

    // Over-eager load code split chunks
    // Two seconds after App mounts (wait for more important resources)
    setTimeout(AsyncChunks.loadChunks, 2 * 1000);
  }

  render() {
    return (
      <div className={`App`}>
        <Container fluid>
          <Row className=" h-100">
            <Sidebar className="nopads" />
            <Col md={12} sm={12} className="main-page nopads">
              <SearchField />

              <Switch>{this.buildRoutes(this.props.pageList)}</Switch>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
