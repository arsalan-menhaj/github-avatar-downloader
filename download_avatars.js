// Stores command line arguments
var owner = process.argv[2];
var repo = process.argv[3];

// Calls 'request' and 'fs' modules
var request = require('request');
var fs = require('fs');

// Github credentials
var GITHUB_USER = "arsalan-menhaj";
var GITHUB_TOKEN = "76bf6b2df263c2e27fbe71bbc91ab91f03bcf496";

// Welcome message
console.log('Welcome to the GitHub Avatar Downloader!');

// Main function
function getRepoContributors(repoOwner, repoName, cb) {

  // Sets up URL and User-Agent for request
  var reqObject = {
    uri: 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project'
    }
  }

  // GET request - parses responses as JSON and passes data to downloadImageByURL
  request.get(reqObject, function(error, response, body) {
    if (error) { throw error; }
    else if (response && response.statusCode === 200) {
      var json = JSON.parse(body);
      cb(json);
    }
  });
}

// Receives JSON data from main function, downloads pictures from avatar_url,
// and names pictures after the corresponding contributor
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

getRepoContributors(owner, repo, downloadImageByURL)