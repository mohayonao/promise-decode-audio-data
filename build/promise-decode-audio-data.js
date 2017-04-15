(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"base-audio-context":2}],2:[function(require,module,exports){
(function (global){
var AudioContext = global.AudioContext || global.webkitAudioContext;
var OfflineAudioContext = global.OfflineAudioContext || global.webkitOfflineAudioContext;
var BaseAudioContext = global.BaseAudioContext || (OfflineAudioContext && Object.getPrototypeOf(OfflineAudioContext));

module.exports = (typeof BaseAudioContext === "function" && BaseAudioContext.prototype) ? BaseAudioContext : AudioContext;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
