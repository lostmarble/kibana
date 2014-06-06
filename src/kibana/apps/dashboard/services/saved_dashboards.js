define(function (require) {
  var module = require('modules').get('app/dashboard');

 // bring in the factory
  require('./_saved_dashboard');


  // Register this service with the saved object registry so it can be 
  // edited by the object editor.
  require('apps/settings/saved_object_registry').register({
    service: 'savedDashboards',
    title: 'Dashboards'
  });

  // This is the only thing that gets injected into controllers
  module.service('savedDashboards', function (SavedDashboard, config, es) {

    // Returns a single dashboard by ID, should be the name of the dashboard
    this.get = function (id) {

      // Returns a promise that contains a dashboard which is a subclass of docSource
      return (new SavedDashboard(id)).init();
    };

    this.urlFor = function (id) {
      return '#/dashboard/' + id;
    };

    this.find = function (searchString) {
      var self = this;
      var body = searchString ? {
          query: {
            simple_query_string: {
              query: searchString + '*',
              fields: ['title^3', 'description'],
              default_operator: 'AND'
            }
          }
        }: { query: {match_all: {}}};
      return es.search({
        index: config.file.kibanaIndex,
        type: 'dashboard',
        body: body
      })
      .then(function (resp) {
        return resp.hits.hits.map(function (hit) {
          var source = hit._source;
          source.id = hit._id;
          source.url = self.urlFor(hit._id);
          return source;
        });
      });
    };
  });
});