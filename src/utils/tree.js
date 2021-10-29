export function formatterTree(nodes, childrenKey = 'children') {
    var r = []
    if (Array.isArray(nodes)) {
        for (var i = 0, l = nodes.length; i < l; i++) {
            r.push(nodes[i])
            if (
                Array.isArray(nodes[i][childrenKey]) &&
                nodes[i][childrenKey].length > 0
            ) {
                let child = formatterTree(nodes[i][childrenKey], childrenKey)
                r.push(...child)
            }
            delete nodes[i][childrenKey]
        }
    }
    return r
}

// export function componentPath(data, childrenKey = 'children') {
//     data.forEach(item => {
//         item.component2 = item.component
//         if (item[childrenKey]) {
//             componentPath(item[childrenKey])
//         }
//     })
// }