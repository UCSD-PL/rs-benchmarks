var tokenElement=document.getElementById("access_token");tokenElement?(chrome.runtime.sendMessage({action:"facebookConnectComplete",access_token:tokenElement.innerText}),window.close()):console.log("Token element not found");