import { Segment, useDefault } from 'segmentit';

document.addEventListener('DOMContentLoaded', function() {
    var wordCloud = new B2wordcloud(document.getElementById("chart"), {
      list: [
          ['foo', 36], ['bar', 62], ['foo3', 22], ['bar4', 36], ['bar5', 46],['foo', 36], ['bar', 62], ['foo3', 22], ['bar4', 36], ['bar5', 46],['foo', 36], ['bar', 62], ['foo3', 22], ['bar4', 36], ['bar5', 46],['foo', 36], ['bar', 62], ['foo3', 22], ['bar4', 36], ['bar5', 46],['foo', 36], ['bar', 62], ['foo3', 22], ['bar4', 36], ['bar5', 46],['foo', 36], ['bar', 62], ['foo3', 22], ['bar4', 36], ['bar5', 46],['foo', 36], ['bar', 62], ['foo3', 22], ['bar4', 36], ['bar5', 46],['foo', 36], ['bar', 62], ['foo3', 22], ['bar4', 36], ['bar5', 46],['foo', 36], ['bar', 62], ['foo3', 22], ['bar4', 36], ['bar5', 46],['foo', 36], ['bar', 62], ['foo3', 22], ['bar4', 36], ['bar5', 46]
      ],
      tooltip: {
          show: true,
          formatter: function(item) {
              return '<div>' + item[0] + '</div>' + '<div>' + item[1] + '</div>'
          }
      },
      shadowColor: 'rgba(0,0,0,0.9)',
      shadowOffsetX: 2,
      shadowOffsetY: 2,
      shadowBlur: 5,
      color: [
          ['#f00', '#ff0'],
          '#f00',
          'green',
          '#333',
          'blue',
          ['blue', 'white']
      ]
  })

// const segmentit = useDefault(new Segment());
// const result = segmentit.doSegment('工信处女干事每月经过下属科室都要亲口交代24口交换机等技术性器件的安装工作。');
// document.getElementById('sourceCode2').innerText = result;

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { action: 'getSource' }, function(response) {
      var chineseText = response.chineseText;
      document.getElementById('sourceCode').innerText = chineseText;
    });
  });
});
