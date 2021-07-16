<template>
  <h1>Machine Learning + Vue 3 + Vite - Tran Toan</h1>
  <div id="render"></div>
  <h2>U want check other image?</h2>
  <input type="file" placeholder="Select a file" @change="onChangeFile" />
  <button @click="onCheck">Check</button>
  <h2>List Of Object Detector From ml5.js</h2>
  <p v-if="isPending">Checking...</p>
  <p v-if="error">Something went wrong!</p>
  <ul v-if="model">
    <li v-for="(item, index) in model" :key="index">
      <div class="card">
        <p>Label: {{ item.label }}</p>
        <p>Accuracy Rate: {{ (item.confidence * 100).toFixed(2) }}%</p>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { onMounted, ref } from "@vue/runtime-core";

import useCanvas from "./@uses/useCanvas";
import useMl5 from "./@uses/useMl5";

import imgUrl from "./assets/dog.jpeg";

const { createCanvas, loadImage } = useCanvas();
const { error, isPending, model, setObjectDetector, detect } = useMl5();

const file = ref(null);
const fileError = ref(null);

function onChangeFile(event) {
  const types = ["image/png", "image/jpeg", "image/jpg"];
  const selected = event.target.files[0];

  if (selected && types.includes(selected.type)) {
    file.value = selected;
    fileError.value = null;

    const reader = new FileReader();

    reader.onload = function (e) {
      const img = document.createElement("img");
      img.id = "temp";
      img.width = 640;
      img.height = 480;
      img.src = e.target.result;

      const parent = document.getElementById("render");
      parent.appendChild(img);
    };

    reader.readAsDataURL(selected);
  } else {
    file.value = null;
    fileError.value = "Please select a file png or jpg";
  }
}

async function onCheck() {
  const image = document.getElementById("temp");

  // Create canvas
  const canvas = document.getElementById("my-canvas");

  // Get context
  const ctx = canvas.getContext("2d");

  // Draw image
  ctx.drawImage(image, 0, 0, 640, 480);

  // set object detection model
  await setObjectDetector("cocossd");

  // predict image
  await detect(image);

  if (!error.value) console.log("Finished");
}

async function init() {
  // preload assets
  const image = await loadImage({
    src: imgUrl,
    width: 640,
    height: 480,
  });

  // Create canvas
  const canvas = createCanvas({
    target: "div#render",
    name: "my-canvas",
    height: 480,
    width: 640,
  });

  // Get context
  const ctx = canvas.getContext("2d");

  // Draw image
  ctx.drawImage(image, 0, 0, 640, 480);

  // set object detection model
  await setObjectDetector("cocossd");

  // predict image
  await detect(image);

  if (!error.value) console.log("Finished");
}

onMounted(() => {
  init();
});
</script>
