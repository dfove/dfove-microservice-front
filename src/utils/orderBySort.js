import {Message} from 'element-ui'

/**
 * 
 * @param {*} orderColumn 列标题的参数
 * @param {*} orderState  列排序的状态
 * @param {*} orderByList 排序的已选参数
 * 
 */

export function orderBySort (orderColumn, orderState, orderByList = []) {
    if(!orderColumn && !orderState && Array.isArray(orderByList)) {
        Message.warning('请传入【orderColumn】、【orderState】、【orderByList】的值！')
        return
    }

    if(orderColumn === 'createTime') {
      return ['create_time']
    }

    const reg = /[A-Z]+/;
      let obj = orderColumn.match(reg);
      let str = orderColumn

      if (obj) {
        let index = obj.index;
        let str1 = orderColumn.substring(0, index).toUpperCase();
        let str2 = orderColumn.substring(index).toUpperCase();
        str = `${str1}${str2}`;
      }

      if(orderState) {
        let params = new Set([...orderByList, str.toUpperCase()])
        orderByList = [...params]
      } else {
        let index = orderByList.indexOf(str)
        orderByList.splice(index, 1)
      }
      return orderByList
    
}