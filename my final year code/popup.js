chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === "badWordDetected") {
        const confirmBlock = confirm("We found a bad word on this website. Do you want to block this webpage?");
        if (confirmBlock) {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                const blockedUrl = chrome.runtime.getURL("blocked.html"); // URL of the blocked page
                chrome.tabs.update(tabs[0].id, {url: blockedUrl});
            });
        }
    }
});
