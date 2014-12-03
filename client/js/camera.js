navigator.getUserMedia  = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;
 
var localStream = null;
 
var canvas = document.querySelector('#snapshot');
var video = document.querySelector('#preview');
 
var ctx = canvas.getContext('2d');
 
var start = document.querySelector('#start');
start.addEventListener('click', function () {
    startCaptureImage();
    return false;
}, false);
 
var capture = document.querySelector('#capture');
capture.addEventListener('click', function () {
    if (!localStream) {
        return;
    }
 
    var img = document.querySelector('#snapshot');
    img.width = canvas.width = video.videoWidth;
    img.height = canvas.height = video.videoHeight;
 
    ctx.drawImage(video,0,0);
    console.log(canvas.toDataURL('image/png'));
    img.src = canvas.toDataURL('image/webp');
localStorage.setItem('canvas', canvas.toDataURL('image/png'));

}, false);
 
function errorCallback(err) {
    console.error('Failed', err);
}
 
function startCaptureImage() {
    navigator.getUserMedia({video: true}, function(data) {
        video.src = window.URL.createObjectURL(data);
        localStream = data;
    }, errorCallback);
}