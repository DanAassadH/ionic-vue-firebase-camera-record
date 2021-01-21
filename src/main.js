import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';


import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
//import Vue from './App.vue';

//Vue.config.productionTip = false;

firebase.initializeApp({
  apiKey: "AIzaSyBz6-6AN4LxiDMGY7lZiRsakXtXf3HXdzw",
  authDomain: "videojs-record-vue.firebaseapp.com",
  projectId: "videojs-record-vue",
  storageBucket: "videojs-record-vue.appspot.com",
  messagingSenderId: "1076325027712",
  appId: "1:1076325027712:web:2c188a93dbc307a3f6fb65",
  measurementId: "G-68KRDNVHK1"
});

const app = createApp(App)
  .use(IonicVue)
  .use(router);
  
router.isReady().then(() => {
  app.mount('#app');
});