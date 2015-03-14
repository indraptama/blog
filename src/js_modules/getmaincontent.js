'use strict';

var request = require('visionmedia/superagent');

module.exports = function getMainContent(url, next) {

  request
    .get(url)
    .type('text/html')
    .end(function(err,res){
        if (res.ok) {
          var Dummy = document.createElement('div');
          Dummy.innerHTML = res.text;
          var MainSource = Dummy.querySelector('main');
          var MainContainer = document.querySelector('main');
          MainContainer.innerHTML = MainSource.innerHTML;
        }

        else {
          alert('oops error')
        }
    });

    function pushContent() {

    };

}// // end request module
