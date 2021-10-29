export default {
    data() {
        return {
            keyWord: '',
            searchKeyword: '',
            currentPage: 1,
            pageSize: 10,
            totalCount: 0,
            totalPage: 0,
            tableData: []
        }
    },
    watch: {
        keyWord(v) {
            if (v == '') {
                this.searchKeyword = ''
                this.getTableList()
            }
        },
        requestParams: {
            handler: 'getTableList',
            immediate: true
        }
    }
}