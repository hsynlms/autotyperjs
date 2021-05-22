/*!
* autotyperjs v1.0.3
* A vanilla javascript plugin for animated typewriting.
*
* Author: Huseyin Elmas
*/
(function (window, document) {
  window.autoTyper = function (opts) {
    var options = {
      selector: '',
      words: [],
      charSpeed: 85,
      delay: 2100,
      loop: true,
      flipflop: true,
      position: 0,
      currentWord: '',
      element: null,
      isStopped: false
    }

    var applyNewOptions = function (opts) {
      if (!opts) return

      for (var opt in opts) {
        if (opts.hasOwnProperty(opt)) {
          options[opt] = opts[opt]
        }
      }
    }
    applyNewOptions(opts)

    // put characters synchronously
    var putChar = function*() {
      // if current character is last or its stopped
      if (options.position === options.currentWord.length || options.isStopped) {
        // check if flip flop is activated
        if (options.flipflop) {
          yield setTimeout(function () {
            // after the delay, start removing chars one by one
            remChar().next()
          }, options.delay)
        }

        // exit
        yield null
      }

      // append the char into the element
      options.element.innerHTML += options.currentWord[options.position++]

      // loop the function for other remained chars
      yield setTimeout(function () {
        putChar().next()
      }, (options.position < options.currentWord.length) ? options.charSpeed : 0)
    }

    // remove characters synchronously
    var remChar = function*() {
      // if all chars is removed or its stopped, exit function
      if (options.position === 0 || options.isStopped) yield null

      // remove the char from the element
      options.element.innerHTML = options.currentWord.substr(0, --options.position)

      // loop the function for other remained chars
      yield setTimeout(function () {
        remChar().next()
      }, (options.position > 0) ? options.charSpeed : 0)
    }

    // prepare words to be typed synchronously
    var processWord = function*(word, delay) {
      yield setTimeout(function () {
        // reset options
        options.position = 0
        options.currentWord = word
        options.element.innerHTML = ''

        // start to put characters
        putChar().next()
      }, delay)
    }

    var exec = function*() {
      // if its stopped, exit function
      if (options.isStopped) yield null

      var timeoutDelay = 0

      for (var i = 0; i < options.words.length; i++) {
        var theWord = options.words[i]

        if (!theWord) continue

        processWord(options.words[i], timeoutDelay).next()

        var tmp = options.words[i].length * options.charSpeed
        if (options.flipflop) tmp *= 2

        timeoutDelay += (tmp + options.delay)
      }

      yield setTimeout(function () {
        options.loop ? exec().next() : ''
      }, timeoutDelay)
    }

    this.start = function () {
      if (typeof options.selector !== 'string' || !options.selector) return
      if (!Array.isArray(options.words) || !options.words.length) return

      var el = document.querySelector(options.selector)
      if (!el) return

      options.element = el
      options.isStopped = false

      exec().next()
    }

    this.stop = function() {
      // reset options
      options.isStopped = true
      options.position = 0
      options.currentWord = ''
    }
  }
})(window, document)
