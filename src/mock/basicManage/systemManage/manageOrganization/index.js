// 使用 Mock
import Mock from "mockjs";

const List = [];
const num = 10;

for (let i = 0; i < num; i++) {
  //  如果你一开始有点不太了解，可以写成固定的值，如： 'parent': '西安市',方便你查看效果然后逐步改
  List.push(
    Mock.mock({
      "id|+1": 1, // id每次循坏自增1
      "parent|1": ["西安市", "宝鸡市", "汉中市", "咸阳市"], // 每次随机取其中一个
      "name|1": [
        "福山加油站",
        "江南加油站",
        "加乐加油站",
        "文儒加油站",
        "龙和加油站",
        "龙门加油站"
      ],
      "worker|1": ["管理员1", "管理员2", "服务人员"],
      "num|1-5": 5, // 在1-5中随机取一个值
      "type|1": ["远程", "导入"],
      "height|10-17": 10,
      "volumeStart|5-20.1-2": 8.23, // 小数点前，从5-20中随机取，小数点后，1-2中随机取
      "volumeEnd|5-20": 8
    })
  );
}

export default {
  // 下面是增删改查方法的返回，和后台约定好之后就会省很多事
  // look
  getOrgList: () => {
    return {
      total: List.length,
      data: List
    };
  },
  // add
  createOrg: () => ({
    resultCode: 200,
    data: "success"
  }),
  // edit
  updateOrg: () => ({
    resultCode: 200,
    data: "success"
  }),
  // delete
  orgDelete: () => ({
    resultCode: 200,
    data: "success"
  })
};
