module.exports = {
  siteMetadata: {
    title: "Shawn Oakley",
    titleTemplate: "%s · Fullstack Web Developer and UX Designer",
    description:
      "New York based Full Stack Developer/UX designer with years of experience in both Front End and Back End engineering and a passion for spatial computing, digital storytelling, data visualization, and exploratory media.",
    url: "https://www.shawnoakley.com", // No trailing slash allowed!
    // image: "/images/snape.jpg", // Path to your image you placed in the 'static' folder
    // twitterUsername: "@occlumency",
  },  
  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-plugin-layout',
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // replace "UA-XXXXXXXXX-X" with your own Tracking ID
        trackingId: "UA-45266681-3",
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Shawn Oakley - NYC-based Fullstack Web Developer and UX Designer",
        short_name: "Shawn Oakley",
        start_url: "/",
        background_color: "#88FFFF",
        theme_color: "#88FFFF",
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: "standalone",
        // Not working
        // icon: "src/images/icon.png", // This path is relative to the root of the site.
        // An optional attribute which provides support for CORS check.
        // If you do not provide a crossOrigin option, it will skip CORS for manifest.
        // Any invalid keyword or empty string defaults to `anonymous`
        crossOrigin: `use-credentials`,
      },
    },    
    `gatsby-plugin-offline`    
  ],
}