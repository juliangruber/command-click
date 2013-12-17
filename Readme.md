
# command-click

  Make links in a text command-click-able.

## Example

```js
var clickable = require('command-click');
var el = document.querySelector('p');

clickable(p);
```

## Installation

  Install with [component(1)](http://component.io):

    $ component install juliangruber/command-click

## API

### clickable(el)

  Wrap each link inside `el` in a `<span>` and on `CMD+Click` open it via `window.open()`.

  Returns the `unbind` function.

### unbind()

  Stop listening for events.

## License

  MIT
