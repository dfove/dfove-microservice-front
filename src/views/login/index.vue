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
  <div>
    <div class="bg-top"></div>
    <div class="login">
      <div class="login__title">点服科技信息化平台</div>
      <div class="login__content">
        <h3>用户登录<span>USER LOGIN</span></h3>
        <div class="content">
          <div class="content__left">
            <div class="content__box">
              <el-form ref="userForm" :model="userForm" :rules="rules">
                <el-form-item label="" prop="adminName">
                  <el-input
                    ref="userName"
                    clearable
                    v-model.trim="userForm.adminName"
                    @keyup.enter.native="submitLogin"
                    prefix-icon="el-icon-user"
                    placeholder="请输入用户名称"
                  ></el-input>
                </el-form-item>
                <el-form-item label="" prop="password">
                  <el-input
                    ref="password"
                    type="password"
                    clearable
                    prefix-icon="el-icon-view"
                    v-model.trim="userForm.password"
                    @keyup.enter.native="submitLogin"
                    placeholder="请输入登录密码"
                  ></el-input>
                </el-form-item>

                <el-form-item>
                  <el-col :span="12" align="left"
                    ><el-checkbox v-model="checked"
                      >记住密码</el-checkbox
                    ></el-col
                  >
                  <el-col :span="12" align="right"
                    ><el-tooltip class="item" effect="dark" placement="top">
                      <div slot="content" style="text-align: center">
                        请联系管理员重置<br />登录密码
                      </div>
                      <el-button style="color: #559d75" type="text"
                        >忘记密码?</el-button
                      >
                    </el-tooltip></el-col
                  >
                </el-form-item>

                <el-form-item>
                  <el-button
                    class="btn"
                    type="primary"
                    :loading="loginLoading"
                    @click="submitLogin"
                    >登 录</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="content__right">
            <img src="@/assets/login-right.jpg" />
            <div class="content__right__quiz">还没有账号：</div>
            <div class="content__right__answer">
              请联系管理员分配账号
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqLogin, getUserInfo } from "@/api/public";
export default {
  name: "Login",
  data() {
    return {
      loginLoading: false,
      userForm: {
        adminName: "",
        password: "",
        source: 11
      },
      checked: true,
      loading: false,
      rules: {
        adminName: [
          {
            required: true,
            message: "请输入用户名称",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入登录密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    localStorage.clear();
  },
  methods: {
    async submitLogin() {
      let state = false;
      this.$refs["userForm"].validate(valid => {
        if (valid) {
          this.loading = true;
          state = true;
        } else {
          state = false;
          return false;
        }
      });

      if (!state) return;
      this.loginLoading = true;
      try {
        let token = await reqLogin(this.userForm);
        localStorage.setItem("USER_TOKEN", token.data);
        let userInfo = await getUserInfo();
        localStorage.setItem("USER_INFO", JSON.stringify(userInfo.data));
        if (token.data && userInfo.data) {
          this.loginLoading = false;
          this.$store.commit("LOGIN_IN", token.data);
          this.$store.commit("SET_USERINFO", userInfo.data);
          this.$message({
            message: "登录成功",
            type: "success"
          });
          this.$router.push("/");
        } else {
          setTimeout(() => {
            this.loginLoading = false;
          }, 1500);
        }
      } catch (error) {
        this.loginLoading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.bg-top {
  height: 360px;
  background-color: #559d75;
}

.login {
  position: absolute;
  top: 22%;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 715px;

  &__title {
    font-size: 40px;
    color: white;
    margin-top: -80px;
    text-align: left;
  }
  &__content {
    height: 420px;
    box-sizing: border-box;
    background-color: white;
    border: 1px solid #e6e6e6;
    position: absolute;
    top: 20%;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 40px 20px 40px 40px;
    h3 {
      text-align: left;
      font-size: 18px;
      padding-bottom: 45px;
      span {
        font-weight: normal;
        font-size: 15px;
        margin-left: 8px;
      }
    }
    .content {
      display: flex;
      &__left {
        flex: 2;
        .btn {
          width: 100%;
          background-color: #559d75;
          border-color: #559d75;
          font-size: 18px;
          font-weight: bold;
          padding: 15px;
          margin-top: 10px;
        }
        &__box {
        }
      }
      &__right {
        flex: 0 0 230px;
        margin-left: 65px;
        &__quiz {
          margin: 45px 0 20px 0;
          font-size: 14px;
        }
        &__answer {
          color: #559d75;
        }
      }
    }
  }
}

.content__box /deep/.el-input__inner {
  padding-top: 22px;
  padding-bottom: 22px;
}
</style>
