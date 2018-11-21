import React, { Component } from "react";
import { Button, Icon, Search } from "semantic-ui-react";
import _ from "lodash";
import api from "../../../api";
import "semantic-ui-css/components/search.css";
import "semantic-ui-css/components/icon.css";
import "semantic-ui-css/components/input.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./index.css";

const mapStateToProps = state => ({
  partners: state.api.search.partners,
  posts: state.api.search.posts,
  tags: state.api.search.tags
});

const mapDispatchToProps = dispatch => ({
  load_search_tags: data =>
    dispatch({ type: "LOAD_SEARCH_TAGS", payload: data }),
  load_search_posts: data =>
    dispatch({ type: "LOAD_SEARCH_POSTS", payload: data }),
  load_search_partners: data =>
    dispatch({ type: "LOAD_SEARCH_PARTNERS", payload: data })
});

class SearchField extends Component {
  componentWillMount() {
    this.resetComponent();
    api.Content.data("posts").then(
      res => {
        this.props.load_search_posts(res);
      },
      error => {
        console.warn(error);
      }
    );
    api.Content.data("tags").then(
      res => {
        this.props.load_search_tags(res);
      },
      error => {
        console.warn(error);
      }
    );
  }
  state = {
    isLoading: false,
    value: "b"
  };
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: "" });

  handleResultSelect = (e, { result }) =>
    this.context.router.history.push("/" + result.type + "/" + result.slug);

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(result.title);
      const filteredResults = {
        posts: {
          name: "posts",
          results: _.filter(
            this.props.posts.map(post => ({
              type: "post",
              title: post.title.rendered,
              slug: post.slug,
              description: post.content.rendered,
              image: post._embedded["wp:featuredmedia"]
                ? post._embedded["wp:featuredmedia"][0].media_details.sizes
                  .thumbnail.source_url
                : ""
            })),
            isMatch
          )
        },
        driver: {
          name: "partners",
          results: _.filter(
            this.props.partners.map(partner => ({
              type: "categories",
              title: partner.name,
              slug: partner.slug,
              description: partner.count + " posts",
              image: partner.media_details.thumbnail
            })),
            isMatch
          )
        },
        tags: {
          name: "keywords",
          results: _.filter(
            this.props.tags.map(tag => ({
              type: "search",
              title: tag.name,
              slug: tag.slug,
              description: tag.count + " posts",
              image: ""
            })),
            isMatch
          )
        }
      };

      this.setState({
        isLoading: false,
        results: filteredResults
      });
    }, 300);
  };
  render() {
    const { isLoading, value, results } = this.state;
    console.log(this.props);
    return (
      <Search
        category
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, {
          leading: true
        })}
        icon={<Button icon><Icon name="search" className="search-icon" /></Button>}
        results={results}
        value={value}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchField);
