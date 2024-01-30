<template>
  <div id="app">
    <button @click="clickLoad">点击加载</button>
    <div id="sourceCode" style="min-width: 100px; min-height: 100px;"></div>
    <div id="chart" style="min-width: 750px; min-height: 750px;"></div>
  </div>
</template>
<script>
import { onMounted } from "vue";
import { Segment, useDefault } from 'segmentit';

export default {
  setup() {
    const segmentit = useDefault(new Segment());
    // const result = segmentit.doSegment('工信处女干事每月经过下属科室都要亲口交代24口交换机等技术性器件的安装工作。');
    // console.log(result);

    function parseWord(data) {
      const obj = {}
      data.forEach((item, key) => {
        if(obj[item.w]) obj[item.w]++
        else obj[item.w] = 1
      })

      return obj
    }

    function setWordCloudData(data) {
      document.getElementById("chart").innerHTML = ''
      var wordCloud = new B2wordcloud(document.getElementById("chart"), {
          list: data,
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
    }

    function main() {
      document.getElementById('sourceCode').innerText = '加载中...';
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { action: 'getSource' }, function(response) {
          var chineseText = response.chineseText;
          const chineseTextResult = segmentit.doSegment(chineseText);
          const parsedWord = parseWord(chineseTextResult)
          delete parsedWord['。']
          const wordCloudData = Object.entries(parsedWord).sort((pre, cur) => cur[1] - pre[1])
          document.getElementById('sourceCode').innerText = wordCloudData;
          setWordCloudData(wordCloudData)
        });
      });
    }

    onMounted(() => {
      main()
    })

    const clickLoad = () => {
     main()
    }

    return {
      clickLoad,
    };
  },
};
</script>
<style lang="scss" scoped>
</style>
