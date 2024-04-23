<template>
  <div id="app">
    <div style="margin: 20px;">
      <RouterLink to="/">返回</RouterLink>
      <button @click="clickLoad" style="margin-left: 20px;">生成</button>
    </div>

    <textarea id="customTextarea" rows="20" cols="100"></textarea>
    
    <div id="customCount" style="min-width: 100px; min-height: 100px"></div>
    <div id="customChart" style="min-width: 750px; min-height: 750px"></div>
  </div>
</template>
<script>
import { Segment, useDefault } from "segmentit";
import { RouterLink } from "vue-router";

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
      document.getElementById("customChart").innerHTML = "";
      var wordCloud = new B2wordcloud(document.getElementById("customChart"), {
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
      // document.getElementById('customCount').innerText = response.bodyText || '无';
      document.getElementById("customCount").innerText = wordCloudData || "无";
      setWordCloudData(wordCloudData);
    }

    function main() {
      const textarea = document.querySelector('#customTextarea')
      document.getElementById("customCount").innerText = "加载中...";
      parseText(textarea.value)
    }

    var clickLoad = () => {
      main();
    };

    return {
      clickLoad,
    };
  },
};
</script>
<style lang="scss" scoped></style>
