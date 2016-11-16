# < Promise > decodeAudioData
[![Build Status](https://img.shields.io/travis/mohayonao/promise-decode-audio-data.svg?style=flat-square)](https://travis-ci.org/mohayonao/promise-decode-audio-data)
[![NPM Version](https://img.shields.io/npm/v/promise-decode-audio-data.svg?style=flat-square)](https://www.npmjs.org/package/node-pico)
[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://mohayonao.mit-license.org/)

> Promise-based decodeAudioData for legacy Web Audio API

## Specification

[https://www.w3.org/TR/webaudio/](https://www.w3.org/TR/webaudio/#widl-BaseAudioContext-decodeAudioData-Promise-AudioBuffer--ArrayBuffer-audioData-DecodeSuccessCallback-successCallback-DecodeErrorCallback-errorCallback)

## Native API supports
|                       | Support              |
| --------------------- |:--------------------:|
| Firefox               | :white_check_mark:   |
| Chrome 49+            | :white_check_mark:   |
| Older Chrome versions | :x:                  |
| Opera                 | :x:                  |
| Safari                | :x:                  |
| Edge                  | Unknown              |
| Internet Explorer     | :x: No Web Audio API |

See [here](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/decodeAudioData#compat-desktop) for full details.

## Installation

```
npm install promise-decode-audio-data
```

#### downloads

- [promise-decode-audio-data.js](https://raw.githubusercontent.com/mohayonao/promise-decode-audio-data/master/build/promise-decode-audio-data.js)
- [promise-decode-audio-data.min.js](https://raw.githubusercontent.com/mohayonao/promise-decode-audio-data/master/build/promise-decode-audio-data.min.js)

## API
- `AudioContext.prototype.decodeAudioData(audioData: ArrayBuffer): Promise<AudioBuffer>`

## Example
```javascript
var audioContext = new AudioContext();

audioContext.decodeAudioData(audioData).then(function(decodedData) {
  // use the decoded data here
});
```

## License

MIT
