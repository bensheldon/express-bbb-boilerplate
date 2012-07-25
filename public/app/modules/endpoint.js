define([
  // Global application context.
  "app",

  // Third-party libraries.
  "backbone"
],

function(app, Backbone, Repo) {

  var Endpoint = app.module();

  Endpoint.Collection = Backbone.Collection.extend({
    url: function() {
      return "/endpoints";
    },

    cache: false,

    parse: function(obj) {
      //Safety check ensuring only valid data is used
      // if (obj.data.message !== "Not Found") {
      //   this.status = "valid";

      //   return obj.data;
      // }

      return obj;
    },

    initialize: function(models, options) {
      // if (options) {
      //   this.city = options.city;
      // }
      this.fetch();
    }
  });

  Endpoint.Views.Item = Backbone.View.extend({
    template: "endpoint/item",

    tagName: "li",

    serialize: function() {
      console.log(this.model);
      return { model: this.model };
    },

    // events: {
    //   click: "changeUser"
    // },

    // changeUser: function(ev) {
    //   var model = this.model;
    //   var org = app.router.endpoints.city;
    //   var name = model.get("login");

    //   app.router.go("org", org, "user", name);
    // },

    cleanup: function() {
      this.model.off(null, null, this);
    },

    initialize: function() {
      this.model.on("change", this.render, this);
    }
  });

  Endpoint.Views.List = Backbone.View.extend({
    template: "endpoint/list",

    serialize: function() {
      return { collection: this.collection };
    },

    render: function(manage) {
      this.collection.each(function(endpoint) {
        this.insertView("ul", new Endpoint.Views.Item({
          model: endpoint
        }));
      }, this);

      return manage(this).render().then(function(el) {
        // Only re-focus if invalid
        this.$("input.invalid").focus();
      });
    },

    initialize: function() {
      this.collection.on("reset", this.render, this);

      this.collection.on("fetch", function() {
        this.$("ul").parent().html("<img src='/assets/img/spinner-gray.gif'>");
      }, this);
    },

    // events: {
    //   "submit form": "updateOrg"
    // },

    // updateOrg: function(ev) {
    //   app.router.go("org", this.$(".org").val());

    //   return false;
    // }
  });

  return Endpoint;

});