const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-pages-index-js": hot(preferDefault(require("/Users/shawn.oakley/gatsby-intro/src/pages/index.js"))),
  "component---src-pages-projects-js": hot(preferDefault(require("/Users/shawn.oakley/gatsby-intro/src/pages/projects.js"))),
  "component---src-pages-writings-js": hot(preferDefault(require("/Users/shawn.oakley/gatsby-intro/src/pages/writings.js")))
}

