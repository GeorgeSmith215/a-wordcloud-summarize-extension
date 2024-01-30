<template>
  <div id="sourceCode" style="min-width: 100px; min-height: 100px;"></div>
</template>
<script>
import { onMounted } from "vue";

export default {
  setup() {
    onMounted(() => {
      document.getElementById('sourceCode').innerText = '加载中...';
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { action: 'getSource' }, function(response) {
          var chineseText = response.chineseText;
          document.getElementById('sourceCode').innerText = chineseText;
        });
      });
    })
    return {
    };
  },
};
</script>
<style lang="scss" scoped>
</style>
