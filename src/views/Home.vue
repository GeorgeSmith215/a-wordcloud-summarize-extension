<template>
    <div id="app">
        <div style="margin: 20px;">
            <RouterLink to="/custom">输入自定义文本</RouterLink>
            <button @click="clickLoad" style="margin-left: 20px;">重试</button>
        </div>
      <div id="sourceCode" style="min-width: 100px; min-height: 100px"></div>
      <div id="chart" style="min-width: 750px; min-height: 750px"></div>
    </div>
  </template>
  <script>
  import { onMounted } from "vue";
  import { Segment, useDefault } from "segmentit";
  
  export default {
    setup() {
      var segmentit = useDefault(new Segment());
      // const result = segmentit.doSegment('工信处女干事每月经过下属科室都要亲口交代24口交换机等技术性器件的安装工作。');
      // console.log(result);
  
      function parseWord(data) {
        var obj = {};
        data.forEach((item, key) => {
          if (obj[item.w]) obj[item.w]++;
          else obj[item.w] = 1;
        });
  
        return obj;
      }
  
      function setWordCloudData(data) {
        document.getElementById("chart").innerHTML = "";
        var wordCloud = new B2wordcloud(document.getElementById("chart"), {
          list: data,
          tooltip: {
            show: true,
            formatter: function (item) {
              return "<div>" + item[0] + "</div>" + "<div>" + item[1] + "</div>";
            },
          },
          shadowColor: "rgba(0,0,0,0.9)",
          shadowOffsetX: 2,
          shadowOffsetY: 2,
          shadowBlur: 5,
          color: [
            ["#f00", "#ff0"],
            "#f00",
            "green",
            "#333",
            "blue",
            ["blue", "white"],
          ],
        });
      }
  
      function debounce(func, wait) {
        var timeout;
        return function (...args) {
          var context = this;
          clearTimeout(timeout);
          timeout = setTimeout(function () {
            func.apply(context, args);
          }, wait);
        };
      }
  
      function parseText(text) {
        const segmentitResult = segmentit.doSegment(text);
        const parsedWord = parseWord(segmentitResult);
        delete parsedWord["。"];
        const wordCloudData = Object.entries(parsedWord).sort(
          (pre, cur) => cur[1] - pre[1]
        );
        // document.getElementById('sourceCode').innerText = response.bodyText || '无';
        document.getElementById("sourceCode").innerText = wordCloudData || "无";
        setWordCloudData(wordCloudData);
      }
  
      function main() {
        document.getElementById("sourceCode").innerText = "加载中...";
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          var activeTab = tabs[0];
          chrome.tabs.sendMessage(
            activeTab.id,
            { action: "getSource" },
            (response) => {
              var chineseText = response.chineseText;
              parseText(chineseText)
            }
          );
        });
      }
  
      onMounted(() => {
        main();
      });
  
      var clickLoad = () => {
        main();
        console.log("reload");
      };
  
      return {
        clickLoad,
      };
    },
  };
  </script>
  <style lang="scss" scoped></style>
  