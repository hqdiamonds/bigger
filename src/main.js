import Vue from 'vue'
import App from './App.vue'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')