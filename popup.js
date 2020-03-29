let detected = document.getElementById("video_detected");



chrome.runtime.getBackgroundPage(function(bg) {
  console.log(bg.download_url)
  if (bg.download_url.length >= 1) {
    if (bg.download_url.length > 1){
      var warningText = document.createElement("p")
      warningText.innerHTML = "Warning! There may be a file without audio! The one with audio is most likely the first one";
      warningText.style.color = "red";
      document.body.appendChild(warningText);
    }
    detected.innerHTML = "Video Detected";
    bg.download_url.forEach(url => {
      command = ".\\ffmpeg.exe " +  "-i " + url + " -c copy -bsf:a aac_adtstoasc output.mp4";
      var commandText = document.createElement("p")
      commandText.innerHTML = command;
      document.body.appendChild(commandText);
      var copyButton = document.createElement("button");
      copyButton.innerHTML = "Copy to clipboard";
      copyButton.onclick = function(element) {
        copyTextToClipboard(command);
      };
      document.body.appendChild(copyButton);
    });
  }
});

function copyTextToClipboard(text) {
  var copyFrom = document.createElement("textarea");
  copyFrom.textContent = text;
  document.body.appendChild(copyFrom);
  copyFrom.select();
  document.execCommand('copy');
  copyFrom.blur();
  document.body.removeChild(copyFrom);
}