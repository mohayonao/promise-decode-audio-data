"use strict";

var assert = require("power-assert");
var sinon = require("sinon");
var WebAudioTestAPI = require("./lib/web-audio-test-api");
var AudioContext = WebAudioTestAPI.AudioContext;
var AudioBuffer = WebAudioTestAPI.AudioBuffer;

require("../");

describe("AudioContext#decodeAudioData", function() {
  var audioContext;
  var audioData, success, failed;

  beforeEach(function() {
    audioContext = new AudioContext();
    audioData = new Uint8Array(4096).buffer;
    success = sinon.spy();
    failed = sinon.spy();
  });
  describe("old API", function() {
    var resolve, reject;

    beforeEach(function() {
      audioContext.decodeAudioDataResultType = "void";
      resolve = sinon.spy();
      reject = sinon.spy();
    });
    it("(audioData: !ArrayBuffer, success: function, failed: function): void", function() {
      var promise = audioContext.decodeAudioData("INVALID", success, failed);

      promise = promise.then(resolve, reject);

      assert(success.callCount === 0);
      assert(failed.callCount === 0);

      return promise.then(function() {
        assert(success.callCount === 0);
        assert(failed.callCount === 1);
        assert.throws(function() {
          throw failed.firstCall.args[0];
        }, function(e) {
          return e.message === "NotSupportedError";
        });
        assert(resolve.callCount === 0);
        assert(reject.callCount === 1);
        assert.throws(function() {
          throw reject.firstCall.args[0];
        }, function(e) {
          return e.message === "NotSupportedError";
        });
      });
    });
    it("(audioData: ArrayBuffer, success: function, failed: function): void -> success", function() {
      audioContext.decodeAudioDataDecodedData = new AudioBuffer();
      audioContext.decodeAudioDataFailed = false;

      var promise = audioContext.decodeAudioData(audioData, success, failed);

      promise = promise.then(resolve, reject);

      assert(success.callCount === 0);
      assert(failed.callCount === 0);

      return promise.then(function() {
        assert(success.callCount === 1);
        assert(failed.callCount === 0);
        assert(success.firstCall.calledWith(audioContext.decodeAudioDataDecodedData));
        assert(resolve.callCount === 1);
        assert(reject.callCount === 0);
        assert(resolve.firstCall.calledWith(audioContext.decodeAudioDataDecodedData));
      });
    });
    it("(audioData: ArrayBuffer, success: function, failed: function): void -> failed", function() {
      audioContext.decodeAudioDataDecodedData = new AudioBuffer();
      audioContext.decodeAudioDataFailed = true;

      var promise = audioContext.decodeAudioData(audioData, success, failed);

      promise = promise.then(resolve, reject);

      assert(success.callCount === 0);
      assert(failed.callCount === 0);

      return promise.then(function() {
        assert(success.callCount === 0);
        assert(failed.callCount === 1);
        assert.throws(function() {
          throw failed.firstCall.args[0];
        }, function(e) {
          return e.message === "EncodingError";
        });
        assert(resolve.callCount === 0);
        assert(reject.callCount === 1);
        assert.throws(function() {
          throw reject.firstCall.args[0];
        }, function(e) {
          return e.message === "EncodingError";
        });
      });
    });
    it("(audioData: ArrayBuffer, success: function): void -> success", function() {
      audioContext.decodeAudioDataDecodedData = new AudioBuffer();
      audioContext.decodeAudioDataFailed = false;

      var promise = audioContext.decodeAudioData(audioData, success);

      promise = promise.then(resolve, reject);

      assert(success.callCount === 0);
      assert(failed.callCount === 0);

      return promise.then(function() {
        assert(success.callCount === 1);
        assert(failed.callCount === 0);
        assert(success.firstCall.calledWith(audioContext.decodeAudioDataDecodedData));
        assert(resolve.callCount === 1);
        assert(reject.callCount === 0);
        assert(resolve.firstCall.calledWith(audioContext.decodeAudioDataDecodedData));
      });
    });
    it("(audioData: ArrayBuffer, success: function): void -> failed", function() {
      audioContext.decodeAudioDataDecodedData = new AudioBuffer();
      audioContext.decodeAudioDataFailed = true;

      var promise = audioContext.decodeAudioData(audioData, success);

      promise = promise.then(resolve, reject);

      assert(success.callCount === 0);
      assert(failed.callCount === 0);

      return promise.then(function() {
        assert(success.callCount === 0);
        assert(failed.callCount === 0);
        assert(resolve.callCount === 0);
        assert(reject.callCount === 1);
        assert.throws(function() {
          throw reject.firstCall.args[0];
        }, function(e) {
          return e.message === "EncodingError";
        });
      });
    });
    it("(audioData: ArrayBuffer): void -> success", function() {
      audioContext.decodeAudioDataDecodedData = new AudioBuffer();
      audioContext.decodeAudioDataFailed = false;

      var promise = audioContext.decodeAudioData(audioData);

      promise = promise.then(resolve, reject);

      assert(success.callCount === 0);
      assert(failed.callCount === 0);

      return promise.then(function() {
        assert(success.callCount === 0);
        assert(failed.callCount === 0);
        assert(resolve.callCount === 1);
        assert(reject.callCount === 0);
        assert(resolve.firstCall.calledWith(audioContext.decodeAudioDataDecodedData));
      });
    });
    it("(audioData: ArrayBuffer): void -> failed", function() {
      audioContext.decodeAudioDataDecodedData = new AudioBuffer();
      audioContext.decodeAudioDataFailed = true;

      var promise = audioContext.decodeAudioData(audioData);

      promise = promise.then(resolve, reject);

      assert(success.callCount === 0);
      assert(failed.callCount === 0);

      return promise.then(function() {
        assert(success.callCount === 0);
        assert(failed.callCount === 0);
        assert(resolve.callCount === 0);
        assert(reject.callCount === 1);
        assert.throws(function() {
          throw reject.firstCall.args[0];
        }, function(e) {
          return e.message === "EncodingError";
        });
      });
    });
  });

  describe("new API", function() {
    var resolve, reject;

    beforeEach(function() {
      audioContext.decodeAudioDataResultType = "promise";
      resolve = sinon.spy();
      reject = sinon.spy();
    });
    it("(audioData: !ArrayBuffer, success: function, failed: function): void", function() {
      var promise = audioContext.decodeAudioData("INVALID", success, failed);

      promise = promise.then(resolve, reject);

      assert(success.callCount === 0);
      assert(failed.callCount === 0);

      return promise.then(function() {
        assert(success.callCount === 0);
        assert(failed.callCount === 1);
        assert.throws(function() {
          throw failed.firstCall.args[0];
        }, function(e) {
          return e.message === "NotSupportedError";
        });
        assert(resolve.callCount === 0);
        assert(reject.callCount === 1);
        assert.throws(function() {
          throw reject.firstCall.args[0];
        }, function(e) {
          return e.message === "NotSupportedError";
        });
      });
    });
    it("(audioData: ArrayBuffer, success: function, failed: function): void -> success", function() {
      audioContext.decodeAudioDataDecodedData = new AudioBuffer();
      audioContext.decodeAudioDataFailed = false;

      var promise = audioContext.decodeAudioData(audioData, success, failed);

      promise = promise.then(resolve, reject);

      assert(success.callCount === 0);
      assert(failed.callCount === 0);

      promise.then(function() {
        assert(success.callCount === 1);
        assert(failed.callCount === 0);
        assert(success.firstCall.calledWith(audioContext.decodeAudioDataDecodedData));
        assert(resolve.callCount === 1);
        assert(reject.callCount === 0);
        assert(resolve.firstCall.calledWith(audioContext.decodeAudioDataDecodedData));
      });
    });
    it("(audioData: ArrayBuffer, success: function, failed: function): void -> failed", function() {
      audioContext.decodeAudioDataDecodedData = new AudioBuffer();
      audioContext.decodeAudioDataFailed = true;

      var promise = audioContext.decodeAudioData(audioData, success, failed);

      promise = promise.then(resolve, reject);

      assert(success.callCount === 0);
      assert(failed.callCount === 0);

      return promise.then(function() {
        assert(success.callCount === 0);
        assert(failed.callCount === 1);
        assert.throws(function() {
          throw failed.firstCall.args[0];
        }, function(e) {
          return e.message === "EncodingError";
        });
        assert(resolve.callCount === 0);
        assert(reject.callCount === 1);
        assert.throws(function() {
          throw reject.firstCall.args[0];
        }, function(e) {
          return e.message === "EncodingError";
        });
      });
    });
    it("(audioData: ArrayBuffer, success: function): void -> success", function() {
      audioContext.decodeAudioDataDecodedData = new AudioBuffer();
      audioContext.decodeAudioDataFailed = false;

      var promise = audioContext.decodeAudioData(audioData, success);

      promise = promise.then(resolve, reject);

      assert(success.callCount === 0);
      assert(failed.callCount === 0);

      return promise.then(function() {
        assert(success.callCount === 1);
        assert(failed.callCount === 0);
        assert(success.firstCall.calledWith(audioContext.decodeAudioDataDecodedData));
        assert(resolve.callCount === 1);
        assert(reject.callCount === 0);
        assert(resolve.firstCall.calledWith(audioContext.decodeAudioDataDecodedData));
      });
    });
    it("(audioData: ArrayBuffer, success: function): void -> failed", function() {
      audioContext.decodeAudioDataDecodedData = new AudioBuffer();
      audioContext.decodeAudioDataFailed = true;

      var promise = audioContext.decodeAudioData(audioData, success);

      promise = promise.then(resolve, reject);

      assert(success.callCount === 0);
      assert(failed.callCount === 0);

      return promise.then(function() {
        assert(success.callCount === 0);
        assert(failed.callCount === 0);
        assert(resolve.callCount === 0);
        assert(reject.callCount === 1);
        assert.throws(function() {
          throw reject.firstCall.args[0];
        }, function(e) {
          return e.message === "EncodingError";
        });
      });
    });
    it("(audioData: ArrayBuffer): void -> success", function() {
      audioContext.decodeAudioDataDecodedData = new AudioBuffer();
      audioContext.decodeAudioDataFailed = false;

      var promise = audioContext.decodeAudioData(audioData);

      promise = promise.then(resolve, reject);

      assert(success.callCount === 0);
      assert(failed.callCount === 0);

      return promise.then(function() {
        assert(success.callCount === 0);
        assert(failed.callCount === 0);
        assert(resolve.callCount === 1);
        assert(reject.callCount === 0);
        assert(resolve.firstCall.calledWith(audioContext.decodeAudioDataDecodedData));
      });
    });
    it("(audioData: ArrayBuffer): void -> failed", function() {
      audioContext.decodeAudioDataDecodedData = new AudioBuffer();
      audioContext.decodeAudioDataFailed = true;

      var promise = audioContext.decodeAudioData(audioData);

      promise = promise.then(resolve, reject);

      assert(success.callCount === 0);
      assert(failed.callCount === 0);

      return promise.then(function() {
        assert(success.callCount === 0);
        assert(failed.callCount === 0);
        assert(resolve.callCount === 0);
        assert(reject.callCount === 1);
        assert.throws(function() {
          throw reject.firstCall.args[0];
        }, function(e) {
          return e.message === "EncodingError";
        });
      });
    });
  });

});
