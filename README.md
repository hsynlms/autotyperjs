# AutoTyper JS
A vanilla javascript plugin for animated typewriting. AutoTyper JS works with Chrome, Firefox, Safari, Internet Explorer and Edge.

AutoTyper can be accessable in global variable and named as `autoTyper`. It exposes outside two functions, `start` and `stop`. Multiple instances can be created by using `new` keyword.

- **start()** : starts AutoTyper on target element.
```javascript
  var options = {
    selector: ".content > h1",
    words: ["hello", "world"]
  };

  // start auto typer
  var typer = new autoTyper(options);
  typer.start();
```

- **stop()** : stops AutoTyper.
```javascript
  // stop autoTyper
  typer.stop();
```

Demo on Codepen : https://codepen.io/hsynlms/pen/gzapPz

## Available options
Below options can be given to customize AutoTyper before start.

```javascript
  // available custom options
  var options = {
    selector: ".typerTarget", // target element selector
    words: [], // words/sentences that will be auto typed
    charSpeed: 85, // letter typing animation speed
    delay: 2100, // word/sentence typing animation delay
    loop: true, // if loop is activated, autoTyper will start over
    flipflop: true // if flipflop is activated, letters which are typed animated will be removed ony by one animated
  };
```

## How about blinking caret?
For better typewriting experience, blinking caret is a must. It's optional to use with autoTyper together. You only have to do is giving below styles for autoTyper target element by yourself.

The HTML side will be like:
```html
<div class="typerTarget"></div>
```

The CSS side will be like:
```css
@-webkit-keyframes blink-caret {
  50% {
    border-color: transparent;
  }
}

.typerTarget {
  border-right: 1px solid #404145;
  -webkit-animation: blink-caret 0.5s step-end infinite alternate;
          animation: blink-caret 0.5s step-end infinite alternate;
}
```
