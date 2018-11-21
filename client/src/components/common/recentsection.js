import React, { Component } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from "reactstrap";
const PropTypes = require("prop-types");
const ru_header = require("../../assets/ru_header.svg");
const phimage_3x2 = require("../../assets/placeholder_3x2.jpg");

export class RecentPosts extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === this.props.data.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? this.props.data.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = this.props.data.map(post => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={post.id}
        >
          <div
            className="slide-holder"
            onClick={() =>
              this.context.router.history.push("/post/" + post.slug)
            }
          >
            <img
              src={
                post._embedded["wp:featuredmedia"]
                  ? post._embedded["wp:featuredmedia"][0].media_details.sizes
                      .medium_large.source_url
                  : phimage_3x2
              }
              width="100%"
            />
          </div>
        </CarouselItem>
      );
    });

    if (this.props.data) {
      return (
        <div className="recently-uploaded">
          <img
            src={ru_header}
            style={{
              marginTop: 80,
              marginBottom: 50,
              maxWidth: 800,
              minWidth: 400,
              width: "50%"
            }}
          />
          <div style={{ marginBottom: 60 }}>
            <Carousel
              activeIndex={activeIndex}
              next={this.next}
              previous={this.previous}
            >
              <CarouselIndicators
                items={this.props.data.map((post, i) => ({ ...post, key: i }))}
                activeIndex={activeIndex}
                onClickHandler={this.goToIndex}
              />
              {slides}
              <CarouselControl
                direction="prev"
                directionText="Previous"
                onClickHandler={this.previous}
              />
              <CarouselControl
                direction="next"
                directionText="Next"
                onClickHandler={this.next}
              />
            </Carousel>
          </div>
        </div>
      );
    }
    return null;
  }
}
