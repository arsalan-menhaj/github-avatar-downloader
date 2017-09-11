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
    if (response && response.statusCode == 200) {
      var json = JSON.parse(body);
      cb(json);
    }
  });
}

function downloadImageByURL(array) {
  array.forEach(function(contributor) {
     request.get(contributor.avatar_url)
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {
         console.log('Response Status Code: ', response.statusCode);
         console.log('Response Status Message:', response.statusMessage);
         console.log('Response Status Message:', response.headers['content-type']);
         console.log('Downloading image...');
       })
       .on('end', function (response) {
          console.log('Download complete.')
       })
       .pipe(fs.createWriteStream("./avatars/" + contributor.login + ".jpg"));
     });
}

getRepoContributors("jquery", "jquery", downloadImageByURL);