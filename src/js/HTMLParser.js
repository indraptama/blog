/*
function HTMLParser(aHTMLString){
  var html = document.implementation.createDocument("http://www.w3.org/1999/xhtml", "html", null),
    body = document.createElementNS("http://www.w3.org/1999/xhtml", "body");
    html.documentElement.appendChild(body);

  body.appendChild(Components.classes["@mozilla.org/feed-unescapehtml;1"]
    .getService(Components.interfaces.nsIScriptableUnescapeHTML)
    .parseFragment(aHTMLString, false, null, body));

  return body;
}

*/

function HTMLParser(el) {

var 
  el = document.querySelector(el);


}