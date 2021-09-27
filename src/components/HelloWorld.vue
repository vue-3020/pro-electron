<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-button type="primary" @click="updateClick">更新按钮</el-button>

    <!-- <auto-updater></auto-updater> -->

  </div>
</template>

<script>
// import AutoUpdater from './AutoUpdater.vue'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted() {

  },
  created() {
    console.log(process.env.IS_ELECTRON);

    // if (process.env.IS_ELECTRON) {
    //   const { ipcRenderer } = require('electron')
    // }
  },
  methods: {
    updateClick() {
      let _this = this
      // ipcRenderer.send("checkForUpdate");
      console.log(_this);
      _this.$electron.ipcRenderer.send("checkForUpdate")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
