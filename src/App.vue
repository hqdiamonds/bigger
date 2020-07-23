<template>
  <div id="app">
    <Hello />
    <!-- <el-button>你好</el-button> -->
    
    <!-- <vue-draggable-resizable @activated="onActivated" cp-id="111">
                <img alt="Vue logo" src="./assets/logo.png">

         </vue-draggable-resizable> -->
    
  </div>
</template>

<script>
import Hello from './components/HelloWorld'
// import { directive } from 'vue/types/umd'
// import VueDraggableResizable from '@comp-com/vue-draggable-resizable';
export default {
  name: 'App',
  components: {
    // VueDraggableResizable,
    Hello
  },
  methods: {
    // onActivated(params) {
    //   console.log(params, '123');
    // }
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
