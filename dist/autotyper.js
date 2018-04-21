/*
* AutoTyper JS v1.0.0
* A vanilla javascript plugin for animated typewriting.
* Works with Chrome, Firefox, Safari, Internet Explorer and Edge
*
* Author:
* Huseyin Elmas <hsynlms47@gmail.com>
*/
(function(window, document) {
  // define the plugin in global variable to make it accessible from outside
  window.autoTyper = function(opts) {
    // default options
    var options = {
      selector: "",
      words: [],
      charSpeed: 85,
      delay: 2100,
      loop: true,
      flipflop: true,
      position: 0,
      currentWord: "",
      element: null,
      isStopped: false
    };

    // apply new options to existing one
    var applyNewOptions = function(opts) {
      // if given parameter is not valid, exit
      if (!opts) return;

      // change old values with new ones
      for (var opt in opts) {
        if (opts.hasOwnProperty(opt)) {
          options[opt] = opts[opt];
        }
      }
    };
    applyNewOptions(opts);

    // character putting synchronously
    var putChar = function*() {
      // if current character is last or its stopped
      if (options.position === options.currentWord.length || options.isStopped) {
        // check if flip flop is activated
        if (options.flipflop) {
          yield setTimeout(function() {
            // after the delay, start removing chars one by one
            remChar().next();
          }, options.delay);
        }
    
        // exit looping characters
        yield null;
      }
    
      // append the char into the element
      options.element.innerHTML += options.currentWord[options.position++];
    
      // loop the function for other remained chars
      yield setTimeout(function() {
        putChar().next();
      }, (options.position < options.currentWord.length) ? options.charSpeed : 0);
    };

    // character removing synchronously
    var remChar = function*() {
      // if all chars is removed or its stopped, exit function
      if (options.position === 0 || options.isStopped) yield null; 
    
      // remove the char from the element
      options.element.innerHTML = options.currentWord.substr(0, --options.position);
    
      // loop the function for other remained chars
      yield setTimeout(function() {
        remChar().next();
      }, (options.position > 0) ? options.charSpeed : 0);
    };

    // prepare word to type synchronously
    var processWord = function*(word, delay) {
      yield setTimeout(function() {
        // reset processing options
        options.position = 0;
        options.currentWord = word;
        // clear element text
        options.element.innerHTML = "";
    
        // start to put characters
        putChar().next();
      }, delay);
    };

    // autoTyper execution
    var exec = function*() {
      // if its stopped, exit function
      if (options.isStopped) yield null;

      var timeoutDelay = 0;

      for (var i = 0; i < options.words.length; i++) {
        // get current iteration
        var theWord = options.words[i];

        // if it is not valid, continue the loop
        if (!theWord) continue;

        processWord(options.words[i], timeoutDelay).next();
    
        var tmp = options.words[i].length * options.charSpeed;
        if (options.flipflop) tmp *= 2;

        timeoutDelay += (tmp + options.delay);
      }
    
      yield setTimeout(function() {
        options.loop ? exec().next() : "";
      }, timeoutDelay);
    };

    // start the autoTyper instance
    this.start = function() {
      // option validations
      if (typeof options.selector !== "string" || !options.selector) return;
      if (!Array.isArray(options.words) || !options.words.length) return;

      // get element
      var el = document.querySelector(options.selector);

      // if given element does not exist, exit
      if (!el) return;

      // setup options before start
      options.element = el;
      options.isStopped = false;

      // start autoTyper
      exec().next();
    };

    // stop the autoTyper instance
    this.stop = function() {
      // reset options
      options.isStopped = true;
      options.position = 0;
      options.currentWord = "";
    };
  };
})(window, document);
