(function(angular) {

  var app = angular.module('exampleApp', [
    'angular-elastic-builder',
  ]);

  app.controller('BasicController', function() {

    var data = this.data = {};

    data.query = [
      {
        'and': [
          {
            'term': {
              'test.date': '2016-04-08T09:16:48'
            }
          },
          {
            'range': {
              'test.number': {
                'gte': 650
              }
            }
          },
          {
            'range': {
              'test.number': {
                'lt': 850
              }
            }
          }
        ]
      },
      {
        'term': {
          'test.boolean': 0
        }
      },
      {
        'terms': {
          'test.state.multi': [ 'AZ', 'CT' ]
        }
      },
      {
        'not': {
          'filter': {
            'term': {
              'test.term': 'asdfasdf'
            }
          }
        }
      },
      {
        'exists': {
          'field': 'test.term'
        }
      },
      {
        'range': {
          'test.otherdate': {
            'gte': 'now',
            'lte': 'now+7d'
          }
        }
      },
      {
        'match': {
          'test.match': 'brown dog'
        }
      }
    ];

    data.fields = {
     'test.number': { title: 'Test Number', type: 'number', minimum: 650 },
     'test.term': { title: 'Test Term', type: 'term' },
     'test.boolean': { title: 'Test Boolean', type: 'boolean' },
     'test.state.multi': { title: 'Test Multi', type: 'multi', choices: [ 'AZ', 'CA', 'CT' ]},
     'test.date': { title: 'Test Date', type: 'date' },
     'test.otherdate': { title: 'Test Other Date', type: 'date' },
     'test.match': { title: 'Test Match', type: 'match' }
    };

    data.needsUpdate = true;

    this.showQuery = function() {
      var queryToShow = {
        size: 0,
        filter: { and : data.query }
      };

      return JSON.stringify(queryToShow, null, 2);
    };

  });

})(window.angular);
