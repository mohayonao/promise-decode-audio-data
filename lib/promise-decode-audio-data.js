(function(global) {
  "use strict";

  var AudioContext = global.AudioContext || global.webkitAudioContext;

  if (!AudioContext) {
    return;
  }

  var decodeAudioData = AudioContext.prototype.decodeAudioData;

  AudioContext.prototype.decodeAudioData = function(audioData, successCallback, errorCallback) {
    var audioContext = this;
    var promise = new Promise(function(resolve, reject) {
      return decodeAudioData.call(audioContext, audioData, resolve, reject);
    });

    promise.then(successCallback, errorCallback);

    return promise;
  };

})(this.window || this.self || global);
