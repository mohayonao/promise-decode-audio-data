var AudioContext = global.AudioContext || global.webkitAudioContext;
var OfflineAudioContext = global.OfflineAudioContext || global.webkitOfflineAudioContext;
var isPromiseBased, decodeAudioData;

if (OfflineAudioContext) {
  isPromiseBased = (function() {
    var context = new OfflineAudioContext(1, 2, 44100);

    return context.decodeAudioData(new Uint8Array(128).buffer, function() {}, function() {});
  })();

  if (!isPromiseBased) {
    decodeAudioData = AudioContext.prototype.decodeAudioData;

    AudioContext.prototype.decodeAudioData = function(audioData, successCallback, errorCallback) {
      var _this = this;
      var promise = new Promise(function(resolve, reject) {
        return decodeAudioData.call(_this, audioData, resolve, reject);
      });

      promise.then(successCallback, errorCallback);

      return promise;
    };

    AudioContext.prototype.decodeAudioData.original = decodeAudioData;
  }
}
