"use strict";

var assert = require("power-assert");
var sinon = require("sinon");
var WebAudioTestAPI = require("./lib/web-audio-test-api");
var DOMException = WebAudioTestAPI.DOMException;
var AudioContext = WebAudioTestAPI.AudioContext;
var AudioBuffer = WebAudioTestAPI.AudioBuffer;

describe("WebAudioTestAPI.AudioContext#decodeAudioData", function() {
  var audioContext;
  var successCallback, errorCallback;

  beforeEach(function() {
    audioContext = new AudioContext();
    successCallback = sinon.spy();
    errorCallback = sinon.spy();
  });

  describe("old API", function() {
    beforeEach(function() {
      audioContext.decodeAudioDataResultType = "void";
    });
    describe("(invalidAudioData: !ArrayBuffer, successCallback: function, errorCallback: function): void", function() {
      it("throws DOMException", function(done) {
        assert.throws(function() {
          audioContext._decodeAudioData("INVALID", successCallback, errorCallback);
        }, DOMException);

        assert(successCallback.callCount === 0);
        assert(errorCallback.callCount === 0);

        setTimeout(function() {
          assert(successCallback.callCount === 0);
          assert(errorCallback.callCount === 0);

          done();
        }, 25);
      });
    });
    describe("(audioData: ArrayBuffer, successCallback: !function, errorCallback: function): void", function() {
      it("throws TypeError", function(done) {
        assert.throws(function() {
          audioContext._decodeAudioData(WebAudioTestAPI.audioData, "INVALID", errorCallback);
        }, TypeError);

        assert(successCallback.callCount === 0);
        assert(errorCallback.callCount === 0);

        setTimeout(function() {
          assert(successCallback.callCount === 0);
          assert(errorCallback.callCount === 0);

          done();
        }, 25);
      });
    });
    describe("(audioData: ArrayBuffer, successCallback: function, errorCallback: function): void", function() {
      it("calls successCallback with an AudioBuffer", function(done) {
        audioContext._decodeAudioData(WebAudioTestAPI.audioData, successCallback, errorCallback);

        assert(successCallback.callCount === 0);
        assert(errorCallback.callCount === 0);

        setTimeout(function() {
          assert(successCallback.callCount === 1);
          assert(errorCallback.callCount === 0);
          assert(successCallback.firstCall.args[0] instanceof AudioBuffer);

          done();
        }, 25);
      });
    });
    describe("(invalidAudioData: ArrayBuffer, successCallback: function, errorCallback: function): void", function() {
      it("calls errorCallback with void", function(done) {
        audioContext._decodeAudioData(WebAudioTestAPI.invalidAudioData, successCallback, errorCallback);

        assert(successCallback.callCount === 0);
        assert(errorCallback.callCount === 0);

        setTimeout(function() {
          assert(successCallback.callCount === 0);
          assert(errorCallback.callCount === 1);
          assert(errorCallback.firstCall.args[0] === void 0);

          done();
        }, 25);
      });
    });
    describe("(audioData: ArrayBuffer, successCallback: function): void", function() {
      it("calls successCallback with an AudioBuffer", function(done) {
        audioContext._decodeAudioData(WebAudioTestAPI.audioData, successCallback);

        assert(successCallback.callCount === 0);
        assert(errorCallback.callCount === 0);

        setTimeout(function() {
          assert(successCallback.callCount === 1);
          assert(errorCallback.callCount === 0);
          assert(successCallback.firstCall.args[0] instanceof AudioBuffer);

          done();
        }, 25);
      });
    });
    describe("(invalidAudioData: ArrayBuffer, successCallback: function): void", function() {
      it("do nothing", function(done) {
        audioContext._decodeAudioData(WebAudioTestAPI.invalidAudioData, successCallback);

        assert(successCallback.callCount === 0);
        assert(errorCallback.callCount === 0);

        setTimeout(function() {
          assert(successCallback.callCount === 0);
          assert(errorCallback.callCount === 0);

          done();
        }, 25);
      });
    });
  });

  describe("new API", function() {
    var resolved, rejected;

    beforeEach(function() {
      audioContext.decodeAudioDataResultType = "promise";
      resolved = sinon.spy();
      rejected = sinon.spy();
    });
    describe("(invalidAudioData: !ArrayBuffer, successCallback: function, errorCallback: function): Promise<AudioBuffer>", function() {
      it("calls errorCallback and rejected with DOMException", function() {
        var promise = audioContext._decodeAudioData("INVALID", successCallback, errorCallback);

        promise = promise.then(resolved, rejected);

        assert(successCallback.callCount === 0);
        assert(errorCallback.callCount === 0);

        return promise.then(function() {
          assert(successCallback.callCount === 0);
          assert(errorCallback.callCount === 1);
          assert(errorCallback.firstCall.args[0] instanceof DOMException);
          assert(resolved.callCount === 0);
          assert(rejected.callCount === 1);
          assert(rejected.firstCall.args[0] instanceof DOMException);
        });
      });
    });
    describe("(audioData: ArrayBuffer, successCallback: function, errorCallback: function): Promise<AudioBuffer>", function() {
      it("calls successCallback and resolved with an AudioBuffer", function() {
        var promise = audioContext._decodeAudioData(WebAudioTestAPI.audioData, successCallback, errorCallback);

        promise = promise.then(resolved, rejected);

        assert(successCallback.callCount === 0);
        assert(errorCallback.callCount === 0);

        return promise.then(function() {
          assert(successCallback.callCount === 1);
          assert(errorCallback.callCount === 0);
          assert(successCallback.firstCall.args[0] instanceof AudioBuffer);
          assert(resolved.callCount === 1);
          assert(rejected.callCount === 0);
          assert(resolved.firstCall.args[0] instanceof AudioBuffer);
        });
      });
    });
    describe("(invalidAudioData: ArrayBuffer, successCallback: function, errorCallback: function):Promise<AudioBuffer>", function() {
      it("calls errorCallback and rejected with a DOMException", function() {
        var promise = audioContext._decodeAudioData(WebAudioTestAPI.invalidAudioData, successCallback, errorCallback);

        promise = promise.then(resolved, rejected);

        assert(successCallback.callCount === 0);
        assert(errorCallback.callCount === 0);

        return promise.then(function() {
          assert(successCallback.callCount === 0);
          assert(errorCallback.callCount === 1);
          assert(errorCallback.firstCall.args[0] instanceof DOMException);
          assert(resolved.callCount === 0);
          assert(rejected.callCount === 1);
          assert(rejected.firstCall.args[0] instanceof DOMException);
        });
      });
    });
    describe("(audioData: ArrayBuffer, successCallback: function): Promise<AudioBuffer>", function() {
      it("calls successCallback and resolved with an AudioBuffer", function() {
        var promise = audioContext._decodeAudioData(WebAudioTestAPI.audioData, successCallback);

        promise = promise.then(resolved, rejected);

        assert(successCallback.callCount === 0);
        assert(errorCallback.callCount === 0);

        return promise.then(function() {
          assert(successCallback.callCount === 1);
          assert(errorCallback.callCount === 0);
          assert(successCallback.firstCall.args[0] instanceof AudioBuffer);
          assert(resolved.callCount === 1);
          assert(rejected.callCount === 0);
          assert(resolved.firstCall.args[0] instanceof AudioBuffer);
        });
      });
    });
    describe("(invalidAudioData: ArrayBuffer, successCallback: function): Promise<AudioBuffer>", function() {
      it("rejected with a DOMException", function() {
        var promise = audioContext._decodeAudioData(WebAudioTestAPI.invalidAudioData, successCallback);

        promise = promise.then(resolved, rejected);

        assert(successCallback.callCount === 0);
        assert(errorCallback.callCount === 0);

        return promise.then(function() {
          assert(successCallback.callCount === 0);
          assert(errorCallback.callCount === 0);
          assert(resolved.callCount === 0);
          assert(rejected.callCount === 1);
          assert(rejected.firstCall.args[0] instanceof DOMException);
        });
      });
    });
    describe("(audioData: ArrayBuffer): Promise<AudioBuffer>", function() {
      it("resolved with an AudioBuffer", function() {
        var promise = audioContext._decodeAudioData(WebAudioTestAPI.audioData);

        promise = promise.then(resolved, rejected);

        assert(successCallback.callCount === 0);
        assert(errorCallback.callCount === 0);

        return promise.then(function() {
          assert(successCallback.callCount === 0);
          assert(errorCallback.callCount === 0);
          assert(resolved.callCount === 1);
          assert(rejected.callCount === 0);
          assert(resolved.firstCall.args[0] instanceof AudioBuffer);
        });
      });
    });
    describe("(invalidAudioData: ArrayBuffer): Promise<AudioBuffer>", function() {
      it("rejected with a DOMException", function() {
        var promise = audioContext._decodeAudioData(WebAudioTestAPI.invalidAudioData);

        promise = promise.then(resolved, rejected);

        assert(successCallback.callCount === 0);
        assert(errorCallback.callCount === 0);

        return promise.then(function() {
          assert(successCallback.callCount === 0);
          assert(errorCallback.callCount === 0);
          assert(resolved.callCount === 0);
          assert(rejected.callCount === 1);
          assert(rejected.firstCall.args[0] instanceof DOMException);
        });
      });
    });
  });

});
