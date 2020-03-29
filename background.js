var download_url = [];
var chunk_url;

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    download_url = []
  }
})

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (details.url.slice(-5) ==  ".m3u8") {
      if(details.url.includes("index") || details.url.includes("playlist")){
        download_url.push(details.url);
      }
    }
  },
  { urls: ["*://citcastmedia.nus.edu.sg/*", "https://s-cloudfront.cdn.ap.panopto.com/*"] }
);

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {
            urlContains: "https://luminus.nus.edu.sg/modules/",
            urlContains: "media/view"
          }
        }),
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {
            urlContains: "https://luminus.nus.edu.sg/modules/",
            urlContains: "web-lectures"
          }
        }),
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {
            urlContains: "https://mediaweb.ap.panopto.com//",
            urlContains: "Panopto"
          }
        })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
