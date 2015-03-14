// Not Found Page Generator

module.exports = function notFound() {

  var mainContent = document.querySelector('main');
  var errorText = '<h1>Page Not Found</h1> <p>Sorry, but the page you were trying to view does not exist.</p>'
  mainContent.innerHTML = errorText;
  console.log("error 404 page not found");

};
