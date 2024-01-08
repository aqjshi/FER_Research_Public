

const newMedia = document.getElementById('newMedia');
const repMedia = document.getElementById('repMedia');
const camera = document.getElementById('camera');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const partyButton = document.getElementById('partyButton');

index = 0; 
// Array of video file names
videos = ["sample18.mp4",    "sample28.mp4",    "sample38.mp4",    "sample48.mp4",    "sample58.mp4",
"sample1.mp4",     "sample19.mp4",    "sample29.mp4",    "sample39.mp4",    "sample49.mp4",    "sample59.mp4",
"sample10.mp4",    "sample20.mp4",    "sample30.mp4",    "sample40.mp4",    "sample50.mp4",    "sample60.mp4",
"sample11.mp4",    "sample21.mp4",    "sample31.mp4",    "sample41.mp4",    "sample51.mp4",    "sample61.mp4",
"sample12.mp4",    "sample22.mp4",    "sample32.mp4",    "sample42.mp4",    "sample52.mp4",    "sample62.mp4",
"sample13.mp4",    "sample23.mp4",    "sample33.mp4",    "sample43.mp4",    "sample53.mp4",    "sample63.mp4",
"sample14.mp4",    "sample24.mp4",    "sample34.mp4",    "sample44.mp4",    "sample54.mp4",
"sample15.mp4",    "sample25.mp4",    "sample35.mp4",    "sample45.mp4",    "sample55.mp4",
"sample16.mp4",    "sample26.mp4",    "sample36.mp4",    "sample46.mp4",    "sample56.mp4",
"sample17.mp4",    "sample27.mp4",    "sample37.mp4",    "sample47.mp4",    "sample57.mp4"]; // Add more as needed


// Replace media area with pictures or videos from the internet
newMedia.addEventListener('click', function () {
    
    // Select a random video
    selectedVideo = videos[index];
    index++;
    // Get the media area and create a video element
    const mediaArea = document.querySelector('.media');
    const video = document.createElement('video');
    video.src = `video_data/${selectedVideo}`;
    // video.controls = true; // Add controls if needed
    video.autoplay = true; // Autoplay if desired
    // Set CSS properties for the video
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.objectFit = 'contain';

    // Clear the media area and append the video element
    mediaArea.innerHTML = '';
    mediaArea.appendChild(video);
    video.onended = function () {
        fetch('http://localhost:1337/start-server', { method: 'POST' })
            .then(response => response.text())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    
    
        open('http://localhost:1337/');
    };
});
    

repMedia.addEventListener('click', function() {
        index--;
        // Select a random video
        selectedVideo = videos[index];

        // Get the media area and create a video element
        const mediaArea = document.querySelector('.media');
        const video = document.createElement('video');
        video.src = `video_data/${selectedVideo}`;
           // video.controls = true; // Add controls if needed
           video.autoplay = true; // Autoplay if desired
           // Set CSS properties for the video
           video.style.width = '100%';
           video.style.height = '100%';
           video.style.objectFit = 'contain';
       
           // Clear the media area and append the video element
           mediaArea.innerHTML = '';
           mediaArea.appendChild(video);
       
        //    video.onended = function() {
        //        showPopup();
        //    };
       
       });

function showPopup() {
    // Create a div to hold the popup content
    const popup = document.createElement('div');
    
    // Create an iframe to load evaluation.html
    const iframe = document.createElement('iframe');
    iframe.src = 'evaluation.html';
    iframe.style.width = '100%';
    iframe.style.height = '100%';

    // Style the popup
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.width = '70%';  // Adjust the size as needed
    popup.style.height = '55%'; // Adjust the size as needed
    popup.style.backgroundColor = '#fff';
    popup.style.padding = '20px';
    popup.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
    popup.style.zIndex = 100;
    popup.style.overflow = 'auto'; // In case the content is larger than the popup

    // Append the iframe to the popup
    popup.appendChild(iframe);

    // Append the popup to the body
    document.body.appendChild(popup);
}



// Start video capture in camera area when 'start video' is clicked
startButton.addEventListener('click', function() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            camera.srcObject = stream;
            camera.play();

            // Create an image element for the overlay
            const overlay = document.createElement('img');
            overlay.src = 'face_outline.jpg'; // Path to your image
            overlay.style.position = 'absolute';
            overlay.style.top = '0';
            overlay.style.left = '0';
            // overlay.style.width = '100%';  // Adjust as needed
            // overlay.style.height = '100%'; // Adjust as needed
            overlay.style.zIndex = '10';   // Ensure it's above the video

            // Append the overlay to the camera container
            const cameraContainer = document.getElementById('cameraContainer'); // Make sure this is the correct ID of your camera's container
            cameraContainer.appendChild(overlay);
        });
    }
});

// Stop video capture in camera area when 'stop video' is clicked
stopButton.addEventListener('click', function() {
    if (camera.srcObject) {
        const tracks = camera.srcObject.getTracks();
        tracks.forEach(function(track) {
            track.stop();
        });
        camera.srcObject = null;
    }
});

const { exec } = require('child_process');

function runShellCommand(command) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
}



// Example usage



// function partyTime() {
//     const gifPath = 'chipi-chapa.gif'; // Replace with your actual path
//     const audioPath = 'chipi_chapa_audio.mp3'; // Replace with your actual path

//     // Select the elements by their classes
//     const mediaArea = document.querySelector('.media');

//     // Set the background of each element to the GIF
//     [mediaArea].forEach(el => {
//         el.style.backgroundImage = `url('${gifPath}')`;
//         el.style.backgroundSize = 'cover';
//         el.style.backgroundRepeat = 'no-repeat';
//         el.innerHTML = ''; // Clear any existing content
//     });

//     // Create audio element and play audio
//     const audio = new Audio(audioPath);
//     audio.loop = true; // Set the audio to loop
//     audio.play();

//     // Stop the audio after 7 seconds
//     setTimeout(() => {
//         audio.pause();
//         audio.currentTime = 0; // Reset the audio to the start
//     }, 7000);

//     const rgbLights = document.createElement('div');
//     rgbLights.classList.add('rgb-lights-effect');
//     document.body.appendChild(rgbLights);

//     // Remove the RGB lights effect after 7 seconds
//     setTimeout(() => {
//         rgbLights.remove();
//     }, 7000);
// }
