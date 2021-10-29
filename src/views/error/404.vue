<!-- 
  Copyright (c) 2021 dfove.com Authors. All Rights Reserved.
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
  http://www.apache.org/licenses/LICENSE-2.0
 
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License. -->

<template>
  <div class="box">
    <div class="heading-container">
      <h1 id="heading" class="center-text">404</h1>
      <h1 id="heading" class="center-text">哎,找不到页面了</h1>
    </div>
    <div id="eye-container">
      <div class="eyes" id="left-eye">
        <div class="pupils" id="left-pupil"></div>
      </div>
      <div class="eyes" id="right-eye">
        <div class="pupils" id="right-pupil"></div>
      </div>
    </div>
    <div id="error-container" class="center-text">
      <el-button style="font-size: 30px;" type="text" @click="to('/')">返回首页</el-button>
      <p>Oops, can't find the page</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    to (v) {
      this.$router.push(v)
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
  color: white;
  overflow: hidden;
}
.heading-container {
  margin-top: 5%;
}
.center-text {
  text-align: center;
}
#heading {
  font-family: "Creepster", cursive;
  font-size: 5em;
}
.eyes {
  width: 5em;
  height: 5em;
  border-radius: 50%;
  background-color: white;
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  animation: blinking 3s ease-out 2 5s;
}
#eye-container {
  display: flex;
  justify-content: center;
  margin-bottom: 5%;
}
.pupils {
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: absolute;
  background-color: black;
  animation: moving-pups 2.5s cubic-bezier(0.43, -0.45, 0.45, 1.42) infinite;
}
@keyframes moving-pups {
  0% {
    left: 14%;
  }
  50% {
    left: 70%;
  }
  100% {
    left: 14%;
  }
}
@keyframes blinking {
  0% {
    transform: rotateX(0deg);
  }
  20% {
    transform: rotateX(90deg);
  }
  60% {
    transform: rotateX(45deg);
  }
  70% {
    transform: rotateX(30deg);
  }
  80% {
    transform: rotateX(0deg);
  }
  100% {
    transform: rotateX(0deg);
  }
}
</style>
