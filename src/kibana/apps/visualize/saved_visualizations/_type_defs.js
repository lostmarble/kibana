define(function (require) {
  var module = require('modules').get('app/visualize');
  var _ = require('lodash');

  var typeDefs = [
    {
      name: 'histogram',
      icon: 'icon-chart-bar',
      params: {
        shareYAxis: true,
        addTooltip: true,
        addLegend: true
      },
      listeners: {
        onClick: function (e) {
          // TODO: We need to be able to get ahold of angular services here
          console.log(e);
        }
      },
      config: {
        metric: {
          label: 'Y-Axis',
          min: 1,
          max: 1
        },
        segment: {
          label: 'X-Axis',
          min: 1,
          max: 1
        },
        group: {
          label: 'Color',
          min: 0,
          max: 1
        },
        split: {
          label: 'Rows & Columns',
          min: 0,
          max: 1
        }
      }
    }
  ];

  typeDefs.byName = _.indexBy(typeDefs, 'name');

  return typeDefs;
});