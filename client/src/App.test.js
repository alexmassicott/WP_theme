import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import { expect } from "chai";
import sinon from "sinon";
import Adapter from "enzyme-adapter-react-16";
import configureStore from './store';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from "react-router-dom";
import { shape } from "prop-types";
import App from "./App";
import Main from "./components/common/main";
import Sidebar from "./components/layout/Sidebar";
import { RecentPosts } from "./components/common/recentsection";
Enzyme.configure({ adapter: new Adapter() });

const shallowWithRouter = node => shallow(<Router>{node}</Router>);
const store = configureStore(window.PAGE_STATE || {});

const testdata = [
  {
    id: 5,
    date: "2018-10-26T02:23:45",
    date_gmt: "2018-10-26T02:23:45",
    guid: { rendered: "http://localhost:8000/?p=5" },
    modified: "2018-10-26T02:23:45",
    modified_gmt: "2018-10-26T02:23:45",
    slug: "you-suck",
    status: "publish",
    type: "post",
    link: "http://localhost:8000/archives/5",
    title: { rendered: "you suck" },
    content: { rendered: "<p>word?</p>\n", protected: false },
    excerpt: { rendered: "<p>word?</p>\n", protected: false },
    author: 1,
    featured_media: 0,
    comment_status: "open",
    ping_status: "open",
    sticky: false,
    template: "",
    format: "standard",
    meta: [],
    categories: [1],
    tags: [],
    _links: {
      self: [{ href: "http://localhost:8000/wp-json/wp/v2/posts/5" }],
      collection: [{ href: "http://localhost:8000/wp-json/wp/v2/posts" }],
      about: [{ href: "http://localhost:8000/wp-json/wp/v2/types/post" }],
      author: [
        {
          embeddable: true,
          href: "http://localhost:8000/wp-json/wp/v2/users/1"
        }
      ],
      replies: [
        {
          embeddable: true,
          href: "http://localhost:8000/wp-json/wp/v2/comments?post=5"
        }
      ],
      "version-history": [
        {
          count: 1,
          href: "http://localhost:8000/wp-json/wp/v2/posts/5/revisions"
        }
      ],
      "predecessor-version": [
        {
          id: 6,
          href: "http://localhost:8000/wp-json/wp/v2/posts/5/revisions/6"
        }
      ],
      "wp:attachment": [
        { href: "http://localhost:8000/wp-json/wp/v2/media?parent=5" }
      ],
      "wp:term": [
        {
          taxonomy: "category",
          embeddable: true,
          href: "http://localhost:8000/wp-json/wp/v2/categories?post=5"
        },
        {
          taxonomy: "post_tag",
          embeddable: true,
          href: "http://localhost:8000/wp-json/wp/v2/tags?post=5"
        }
      ],
      curies: [{ name: "wp", href: "https://api.w.org/{rel}", templated: true }]
    }
  },
  {
    id: 1,
    date: "2018-10-26T02:23:14",
    date_gmt: "2018-10-26T02:23:14",
    guid: { rendered: "http://localhost:8000/?p=1" },
    modified: "2018-10-26T02:23:14",
    modified_gmt: "2018-10-26T02:23:14",
    slug: "hello-world",
    status: "publish",
    type: "post",
    link: "http://localhost:8000/archives/1",
    title: { rendered: "Hello world!" },
    content: {
      rendered:
        "<p>Welcome to WordPress. This is your first post. Edit or delete it, then start writing!</p>\n",
      protected: false
    },
    excerpt: {
      rendered:
        "<p>Welcome to WordPress. This is your first post. Edit or delete it, then start writing!</p>\n",
      protected: false
    },
    author: 1,
    featured_media: 0,
    comment_status: "open",
    ping_status: "open",
    sticky: false,
    template: "",
    format: "standard",
    meta: [],
    categories: [1],
    tags: [],
    _links: {
      self: [{ href: "http://localhost:8000/wp-json/wp/v2/posts/1" }],
      collection: [{ href: "http://localhost:8000/wp-json/wp/v2/posts" }],
      about: [{ href: "http://localhost:8000/wp-json/wp/v2/types/post" }],
      author: [
        {
          embeddable: true,
          href: "http://localhost:8000/wp-json/wp/v2/users/1"
        }
      ],
      replies: [
        {
          embeddable: true,
          href: "http://localhost:8000/wp-json/wp/v2/comments?post=1"
        }
      ],
      "version-history": [
        {
          count: 0,
          href: "http://localhost:8000/wp-json/wp/v2/posts/1/revisions"
        }
      ],
      "wp:attachment": [
        { href: "http://localhost:8000/wp-json/wp/v2/media?parent=1" }
      ],
      "wp:term": [
        {
          taxonomy: "category",
          embeddable: true,
          href: "http://localhost:8000/wp-json/wp/v2/categories?post=1"
        },
        {
          taxonomy: "post_tag",
          embeddable: true,
          href: "http://localhost:8000/wp-json/wp/v2/tags?post=1"
        }
      ],
      curies: [{ name: "wp", href: "https://api.w.org/{rel}", templated: true }]
    }
  }
];

describe("<App />", () => {
  const wrapper = mount(<Provider store={store}>
    <Router><App /></Router></Provider>);

  it("renders without crashing", () => {
    expect(wrapper.containsMatchingElement(Sidebar)).to.equal(true);
    expect(wrapper.containsMatchingElement(RecentPosts)).to.equal(true);
  });
});

describe("<Main />", () => {
  const wrapper = mount(<Main />);

  it("loads wp api", async done => {
    setTimeout(() => {
      expect(wrapper.state("posts")).to.lengthOf.at.least(1);
      done();
    }, 2000);
  });
});

describe("<RecentPosts />", () => {
  it("renders an `img`", () => {
    const wrapper = shallow(<RecentPosts data={[]} />);
    expect(wrapper.find("img")).to.have.lengthOf(1);
  });


});
