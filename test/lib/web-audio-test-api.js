"use strict";

var audioData = new Uint8Array([
  0x52, 0x49, 0x46, 0x46,
  0x58, 0x00, 0x00, 0x00,
  0x57, 0x41, 0x56, 0x45,
  0x66, 0x6d, 0x74, 0x20,
  0x10, 0x00, 0x00, 0x00,
  0x01, 0x00, 0x02, 0x00,
  0x44, 0xac, 0x00, 0x00,
  0x10, 0xb1, 0x02, 0x00,
  0x04, 0x00, 0x10, 0x00,
  0x64, 0x61, 0x74, 0x61,
  0x08, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00,
]).buffer;

var invalidAudioData = new Uint8Array(52).buffer;

function DOMException(name) {
  this.name = name;
}
DOMException.prototype = Object.create(Error.prototype, {
  constructor: { value: DOMException }
});

function AudioContext() {
  this.decodeAudioDataResultType = "void";
}

var decodeAudioData$Promise = function(audioData, successCallback, errorCallback) {
  var promise = new Promise(function(resolve, reject) {
    if (!(audioData instanceof ArrayBuffer)) {
      reject(new DOMException("NotSupportedError"));
    } else {
      setTimeout(function() {
        if (audioData === invalidAudioData) {
          reject(new DOMException("EncodingError"));
        } else {
          resolve(new AudioBuffer());
        }
      }, 0);
    }
  });

  promise.then(successCallback, errorCallback);

  return promise;
};

var decodeAudioData$void = function(audioData, successCallback, errorCallback) {
  if (!(audioData instanceof ArrayBuffer)) {
    throw new DOMException("NotSupportedError");
  }
  if (typeof successCallback !== "function") {
    throw new TypeError("The callback provided as parameter 2 is not a function");
  }
  setTimeout(function() {
    if (audioData === invalidAudioData) {
      if (errorCallback) {
        errorCallback();
      }
    } else {
      successCallback(new AudioBuffer());
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
}

global.AudioContext = AudioContext;
global.AudioBuffer = AudioBuffer;

module.exports = {
  DOMException: DOMException,
  AudioContext: AudioContext,
  AudioBuffer: AudioBuffer,
  audioData: audioData,
  invalidAudioData: invalidAudioData,
};
