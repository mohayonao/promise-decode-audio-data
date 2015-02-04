"use strict";

var AudioContext = global.AudioContext || global.webkitAudioContext;

if (AudioContext) {
  var decodeAudioData = AudioContext.prototype.decodeAudioData;
  var NOP = function() {};

  AudioContext.prototype.decodeAudioData = function(audioData, successCallback, errorCallback) {
    var audioContext = this;
    var promise = new Promise(function(resolve, reject) {
      return decodeAudioData.call(audioContext, audioData, resolve, reject);
    });

    if (typeof successCallback === "function") {
      if (typeof errorCallback === "function") {
        promise.then(successCallback, errorCallback);
      } else {
        promise.then(successCallback, NOP);
      }
    }

    return promise;
  };
  AudioContext.prototype.decodeAudioData.original = decodeAudioData;
}
