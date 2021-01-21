<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Video capture and Store</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div id="container">
        <strong>Vue Videojs-record</strong>
        <video
          id="myVideo"
          class="video-js vjs-default-skin"
          playsinline
        ></video>
        <ion-button @click="startCamera">Start Front Camera</ion-button>
      </div>
      <div>
        <iframe :src="vid"></iframe>

        <br />
        <ion-button @click="onUpload">Upload</ion-button>
        <br />
        <ion-button @click="stopCamera">Stop Camera</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton
} from "@ionic/vue";
import { defineComponent } from "vue";

import "video.js/dist/video-js.css";
import "videojs-record/dist/css/videojs.record.css";
import videojs from "video.js";

import "webrtc-adapter";
import RecordRTC from "recordrtc";
/* eslint-disable no-unused-vars */
import Record from "videojs-record/dist/videojs.record.js";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

export default defineComponent({
  name: "Home",

  data() {
    return {
      storageRef: "",
      vid: null,
      player: "",
      options: {
        controls: true,
        autoplay: false,
        fluid: false,
        loop: false,
        width: 320,
        height: 240,
        bigPlayButton: true,
        controlBar: {
          volumePanel: true,
        },
        plugins: {
          // configure videojs-record plugin
          record: {
            audio: true,
            video: true,
            debug: true,
            videoMimeType: "video/webm;codecs=vp9",
          },
        },
      },
    };
  },

  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
  },
  mounted() {
    /* eslint-disable no-console */
    this.player = videojs("#myVideo", this.options, () => {
      // print version information at startup
      const msg =
        "Using video.js " +
        videojs.VERSION +
        " with videojs-record " +
        videojs.getPluginVersion("record") +
        " and recordrtc " +
        RecordRTC.version;
      videojs.log(msg);
    });

    // device is ready
    this.player.on("deviceReady", () => {
      console.log("device is ready!");
    });

    // user clicked the record button and started recording
    this.player.on("startRecord", () => {
      console.log("started recording!");
    });

    // user completed recording and stream is available
    this.player.on("finishRecord", () => {
      // the blob object contains the recorded data that
      // can be downloaded by the user, stored on server etc.
      console.log("finished recording: ", this.player.recordedData);
    });

    // error handling
    this.player.on("error", (element, error) => {
      console.warn(error);
    });

    this.player.on("deviceError", () => {
      console.error("device error:", this.player.deviceErrorCode);
    });
  }, // end mounted

  beforeUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }, // end before mount

  methods: {
    onUpload() {
      const fileName1 = new Date();
      const fileName2 =
        fileName1.toDateString() +
        "-" +
        fileName1.getHours() +
        "-" +
        fileName1.getMinutes() +
        ".webm";
      console.log("Hell upload");
      this.vid = null;

      const storageRef = firebase
        .storage()
        .ref(`${fileName2}`)
        .put(this.player.recordedData);
      console.log("file uploaded");

      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            console.log("FILE URL", url);
            this.vid = url;
          });
        }
      );
    }, // end onUpload

    stopCamera() {
      if (this.player) {
        this.player.dispose();
      }
    }, // end stopCamera

    startCamera() {}, //end start camera
  }, // end methods:
}); // end export defineComponent
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-20%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>