chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == 'getSource') {
    sendResponse({ chineseText: extractChinese(document.body.textContent) });
  }
});

function extractChinese(text) {
  // 使用正则表达式匹配中文字符
  var chineseRegex = /[\u4e00-\u9fa5]+/g;
  var chineseMatches = text.match(chineseRegex);
  
  // 将匹配到的中文字符连接成字符串，并在它们之间加上句号
  var chineseText = chineseMatches ? chineseMatches.join('。') + '。' : '';
  return chineseText;
}
