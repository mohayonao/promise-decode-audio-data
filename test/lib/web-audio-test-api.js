"use strict";

function AudioContext() {
  this.decodeAudioDataResultType = "void";
  this.decodeAudioDataDecodedData = new AudioBuffer();
  this.decodeAudioDataFailed = false;
}

var decodeAudioData$Promise = function(audioData, successCallback, errorCallback) {
  var _this = this;

  var promise = new Promise(function(resolve, reject) {
    if (!(audioData instanceof ArrayBuffer)) {
      reject(new Error("NotSupportedError"));
    } else {
      setTimeout(function() {
        if (_this.decodeAudioDataFailed) {
          reject(new Error("EncodingError"));
        } else {
          resolve(_this.decodeAudioDataDecodedData);
        }
      }, 0);
    }
  });

  promise.then(successCallback, errorCallback);

  return promise;
};

var decodeAudioData$void = function(audioData, successCallback, errorCallback) {
  if (!(audioData instanceof ArrayBuffer)) {
    throw new Error("NotSupportedError");
  }
  if (typeof successCallback !== "function") {
    throw new Error("TypeError");
  }
  var _this = this;
  setTimeout(function() {
    if (_this.decodeAudioDataFailed) {
      if (errorCallback) {
        errorCallback(new Error("EncodingError"));
      }
    } else {
      successCallback(_this.decodeAudioDataDecodedData);
    }
  }, 0);
};

AudioContext.prototype.decodeAudioData = function(audioData, successCallback, errorCallback) {
  if (this.decodeAudioDataResultType === "promise") {
    return decodeAudioData$Promise.call(this, audioData, successCallback, errorCallback);
  }
  return decodeAudioData$void.call(this, audioData, successCallback, errorCallback);
};
AudioContext.prototype._decodeAudioData = AudioContext.prototype.decodeAudioData;

function AudioBuffer() {
  this.id = AudioBuffer.id++;
}
AudioBuffer.id = 0;

global.AudioContext = AudioContext;
global.AudioBuffer = AudioBuffer;

module.exports = {
  AudioContext: AudioContext,
  AudioBuffer: AudioBuffer,
};
