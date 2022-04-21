//const utils = require('./utils')
// const hello_debug = require('../pages/index/hello.js')
// Module = {};
// Module.onRuntimeInitialized = function() {
//   Module._add(12,3);
//   console.log(Module._add(12,4));
// };
// const Module = require('../pages/index/hello_glue.js');
var cv_start_time = Date.now();
const cv_debug = require('./MyExample.js');
var require_duration = (Date.now() - cv_start_time);
console.log('require_duration:', String(require_duration) + 'ms');

// cv_debug.Module = {}
// cv_debug.Module.onRuntimeInitialized = function() {
//   console.log('cv_debug', cv_debug);
//   console.log('cv add ', cv_debug.Module._add(1,2));
//   var cv_duration = (Date.now() - cv_start_time);
//   console.log('cv_duration1:', String(cv_duration) + 'ms');
// }

var result_wasm = 0;
worker.onMessage(function (msg) {
  var start_time = Date.now();
  // processing of workder
  var duration = (Date.now() - start_time);
  console.log(msg, String(duration) + 'ms');

  setTimeout(() => {
    console.log('cv_debug', cv_debug);
    console.log('cv add ', cv_debug.Module._add(1,2));
    // console.log('cv add ', cv_debug.Module._cv_test());
    var cv_duration = (Date.now() - cv_start_time);
    console.log('cv_duration1:', String(cv_duration) + 'ms');
    result_wasm = cv_debug.Module._add(1,5);
    worker.postMessage({
      msg: 'result of worker wasm' + String(result_wasm)
    })
  }, 1000);

  worker.postMessage({
    msg: 'result of worker' + String(result_wasm)
  })
})