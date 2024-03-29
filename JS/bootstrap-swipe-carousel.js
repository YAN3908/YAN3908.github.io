(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BootstrapSwipeCarousel = function () {
  var NAME = 'swipeCarousel';
  var CAROUSEL_DATA_KEY = 'bs.carousel.swipe2';
  var MIN_SPEED_TO_SLIDE = 200; // pixel per second
  var DEBOUNCE_TIMEOUT = 40; // Magic number (it works and avoids extra slides per taps)

  var shouldSlide = function shouldSlide(deltaX, speed, threshold) {
    return Math.abs(deltaX) >= threshold || speed > MIN_SPEED_TO_SLIDE;
  };

  var SwipeCarousel = function () {
    function SwipeCarousel(carouselEl) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$sensitivity = _ref.sensitivity,
          sensitivity = _ref$sensitivity === undefined ? 'medium' : _ref$sensitivity,
          _ref$enabled = _ref.enabled,
          enabled = _ref$enabled === undefined ? true : _ref$enabled;

      _classCallCheck(this, SwipeCarousel);

      this.carouselEl = carouselEl;
      this.sensitivity = sensitivity;
      this.threshold = this.sensitivityToThresholdToSlide[sensitivity];

      // We share these properties assuming we swipe on carousel at a given time
      this.handleTouchMove = this.handleTouchMove.bind(this);
      this.handleTouchDown = this.handleTouchDown.bind(this);
      this.handleCarouselSlideStart = this.handleCarouselSlideStart.bind(this);
      this.handleCarouselSlideEnd = this.handleCarouselSlideEnd.bind(this);

      this.state = {
        queue: [],
        enabled: false
      };

      this.initialise(enabled);
    }

    _createClass(SwipeCarousel, [{
      key: 'initialise',
      value: function initialise(enabled) {
        if (enabled) {
          this.enable();
        }
      }
    }, {
      key: 'toggleEnabledState',
      value: function toggleEnabledState() {
        var enabled = this.state.enabled;

        this.setState({
          enabled: !enabled
        });
      }
    }, {
      key: 'handleTouchMove',
      value: function handleTouchMove(e) {
        var _this = this;

        var event = e.originalEvent;
        var targetCarousel = (0, _jquery2.default)(e.currentTarget);

        if (event.pointerType === 'touch') {
          var deltaX = event.clientX - this.startX;
          var timeElapsedMilliSeconds = Math.max(Date.now() - this.startTime, 1);
          var speedPixelPerSecond = Math.abs(deltaX) / timeElapsedMilliSeconds * 1000;

          if (shouldSlide(deltaX, speedPixelPerSecond, this.threshold)) {
            var state = this.state;

            var carouselAction = deltaX > 0 ? 'prev' : 'next';

            if (this.debounceTimer) {
              clearTimeout(this.debounceTimer);
            }

            this.debounceTimer = setTimeout(function () {
              // Reset pointer move event waiting for next touch event
              targetCarousel.off('pointermove', _this.handleTouchMove);

              // Update state with new action
              _this.setState({
                queue: [].concat(_toConsumableArray(state.queue), [{
                  action: carouselAction
                }])
              });

              _this.processCarouselSlideQueue(targetCarousel);
            }, DEBOUNCE_TIMEOUT);
          }
        }
      }
    }, {
      key: 'handleTouchDown',
      value: function handleTouchDown(e) {
        var event = e.originalEvent;
        var targetCarousel = (0, _jquery2.default)(e.currentTarget);

        if (event.pointerType === 'touch') {
          this.startX = event.clientX;
          this.startTime = Date.now();

          targetCarousel.off('pointermove', this.handleTouchMove).on('pointermove', this.handleTouchMove);
        }
      }
    }, {
      key: 'handleCarouselSlideStart',
      value: function handleCarouselSlideStart() {
        var state = this.state;

        // Remove processed first item from the queue

        this.setState({
          sliding: true,
          queue: state.queue.slice(1)
        });
      }
    }, {
      key: 'handleCarouselSlideEnd',
      value: function handleCarouselSlideEnd(e) {
        var targetCarousel = (0, _jquery2.default)(e.target);

        this.setState({
          sliding: false
        });

        // Check the queue in case more slides needs to happen
        this.processCarouselSlideQueue(targetCarousel);
      }
    }, {
      key: 'processCarouselSlideQueue',
      value: function processCarouselSlideQueue(targetCarouselEl) {
        var queue = this.state.queue;


        if (queue.length > 0) {
          var _queue = _slicedToArray(queue, 1),
              itemToProcess = _queue[0];

          targetCarouselEl.carousel(itemToProcess.action);
        }
      }
    }, {
      key: 'setState',
      value: function setState(newPartialState) {
        this.state = _extends({}, this.state, newPartialState);
      }
    }, {
      key: 'enable',
      value: function enable() {
        if (!this.state.enabled) {
          this.carouselEl.on({
            pointerdown: this.handleTouchDown,
            'slide.bs.carousel': this.handleCarouselSlideStart,
            'slid.bs.carousel': this.handleCarouselSlideEnd
          });

          this.toggleEnabledState();
        }
      }
    }, {
      key: 'disable',
      value: function disable() {
        if (this.state.enabled) {
          this.carouselEl.off({
            pointerdown: this.handleTouchDown,
            'slide.bs.carousel': this.handleCarouselSlideStart,
            'slid.bs.carousel': this.handleCarouselSlideEnd
          });

          this.toggleEnabledState();
        }
      }
    }, {
      key: 'sensitivityToThresholdToSlide',
      get: function get() {
        return {
          low: 16,
          medium: 8,
          high: 4
        };
      }
    }], [{
      key: 'CAROUSEL_DATA_KEY',
      get: function get() {
        return CAROUSEL_DATA_KEY;
      }
    }, {
      key: 'DEBOUNCE_WAIT',
      get: function get() {
        return DEBOUNCE_TIMEOUT;
      }
    }]);

    return SwipeCarousel;
  }();

  SwipeCarousel.jQueryModule = function jQueryInterface(config) {
    return this.each(function addModuleWrapper() {
      var swipeCarousel = (0, _jquery2.default)(this).data(CAROUSEL_DATA_KEY);

      if (typeof config === 'string' && swipeCarousel) {
        var action = config;
        if (typeof swipeCarousel[action] === 'function') {
          swipeCarousel[action]();
        }
      } else if (!swipeCarousel) {
        (0, _jquery2.default)(this).data(CAROUSEL_DATA_KEY, new SwipeCarousel((0, _jquery2.default)(this), config));
      }
    });
  };

  _jquery2.default.fn[NAME] = SwipeCarousel.jQueryModule;
  _jquery2.default.fn[NAME].Constructor = SwipeCarousel;

  return SwipeCarousel;
}();

exports.default = BootstrapSwipeCarousel;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);