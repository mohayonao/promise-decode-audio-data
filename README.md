# < Promise > decodeAudioData
[![Build Status](http://img.shields.io/travis/mohayonao/promise-decode-audio-data.svg?style=flat-square)](https://travis-ci.org/mohayonao/promise-decode-audio-data)
[![NPM Version](http://img.shields.io/npm/v/promise-decode-audio-data.svg?style=flat-square)](https://www.npmjs.org/package/node-pico)
[![Bower](https://img.shields.io/bower/v/promise-decode-audio-data.svg?style=flat-square)](https://github.com/mohayonao/promise-decode-audio-data)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](http://mohayonao.mit-license.org/)

> Promise-based decodeAudioData for legacy Web Audio API

[http://webaudio.github.io/web-audio-api/#AudioContext-decodeAudioData](http://webaudio.github.io/web-audio-api/#widl-AudioContext-decodeAudioData-Promise-AudioBuffer--ArrayBuffer-audioData-DecodeSuccessCallback-successCallback-DecodeErrorCallback-errorCallback)

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

npm:
```
npm install promise-decode-audio-data
```

bower:
```
bower install promise-decode-audio-data
```

downloads:
- [promise-decode-audio-data.js](https://raw.githubusercontent.com/mohayonao/promise-decode-audio-data/master/lib/promise-decode-audio-data.js)

In a browser:
```html
<script src="/path/to/promise-decode-audio-data.js"></script>
```

## API
- `AudioContext.prototype.decodeAudioData(audioData: ArrayBuffer): Promise<AudioBuffer>`

## Example
```javascript
var audioContext = new AudioContext();

audioContext.decodeAudioData(audioData).then(function(decodedData) {
  // use the decoded data here
});
```

## Development
build: `browserify -> uglify`
```
npm run build
```

test: `mocha` (and [Online test suite](http://mohayonao.github.io/promise-decode-audio-data/))
```
npm run test
```

lint: `jshint`
```
npm run lint
```

## License
MIT
