/* global Uint32Array, Promise */

"use strict";

var BaseAudioContext = require("base-audio-context");
var OfflineAudioContext = global.OfflineAudioContext || global.webkitOfflineAudioContext;

if (OfflineAudioContext) {
  var silent = new Uint32Array([
    0x46464952, 0x00000038, 0x45564157, 0x20746d66,
    0x00000010, 0x00010001, 0x0000ac44, 0x00015888,
    0x00100002, 0x61746164, 0x00000014, 0x00000000,
    0x00000000, 0x00000000, 0x00000000, 0x00000000,
  ]).buffer;

  var isPromiseBased = (function() {
    var context = new OfflineAudioContext(1, 128, 44100);

    return context.decodeAudioData(silent, function() {}, function() {});
  })();

  if (!isPromiseBased) {
    var decodeAudioData = BaseAudioContext.prototype.decodeAudioData;

    BaseAudioContext.prototype.decodeAudioData = function(audioData, successCallback, errorCallback) {
      var _this = this;
      var promise = new Promise(function(resolve, reject) {
        return decodeAudioData.call(_this, audioData, resolve, reject);
      });

      promise.then(successCallback, errorCallback);

      return promise;
    };

    BaseAudioContext.prototype.decodeAudioData.original = decodeAudioData;
  }
}
