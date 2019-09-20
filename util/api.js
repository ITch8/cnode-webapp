import axios from 'axios'
//获取主题列表数据
const api = {
    async getData(params){
       return await axios({
           url: 'https://cnodejs.org/api/v1/topics?',
           method: 'get',
           params: params
       })
    }
}

export default api
