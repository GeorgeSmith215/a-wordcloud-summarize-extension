document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { action: 'getSource' }, function(response) {
      var chineseText = response.chineseText;
      document.getElementById('sourceCode').innerText = chineseText;
    });
  });
});
