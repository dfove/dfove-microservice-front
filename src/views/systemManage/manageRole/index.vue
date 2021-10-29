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
  <div class="roleManage">
    <el-row type="flex" style="padding-bottom: 20px">
      <el-col :span="12">
        <el-input
          placeholder="请输入内容"
          v-model="keyWord"
          style="width: 300px"
          size="small"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchKeyword = keyWord"
          ></el-button>
        </el-input>
      </el-col>
      <el-col :span="12" align="right">
        <el-button size="small" @click="clearCache(true)" type="primary"
          >清除缓存</el-button
        >
        <el-button
          type="primary"
          size="small"
          class="el-icon-plus"
          @click="addOperate"
        ></el-button
      ></el-col>
    </el-row>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="roleName" label="角色名称"> </el-table-column>
      <el-table-column prop="roleRemark" label="描述"> </el-table-column>
      <el-table-column prop="type" label="角色类型"> </el-table-column>
      <el-table-column prop="roleName" label="状态"> </el-table-column>
      <el-table-column prop="roleName" label="创建日期"> </el-table-column>
      <el-table-column label="操作" width="250px">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="权限分配"
            placement="top-start"
          >
            <el-button
              size="mini"
              type="text"
              icon="el-icon-key"
              @click="handlePermission(scope.row)"
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
              @click="editOperate(scope.row)"
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
              class="el-icon-delete"
              @click="deleteOperate(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="message + '角色'"
      :visible.sync="dialogVisible"
      width="450px"
    >
      <div>
        <el-form ref="form" :model="form" label-width="90px">
          <el-form-item label="角色名称：">
            <el-input size="small" v-model="form.roleName"></el-input>
          </el-form-item>
          <!-- <el-form-item label="排序：">
                        <el-input v-model="form.menuOrder"></el-input>
                    </el-form-item> -->
          <!-- <el-form-item label="状态：">
                        <el-input v-model="form.status"></el-input>
                    </el-form-item> -->
          <el-form-item label="描述：">
            <el-input type="textarea" v-model="form.roleRemark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <div style="text-align: center">
          <el-button @click="cancelCreate">取 消</el-button>
          <el-button type="primary" @click="confirmCreate">确 定</el-button>
        </div>
      </span>
    </el-dialog>

    <el-dialog
      title="权限分配"
      :visible.sync="permissionDialog"
      width="800px"
      :before-close="handleClose"
      top="8vh"
    >
      <div>
        <el-row :gutter="20">
          <el-col :span="11">
            <div class="permission-box">
              <h3 class="permission-title">用户菜单</h3>
              <el-tree
                ref="tree"
                :check-strictly="false"
                @node-click="handleCheckChange"
                @check="checkChange"
                :data="menuDataList"
                :props="treeConfig"
                :highlight-current="highlightCurrent"
                :default-expand-all="true"
                :render-content="renderContent"
                show-checkbox
                :expand-on-click-node="false"
                node-key="menuId"
                style="
                                    max-height: 500px;
                                    overflow-y: auto;
                                    border-radius: 2px;
                                    padding: 10px;
                                "
              >
              </el-tree>
            </div>
          </el-col>
          <el-col :span="13">
            <div class="permission-box">
              <h3 class="permission-title">{{ menuName }} 权限</h3>
              <div class="permission-list">
                <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox> -->
                <el-checkbox-group
                  v-model="roleDefaultMenuPrivilege"
                  @change="handleCheckedCitiesChange"
                >
                  <el-checkbox
                    v-for="(item, i) in roleMenuPrivilege"
                    :key="i"
                    :label="item.permissionId"
                    >{{ item.permissionName }}</el-checkbox
                  >
                </el-checkbox-group>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <div style="text-align: center">
          <el-button size="medium" @click="handleClose">取 消</el-button>
          <el-button size="medium" type="primary" @click="confirmAllocation"
            >确 定</el-button
          >
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRoleMenu,
  getAllPrivilegeList,
  getRoleList,
  getMenuPermissionList,
  createRole,
  editRole,
  updateRolePermission,
  getRolePermission,
  updateRoleMenu,
  deleteRole
} from "@/api/basicManage/systemManage/manageRole/index";
import { clearCacheData } from "@/api/public";
export default {
  props: {
    RoleName: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      systemNodeFlag: true,
      permissionDialog: false,
      message: "",
      dialogVisible: false,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer  " + this.$store.state.token
      },
      roleDataList: [],
      menuDataList: [],
      roleDefaultMenu: [],
      roleDefaultMenuPrivilege: [],

      roleMenuPrivilege: [],
      roleSelectMenu: [],
      dialogVisible: false,
      form: {},
      treeConfig: {
        label: "name",
        isLeaf: "leaf"
      },
      parentMenuId: [],
      tableData: [],
      roleId: "",
      menuName: "",
      parentIds: [],
      highlightCurrent: false,
      isIndeterminate: false,
      checkAll: false,
      cityOptions: [],
      menuTile: [],
      selectedMenuData: [],
      filteData: [],
      privilegeData: [],
      privilegeParams: [],
      keyWord: ""
    };
  },
  watch: {
    RoleName(name) {
      this.keyWord = name;
      this.searchKeyword = this.keyWord;
    }
  },
  mounted() {
    // this.getRole()
    this.getMenuList();
    this.getTableList();
    this.getAllPrivilege();
  },
  computed: {
    requestParams() {
      return {
        data: {
          roleName: this.searchKeyword
        }
      };
    }
  },
  methods: {
    /* Tree树形自定义 */
    renderContent(h, { node, data, store }) {
      return (
        <span
          class="custom-tree-node"
          // on-click={() => {
          //     this.getMenuPermission(data.id);
          // }}
        >
          <span
            style={{
              display: "inline-block",
              "margin-right": "20px",
              "vertical-align": "middle"
            }}
          >
            <i style="color: #409EFF" class={"iconfont" + " " + data.icon} />{" "}
            {node.label}
          </span>
        </span>
      );
    },

    currentMenuAdd(node, data, event) {
      event.stopPropagation();
    },

    /**获取角色列表 */
    async getTableList() {
      let res = await getRoleList(this.requestParams);
      this.tableData = res.data;
      this.tableData.sort((a, b) => { // 处理排序
        if (a.type === b.type) {
          return a.superAdmin - b.superAdmin;
        }
        return a.type - b.type;
      });
      this.totalCount = res.totalCount;
    },

    /**获取菜单权限列表 */
    async getMenuPermission(menuId) {
      let params = {
        data: {
          menuId
        }
      };
      let res = await getMenuPermissionList(params);
      if (res.data && res.data.length) {
        this.menuName = res.data[0].menuName;
        console.log("=-=-=-", res.data);
        this.roleMenuPrivilege = res.data[0].permission;
        // this.getDefaultPrivilege();
        // this.getMenuDefaultPrivilege();
      }
    },

    /**权限分配 */
    handlePermission(row) {
      this.permissionDialog = true;
      this.highlightCurrent = false;
      this.roleId = row.roleId;
      this.getDefaultPrivilege();
      this.getMenuDefaultPrivilege();
      // 获取角色已有的权限
      // this.handleCheckedCitiesChange();
    },

	/**弹出框显示 */
    addOperate() {
      this.dialogVisible = true;
      this.message = "添加";
      this.form = {
        roleName: "",
        roleRemark: "",
        superAdmin: 100,
        type: "2"
      };
    },

    /**确定权限分配 */
    confirmAllocation() {
      this.updateMenu();
      this.updatuPermission();
      this.permissionDialog = false;
    },

    /**确定创建 */
    async confirmCreate() {
      this.dialogVisible = true;
      let res = {};
      if (this.message == "添加") {
        res = await createRole(this.form);
      } else {
        res = await editRole(this.form);
      }
      this.$message({
        message: `${this.message}角色成功`,
        type: "success"
      });
      this.dialogVisible = false;
      this.getTableList();
    },

    /**取消创建 */
    cancelCreate() {
      this.roleId = "";
      this.dialogVisible = false;
      this.systemNodeFlag = true;
    },

	/**关闭弹出框 */
    handleClose() {
      this.roleId = "";
      this.highlightCurrent = false;
      this.menuName = "";
      this.roleMenuPrivilege = [];
      this.roleDefaultMenuPrivilege = [];
      this.permissionDialog = false;
    },

    handleCheckAllChange(val) {
      // this.roleDefaultMenuPrivilege = val ? this.cityOptions : [];
      // this.isIndeterminate = false;
    },

    editOperate(obj) {
      this.dialogVisible = true;
      this.form = JSON.parse(JSON.stringify(obj));
      this.message = "修改";
    },

    /**删除角色 */
    deleteOperate(obj) {
      this.$confirm("此操作将删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteRole(obj.roleId).then(res => {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getTableList();
          });
        })
        .catch(() => {});
    },

    /**获取所有菜单 */
    getMenuList() {
      this.menuDataList = this.$store.state.permission.menuList[0].children;
      let dataList = [];
      let dataParentId = [];
      this.menuDataList.forEach(item => {
        this.filterMockMenuData(item, dataList, dataParentId);
      });
      dataParentId = new Set(dataParentId);
      this.parentIds = [...dataParentId];

      this.menuTile = dataList;
      // console.log("所有菜单", this.menuDataList);
      // console.log("所有父节点", this.parentIds);
    },

    /**平铺数据，处理父节点数据 */
    filterMockMenuData(data, dataList, yuId) {
      dataList.push(data);
      yuId.push(data.parentId);
      if (data.children) {
        data.children.forEach(item => {
          this.filterMockMenuData(item, dataList, yuId);
        });
      }
    },

    /**选择当前的菜单 */
    checkChange(data, checked) {
      let allMenu = [...checked.halfCheckedNodes, ...checked.checkedNodes];

      this.selectedMenuData = allMenu.map(item => {
        return {
          menuId: item.menuId,
          roleId: this.roleId,
          restore: 0,
          menuOrder: item.menuOrder
        };
      });

      // console.log("this.selectedMenuData", this.selectedMenuData);
    },

    /**批量更新角色菜单 */
    async updateMenu() {
      let res = await updateRoleMenu(this.selectedMenuData);
      this.$message({
        message: "菜单设置成功",
        type: "success"
      });
    },

    /**批量更新角色权限 */
    async updatuPermission() {
      let res = await updateRolePermission(this.privilegeParams);
      this.$message({
        message: "权限设置成功",
        type: "success"
      });
    },

    /**获取角色已拥有的菜单列表 */
    async getDefaultPrivilege() {
      let params = {
        data: {
          roleId: this.roleId
        }
      };

      let res = await getRoleMenu(params);
      this.roleDefaultMenu = res.data.map(item => item.menuId);
      var tempArray1 = []; //临时数组1
      var tempArray2 = []; //临时数组2
      for (var i = 0; i < this.parentIds.length; i++) {
        tempArray1[this.parentIds[i]] = true; //将数parentIds 中的元素值作为tempArray1 中的键，值为true；
      }
      for (var i = 0; i < this.roleDefaultMenu.length; i++) {
        if (!tempArray1[this.roleDefaultMenu[i]]) {
          tempArray2.push(this.roleDefaultMenu[i]); //过滤roleDefaultMenu 中与parentIds 相同的元素；
        }
      }
      this.roleDefaultMenu = tempArray2;
      // 设置默认的菜单传值集合
      this.selectedMenuData = res.data.map(item => {
        return {
          menuId: item.menuId,
          roleId: this.roleId,
          restore: 0,
          menuOrder: item.menuOrder
        };
      });
      this.$refs.tree.setCheckedKeys(this.roleDefaultMenu);
    },

    /**获取角色已拥有的权限列表 */
    async getMenuDefaultPrivilege() {
      let params = {
        data: {
          roleId: this.roleId
        }
      };
      let res = await getRolePermission(params);
      this.filteData = res.data.map(item => item.permissionId);
      this.roleDefaultMenuPrivilege = [...new Set(this.filteData)];

      this.handleCheckedCitiesChange();
    },

    /**获取所有权限 */
    async getAllPrivilege() {
      let res = await getAllPrivilegeList({ data: {} });
      this.privilegeData = res.data;
    },

    /**初始化checbox为false */
    initCheckbox(data) {
      data.checkbox = false;
      if (data.children) {
        this.parentMenuId.push(data.menuId);
        data.children.forEach(item => {
          this.initCheckbox(item);
        });
      }
    },

    allChildren(data, arr) {
      if (arr.indexOf(data.menuId) != -1) {
        data.checkbox = true;
        data.roleMenuId = 1;
      }
      if (data.children) {
        data.children.forEach(item => {
          this.allChildren(item, arr);
        });
      }
    },

    /**权限选择 */
    handleCheckedCitiesChange(value) {
      this.privilegeParams = [];
      this.privilegeData.filter(item => {
        if (this.roleDefaultMenuPrivilege.indexOf(item.permissionId) != -1) {
          this.privilegeParams.push({
            restore: 0,
            roleId: this.roleId,
            permissionId: item.permissionId,
            deletePermission: item.deletePermission,
            getPermission: item.getPermission,
            postPermission: item.postPermission,
            putPermission: item.putPermission
          });
        }
      });
    //   console.log("已选的权限", this.privilegeParams);
    },

    // 查找父id
    parentId() {},

    /**选择菜单 */
    handleCheckChange(data, checked) {
      this.highlightCurrent = true;
      console.log(data.name + "的权限", data);

      // 获取当前菜单的所有权限
      this.getMenuPermission(data.menuId);
    },

    /**清除缓存 */
    async clearCache(v) {
      let res = await clearCacheData();
      if (v) {
        this.$message({
          message: "清除缓存成功",
          type: "success"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.roleManage {
  padding: 20px;
  // /deep/ .el-tree {
  //   color: #dcdcdc;
  //   background-color: transparent;
  // }
  // /deep/ .el-checkbox {
  //   display: block;
  //   color: #d3d9e4;
  //   padding: 4px 0;
  // }
}
.permission-box {
  background-color: #efefef;
}
.permission-title {
  border-bottom: 1px solid #e0e0e0;
  padding: 12px;
  color: #000;
}
.permission-list {
  height: 500px;
  overflow-y: auto;
  padding: 10px 20px;
}
.permission-box /deep/ {
  .el-tree > .el-tree-node:after {
    border-top: none;
  }
  .el-tree-node__content:hover {
    background-color: transparent;
  }
  .el-tree--highlight-current
    .el-tree-node.is-current
    > .el-tree-node__content {
    background-color: #2774c3;
    // background-color: transparent;
  }
  .el-tree-node {
    position: relative;
    padding-left: 16px;
  }
  //节点有间隙，隐藏掉展开按钮就好了,如果觉得空隙没事可以删掉
  .el-tree-node__expand-icon.is-leaf {
    display: none;
  }
  .el-tree-node__children {
    padding-left: 16px !important;
  }

  .el-tree-node :last-child:before {
    height: 38px;
  }

  .el-tree-node:focus > .el-tree-node__content {
    background-color: transparent;
  }

  .el-tree > .el-tree-node:before {
    border-left: none;
  }

  .el-tree > .el-tree-node:after {
    border-top: none;
  }

  .el-tree-node:before {
    content: "";
    left: -4px;
    position: absolute;
    right: auto;
    border-width: 1px;
  }

  .el-tree-node:after {
    content: "";
    left: -4px;
    position: absolute;
    right: auto;
    border-width: 1px;
  }

  .el-tree-node:before {
    border-left: 1px solid #606671;
    bottom: 0px;
    height: 100%;
    top: -26px;
    width: 1px;
  }

  .el-tree-node:after {
    border-top: 1px solid #606671;
    height: 20px;
    top: 12px;
    width: 24px;
  }
  /deep/ .el-tree-node__content {
    height: 28px;
  }
}
</style>
