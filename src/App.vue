<template>
  <div id="app">
    <el-button>你好</el-button>
    <comSelector />
    <vue-draggable-resizable @activated="onActivated" cp-id="111">
                <img alt="Vue logo" src="./assets/logo.png">

         </vue-draggable-resizable>
    
  </div>
</template>

<script>
import VueDraggableResizable from '@comp-com/vue-draggable-resizable';
import comSelector from '@src/components/com-selector'
export default {
  name: 'App',
  components: {
    VueDraggableResizable,
    comSelector
  },
  methods: {
    onActivated(params) {
      console.log(params, '123');
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
