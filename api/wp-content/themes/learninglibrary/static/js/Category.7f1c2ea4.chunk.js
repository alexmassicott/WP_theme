webpackJsonp([4],{424:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function a(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var c=n(0),u=n.n(c),i=n(426),l=n(85),s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),f=n(1),p=function(e){function t(){var e,n,a,c;r(this,t);for(var u=arguments.length,i=Array(u),l=0;l<u;l++)i[l]=arguments[l];return n=a=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(i))),a.color="#fff",a.state={},c=n,o(a,c)}return a(t,e),s(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this,t=this.context.router.route.match.params,n=t.slug;t.id;return console.log(this.props.data),this.props.data?u.a.createElement("div",{className:"category_page"},u.a.createElement(i.a,null),u.a.createElement("div",{className:"content"},u.a.createElement("h2",null,n+" partners"),u.a.createElement(l.b,null,u.a.createElement(l.c,null,this.props.data.map(function(t){return u.a.createElement(l.a,{className:"partner",md:3,key:t.id,onClick:function(){return e.context.router.history.push("/categories/"+n+"/"+t.slug)}},u.a.createElement("h4",null,t.name),u.a.createElement("br",null),u.a.createElement("img",{src:t.media_details?t.media_details.medium:null,width:"100%"}))}))))):null}}]),t}(c.Component);p.contextTypes={router:f.object.isRequired},t.default=p},426:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function a(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var c=n(0),u=n.n(c),i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(1),s=function(e){function t(){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),i(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this;return u.a.createElement("a",{className:"back-button",onClick:function(){return e.context.router.history.goBack()}},"< Back")}}]),t}(c.Component);s.contextTypes={router:l.object.isRequired},t.a=s}});
//# sourceMappingURL=Category.7f1c2ea4.chunk.js.map