import app from './components';
import './sass/style.sass';
import Vue from 'vue';
import comp from './components/catalog.vue';

new Vue({
  render: d => d(comp)
}).$mount('#comp');

app();

