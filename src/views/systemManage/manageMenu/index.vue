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
  <div class="container menuManage">
    <el-row type="flex" style="padding-bottom: 20px">
      <el-col :span="24">
        <el-input
          placeholder="请输入菜单名称"
          v-model="keyWord"
          style="width: 300px; margin-right: 10px"
          size="small"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchKeyword = keyWord"
          ></el-button>
        </el-input>
        <el-button
          type="primary"
          size="small"
          class="el-icon-plus"
          @click="addOperate"
        >
          添加</el-button
        >
      </el-col>
    </el-row>

    <div>
      <el-table
        :data="tableListNoPaging"
        style="width: 100%; margin-bottom: 20px"
        row-key="menuId"
        border
        :tree-props="{ children: 'children' }"
      >
        <el-table-column prop="menuName" label="菜单名称" sortable>
        </el-table-column>
        <el-table-column
          prop="menuUrl"
          label="菜单链接"
          show-overflow-tooltip
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="menuType"
          label="菜单类型"
          :formatter="formatter"
        >
        </el-table-column>
        <el-table-column prop="icon" label="菜单图标" sortable align="center">
          <template slot-scope="scope">
            <i
              v-if="scope.row.menuImg"
              style="
                                width: 30px;
                                height: 30px;
                                border-radius: 2px;
                            "
              class="iconfont"
              :class="scope.row.menuImg"
            >
            </i>
          </template>
        </el-table-column>
        <el-table-column
          prop="menuUrl"
          label="菜单链接"
          show-overflow-tooltip
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="componentUrl"
          label="页面路径"
          show-overflow-tooltip
          sortable
        >
        </el-table-column>
        <el-table-column prop="menuOrder" label="菜单排序" sortable>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="添加"
              placement="top-start"
            >
              <el-button
                type="text"
                size="small"
                class="el-icon-plus"
                @click="currentMenuAdd(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑"
              placement="top-start"
            >
              <el-button
                type="text"
                size="small"
                class="el-icon-edit"
                @click="eidtMenu(scope.row)"
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
                class="el-icon-delete"
                @click="deleteOperate(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 添加、修改菜单信息框 -->
    <el-dialog
      :title="message + '菜单'"
      :visible.sync="dialogVisible"
      width="580px"
    >
      <div>
        <el-form
          ref="ruleForm"
          :model="formParam"
          :rules="rules"
          label-width="110px"
        >
          <el-form-item label="菜单图标：">
            <el-popover placement="bottom-start" width="400" trigger="click">
              <ul class="icon-box">
                <li
                  v-for="(item, index) in iconDataList.type1"
                  :key="index"
                  @click="selectIcon(item.icon)"
                  :class="{ activeClass: formParam.menuImg == item.icon }"
                >
                  <i class="iconfont" :class="item.icon"></i>
                  <p class="name">{{ item.name }}</p>
                </li>
              </ul>
              <el-button
                slot="reference"
                v-if="formParam.menuImg"
                class="iconfont"
                :class="formParam.menuImg"
              ></el-button>
              <el-button slot="reference" v-else>选择图标</el-button>
            </el-popover>
          </el-form-item>

          <el-form-item label="上级菜单：" prop="parentId">
            <el-cascader
              :props="cascaderConfig"
              :options="tableDataNoPaging"
              v-model="currentMenu.default"
              @change="changeCascader"
              :show-all-levels="true"
              change-on-select
              style="width: 100%"
              size="small"
            >
            </el-cascader>
          </el-form-item>

          <el-form-item
            :label="currentMenu.default[0] == 0 ? '菜单名称：' : '子菜单名称：'"
            prop="menuName"
          >
            <el-input v-model="formParam.menuName" size="small"></el-input>
          </el-form-item>

          <el-form-item label="菜单地址：" prop="menuUrl">
            <el-input v-model="formParam.menuUrl" size="small"></el-input>
          </el-form-item>

          <el-form-item label="页面路径：" prop="componentUrl">
            <el-input v-model="formParam.componentUrl" size="small"></el-input>
          </el-form-item>

          <el-form-item label="菜单类型：">
            <el-radio-group v-model="formParam.menuType">
              <el-radio :label="1">菜单</el-radio>
              <el-radio :label="2">功能</el-radio>
              <el-radio :label="3">操作</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="排序：">
            <el-input
              v-model.number="formParam.menuOrder"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input type="textarea" v-model="formParam.menuRemark"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <div style="text-align: center">
          <el-button size="medium" @click="handleClose">取 消</el-button>
          <el-button
            size="medium"
            type="primary"
            @click="addPermission('ruleForm')"
            >确 定</el-button
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
import { upload } from "@/api/public";
import {
  menuNoPage,
  addMenu,
  editMenu,
  deleteMenu
} from "@/api/basicManage/systemManage/manageMenu/index";
import iconData from "@/styles/iconfont";

export default {
  // mixins: [tableMixin],
  data() {
    return {
      iconDataList: [],
      tableDataNoPaging: [],
      keyword: "",
      radio2: 1,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer  " + this.$store.state.token
      },
      message: "",
      parenMenuName: "",
      formParam: {},
      permissionList: [],
      cascaderConfig: {
        label: "menuName",
        value: "menuId"
      },
      treeConfig: {
        label: "menuName",
        id: "menuId",
        isLeaf: "leaf"
      },
      dialogVisible: false,
      currentMenu: {
        default: [0],
        id: []
      },
      formatterTreeArr: [],
      formatterTreeObj: {},
      editId: [],
      compileDisabled: false,
      // tableData1: [],
      tableListNoPaging: [],
      idAndParentIds: [],
      parentId: [],
      activeMenuId: "",
      rules: {
        menuName: [
          {
            required: true,
            message: "请输入菜单名称",
            trigger: "blur"
          }
        ],
        menuUrl: [
          {
            required: true,
            message: "请输入菜单地址",
            trigger: "blur"
          }
        ],
        component: [
          {
            required: true,
            message: "请输入页面路径",
            trigger: "blur"
          }
        ],
        parentId: [{ required: true, message: "请选择目录", trigger: "blur" }]
      },
      imageUrl: "",
      keyWord: ""
    };
  },
  computed: {
    requestParams() {
      return {
        data: {
          menuName: this.searchKeyword,
          parentId: this.radio2 == 1 ? 0 : ""
        },
        orderBy: "MENU_ORDER"
      };
    }
  },
  mounted() {
    this.iconDataList = iconData;
    this.getTableList();
  },
  methods: {
    /**选择图标 */
    selectIcon(v) {
      this.formParam.menuImg = v;
    },

    /**获取菜单列表不分页级联 */
    async getTableList() {
      let params = {
        data: {
          menuName: "",
          parentId: this.radio2 == 1 ? 0 : ""
        },
        orderBy: "MENU_ORDER"
      };

      let res = await menuNoPage(params);
      this.tableDataNoPaging = JSON.parse(JSON.stringify(res.data));
      this.tableDataNoPaging.unshift({
        menuName: "目录",
        menuId: 0,
        parentId: 0
      });
      this.$store.commit("permission/SET_MENULIST", res.data);
      this.tableListNoPaging = res.data;
    },

    /**弹出框菜单名称的切换 */
    changeCascader(v) {
      if (v[0] === "") {
        this.currentMenu.default = [0];
      } else {
        this.formParam.parentId = v[v.length - 1];
      }
    },

    formatter(row, column, cellValue, index) {
      switch (row.menuType) {
        case 1:
          return "菜单";
        case 2:
          return "功能";
        case 3:
          return "操作";
      }
      return 9;
    },

    /**添加操作 */
    addOperate() {
      this.message = "添加";
      this.dialogVisible = true;
      this.currentMenu.default = [0];
      this.formParam = {
        menuImg: "",
        menuId: "",
        menuName: "",
        menuUrl: "",
        menuType: 1,
        menuOrder: 20,
        menuRemark: "",
        parentId: 0,
        componentUrl: ""
      };
      this.$nextTick(() => {
        this.$refs["ruleForm"].clearValidate();
      });
    },

    /**编辑树形菜单 */
    eidtMenu(data) {
      this.message = "修改";
      this.dialogVisible = true;
      this.formParam = {
        menuImg: data.menuImg,
        menuId: data.menuId,
        menuName: data.menuName,
        menuUrl: data.menuUrl,
        menuType: data.menuType,
        menuOrder: data.menuOrder,
        menuRemark: data.menuRemark,
        parentId: data.parentId,
        componentUrl: data.componentUrl
      };
      this.currentMenu.default = editShow(
        this.tableDataNoPaging,
        data.parentId,
        0
      );
      this.$nextTick(() => {
        this.$refs["ruleForm"].clearValidate();
      });
    },

    /**删除菜单 */
    deleteOperate(obj) {
      this.$confirm(`删除【${obj.menuName}】菜单, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteMenu(obj).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getTableList();
          });
        })
        .catch(() => {});
    },

    /**确定添加 */
    addPermission(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.message == "修改") {
            editMenu(this.formParam).then(res => {
              this.$message({
                message: `${this.message}成功`,
                type: "success"
              });
              this.dialogVisible = false;
              this.getTableList();
              this.$refs[formName].resetFields();
            });
          } else {
            addMenu(this.formParam).then(res => {
              this.$message({
                message: `${this.message}成功`,
                type: "success"
              });
              this.dialogVisible = false;
              this.getTableList();
              this.$refs[formName].resetFields();
            });
          }
        }
      });
    },

    /**取消弹出框 */
    handleClose() {
      this.dialogVisible = false;
    },

    clearOperate() {
      this.$refs.treeMenu.setCheckedKeys([]);
      this.$store.commit("privilegeManage/CLEAR_MENUID");
    },

    /**当前的树形菜单添加子菜单 */
    currentMenuAdd(data) {
      this.message = "添加";
      this.dialogVisible = true;
      this.compileDisabled = true;
      this.formParam = {
        menuImg: "",
        menuName: "",
        menuUrl: "",
        menuOrder: 20,
        menuRemark: "",
        parentId: data.menuId,
        componentUrl: ""
      };
      this.currentMenu.default = editShow(
        this.tableListNoPaging,
        data.menuId,
        0
      );
    }
  }
};
</script>

<style>
.el-tree-node__content {
  height: 34px;
}
.menuManage .el-checkbox:hover {
  color: #60b5d1;
}
.menuManage .el-tree-node__content {
  background-color: transparent !important;
}
</style>
<style lang="scss" scoped>
.menuManage {
  padding: 20px;
}
.ipip {
  color: #60b5d1;
}
.container {
  height: 100%;
  overflow-y: auto;
  .el-tree {
    background-color: #03244e;
    color: #679dc1;
  }
}
.left__title {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #03244e;
  h3 {
    font-size: 15px;
    color: white;
    &:hover {
      color: #60b5d1;
      text-decoration: underline;
      cursor: pointer;
    }
    .el-icon-menu {
      font-size: 16px;
    }
  }
}
.icon-uploader {
  height: 0;
}
.icon-uploader .el-upload {
  // border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.icon-uploader .el-upload:hover {
  border-color: #409eff;
}
.icon-uploader-icon {
  font-size: 20px;
  color: #8c939d;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
}
.avatar {
  width: 40px;
  height: 40px;
  display: block;
}

.icon-box {
  display: flex;
  flex-wrap: wrap;
  & > li {
    flex: 0 0 50px;
    height: 40px;
    text-align: center;
    padding: 5px;
    border-radius: 2px;
    transition: 0.3s;
    cursor: pointer;
    margin-bottom: 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    &.activeClass {
      color: #409eff;
      background-color: #e9f0f7;
    }
    &:hover {
      color: #409eff;
      background-color: #e9f0f7;
    }
    .iconfont {
      display: inline-block;
      font-size: 18px;
    }
    .name {
      font-size: 10px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>
