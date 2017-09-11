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

imageURL = "https://avatars2.githubusercontent.com/u/2741?v=3&s=466";
imagePath =  "./avatars/kvirani.jpg";

function downloadImageByURL(url, filePath) {
  // ...
  request.get(url)               // Note 1
       .on('error', function (err) {                                   // Note 2
         throw err;
       })
       .on('response', function (response) {                           // Note 3
         console.log('Response Status Code: ', response.statusCode);
         console.log('Response Status Message:', response.statusMessage);
         console.log('Response Status Message:', response.headers['content-type']);
         console.log('Downloading image...');
       })
       .on('end', function (response) {
          console.log('Download complete.')
       })
       .pipe(fs.createWriteStream(filePath));
}


// getRepoContributors("jquery", "jquery", printURL);
downloadImageByURL(imageURL,imagePath);


