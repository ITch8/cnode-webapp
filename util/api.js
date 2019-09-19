import axios from 'axios'
//获取主题列表数据
const api = {
    getData: function(params) {
        return axios({
            url: 'https://cnodejs.org/api/v1/topics?',
            method: 'get',
            params: params
        })
    }
}

export default api
