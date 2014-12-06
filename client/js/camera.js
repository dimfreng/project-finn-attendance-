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

var start = document.querySelector('#startAgain');
start.addEventListener('click', function () {
    startCaptureImage();
    return false;
}, false);
 
var capture = document.querySelector('#capture');
capture.addEventListener('click', function () {
    if (!localStream) {
        alert("please allow camera before capturing!   PLEASE TIME-IN AGAIN :)");
         localStream = null;
         window.location="/login.html";
    }
    
    var img = document.querySelector('#snapshot');
    img.width = canvas.width = video.videoWidth;
    img.height = canvas.height = video.videoHeight;
 
    ctx.drawImage(video,0,0);
    localStorage.setItem('image',canvas.toDataURL('image/webp'));
    img.src = canvas.toDataURL('image/webp');
    localStream.stop();
    localStream = null;
    


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