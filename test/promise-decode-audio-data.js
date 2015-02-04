"use strict";

var assert = require("power-assert");
var sinon = require("sinon");
var WebAudioTestAPI = require("./lib/web-audio-test-api");
var DOMException = WebAudioTestAPI.DOMException;
var AudioContext = WebAudioTestAPI.AudioContext;
var AudioBuffer = WebAudioTestAPI.AudioBuffer;

require("../");

describe("AudioContext#decodeAudioData", function() {
  var audioContext;
  var successCallback, errorCallback;

  beforeEach(function() {
    audioContext = new AudioContext();
    successCallback = sinon.spy();
    errorCallback = sinon.spy();
  });
  describe("old API", function() {
    var resolved, rejected;

    beforeEach(function() {
      audioContext.decodeAudioDataResultType = "void";
      resolved = sinon.spy();
      rejected = sinon.spy();
    });
    describe("(invalidAudioData: !ArrayBuffer, successCallback: function, errorCallback: function): Promise<AudioBuffer>", function() {
      it("calls errorCallback and rejected with DOMException", function() {
        var promise = audioContext.decodeAudioData("INVALID", successCallback, errorCallback);

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
      it("calls successCallback and resolved with AudioBuffer", function() {
        var promise = audioContext.decodeAudioData(WebAudioTestAPI.audioData, successCallback, errorCallback);

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
    describe("(invalidAudioData: ArrayBuffer, successCallback: function, errorCallback: function): Promise<AudioBuffer>", function() {
      it("calls errorCallback and rejected with void", function() {
        var promise = audioContext.decodeAudioData(WebAudioTestAPI.invalidAudioData, successCallback, errorCallback);

        promise = promise.then(resolved, rejected);

        assert(successCallback.callCount === 0);
        assert(errorCallback.callCount === 0);

        return promise.then(function() {
          assert(successCallback.callCount === 0);
          assert(errorCallback.callCount === 1);
          assert(errorCallback.firstCall.args[0] === void 0);
          assert(resolved.callCount === 0);
          assert(rejected.callCount === 1);
          assert(rejected.firstCall.args[0]=== void 0);
        });
      });
    });
    describe("(audioData: ArrayBuffer, successCallback: function): Promise<AudioBuffer>", function() {
      it("calls successCallback and resolved with an AudioBuffer", function() {
        var promise = audioContext.decodeAudioData(WebAudioTestAPI.audioData, successCallback);

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
      it("rejected with void", function() {
        var promise = audioContext.decodeAudioData(WebAudioTestAPI.invalidAudioData, successCallback);

        promise = promise.then(resolved, rejected);

        assert(successCallback.callCount === 0);
        assert(errorCallback.callCount === 0);

        return promise.then(function() {
          assert(successCallback.callCount === 0);
          assert(errorCallback.callCount === 0);
          assert(resolved.callCount === 0);
          assert(rejected.callCount === 1);
          assert(rejected.firstCall.args[0] === void 0);
        });
      });
    });
    describe("(audioData: ArrayBuffer): Promise<AudioBuffer>", function() {
      it("resolved with an AudioBuffer", function() {
        var promise = audioContext.decodeAudioData(WebAudioTestAPI.audioData);

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
      it("rejected with void", function() {
        var promise = audioContext.decodeAudioData(WebAudioTestAPI.invalidAudioData);

        promise = promise.then(resolved, rejected);

        assert(successCallback.callCount === 0);
        assert(errorCallback.callCount === 0);

        return promise.then(function() {
          assert(successCallback.callCount === 0);
          assert(errorCallback.callCount === 0);
          assert(resolved.callCount === 0);
          assert(rejected.callCount === 1);
          assert(rejected.firstCall.args[0] === void 0);
        });
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
      it("calls errorCallback and rejected with a DOMException", function() {
        var promise = audioContext.decodeAudioData("INVALID", successCallback, errorCallback);

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
        var promise = audioContext.decodeAudioData(WebAudioTestAPI.audioData, successCallback, errorCallback);

        promise = promise.then(resolved, rejected);

        assert(successCallback.callCount === 0);
        assert(errorCallback.callCount === 0);

        promise.then(function() {
          assert(successCallback.callCount === 1);
          assert(errorCallback.callCount === 0);
          assert(successCallback.firstCall.args[0] instanceof AudioBuffer);
          assert(resolved.callCount === 1);
          assert(rejected.callCount === 0);
          assert(resolved.firstCall.args[0] instanceof AudioBuffer);
        });
      });
    });
    describe("(invalidAudioData: ArrayBuffer, successCallback: function, errorCallback: function): Promise<AudioBuffer>", function() {
      it("calls errorCallback and rejected with a DOMException", function() {
        var promise = audioContext.decodeAudioData(WebAudioTestAPI.invalidAudioData, successCallback, errorCallback);

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
        var promise = audioContext.decodeAudioData(WebAudioTestAPI.audioData, successCallback);

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
        var promise = audioContext.decodeAudioData(WebAudioTestAPI.invalidAudioData, successCallback);

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
        var promise = audioContext.decodeAudioData(WebAudioTestAPI.audioData);

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
        var promise = audioContext.decodeAudioData(WebAudioTestAPI.invalidAudioData);

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
