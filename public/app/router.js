define([
  // Application.
  "app",

  // Modules.
  "modules/endpoint"
],

function(app, Endpoint) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index",
      "endpoint/:city": "endpoint"
    },

    index: function() {
      // Use the main layout.
      app.useLayout("main").render();
    },

    endpoint: function(city) {
      // Use the main layout.
      app.useLayout("main");

      // Set the endpoint.
      this.endpoints.city = city;

      // Fetch the data.
      this.endpoints.fetch();
    },

    go: function() {
      return this.navigate(_.toArray(arguments).join("/"), true);
    },

    initialize: function() {
      // Set up the users.
      this.endpoints = new Endpoint.Collection();

      // Use main layout and set Views.
      app.useLayout("main");
      
      app.layout.setViews({
        ".endpoints": new Endpoint.Views.List({
          collection: this.endpoints
        }),
      });
    }

  });

  return Router;

});
