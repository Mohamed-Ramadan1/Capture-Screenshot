const screenshotBtn = document.querySelector("#src-btn");
const screenshotPreview = document.querySelector(".src-preview");
const closeBtn = document.querySelector("#close-btn");
const captureScreen = async()=>{
    try {
        //asking for a permission to use a media to input the current tab
        const stream = await navigator.mediaDevices.getDisplayMedia({ preferCurrentTap: true });
        const video = document.createElement("video");

        video.addEventListener("loadedmetadata", () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            video.play();

            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            stream.getVideoTracks()[0].stop();// stop video track of the stream.

            screenshotPreview.querySelector("img").src = canvas.toDataURL();
            screenshotPreview.classList.add("show");



        });
        video.srcObject = stream;
    } catch (error) {
        alert("filed to capture screenshot!")
        
    }
}

screenshotBtn.addEventListener("click", captureScreen);
closeBtn.addEventListener("click", () => {
    screenshotPreview.classList.remove("show")
})
