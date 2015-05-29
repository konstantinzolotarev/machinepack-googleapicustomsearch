'use strict';

var _ = require('lodash');
var googleapis = require('googleapis');
var customsearch = googleapis.customsearch('v1');

module.exports = {


  friendlyName: 'Search',


  description: 'Executes the search using Customsearch API call',


  cacheable: true,


  sync: false,


  idempotent: false,


  inputs: {
    q: {
      example: 'test search',
      description: 'Search phrase',
      required: true
    },
    cx: {
      example: '',
      description: 'The custom search engine ID to use for this request'
    },
    cref: {
      example: '',
      description: 'The URL of a linked custom search engine specification to use for this request. '
    },
    auth: {
      example: 'AIzaSyAYVDlaoVs_GZw9JNvSclRWH_PEMKII6tc',
      description: 'You generated API_KEY'
    },
    alt: {
      example: 'atom',
      description: 'JSON/Atom Custom Search API can return results in one of two formats. JSON is the default data format; you can get results in Atom format by specifying the alt=atom query parameter'
    },
    c2coff: {
      example: '',
      description: 'Turns off the translation between zh-CN and zh-TW.'
    },
    cr: {
      example: '',
      description: 'Country restrict(s)'
    },
    fileType: {
      example: 'jpg',
      description: 'Returns images of a specified type. Some of the allowed values are: bmp, gif, png, jpg, svg, pdf, ...'
    },
    searchType: {
      example: 'image',
      description: 'Specifies the search type'
    },
    sort: {
      example: '',
      description: 'The sort expression to apply to the results'
    },
    start: {
      example: 15,
      description: 'The index of the first result to return'
    }
  },

  exits: {
    invalidParameter: {
      description: 'Invalid field parameter passed'
    },

    dailyLimitExceededUnreg: {
      description: 'Daily Limit for Unauthenticated Use Exceeded. Continued use requires signup.'
    },

    success: {
      variableName: 'result',
      description: 'Search results.',
    }

  },

  fn: function(inputs, exits) {
    var params = {};
    _.merge(params, inputs);
    customsearch.cse.list(params, function(err, result) {
      if (err) {
        if (!err.code) {
          return exits.error(err);
        }
        switch (err.code) {
          case 400:
            return exits.invalidParameter(err);
            break;
          case 403:
            return exits.dailyLimitExceededUnreg(err);
            break;
          default:
            return exits.error(err);
            break;
        }
      }
      return exits.success(result);
    });
  }

};
