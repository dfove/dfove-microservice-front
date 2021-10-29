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
  <div class="view">
    <div class="right">
      <el-row :gutter="15" type="flex" style="margin-bottom: 20px">
        <el-col :span="24">
          <el-input
            placeholder="请输入内容"
            v-model.trim="keyWord"
            @keyup.enter.native="
              searchKeyword = keyWord;
              currentPage = 1;
            "
            size="small"
            style="width: 300px; margin-right: 12px"
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
          <el-button size="small" @click="addOperate" type="primary"
            ><i class="iconfont icon-jiashang1" style="font-size: 12px"></i>
            添加权限
          </el-button>
        </el-col>
      </el-row>

      <el-table stripe :data="tableData" border style="width: 100%">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column
          prop="permissionName"
          label="权限名称"
          show-overflow-tooltip
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="permissionIdent"
          label="权限标识"
          show-overflow-tooltip
          sortable
        ></el-table-column>
        <el-table-column
          prop="apiUrl"
          label="Api接口"
          show-overflow-tooltip
          width="400px"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="permissionRemark"
          label="备注"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="postPermission"
          label="POST"
          align="center"
          width="100"
          :formatter="formatter"
        >
        </el-table-column>
        <el-table-column
          prop="deletePermission"
          label="DELETE"
          align="center"
          width="100"
          :formatter="formatter"
        >
        </el-table-column>
        <el-table-column
          prop="putPermission"
          label="PUT"
          align="center"
          width="100"
          :formatter="formatter"
        >
        </el-table-column>
        <el-table-column
          prop="getPermission"
          label="GET"
          align="center"
          width="100"
          :formatter="formatter"
        >
        </el-table-column>
        <el-table-column label="操作">
          <div slot-scope="scope" style="color: #027af2">
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑"
              placement="top-start"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-edit-outline"
                @click="compileOperat(scope.row)"
              ></el-button>
            </el-tooltip>

            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top-start"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-delete"
                @click="deleteOperate(scope.row.permissionId)"
              ></el-button>
            </el-tooltip>
          </div>
        </el-table-column>
      </el-table>

      <el-pagination
        style="text-align: center; margin-top: 30px;"
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
    </div>

    <!-- 添加、编辑权限信息框 -->
    <el-dialog
      :title="message + '权限'"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="550px"
    >
      <div>
        <el-form
          ref="ruleForm"
          :model="formParam"
          :rules="rules"
          label-width="100px"
        >
          <el-form-item label="api地址：" prop="apiUrl">
            <el-input v-model="formParam.apiUrl" size="small"></el-input>
          </el-form-item>
          <el-form-item label="权限名称：" prop="permissionName">
            <el-input
              v-model="formParam.permissionName"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="权限标识：" prop="permissionIdent">
            <el-input
              v-model="formParam.permissionIdent"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="HTTP方法：">
            <el-checkbox
              v-model="formParam.postPermission"
              :true-label="1"
              :false-label="0"
              label="POST"
            ></el-checkbox>
            <el-checkbox
              v-model="formParam.deletePermission"
              :true-label="1"
              :false-label="0"
              label="DELETE"
            ></el-checkbox>
            <el-checkbox
              v-model="formParam.putPermission"
              :true-label="1"
              :false-label="0"
              label="PUT"
            ></el-checkbox>
            <el-checkbox
              v-model="formParam.getPermission"
              :true-label="1"
              :false-label="0"
              label="GET"
            ></el-checkbox>
          </el-form-item>
          <el-form-item label="菜单权限：">
            <el-cascader
              :props="cascaderConfig"
              :options="$store.state.permission.menuList[0].children"
              v-model="currentMenu"
              :show-all-levels="true"
              change-on-select
              style="width: 100%"
              size="small"
            >
            </el-cascader>
          </el-form-item>

          <el-form-item label="备注：">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 6 }"
              v-model="formParam.permissionRemark"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <div style="text-align: center">
          <el-button size="medium" type="primary" @click="confirm('ruleForm')"
            >确 定</el-button
          >
          <el-button size="medium" @click="dialogVisible = false"
            >取 消</el-button
          >
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { formatterTree } from "@/utils/tree";
import tableMixin from "@/mixin/table";
import editShow from "@/utils/cascading";
import {
  getPermissionoPage,
  addPermissiono,
  editPermissiono,
  deletePermissiono
} from "@/api/basicManage/systemManage/managePermission/index";

export default {
  mixins: [tableMixin],
  components: {
    // Search,
    // MenuManage,
  },
  data() {
    return {
      pageSize: 20,
      currentPage: 1,
      showPage: true,
      currentMenu: [],
      cascaderConfig: {
        label: "name",
        value: "menuId"
      },
      message: "",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer  " + this.$store.state.token
      },
      formParam: {},
      permissionList: [],
      treeData: [],
      treeConfig: {
        label: "name",
        isLeaf: "leaf"
      },
      dialogVisible: false,
      formatterTreeArr: [],
      formatterTreeObj: {},
      editId: [],
      compileDisabled: false,
      rules: {
        apiUrl: [
          {
            required: true,
            message: "请输入Api地址",
            trigger: "blur"
          }
        ],
        permissionName: [
          {
            required: true,
            message: "请输入权限名称",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    requestParams() {
      return {
        data: {
          keyword: this.searchKeyword
        },
        currentPage: this.currentPage,
        pageSize: this.pageSize
      };
    }
  },
  mounted() {},
  methods: {
    /**获取table数据列表 */
    async getTableList() {
      let params = {
        ...this.requestParams,
        orderBy: "permission_id desc"
      };
      this.showPage = true;
      let res = await getPermissionoPage(params);
      this.tableData = res.data;
      this.totalCount = res.totalCount;
    },

    /**确定添加，修改权限 */
    confirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.currentMenu.length == 0) {
            this.$message({
              message: `请选择菜单权限`,
              type: "warning"
            });
            return false;
          }
          this.formParam.menuId = this.currentMenu[this.currentMenu.length - 1];
          if (this.message == "添加") {
            addPermissiono(this.formParam).then(res => {
              this.$message({
                message: `${this.message}权限成功`,
                type: "success"
              });
              this.getTableList();
              this.dialogVisible = false;
            });
          } else {
            editPermissiono(this.formParam).then(res => {
              this.$message({
                message: `${this.message}权限成功`,
                type: "success"
              });
              this.getTableList();
              this.dialogVisible = false;
            });
          }
        }
      });
    },

    /**显示添加弹出框 */
    addOperate() {
      this.dialogVisible = true;
      this.formParam = {
        apiUrl: "",
        permissionName: "",
        permissionIdent: "",
        permissionRemark: "",
        menuId: "",
        postPermission: 0,
        deletePermission: 0,
        putPermission: 0,
        getPermission: 0
      };
      this.currentMenu = [];
      console.log("88899", this.$store.state.permission.menuList);
      this.message = "添加";
      this.$nextTick(() => {
        this.$refs["ruleForm"].clearValidate();
      });
    },

    /**修改操作 */
    compileOperat(obj) {
      this.dialogVisible = true;
      this.formParam = JSON.parse(JSON.stringify(obj));
      this.message = "修改";
      this.currentMenu = editShow(
        this.$store.state.permission.menuList,
        obj.menuId,
        0
      );
      this.$nextTick(() => {
        this.$refs["ruleForm"].clearValidate();
      });
    },

    /**删除操作 */
    deleteOperate(id) {
      this.$confirm("此操作将删除该权限, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deletePermissiono(id).then(res => {
            if (res) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getTableList();
            }
          });
        })
        .catch(() => {});
    },

    /**table格式化内容 */
    formatter(row, column, cellValue, index) {
      switch (cellValue) {
        case 1:
          return <i class="el-icon-success" style="color: #67C23A;"></i>;
        case 0:
          return <i class="el-icon-error" style="color: #F56C6C;"></i>;
      }
    }
  }
};
</script>

<style>
.el-tree-node__content {
  height: 34px;
}
</style>
<style lang="scss" scoped>
.view {
  display: flex;
  .left {
    flex: 0 0 300px;
    margin-right: 20px;
    border: 1px solid #0d305c;
    border-radius: 3px;
    &__title {
      border-bottom: 1px solid #0d305c;
      padding: 12px 10px;
    }
  }
  .right {
    flex: 1;
    overflow-x: hidden;
    padding: 20px;
  }
}
</style>
