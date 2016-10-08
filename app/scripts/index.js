var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var gitHubToken = require('./gitapikey.js');

// if(gitHubToken !== undefined){
//   $.ajaxSetup({
//     headers: {
//       'Authorization': 'token ' + gitHubToken.token
//     }
//   });
// }

$.ajax('https://api.github.com/users/lonate12').then(populate);
$.ajax('https://api.github.com/users/lonate12/repos').then(createRepos);

$(window).on('scroll', changeToFixed);

var orgTemplateCompiled = Handlebars.compile($('#orgs-template').html());
var reposTemplateCompiled = Handlebars.compile($('#repos-template').html());

///////////////////////////////////////////////////////////////////
//Functions
///////////////////////////////////////////////////////////////////


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


function populate(data){
  var months=["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
  var joinedDateArray = data.created_at.split(''),
      joinedDateYear = joinedDateArray[0]+joinedDateArray[1]+joinedDateArray[2]+joinedDateArray[3],
      joinedDateDay = joinedDateArray[8]+joinedDateArray[9],
      joinedDateMonth = joinedDateArray[5]+joinedDateArray[6];

  // console.log(data);
  $('.small-image').css('background-image', 'url('+data.avatar_url+')');
  $('.login-name').text(data.login);
  $('.large-picture').css('background-image', 'url('+data.avatar_url+')');
  $('#name').text(data.name);
  $('#login').text(data.login);
  $('#email').text(data.email);
  $('#blog').text(data.blog);
  $('#joined').text('Joined on '+ months[joinedDateMonth-1] +' '+joinedDateDay + ', ' + joinedDateYear);
  $('#repo-number').text(data.public_repos);
  $('#followers-number').text(data.followers);
  $('#following-number').text(data.following);
  $.ajax('https://api.github.com/users/lonate12/orgs').then(getOrgImage);
}


function getOrgImage(orgInfo){
  orgInfo.forEach(function(org){
    $('#orgs-container').append('<a href="#" class="organizations" style="background-image: url(' + org.avatar_url + ')"></a>');
  });
}


function createRepos(reposData){
  console.log(reposData);
  _.each(reposData, function(repo){
    $('.repo').append(reposTemplateCompiled(repo));
  });
}
