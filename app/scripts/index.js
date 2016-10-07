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

$(window).on('scroll', changeToFixed);

function changeToFixed(event){
  event.preventDefault();
  if($('.user-info').offset().top <= $(window).scrollTop()){
    $('.repo-nav-container').addClass('fixed');
    console.log('it happened');
  }else{
    $('.repo-nav-container').removeClass('fixed');
  }

  if(($('.large-picture').offset().top + 233) <= $(window).scrollTop()){
    $('.extended-section-top').addClass('appear');
  }else{
    $('.extended-section-top').removeClass('appear');
  }
}
