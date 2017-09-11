var request = require('request');
var fs = require('fs');

var GITHUB_USER = "arsalan-menhaj";
var GITHUB_TOKEN = "76bf6b2df263c2e27fbe71bbc91ab91f03bcf496";


console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {

  var reqObject = {
    uri: 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project'
    }
  }


  request.get(reqObject, function(error, response, body) {
    //console.log('error:', error);
    //console.log('statusCode:', response && response.statusCode);
    //console.log('Body:',body);


    if (response && response.statusCode == 200) {
      var json = JSON.parse(body);
      cb(json);
    }
  });
  /*               // Note 1
       .on('error', function (err) {                                   // Note 2
         throw err;
       })
       .on('response', function (response) {                           // Note 3
         console.log(response.body);
       })
       .on('end', function (response) {
          console.log('End of data stream.')
       });

  */
}



function printURL(array) {
  array.forEach(function(contributor) {
    console.log('Avatar URL: ', contributor.avatar_url);
  });
}


getRepoContributors("jquery", "jquery", printURL);


