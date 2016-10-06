var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var gitHubToken = require('./gitapikey.js');

if(gitHubToken !== undefined){
  $.ajaxSetup({
    headers: {
      'Authorization': 'token ' + gitHubToken.token
    }
  });
}

// $.ajax('https://api.github.com/users/lonate12').then(populate);
// $.ajax('https://api.github.com/users/lonate12/repos').then(populate);
