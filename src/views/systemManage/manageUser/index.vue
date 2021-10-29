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
  <div class="user-manage p-20">
    <el-row :gutter="15" type="flex" style="margin-bottom: 20px;">
      <el-col :span="5">
        <el-input
          placeholder="请输入用户名"
          v-model.trim="keyWord"
          @keyup.enter.native="
            searchKeyword = keyWord;
            currentPage = 1;
          "
          size="small"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="
              searchKeyword = keyWord;
              currentPage = 1;
            "
          ></el-button>
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-button size="small" @click="addOperate()" type="primary"
          ><i style="font-size: 12px" class="iconfont icon-jiashang1"></i>
          添加用户</el-button
        >
      </el-col>
    </el-row>

    <el-table :data="tableData" style="width: 100%" ref="singleTable" border>
      <el-table-column prop="adminName" label="用户名" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="realName" label="姓名" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="gender" label="性别" :formatter="formatterGender">
      </el-table-column>

      <el-table-column prop="phone" label="联系电话" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="roleId"
        show-overflow-tooltip
        label="角色"
      ></el-table-column>
      <el-table-column
        prop="status"
        label="账户状态"
        show-overflow-tooltip
        sortable
        :formatter="formatterStatua"
      >
      </el-table-column>
      <el-table-column prop="remark" label="备注" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" width="200" fixed="right">
        <div slot-scope="scope">
          <el-tooltip content="重置密码" placement="top">
            <el-button
              size="small"
              type="text"
              icon="el-icon-refresh-left"
              @click="resetOperat(scope.row.adminId)"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="编辑" placement="top">
            <el-button
              size="small"
              type="text"
              icon="el-icon-edit-outline"
              @click="compileOperat(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top">
            <el-button
              size="small"
              type="text"
              icon="el-icon-delete"
              @click="deleteOperate(scope.row.adminId)"
              ><i></i
            ></el-button>
          </el-tooltip>
        </div>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      style="text-align: center; margin-top: 20px; padding-bottom: 20px"
      :hide-on-single-page="true"
      background
      layout="total, prev, pager, next, jumper, sizes"
      :page-sizes="[20, 50, 100]"
      :total="totalCount"
      prev-text="上一页"
      next-text="下一页"
      @size-change="pageSize = $event"
      @current-change="currentPage = $event"
    ></el-pagination>

    <!-- 添加用户、修改用户信息框 -->
    <el-dialog
      :title="message + '用户'"
      :visible.sync="dialogVisible"
      top="8vh"
      width="700px"
      center
    >
      <div style="max-height: 660px; overflow: auto">
        <el-form
          :model="form"
          :rules="rules"
          ref="ruleForm"
          label-width="180px"
        >
          <el-form-item label="用户头像："  style="margin-bottom: 0;">
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
                  >
				  </el-avatar>
                </li>
              </ul>
              <el-avatar
                slot="reference"
                fit="cover"
                :size="40"
                :src="imageUrl"
              >
			  <i class="iconfont icon-morentouxiang" style="font-size: 40px;"></i></el-avatar>
            </el-popover>
          </el-form-item>

          <el-row>
            <el-col :span="24">
              <el-form-item label="用户名：" prop="adminName">
                <el-input
                  v-model.trim="form.adminName"
                  clearable
                  style="width: 80%"
                  placeholder="请输入用户名"
                  size="small"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="message != '修改'">
              <el-form-item label="用户密码：" prop="password">
                <el-input
                  v-model.trim="form.password"
                  type="password"
                  maxlength="16"
                  clearable
                  show-password
                  style="width: 80%"
                  size="small"
                  placeholder="请设置不少于6位数密码"
                ></el-input>
              </el-form-item>
              <div class="strength" v-if="message != '修改'">
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
            </el-col>
            <el-col :span="24">
              <el-form-item label="性别：" prop="gender">
                <el-radio-group v-model="form.gender">
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="2">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="用户状态：" prop="status">
                <el-radio-group v-model="form.status">
                  <el-radio :label="1">正常</el-radio>
                  <el-radio :label="0">禁用</el-radio>
                  <el-radio :label="8">锁定</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="用户角色：" prop="roleId">
                <!-- v-model="roleParams.roleId" -->
                <!-- @change="form.roleId = roleParams.roleId" -->
                <el-select
                  v-model="form.roleId"
                  style="width: 80%"
                  placeholder="请选择用户角色"
                  size="small"
                >
                  <el-option
                    v-for="(item, i) in roleDataList"
                    :key="i"
                    :value="item.roleId"
                    :label="item.roleName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="真实姓名：" prop="realName">
                <el-input
                  v-model="form.realName"
                  clearable
                  style="width: 80%"
                  placeholder="请输入真实姓名"
                  size="small"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="邮箱：" prop="email">
                <el-input
                  v-model="form.email"
                  style="width: 80%"
                  placeholder="请输入邮箱"
                  size="small"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="手机号码：" prop="phone">
                <el-input
                  v-model="form.phone"
                  maxlength="11"
                  clearable
                  style="width: 80%"
                  placeholder="请输入手机号码"
                  size="small"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="23">
              <el-form-item label="组织机构名称：" prop="organizationId">
                <el-cascader
                  :options="tableData2"
                  change-on-select
                  :props="defaultProps"
                  v-model="selectParentId"
                  @change="handleChange"
                  style="width: 85%"
                  size="small"
                  placeholder="请选择组织机构"
                >
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注：">
                <el-input
                  type="textarea"
                  v-model="form.remark"
                  style="width: 80%"
                  :autosize="{ minRows: 3 }"
                  placeholder="请输入备注内容"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <div style="text-align: center">
          <el-button size="medium" type="primary" @click="addAdmin('ruleForm')"
            >确 定</el-button
          >
          <el-button size="medium" @click="addCancel('ruleForm')"
            >取 消</el-button
          >
        </div>
      </span>
    </el-dialog>

    <!-- 重置密码信息框 -->
    <el-dialog
      title="重置密码"
      :visible.sync="dialogVisible2"
      width="450px"
      :before-close="resetCancel"
    >
      <el-form
        :model="resetForm"
        :rules="resetRules"
        ref="resetForm"
        label-width="80px"
      >
        <el-form-item label="新密码：" prop="newPassword">
          <el-input
            v-model.trim="resetForm.newPassword"
            clearable
            show-password
            maxlength="16"
            placeholder="请设置不少于6位数密码"
            size="medium"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="strength" style="margin-left: 40px">
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
        <div style="text-align: center">
          <el-button size="medium" type="primary" @click="resetConfirm"
            >确 定</el-button
          >
          <el-button size="medium" @click="resetCancel">取 消</el-button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import tableMixin from "@/mixin/table";
import { formatterTree } from "@/utils/tree";
import { getOrganizationList, getUserRole } from "@/api/public";

import {
  getUserPage,
  addUser,
  editUser,
  deleteUser,
  getRoleNoPage,
  getUserNoPage,
  resetUserPassword
} from "@/api/basicManage/systemManage/manageUser/index";

export default {
  mixins: [tableMixin],
  data() {
    var validatePhone = (rule, value, callback) => {
      let reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (value == "") {
        callback(new Error("手机号码不能为空！"));
      } else if (!reg_tel.test(value) && value.length != 11) {
        callback(new Error("请正确填写您的手机号码！"));
      } else {
        callback();
      }
    };
    var validateOrganization = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择组织机构"));
      } else {
        callback();
      }
    };
    return {
      pageSize: 10,
      currentPage: 1,
      dialogVisible2: false,
      resetForm: {
        adminId: "",
        newPassword: ""
      },
      newPassword: "",
      message: "",
      tableDataNoPaging: [],
      adminId: null,
      headers: {
        "Content-Type": "application/json"
      },
      roleDataList: [],
      selectStatus: "",
      roleIdList: [],
      roleIdParams: [],
      dialogVisible: false,
      dialogVisible1: false,
      form: {},
      imageUrl: "",
      organizationList: [],
      defaultProps: {
        children: "children",
        label: "organizationName",
        value: "organizationId"
      },
      selectParentId: [],
      tableData2: [],
      rules: {
        adminName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "长度不能少于6位", trigger: "blur" }
        ],
        gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
        realName: [
          {
            required: true,
            message: "请输入真实姓名",
            trigger: "blur"
          }
        ],
        phone: [
          {
            validator: validatePhone,
            required: true,
            trigger: "blur"
          }
        ],
        organizationId: [
          {
            validator: validateOrganization,
            required: true,
            trigger: "change"
          }
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        roleId: [
          {
            required: true,
            message: "请选择用户角色",
            trigger: "change"
          }
        ]
      },
      resetRules: {
        newPassword: [
          {
            required: true,
            message: "请输入新密码",
            trigger: "blur"
          },
          { min: 6, message: "长度不能少于6位", trigger: "blur" }
        ]
      },
      msgText: 0,
      roleParams: { adminId: "", roleId: "" }
    };
  },
  computed: {
    requestParams() {
      return {
        data: {
          adminName: this.searchKeyword
          // organizationId: this.OrganizationId,
        },
        currentPage: this.currentPage,
        pageSize: this.pageSize
      };
    }
  },
  watch: {
    OrganizationId(v) {
      this.currentPage = 1;
    },
    currentPage() {
      this.$emit("CurrentPage", true);
    },
    "$store.state.userManage.adminId"(v) {
      if (v == "") {
        this.$refs.singleTable.setCurrentRow();
      }
    },
    "form.password"(newValue, oldValue) {
      this.form.password = newValue.replace(/[\u4e00-\u9fa5]/gi, ""); // 不能输入中文
      this.msgText = this.checkStrong(newValue);
    },
    "resetForm.newPassword"(newValue, oldValue) {
      this.resetForm.newPassword = newValue.replace(/[\u4e00-\u9fa5]/gi, ""); // 不能输入中文
      this.msgText = this.checkStrong(newValue);
    }
  },
  mounted() {
    this.getOrganization();
    this.getNoOrganization();
    this.getRole();
  },
  methods: {
    /** 获取用户列表 */
    async getTableList() {
      let params = {
        ...this.requestParams,
        orderBy: "create_time desc"
      };
      let res = await getUserPage(params);
      this.tableData = res.data.map(item => {
        item.editRole = false;
        return item;
      });
      this.totalCount = res.totalCount;
    },

    /**获取机构列表 */
    async getNoOrganization() {
      let params = {
        data: {
          groupParentId: 0
        },
        currentPage: 0,
        pageSize: null
      };
      let res = await getOrganizationList(params);
      res.data.forEach(item => {
        if (this.$store.state.userInfo.roleSuperAdmins[0] <= 10) {
          item.disabled = false;
        } else {
          item.disabled = true;
        }
      });
      this.tableData2 = res.data ? JSON.parse(JSON.stringify(res.data)) : [];
    },

    /**获取机构数据 */
    async getOrganization() {
      let res = await getOrganizationList({ data: {} });
      this.organizationList = res.data;
    },

    /**取消添加，修改用户信息 */
    addCancel(formName) {
      this.msgText = 0;
      this.dialogVisible = false;
      this.$refs[formName].clearValidate();
    },

    /**添加，修改用户信息确定操作 */
    addAdmin(formName) {
      if (this.form["adminRoles"]) {
        delete this.form["adminRoles"];
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = JSON.parse(JSON.stringify(this.form));
		  params.adminLogo = this.imageUrl
          params.organizationId = this.selectParentId.slice(-1)[0];
          if (this.message == "添加") {
            addUser(params).then(res => {
              this.$message({
                message: `${this.message}成功`,
                type: "success"
              });
              this.getTableList();
              this.dialogVisible = false;
              this.$refs[formName].resetFields();
            });
          } else {
            editUser(params).then(res => {
              this.$message({
                message: `${this.message}成功`,
                type: "success"
              });
              this.getTableList();
              this.dialogVisible = false;
              this.$refs[formName].resetFields();
            });
          }
        }
      });
    },

    /**显示添加、修改用户信息弹出框 */
    addOperate() {
      this.message = "添加";
      this.dialogVisible = true;
      this.selectParentId = [];
      this.imageUrl = "";
      this.form = {
        roleId: "",
        adminLogo: "",
        adminName: "",
        password: "",
        createAdminId: this.$store.state.userInfo.adminId,
        gender: 1,
        email: "",
        grade: 101,
        phone: "",
        realName: "",
        remark: "",
        status: 1,
        organizationId: "",
        organizationName: ""
      };
      this.roleParams.roleId = "";
      this.$nextTick(() => {
        this.$refs["ruleForm"].clearValidate();
      });
    },

    /**编辑添加、修改用户信息弹出框 */
    compileOperat(obj, state = true) {
      this.message = "修改";
      this.roleParams.adminId = obj.adminId;
      this.form = JSON.parse(JSON.stringify(obj));
      this.imageUrl = this.form.adminLogo;

      if (state) {
        this.dialogVisible = true;
      }

      this.$nextTick(() => {
        this.$refs["ruleForm"].clearValidate();
      });
      // 机构回显
      let category = formatterTree(JSON.parse(JSON.stringify(this.tableData2)));

      let dataParams = null;
      category.forEach(item => {
        if (item.organizationId == obj.organizationId) {
          dataParams = item;
          this.selectParentId = item.organizationId;
          this.form.organizationName = item.organizationName;
        }
      });
      if (obj.organizationId == 0) {
        this.selectParentId = this.getAllParentById(dataParams, category);
      } else {
        this.selectParentId = this.getAllParentById(
          this.selectParentId,
          category
        );
      }
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

    /**重置密码操作 */
    resetOperat(id) {
      this.resetForm = {
        adminId: id,
        newPassword: ""
      };
      this.dialogVisible2 = true;
    },

    /**关闭重置密码操作 */
    resetCancel() {
      this.msgText = 0;
      this.$refs["resetForm"].clearValidate();
      this.dialogVisible2 = false;
    },

    /**确定重置密码 */
    resetConfirm(id) {
      this.$refs["resetForm"].validate(valid => {
        if (valid) {
          resetUserPassword(this.resetForm).then(res => {
            this.$message({
              type: "success",
              message: "重置成功"
            });
            this.dialogVisible2 = false;
            this.getTableList();
          });
        } else {
          return false;
        }
      });
    },

    /**删除用户 */
    deleteOperate(id) {
      this.$confirm("此操作将删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteUser(id).then(res => {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getTableList();
          });
        })
        .catch(err => {});
    },

    /**获取选择的组织机构的名称 */
    handleChange(ids) {
      let id = JSON.parse(JSON.stringify(ids)).splice(-1);
      let obj = {};
      obj = this.organizationList.find(item => {
        return item.organizationId == id;
      });
      this.form.organizationName = obj.organizationName;
      this.form.organizationId = obj.organizationId;
    },

    /**获取角色扩展列表（不分页） */
    async getRole() {
      let res = await getRoleNoPage({ data: {} });
      this.roleDataList = res.data;
    },

    // 获取管理员已拥有的角色
    async getSelectedRole(adminId) {
      let res = await getUserRole({ data: adminId });
      if (res.data.length == 1) {
        this.roleParams.roleId = res.data[0].roleId;
        this.form.roleId = res.data[0].roleId;
      } else {
        console.error("用户拥有0个或者多个角色！");
      }
    },

    /**获取不分页的管理员角色列表 */
    async getTableListNoPaging() {
      let res = await getUserNoPage({ data: {} });
      this.tableDataNoPaging = res.data;
    },

    /**通过角色ID查找相对应的参数，组装成对象 */
    roleIdFind() {
      if (this.roleIdList.length < 1) return false;
      this.roleIdParams = [];

      this.roleDataList.forEach(item => {
        this.roleIdList.some(id => {
          if (id === item.roleId) {
            let obj = {
              adminId: this.adminId,
              roleId: id
            };
            this.roleIdParams.push(obj);
            return true;
          }
        });
      });
    },

    /**密码等级的判断 */
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

    /**table格式化性别 */
    formatterGender(row, column, cellValue, index) {
      switch (row.gender) {
        case 0:
          return "未知";
        case 1:
          return "男";
        case 2:
          return "女";
      }
    },

    /**table格式化用户状态 */
    formatterStatua(row, column, cellValue, index) {
      switch (row.status) {
        case 0:
          return "禁用";
        case 1:
          return "正常";
        case 8:
          return "锁定";
        case 88:
          return "删除";
      }
    }
  }
};
</script>

<style>
.user-manage .el-table tr {
  cursor: pointer;
}
</style>

<style lang="scss" scoped>
.user-manage {
  padding: 20px;
}
.user-manage /deep/ .el-table .cell {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.admin-logo {
  // border: 1px dashed #dcdfe6;
  width: 40px;
  height: 40px;
  background-color: #cecece;
  border-radius: 4px;
  transition: all 0.5s;
  border-radius: 50%;
  &:hover {
    border-color: #7ed1ec;
  }
}
.avatar-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 4px;
}
.avatar {
  width: 70px;
  height: 70px;
  display: block;
  border-radius: 50%;
}
.strength {
  display: flex;
  text-align: center;
  padding: 0 5px;
  margin-top: 8px;
  width: 250px;
  margin-left: 250px;
  .one {
    flex: 1;
    color: #a5a5a5;
    transition: 0.3s;
    p {
      height: 5px;
      background-color: #a5a5a5;
      border-radius: 20px 0 0 20px;
      margin-bottom: 5px;
      transition: 0.3s;
    }
    &_on {
      color: #fa3c01;
      p {
        background-color: #fa3c01;
      }
    }
  }
  .two {
    flex: 1;
    color: #a5a5a5;
    margin: 0 2px;
    p {
      height: 5px;
      background-color: #a5a5a5;
      margin-bottom: 5px;
    }
    &_on {
      color: #faa501;
      p {
        background-color: #faa501;
      }
    }
  }
  .three {
    flex: 1;
    color: #a5a5a5;
    transition: 0.3s;
    p {
      height: 5px;
      background-color: #a5a5a5;
      border-radius: 0px 20px 20px 0px;
      margin-bottom: 5px;
    }
    &_on {
      color: #1b9554;
      p {
        background-color: #1b9554;
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
