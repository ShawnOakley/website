// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---src-pages-index-js": () => import("/Users/shawn.oakley/gatsby-intro/src/pages/index.js" /* webpackChunkName: "component---src-pages-index-js" */),
  "component---src-pages-projects-js": () => import("/Users/shawn.oakley/gatsby-intro/src/pages/projects.js" /* webpackChunkName: "component---src-pages-projects-js" */),
  "component---src-pages-writings-js": () => import("/Users/shawn.oakley/gatsby-intro/src/pages/writings.js" /* webpackChunkName: "component---src-pages-writings-js" */)
}

