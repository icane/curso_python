function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Cross broswing context pub-sub library based on postMessage.
 *
 * It supports multiple channels, with multiple handlers each.
 * Subscriptions and unsbuscriptions are granular, and will work as long
 * the handler code is the same.
 *
 * @module core/api
 */
define(function () {
  // =======================================================================
  // STATE
  // =======================================================================

  // ---- private ------------------------------------------------------

  /**
   * Handlers hash map.
   *
   * The keys will act as channels, their values will be an array of handlers.
   *
   * @type {Object<Array<Function>>}
   */
  var handlers = {};

  // =======================================================================
  // API / ENTY POINT
  // =======================================================================

  window.api = {
    integration: function integration() {
      window.addEventListener('message', handleBridgeEvents);

      return {
        name: 'api.integration',
        on: on,
        off: off,
        trigger: trigger,
        destroy: destroy
      };
    }
  };

  return window.api;

  // =======================================================================
  // BEHAVIOUR
  // =======================================================================

  // ---- public -------------------------------------------------------

  /**
   * Register an event handler on a given channel.
   *
   * @param {string} channel The channel to handle.
   * @param {Function} handler The handler to add to a channel.
   *
   * @returns {Api} The api instance.
   *
   * @public
   */
  function on(channel, handler) {
    if (isFunction(handler)) {
      addChannelHandler(channel, handler);
    }

    return this;
  }

  /**
   * Unregister event handlers for a given channel.
   *
   * If no handler is given, then unregister all handlers for that channel.
   * Otherwise, remove the given handler, comparing string bodies for
   * equality. If the same body of the handler is found more than once, then
   * remove all matches.
   *
   * @param {string} channel The channel.
   * @param {Function} handler The handler to remove.
   *
   * @returns {Api} The api instance.
   *
   * @public
   */
  function off(channel, handler) {
    var channelHandlers = handlers[channel];
    var canOff = Boolean(isString(channel) && !isEmpty(channel) && Array.isArray(channelHandlers) && channelHandlers.length);

    if (!canOff) {
      return this;
    }

    if (isUndefined(handler)) {
      handlers[channel] = [];
      return this;
    }

    if (!isFunction(handler)) {
      return this;
    }

    var handlerStr = handler.toString();
    handlers[channel] = channelHandlers.filter(function (f) {
      return f.toString() !== handlerStr;
    });

    return this;
  }

  /**
   * Trigger an event for the given channel and browsing context.
   *
   * @param {string} channel The channel to use.
   * @param {Window} targetWindow The emitter browsing context.
   * @param {...*=} args Data to pass through.
   *
   * @returns {Api} The api instance.
   *
   * @public
   */
  function trigger(channel, targetWindow) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    if (channel && targetWindow && targetWindow.postMessage) {
      targetWindow.postMessage(JSON.stringify({ channel: channel, args: args }), '*');
    }

    return this;
  }

  /**
   * Destroy all handlers.
   *
   * @returns {Api} The api instance.
   *
   * @public
   */
  function destroy() {
    handlers = {};

    return this;
  }

  // ---- private ------------------------------------------------------

  function addChannelHandler(channel, handler) {
    var channelHandlers = handlers[channel];

    !(Array.isArray(channelHandlers) && channelHandlers.length) ? handlers[channel] = [handler] : channelHandlers.push(handler);
  }

  function handleBridgeEvents(_ref) {
    var data = _ref.data;

    try {
      data = JSON.parse(data);
    } catch (error) {
     
      return;
    }

    isValidEvent(data) && handlers[data.channel].forEach(function (f) {
      return f.apply(undefined, _toConsumableArray(data.args));
    });
  }

  function isValidEvent(data) {
    var channelHandlers = handlers[data.channel];

    return isObject(data) && Array.isArray(channelHandlers) && channelHandlers.length && data.hasOwnProperty('args');
  }

  // Is a given value a function?
 function isFunction (obj) {
   return Object.prototype.toString.apply(obj) === '[object Function]';
 }

 // Is a given value a string?
 function isString (obj) {
   return Object.prototype.toString.apply(obj) === '[object String]';
 }
  

  // Is a given variable undefined?
  function isUndefined (obj) {
    return obj === void 0;
  }

  // Is a given variable an object?
  function isObject (obj) {
    return obj === Object(obj);
  }

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  function isEmpty (obj) {
    if (obj === null) {
      return true;
    }

    if (Array.isArray(obj) || isString(obj)) {
      return obj.length === 0;
    }

    for (var key in obj) {
      if (has(obj, key)) {
        return false;
      }
    }

    return true;
  }

  // Has own property?
  function has (obj, key) {
    return hasOwnProperty.call(obj, key);
  }
});