function getIdAndParent(tree, idAndParentIds) { // idAndParentIds用来保存所有节点的id，parentId
    // 对原有的数据结构进行遍历，拿出所有节点的id，parentId到一个一维数组中。
    tree.forEach(item => {
        let mid = {
            menuId: item.menuId,
            parentId: item.parentId,
        }
        idAndParentIds.push(mid)

        if (item.children) {
            getIdAndParent(item.children, idAndParentIds)
        }
    })
}

function getId(id, parentIds, idAndParent, defaultParentId) {
    idAndParent.forEach(item => {
        if (item.menuId == id) {
            parentIds.unshift(id)
            if (item.parentId != defaultParentId) {
                getId(item.parentId, parentIds, idAndParent, defaultParentId)
            }
        }
    })
}
// 编辑时 数据回显
export default function editShow(data, parentId, defaultParentId = 0) { // idAndParent保存 Tree所有节点的id和parentId
    let idAndParent = [] // idAndParent保存 Tree所有节点的id和parentId
        // this.getIdAndParent(this.treeList, idAndParent)
    getIdAndParent(data, idAndParent)
    let parentIds = [] // 用于保存选中节点的父节点及父节点的父节点
    getId(parentId, parentIds, idAndParent, defaultParentId)

    return [...new Set(parentIds)]
}