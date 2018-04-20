# AutoTyper JS
A vanilla javascript plugin for animated typing. AutoTyper JS works with Chrome, Firefox, Safari, Internet Explorer and Edge.

AutoTyper JS can be accessable in global variable and named as `autoTyper`. It exposes outside two functions, `start` and `stop`. Multiple instances can be created by using `new` keyword.

- **start()** : starts auto typing on target element.
```javascript
  var options = {
    selector: ".content > h1",
    words: ["hello", "world"]
  };

  // start auto typer
  var typer = new autoTyper(options);
  typer.start();
```

- **stop()** : stops auto typing.
```javascript
  // stop autoTyper
  typer.stop();
```

## Available options
```javascript
  // custom options
  var options = {
    selector: "", // target element selector
    words: [], // wordings that will be auto typed
    charSpeed: 85, // each letter typing animation speed
    delay: 2100, // each word typing animation delay
    loop: true, // if loop is activated, autoTyper will start over
    flipflop: true // if flipflop is activated, letters which are typed animated will be removed ony by one animated
  };
```
