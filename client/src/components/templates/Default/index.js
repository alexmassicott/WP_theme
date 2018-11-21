import React, { Component } from "react";

import ContentBlock from "../../utilities/ContentBlock";
import "./index.css";

class Default extends Component {
  render() {
    if (this.props.data) {
      let data = this.props.data;

      return (
        <div className="page-template">
          <article className={`${this.props.slug} content`}>
            <h1>{data.title.rendered}</h1>
            <ContentBlock content={data.content.rendered} />
          </article>
        </div>
      );
    }

    return null;
  }
}

export default Default;
