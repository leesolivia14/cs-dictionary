function blobToFile (theBlob, fileName) {
    var b = theBlob;
        //Add properties to the blob
    b.lastModifiedDate = new Date();
    b.name = fileName;
    return theBlob;
}

let constraintObj = { 
    audio: true, 
    video: false,
}; 


//handle older browsers that might implement getUserMedia in some way
if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
    navigator.mediaDevices.getUserMedia = function(constraintObj) {
        let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
        }
        return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraintObj, resolve, reject);
        });
    }
}else{
    navigator.mediaDevices.enumerateDevices()
    .then(devices => {
    devices.forEach(device=>{
        console.log(device.kind.toUpperCase(), device.label);
                //, device.deviceId
        })
    })
    .catch(err=>{
        console.log(err.name, err.message);
    })
}


navigator.mediaDevices.getUserMedia(constraintObj)
.then(function(mediaStreamObj) {
    //connect the media stream to the first video element
    let video = document.querySelector('video');
    if ("srcObject" in video) {
        video.srcObject = mediaStreamObj;
    } else {
         //old version
        video.src = window.URL.createObjectURL(mediaStreamObj);
    }
        
    video.onloadedmetadata = function(ev) {
            //show in the video element what is being captured by the webcam
            // video.play();
    };
        
        //add listeners for saving video/audio
    let start = document.getElementById('btnStart');
    let stop = document.getElementById('btnStop');
    let vidSave = document.getElementById('vid2');
    let mediaRecorder = new MediaRecorder(mediaStreamObj);
    let chunks = [];
        
    start.addEventListener('click', (ev)=>{
        mediaRecorder.start();
        console.log(mediaRecorder.state);
    })
    stop.addEventListener('click', (ev)=>{
        mediaRecorder.stop();
        console.log(mediaRecorder.state);
    });
    mediaRecorder.ondataavailable = function(ev) {
        chunks.push(ev.data);
    }
        

    mediaRecorder.onstop = (ev)=>{
        let blob = new Blob(chunks, { 'type' : 'wav;' });
        chunks = [];
        let videoURL = window.URL.createObjectURL(blob);
        vidSave.src = videoURL;
        var file = blobToFile(blob, "my-recording.wav");
            


            // var fd = new FormData();
            // fd.append('fname', 'test.wav');
            // fd.append('data', soundBlob);
            // $.ajax({
            //     type: 'POST',
            //     url: '/upload.php',
            //     data: fd,
            //     processData: false,
            //     contentType: false
            // }).done(function(data) {
            //     console.log(data);
            // });


            // document.write(videoURL);
            // console.log(vidSave);
            
    }
        
})



.catch(function(err) { 
    console.log(err.name, err.message); 
});
    
    /*********************************
    getUserMedia returns a Promise
    resolve - returns a MediaStream Object
    reject returns one of the following errors
    AbortError - generic unknown cause
    NotAllowedError (SecurityError) - user rejected permissions
    NotFoundError - missing media track
    NotReadableError - user permissions given but hardware/OS error
    OverconstrainedError - constraint video settings preventing
    TypeError - audio: false, video: false
    *********************************/

    

    //azure code starts here

const fs = require('fs');
const sdk = require("microsoft-cognitiveservices-speech-sdk");
const speechConfig = sdk.SpeechConfig.fromSubscription("f60a0e39516d4962ad6a239a77cc7ce1", "eastus");
speechConfig.speechRecognitionLanguage = "en-US";

function fromFile(blob) {
        
    let audioConfig = sdk.AudioConfig.fromWavFileInput(fs.readFileSync(blob));
    let speechRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    speechRecognizer.recognizeOnceAsync(result => {
        switch (result.reason) {
            case sdk.ResultReason.RecognizedSpeech:
                console.log(`RECOGNIZED: Text=${result.text}`);
                break;
            case sdk.ResultReason.NoMatch:
                console.log("NOMATCH: Speech could not be recognized.");
                break;
            case sdk.ResultReason.Canceled:
                const cancellation = CancellationDetails.fromResult(result);
                console.log(`CANCELED: Reason=${cancellation.reason}`);

                if (cancellation.reason == sdk.CancellationReason.Error) {
                    console.log(`CANCELED: ErrorCode=${cancellation.ErrorCode}`);
                    console.log(`CANCELED: ErrorDetails=${cancellation.errorDetails}`);
                    console.log("CANCELED: Did you update the key and location/region info?");
                }
                break;
        }    
        speechRecognizer.close();
    });
}
    
console.log("heyyy");
fromFile(blob);




