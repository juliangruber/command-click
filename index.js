var isUrl = require('regexps').url;
var escape = require('escape-regexp');
var Pressed = require('key-pressed');

/**
 * Expose `clickable`.
 */

module.exports = clickable;

/**
 * Make links inside `el` command-click-able.
 *
 * @param {Element} el
 * @return {Function}
 * @api public
 */

function clickable(el) {
  
  // find urls
  
  var html = el.innerHTML;
  var urls = html
    .split(/\s/)
    .filter(function(word) {
      return isUrl.test(word);
    })
    .map(function(url) {
      while (/\.$/.test(url)) {
        url = url.slice(0, -1);
      }
      return url;
    });
  
  // wrap urls in spans
  
  urls.forEach(function(url) {
    var reg = new RegExp(escape(url), 'g');
    html = html.replace(reg, '<span class="command-click">' + url + '</span>');
  });
  el.innerHTML = html;
  
  // listen for clicks
  
  var pressed = Pressed();
  
  el.addEventListener('click', function(e) {
    if (e.target.className == 'command-click' && pressed('meta')) {
      open(e.target.innerHTML);
    }
  });
  
  // unbind
  
  return function unbind() {
    removeEventListener('keydown', keydown);
    removeEventListener('keyup', keyup);
  };
  
}