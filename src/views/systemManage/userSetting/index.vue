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
  <div class="container-layout user" v-if="userInfo">
    <div class="info">
      <div class="logo">
        <el-avatar :size="120" :src="imageUrl">
          <i class="iconfont icon-morentouxiang" style="font-size: 120px;"></i>
        </el-avatar>
        <div style="color: #000; font-size: 16px; padding-top: 10px;">
          {{ userInfo.adminName }} / {{ userInfo.realName }}
          <span style="color: #000; margin-left: 15px;">{{
            userInfo.gender == 1 ? "男" : "女"
          }}</span>
        </div>
      </div>
      <div class="list">
        <div class="list__box">
          <p class="iconfont icon-jigou"></p>
          <p class="content">
            {{ userInfo.organizationName }}
          </p>
        </div>
        <div class="list__box">
          <p class="iconfont icon-shouji"></p>
          <p class="content">{{ userInfo.phone }}</p>
        </div>
        <div class="list__box">
          <p class="iconfont icon-youxiang1"></p>
          <p class="content">
            {{ userInfo.email }}
          </p>
        </div>
      </div>
      <div style="text-align: center; margin-top: 70px;">
        <el-button
          type="primary"
          size="medium"
          class="iconfont icon-zhongzhimima"
          style="font-size: 14px;"
          @click="amendPassword"
        >
          修改密码</el-button
        >
        <el-button
          type="primary"
          size="medium"
          class="iconfont icon-xiugai"
          style="font-size: 14px;"
          @click="infoOperate"
        >
          修改资料</el-button
        >
      </div>
    </div>

    <el-dialog
      title="修改资料"
      :visible.sync="dialogInfo"
      :before-close="handleCloseInfo"
      width="650px"
      top="6vh"
    >
      <el-form
        ref="userInfo"
        :model="userInfo"
        :rules="rules"
        label-width="150px"
      >
        <el-form-item label="用户头像：">
          <el-popover placement="bottom-start" width="450" trigger="click">
            <ul class="portrait-list">
              <li
                v-for="(item, index) in $store.state.portraitList"
                :key="index"
                @click="imageUrl = item.url"
              >
                <el-avatar
                  fit="cover"
                  slot="reference"
                  size="large"
                  :src="item.url"
                ></el-avatar>
              </li>
            </ul>
            <el-avatar
              slot="reference"
              fit="cover"
              :size="80"
              :src="imageUrl"
            ></el-avatar>
          </el-popover>
        </el-form-item>
        <el-form-item label="用户名：" prop="adminName">
          <el-input
            v-model="userInfo.adminName"
            style="width: 400px"
          ></el-input>
        </el-form-item>
        <el-form-item label="真实姓名：" prop="realName">
          <el-input v-model="userInfo.realName" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="gender">
          <el-radio-group v-model="userInfo.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-radio-group
            v-model="userInfo.status"
            :disabled="userInfo.roleSuperAdmins[0] > 50"
          >
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="0">禁用</el-radio>
            <el-radio :label="8">锁定</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="组织机构：" prop="organizationId">
          <el-cascader
            :options="tableData2"
            change-on-select
            :props="defaultProps"
            v-model="selectParentId"
            style="width: 400px"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="手机号码：" prop="phone">
          <el-input v-model="userInfo.phone" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="userInfo.email" style="width: 400px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloseInfo">取 消</el-button>
        <el-button type="primary" @click="confirmUserInfo">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="400px"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rulesPassword"
        label-width="100px"
      >
        <el-form-item label="原来密码：" prop="oldPassword">
          <el-input
            type="password"
            v-model.trim="form.oldPassword"
            clearable
            show-password
            maxlength="16"
            placeholder="请输入原来密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="newPassword">
          <el-input
            type="password"
            v-model.trim="form.newPassword"
            clearable
            show-password
            maxlength="16"
            placeholder="请输入新密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <div class="strength">
            <div class="one" :class="{ one_on: msgText >= 1 }">
              <p></p>
              <span>弱</span>
            </div>
            <div class="two" :class="{ two_on: msgText >= 2 }">
              <p></p>
              <span>中</span>
            </div>
            <div class="three" :class="{ three_on: msgText == 4 }">
              <p></p>
              <span>强</span>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="passwordConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { formatterTree } from "@/utils/tree";
import {
  changePassword,
  changeUserInfo
} from "@/api/basicManage/systemManage/userSetting/index";
import { getOrganizationList } from "@/api/public";

export default {
  data() {
    return {
      dialogVisible: false,
      dialogInfo: false,
      form: {},
      userInfo: {},
      defaultProps: {
        children: "children",
        label: "organizationName",
        value: "organizationId"
      },
      selectParentId: [],
      tableData2: [],
      imageUrl: "",
      msgText: 0,
      rules: {
        adminName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        realName: [
          {
            required: true,
            message: "请输入真实姓名",
            trigger: "blur"
          }
        ],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
        selectParentId: [
          {
            required: true,
            message: "请选择组件机构",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "blur"
          }
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }]
      },
      rulesPassword: {
        oldPassword: [
          {
            required: true,
            message: "请输入原来密码",
            trigger: "blur"
          }
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    "form.newPassword"(newValue, oldValue) {
      this.form.newPassword = newValue.replace(/[\u4e00-\u9fa5]/gi, ""); // 不能输入中文
      this.msgText = this.checkStrong(newValue);
    }
  },
  created() {
    this.userInfo = this.$store.state.userInfo;
    this.imageUrl = this.$store.state.userInfo.adminLogo;
  },
  mounted() {
    this.getOrganizationTable();
  },
  methods: {
    async getOrganizationTable() {
      let params = {
        data: {
          groupParentId: 0
        },
        currentPage: 0,
        pageSize: null
      };
      let res = await getOrganizationList(params);
      if (res.code === "200") {
        res.data.forEach(item => {
          if (this.$store.state.userInfo.roleSuperAdmins[0] <= 10) {
            item.disabled = false;
          } else {
            item.disabled = true;
          }
        });
        this.tableData2 = JSON.parse(JSON.stringify(res.data));
        this.compileOperat();
      }
    },

    /**编辑弹出框 */
    infoOperate() {
      this.dialogInfo = true;
      this.userInfo = this.$store.state.userInfo;
    },

    compileOperat() {
      this.userInfo = this.$store.state.userInfo;
      // 机构回显
      let category = formatterTree(JSON.parse(JSON.stringify(this.tableData2)));
      let dataParams = null;
      category.forEach(item => {
        if (item.organizationId == this.$store.state.userInfo.organizationId) {
          dataParams = item;
          this.selectParentId = item.organizationId;
          this.userInfo.organizationName = item.organizationName;
        }
      });
      if (this.$store.state.userInfo.organizationId == 0) {
        this.selectParentId = this.getAllParentById(dataParams, category);
      } else {
        this.selectParentId = this.getAllParentById(
          this.selectParentId,
          category
        );
      }
    },

    checkStrong(sValue) {
      var modes = 0;
      //正则表达式验证符合要求的
      if (sValue.length < 1) return modes;
      if (/\d/.test(sValue)) modes++; //数字
      if (/[a-z]/.test(sValue)) modes++; //小写
      if (/[A-Z]/.test(sValue)) modes++; //大写
      if (/\W/.test(sValue)) modes++; //特殊字符
      //逻辑处理
      switch (modes) {
        case 1:
          return 1;
        case 2:
          return 2;
        case 3:
          return 3;
        case 4:
          return sValue.length < 6 ? 3 : 4;
      }
      return modes;
    },

    getAllParentById(id, array) {
      let result = [];
      let parent = null;

      if (id instanceof Object) {
        parent = id;
      } else {
        parent = array.find(item => item.organizationId == id);
      }
      result.unshift(parent.organizationId);
      if (parent.parentId && parent.parentId != 0) {
        result.unshift(...this.getAllParentById(parent.parentId, array));
      }
      return result;
    },

    // 确定修改密码
    passwordConfirm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          changePassword(this.form).then(res => {
            this.$message({
              message: "密码修改成功",
              type: "success"
            });
            this.dialogVisible = false;
          });
        } else {
          return false;
        }
      });
    },

    /**关闭修改密码操作 */
    handleClose() {
      this.dialogVisible = false;
      this.$refs.form.clearValidate();
    },

    handleCloseInfo() {
      this.$refs.userInfo.clearValidate();
      this.dialogInfo = false;
    },

    /**确定修改用户信息 */
    confirmUserInfo() {
      this.$refs["userInfo"].validate(valid => {
        if (valid) {
          let params = JSON.parse(JSON.stringify(this.userInfo));
          params.adminLogo = this.imageUrl;
          params.organizationId = this.selectParentId.slice(-1)[0];
          changeUserInfo(params).then(res => {
            this.$message({
              message: `修改成功`,
              type: "success"
            });
            this.$store.dispatch("user_info").then(v => {
              this.userInfo.adminLogo = this.$store.state.userInfo.adminLogo;
            });
            this.dialogInfo = false;
          });
        } else {
          return false;
        }
      });
    },

    /**修改密码弹出框 */
    amendPassword() {
      this.form = {
        newPassword: "",
        oldPassword: ""
      };
      this.dialogVisible = true;
    }
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}

.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>

<style lang="scss" scoped>
.user {
  height: 100%;
}

.user-logo {
  width: 120px;
  height: 120px;
  img {
    display: block;
    width: 100%;
  }
}
.info {
  width: 800px;
  margin: 8% auto;
  .logo {
    text-align: center;
    margin-bottom: 60px;
  }
  .list {
    display: flex;
    align-items: center;
    &__box {
      flex: 1;
      text-align: center;
      color: white;
      margin: 0 15px;
      padding: 10px;
      background-color: #559d75;
      border: 1px solid #559d75;
      border-radius: 2px;
      .iconfont {
        font-size: 30px;
        color: #fff;
      }
      .name {
        font-size: 16px;
        padding: 5px 0;
      }
      .content {
        height: 40px;
        line-height: 40px;
      }
    }
  }
}

.strength {
  display: flex;
  text-align: center;
  padding: 0 20px;
  margin-top: 8px;
  .one {
    flex: 1;
    color: #a5a5a5;
    transition: 0.3s;
    p {
      height: 10px;
      background-color: #a5a5a5;
      border-radius: 20px 0 0 20px;
      margin-bottom: 5px;
      transition: 0.3s;
    }
    &_on {
      color: red;
      p {
        background-color: red;
      }
    }
  }
  .two {
    flex: 1;
    color: #a5a5a5;
    margin: 0 2px;
    p {
      height: 10px;
      background-color: #a5a5a5;
      margin-bottom: 5px;
    }
    &_on {
      color: #ffb700;
      p {
        background-color: #ffb700;
      }
    }
  }
  .three {
    flex: 1;
    color: #a5a5a5;
    transition: 0.3s;
    p {
      height: 10px;
      background-color: #a5a5a5;
      border-radius: 0px 20px 20px 0px;
      margin-bottom: 5px;
    }
    &_on {
      color: #24ec07;
      p {
        background-color: #24ec07;
      }
    }
  }
}
.portrait-list {
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  & > li {
    flex: 0 0 70px;
    text-align: center;
    padding: 10px 0;
    cursor: pointer;
    &:hover {
      background-color: #e5e7e8;
      border-radius: 4px;
    }
  }
}
</style>
