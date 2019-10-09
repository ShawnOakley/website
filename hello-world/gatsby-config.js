module.exports = {
  siteMetadata: {
    title: "Shawn Oakley",
    titleTemplate: "%s · Fullstack Developer and UX Designer",
    description:
      "Full Stack Developer with years of strong experience in both Front End and Back End Development and a passion for collaboration and mastering new technologies.",
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
  ],
}