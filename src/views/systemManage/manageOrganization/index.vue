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
  <div class="organizationManage">
    <div style="margin-bottom: 20px;">
      <el-button @click="addOperate" size="medium" type="primary"
        >添加机构</el-button
      >
    </div>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="organizationId"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="organizationName" label="机构名称" sortable>
      </el-table-column>
      <el-table-column prop="address" label="地址" sortable> </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="添加"
            placement="top-start"
          >
            <el-button
              size="mini"
              type="text"
              icon="el-icon-plus"
              @click="addChildOperate(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top-start"
          >
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="compileOperate(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top-start"
          >
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="deleteOperate(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="message + '机构'"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="650px"
    >
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="90px">
        <el-form-item label="机构选择" prop="parentId">
          <el-cascader
            :options="tableData2"
            change-on-select
            :props="defaultProps"
            v-model="form.parentId"
            :disabled="disabled"
            style="width: 65%"
            size="small"
          >
          </el-cascader>
        </el-form-item>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="组织名称" prop="organizationName">
              <el-input v-model="form.organizationName" size="small"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="行政编码">
              <el-input v-model="form.addrCode" size="small"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="电话">
              <el-input v-model="form.phone" size="small"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="描述">
              <el-input v-model="form.info" size="small"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="经度">
              <el-input v-model="form.gisX" size="small"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="纬度">
              <el-input v-model="form.gisY" size="small"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="排序">
              <el-input v-model="form.orderNum" size="small"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="机构类型">
              <el-input v-model="form.orgType" size="small"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="状态">
              <el-input v-model="form.status" size="small"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="地址" prop="address">
              <el-input type="textarea" v-model="form.address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <div style="text-align: center;">
          <el-button size="medium" type="primary" @click="confirm('ruleForm')"
            >确 定</el-button
          >
          <el-button size="medium" @click="handleClose">取 消</el-button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import tableMixin from "@/mixin/table";
import { formatterTree } from "@/utils/tree";
import {
  addOrganization,
  editOrganization,
  getUserRole,
  getUserRoleNoPaging
} from "@/api/basicManage/systemManage/manageOrganization/index";
import { getOrganizationList } from "@/api/public";

export default {
  mixins: [tableMixin],
  data() {
    return {
      activeName2: "first",
      disabled: false,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer  " + this.$store.state.token
      },
      message: "",
      dialogVisible: false,
      form: {},
      selectedOptions: [],
      tableData2: [],
      dataId: [],
      defaultProps: {
        children: "children",
        label: "organizationName",
        value: "organizationId"
      },
      organizationName: "",
      organizationId: "",
      roleIdList: [],
      roleDataList: [],
      roleIdParams: [],
      rules: {
        organizationName: [
          {
            required: true,
            message: "请输入组织名称",
            trigger: "blur"
          }
        ],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
        parentId: [{ required: true, message: "请选择机构", trigger: "blur" }]
      }
    };
  },
  computed: {
    requestParams() {
      return {
        data: {
          groupParentId: 0,
          organizationName: this.searchKeyword
        },
        currentPage: 0,
        orderBy: "ORDER_NUM"
      };
    }
  },
  watch: {
    "$store.state.userManage.adminId"(v) {
      if (v) {
        this.getSelectedRole();
      }
    }
  },
  beforeDestroy() {
    this.$store.commit("userManage/CLEAR_ADMINID");
  },
  mounted() {
    this.getTableListNoPaging();
    if (this.$store.state.userManage.adminId) {
      this.getSelectedRole();
    }
  },
  methods: {
    handleCheckChange2(node, data, event) {
      this.handleCheckChange(data);
    },
    cleartroleIdList() {
      this.roleIdList = [];
    },
    handleCheckChange(data) {
      this.$refs.tree.setCheckedKeys([data.organizationId]);
      this.organizationId = data.organizationId;
      this.organizationName = data.organizationName;
      // this.$store.commit('userManage/SET_ADMINID', '')
      this.roleIdList = [];
    },
    allOrganization() {
      this.$refs.tree.setCheckedKeys([]);
      this.organizationId = "";
      this.roleIdList = [];
    },
    async getTableList() {
      let params = {
        ...this.requestParams,
        orderBy: "create_date desc"
      };

      try {
        let res = await getOrganizationList(params);
        if (res.code === "200") {
          this.tableData = res.data;

          this.tableData2 = res.data
            ? JSON.parse(JSON.stringify(res.data))
            : [];
          this.tableData2.unshift({
            organizationName: "根机构",
            organizationId: 0,
            children: null
          });
        }
      } catch (error) {
        console.log(error);
      }
    },

    // 添加操作
    addOperate() {
      this.dialogVisible = true;
      this.message = "添加";
      this.form = {
        parentId: [0],
        addrCode: "",
        address: "",
        gisX: "",
        gisY: "",
        info: "",
        orderNum: "",
        orgType: "",
        organizationName: "",
        phone: "",
        status: ""
      };
      this.$nextTick(() => {
        this.$refs["ruleForm"].clearValidate();
      });
    },

    // 确定添加
    confirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = JSON.parse(JSON.stringify(this.form));
          params.parentId = this.form["parentId"][
            this.form["parentId"].length - 1
          ];

          let mode = this.message == "添加" ? "post" : "put";
          if (this.message == "添加") {
            addOrganization(params).then(res => {
              this.$message({
                message: `${this.message}成功`,
                type: "success"
              });
              this.dialogVisible = false;
              this.disabled = false;
              this.$refs[formName].resetFields();
              this.getTableList();
            });
          } else {
            editOrganization(params).then(res => {
              this.$message({
                message: `${this.message}成功`,
                type: "success"
              });
              this.dialogVisible = false;
              this.disabled = false;
              this.$refs[formName].resetFields();
              this.getTableList();
            });
          }
        }
      });
    },

    // 添加子机构的操作
    addChildOperate(data) {
      this.disabled = true;
      // 机构回显
      this.addOperate();
      let category = formatterTree(JSON.parse(JSON.stringify(this.tableData)));

      if (data.parentId == 0) {
        this.form.parentId = this.getAllParentById(data, category);
      } else {
        this.form.parentId = this.getAllParentById(data.parentId, category);
        this.form.parentId.push(data.organizationId);
      }
    },

    seleteOrganization(node, data, event) {
      this.organizationName = data.organizationName;
      // console.log('00---', data.organizationId)
    },

    // 编辑操作
    compileOperate(data) {
      this.$nextTick(() => {
        this.$refs["ruleForm"].clearValidate();
      });
      this.dialogVisible = true;
      this.message = "修改";
      let paramsObj = {};

      Object.keys(data).forEach(item => {
        if (
          item != "updator" &&
          item != "updateDate" &&
          item != "children" &&
          item != "creator"
        ) {
          paramsObj[item] = data[item];
        }
      });

      this.form = paramsObj;
      // 机构回显
      let category = formatterTree(JSON.parse(JSON.stringify(this.tableData)));

      if (data.parentId == 0) {
        // this.form.parentId = this.getAllParentById(data, category)
        this.form.parentId = [0];
      } else {
        this.form.parentId = this.getAllParentById(data.parentId, category);
        // this.tableData2 = this.tableData2.filter(item => {
        //   if (item.organizationName != '根机构') {
        //     return item
        //   }
        // })
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

    // 取消操作
    handleClose() {
      this.dialogVisible = false;
      this.disabled = false;
    },

    // 删除操作
    deleteOperate(data) {
      this.$confirm(`删除【${data.organizationName}】、是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteOrganization(data.organizationId).then(res => {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getTableList();
          });
        })
        .catch(() => {});
    },

    showAllRole() {
      this.roleDataList.forEach(item2 => {
        item2.checked = false;
      });
      this.roleIdList = [];
      this.$store.commit("userManage/CLEAR_ADMINID");
    },

    // 获取管理员已拥有的角色
    async getSelectedRole() {
      this.roleDataList.forEach(item2 => {
        item2.checked = false;
      });
      let params = {
        data: {
          adminId: this.$store.state.userManage.adminId
        }
      };
      let res = await getUserRole(params);
      this.roleIdList = res.data.map(item => {
        this.roleDataList.forEach(item2 => {
          if (item.roleId == item2.roleId) {
            item2.adminRoleId = item.adminRoleId;
            item2.checked = true;
          }
        });
        return item.roleId;
      });
    },

    // 获取不分页的管理员角色列表
    async getTableListNoPaging() {
      let res = await getUserRoleNoPaging({ data: {} });
      res.data.forEach(item => {
        item.checked = false;
      });
      this.roleDataList = res.data;
    }
  }
};
</script>

<style lang="scss" scoped>
.organizationManage {
  padding: 20px;
}
</style>
