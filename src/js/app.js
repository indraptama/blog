require.config({
    paths: {
        'request': '/js/superagent',
        'page':'/js/page',
        'atomic':'/js/atomic'
    }
});


require(['request'], function(request){

  var url = 'http://localhost:8080/pages/blogs/index.html';

  request
    .get(url)
    .type('text/html')
    .end(function(res){
      
      
      var DataAJAX = document.createElement('div');
      var Main = document.querySelector('main');
      var MainContent = document.createElement('div');


      DataAJAX.innerHTML = res.text;
      var test = DataAJAX.querySelector('.BlockList');

      MainContent.innerHTML = test.innerHTML;
      
      Main
        .appendChild(MainContent)
        .classList.add('MainContent');
      
    })
});


require(['page'], function (page) {
  
  page('/', home);
  page('/test', test)
  page({hashbang: true});

  // routes function
  function home() {
    alert('hallo')
  };

  function test() {
    alert('this is text')
  }

});

