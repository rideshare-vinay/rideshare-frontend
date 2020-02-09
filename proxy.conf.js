// const PROXY_CONFIG = [
  const PROXY_CONFIG = {

      // context: [
      //   "/directions/",
      //   "/"
      // ],
      "/api/*" : {
      // target: "https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=AIzaSyAU91hztcHhrPulSynF3hAk8fXJrZ0Z6Js",
      target: "https://maps.googleapis.com/maps/api/directions/*",
      router : function( req ) {
        let target = "https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=AIzaSyAU91hztcHhrPulSynF3hAk8fXJrZ0Z6Js"

        console.log( Object.getOwnPropertyNames( req ) );
        

        return target;
      },
      secure: false,
      "pathRewrite": {
        "^/api": ""
      },
      "changeOrigin": true,
      "logLevel": "debug"
  }
}
// ]

module.exports = PROXY_CONFIG;