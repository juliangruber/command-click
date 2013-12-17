var isUrl = require('regexps').url;
var escape = require('escape-regexp');
var Pressed = require('key-pressed');
var findUrls = require('find-urls');

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
  var pressed = Pressed();
  var html = el.innerHTML;
  
  findUrls(html).forEach(function(url) {
    var reg = new RegExp(escape(url), 'g');
    html = html.replace(reg, '<span class="command-click">' + url + '</span>');
  });
  el.innerHTML = html;
  el.addEventListener('click', function(e) {
    if (e.target.className == 'command-click' && pressed('meta')) {
      open(e.target.innerHTML);
    }
  });
  
  return function unbind() {
    pressed.unbind();
    removeEventListener('keydown', keydown);
    removeEventListener('keyup', keyup);
  };
}