"use strict";

var assert = require("power-assert");
var sinon = require("sinon");
var WebAudioTestAPI = require("./lib/web-audio-test-api");
var AudioContext = WebAudioTestAPI.AudioContext;
var AudioBuffer = WebAudioTestAPI.AudioBuffer;

describe("WebAudioTestAPI.AudioContext#decodeAudioData", function() {
  var audioContext;
  var audioData, success, failed;

  beforeEach(function() {
    audioContext = new AudioContext();
    audioData = new Uint8Array(4096).buffer;
    success = sinon.spy();
    failed = sinon.spy();
  });

  describe("old API", function() {
    beforeEach(function() {
      audioContext.decodeAudioDataResultType = "void";
    });
    it("(audioData: !ArrayBuffer, success: function, failed: function): void", function(done) {
      assert.throws(function() {
        audioContext._decodeAudioData("INVALID", success, failed);
      }, function(e) {
        return e.message === "NotSupportedError";
      });

      assert(success.callCount === 0);
      assert(failed.callCount === 0);

      setTimeout(function() {
        assert(success.callCount === 0);
        assert(failed.callCount === 0);

        done();
      }, 25);
    });
    it("(audioData: ArrayBuffer, success:!function, failed: function): void", function(done) {
      assert.throws(function() {
        audioContext._decodeAudioData(audioData, "INVALID", failed);
      }, function(e) {
        return e.message === "TypeError";
      });

      assert(success.callCount === 0);
      assert(failed.callCount === 0);

      setTimeout(function() {
        assert(success.callCount === 0);
        assert(failed.callCount === 0);

        done();
      }, 25);
    });
    it("(audioData: ArrayBuffer, success: function, failed: function): void -> success", function(done) {
      audioContext.decodeAudioDataDecodedData = new AudioBuffer();
      audioContext.decodeAudioDataFailed = false;

      audioContext._decodeAudioData(audioData, success, failed);

      assert(success.callCount === 0);
      assert(failed.callCount === 0);

      setTimeout(function() {
        assert(success.callCount === 1);
        assert(failed.callCount === 0);
        assert(success.firstCall.calledWith(audioContext.decodeAudioDataDecodedData));

        done();
      }, 25);
    });
    it("(audioData: ArrayBuffer, success: function, failed: function): void -> failed", function(done) {
      audioContext.decodeAudioDataDecodedData = new AudioBuffer();
      audioContext.decodeAudioDataFailed = true;

      audioContext._decodeAudioData(audioData, success, failed);

      assert(success.callCount === 0);
      assert(failed.callCount === 0);

      setTimeout(function() {
        assert(success.callCount === 0);
        assert(failed.callCount === 1);
        assert.throws(function() {
          throw failed.firstCall.args[0];
        }, function(e) {
          return e.message === "EncodingError";
        });

        done();
      }, 25);
    });
    it("(audioData: ArrayBuffer, success: function): void -> success", function(done) {
      audioContext.decodeAudioDataDecodedData = new AudioBuffer();
      audioContext.decodeAudioDataFailed = false;

      audioContext._decodeAudioData(audioData, success);

      assert(success.callCount === 0);
      assert(failed.callCount === 0);

      setTimeout(function() {
        assert(success.callCount === 1);
        assert(failed.callCount === 0);
        assert(success.firstCall.calledWith(audioContext.decodeAudioDataDecodedData));

        done();
      }, 25);
    });
    it("(audioData: ArrayBuffer, success: function): void -> failed", function(done) {
      audioContext.decodeAudioDataDecodedData = new AudioBuffer();
      audioContext.decodeAudioDataFailed = true;

      audioContext._decodeAudioData(audioData, success);

      assert(success.callCount === 0);
      assert(failed.callCount === 0);

      setTimeout(function() {
        assert(success.callCount === 0);
        assert(failed.callCount === 0);

        done();
      }, 25);
    });
  });

  describe("new API", function() {
    var resolve, reject;

    beforeEach(function() {
      audioContext.decodeAudioDataResultType = "promise";
      resolve = sinon.spy();
      reject = sinon.spy();
    });
    it("(audioData: !ArrayBuffer, success: function, failed: function): void", function(done) {
      var promise = audioContext._decodeAudioData("INVALID", success, failed);

      promise.then(resolve, reject);

      assert(success.callCount === 0);
      assert(failed.callCount === 0);
      assert(resolve.callCount === 0);
      assert(reject.callCount === 0);

      setTimeout(function() {
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

        done();
      }, 25);
    });
    it("(audioData: ArrayBuffer, success: function, failed: function): void -> success", function(done) {
      audioContext.decodeAudioDataDecodedData = new AudioBuffer();
      audioContext.decodeAudioDataFailed = false;

      var promise = audioContext._decodeAudioData(audioData, success, failed);

      promise.then(resolve, reject);

      assert(success.callCount === 0);
      assert(failed.callCount === 0);
      assert(resolve.callCount === 0);
      assert(reject.callCount === 0);

      setTimeout(function() {
        assert(success.callCount === 1);
        assert(failed.callCount === 0);
        assert(success.firstCall.calledWith(audioContext.decodeAudioDataDecodedData));
        assert(resolve.callCount === 1);
        assert(reject.callCount === 0);
        assert(resolve.firstCall.calledWith(audioContext.decodeAudioDataDecodedData));

        done();
      }, 25);
    });
    it("(audioData: ArrayBuffer, success: function, failed: function): void -> failed", function(done) {
      audioContext.decodeAudioDataDecodedData = new AudioBuffer();
      audioContext.decodeAudioDataFailed = true;

      var promise = audioContext._decodeAudioData(audioData, success, failed);

      promise.then(resolve, reject);

      assert(success.callCount === 0);
      assert(failed.callCount === 0);
      assert(resolve.callCount === 0);
      assert(reject.callCount === 0);

      setTimeout(function() {
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

        done();
      }, 25);
    });
    it("(audioData: ArrayBuffer, success: function): void -> success", function(done) {
      audioContext.decodeAudioDataDecodedData = new AudioBuffer();
      audioContext.decodeAudioDataFailed = false;

      var promise = audioContext._decodeAudioData(audioData, success);

      promise.then(resolve, reject);

      assert(success.callCount === 0);
      assert(failed.callCount === 0);
      assert(resolve.callCount === 0);
      assert(reject.callCount === 0);

      setTimeout(function() {
        assert(success.callCount === 1);
        assert(failed.callCount === 0);
        assert(success.firstCall.calledWith(audioContext.decodeAudioDataDecodedData));
        assert(resolve.callCount === 1);
        assert(reject.callCount === 0);
        assert(resolve.firstCall.calledWith(audioContext.decodeAudioDataDecodedData));

        done();
      }, 25);
    });
    it("(audioData: ArrayBuffer, success: function): void -> failed", function(done) {
      audioContext.decodeAudioDataDecodedData = new AudioBuffer();
      audioContext.decodeAudioDataFailed = true;

      var promise = audioContext._decodeAudioData(audioData, success);

      promise.then(resolve, reject);

      assert(success.callCount === 0);
      assert(failed.callCount === 0);
      assert(resolve.callCount === 0);
      assert(reject.callCount === 0);

      setTimeout(function() {
        assert(success.callCount === 0);
        assert(failed.callCount === 0);
        assert(resolve.callCount === 0);
        assert(reject.callCount === 1);
        assert.throws(function() {
          throw reject.firstCall.args[0];
        }, function(e) {
          return e.message === "EncodingError";
        });
        done();
      }, 25);
    });
    it("(audioData: ArrayBuffer): void -> success", function(done) {
      audioContext.decodeAudioDataDecodedData = new AudioBuffer();
      audioContext.decodeAudioDataFailed = false;

      var promise = audioContext._decodeAudioData(audioData);

      promise.then(resolve, reject);

      assert(success.callCount === 0);
      assert(failed.callCount === 0);
      assert(resolve.callCount === 0);
      assert(reject.callCount === 0);

      setTimeout(function() {
        assert(success.callCount === 0);
        assert(failed.callCount === 0);
        assert(resolve.callCount === 1);
        assert(reject.callCount === 0);
        assert(resolve.firstCall.calledWith(audioContext.decodeAudioDataDecodedData));

        done();
      }, 25);
    });
    it("(audioData: ArrayBuffer): void -> failed", function(done) {
      audioContext.decodeAudioDataDecodedData = new AudioBuffer();
      audioContext.decodeAudioDataFailed = true;

      var promise = audioContext._decodeAudioData(audioData);

      promise.then(resolve, reject);

      assert(success.callCount === 0);
      assert(failed.callCount === 0);
      assert(resolve.callCount === 0);
      assert(reject.callCount === 0);

      setTimeout(function() {
        assert(success.callCount === 0);
        assert(failed.callCount === 0);
        assert(resolve.callCount === 0);
        assert(reject.callCount === 1);
        assert.throws(function() {
          throw reject.firstCall.args[0];
        }, function(e) {
          return e.message === "EncodingError";
        });

        done();
      }, 25);
    });
  });

});
