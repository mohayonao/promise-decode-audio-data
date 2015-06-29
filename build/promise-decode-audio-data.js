(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
