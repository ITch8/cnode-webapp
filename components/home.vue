<template>
    <van-tabs sticky color="#80bd01" background="#444444" title-inactive-color="#ffffff" title-active-color="#80bd01" v-model="activeTopic" animated swipeable @change="onChange">
        <van-tab v-for="(tab, index) in tabs" :title="tab.title" :key="index">
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :error.sync="error" error-text="请求失败，点击重新加载" @load="onLoad">
                    <data-list :dataList="tab.dataList" />
                </van-list>
            </van-pull-refresh>
        </van-tab>
    </van-tabs>
</template>

<script>
import api from '@/util/api.js';
import DataList from '@/components/datalist.vue';
import { Notify } from 'vant';

let page = 1;
export default {
    components: {
        DataList
    },
    data() {
        return {
            loading: false,
            finished: false,
            error: false,
            refreshing: false,
            tabs: [
                {
                    title: '全部',
                    topic: 'ask',
                    dataList: [],
                    page: 1
                },
                {
                    title: '精华',
                    topic: 'good',
                    dataList: [],
                    page: 1
                },
                {
                    title: '分享',
                    topic: 'share',
                    dataList: [],
                    page: 1
                },
                {
                    title: '问答',
                    topic: 'ask',
                    dataList: [],
                    page: 1
                },
                {
                    title: '招聘',
                    topic: 'job',
                    dataList: [],
                    page: 1
                },
                {
                    title: '测试',
                    topic: 'share',
                    dataList: [],
                    page: 1
                }
            ],
            activeTopic: 0,
            dataList: []
        };
    },
    methods: {
        onLoad() {
            this._getData();
        },
        onChange(name, title) {
            this._getData();
        },
        _getData(isFresh) {
            let tabTopic = this.tabs[this.activeTopic]; //当前tab主题
            api.getData({
                tab: tabTopic.topic,
                page: tabTopic.page,
                limit: 10
            }).then(res => {
                let data = [];
                if (res.data.success) {
                    data = res.data.data || [];
                    this.finished = data.length < 10;
                    if (tabTopic.page == 1) {
                        this.tabs[this.activeTopic].dataList = data;
                    } else {
                        this.tabs[this.activeTopic].dataList = this.tabs[this.activeTopic].dataList.concat(data);
                    }
                    this.refreshing = false;
                    this.loading = false;
                    this.tabs[this.activeTopic].page++;
                    if (isFresh) {
                        this.$notify({
                            message: '~已拿到最新数据~',
                            type: 'success'
                        });
                    }
                } else {
                    data = [];
                    this.finished = true;
                    this.error = true;
                    this.refreshing = false;
                    this.loading = false;
                }
            }).catch(error=>{
                console.log(error)
                this.$router.replace({
                    name: 'error',
                    params: '请求数据异常'
                })
            })
        },
        onRefresh() {
            this.tabs[this.activeTopic].page = 1;
            this._getData(true);
        }
    }
};
</script>

<style lang="stylus">
</style>
