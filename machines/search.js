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
        return exits.error(err);
      }
      return exits.success(result);
    });
  }

};
