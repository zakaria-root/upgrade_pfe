/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
require('admin-lte');




window.Vue = require('vue').default;
import Swal from 'sweetalert2'
import VueProgressBar from 'vue-progressbar'
import VueRouter from 'vue-router';
import Form from 'vform';
import moment from 'moment';
import {
  HasError,
  AlertError,
} from 'vform/src/components/bootstrap5'
import Vue from 'vue';

//vue router pour definiti les routeavec vue.js
window.Form = Form;
Vue.use(VueRouter);

// sweetalert Vue.js defini les alert 
window.Swal = Swal;

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

window.Toast = Toast;

// progressbar  with vue js
Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '4px',
})

//filter vue text
Vue.filter('upper', (value) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
})


//filter vue date
Vue.filter('myDate', (date) => {
  return moment(date).format('MMMM Do YYYY');
})

const routes = [
    { path: '/profile', component: require('./components/Profile.vue').default },
    { path: '/dashbord', component: require('./components/Dashbord.vue').default },
    { path: '/users', component: require('./components/Users.vue').default }
  ]

  const router = new VueRouter({
    routes // short for `routes: routes`
  })

//pour la declonchment des events

window.Fire = new Vue();
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
  
    el: '#app',
    router
});
