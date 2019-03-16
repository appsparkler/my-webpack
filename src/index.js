import "./styles.css";
import Vue from 'vue';
import App from './App.vue';

// const AppVue = new Vue({
//   el: '#app',
//   components: { App },
//   // template: '<h1>Hello World</h1>'
//   // template: `<App />`
//   render(h) {
//     return h(App)
//   }
// });

new Vue(App).$mount('#app')

// console.log(AppVue);
