<template>
    <div>
        <my-header />
        <van-tabs sticky offset-top="46" color="#80bd01" background="#444444" title-inactive-color="#ffffff"
            title-active-color="#80bd01">
            <van-tab v-for="(tab,index) in tabs" :title="tab.title" :key="index">
                <data-list />
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    function setState(store) {}

    import MyHeader from '@/components/header.vue'
    import DataList from '@/components/datalist.vue'
    export default {
        name: 'index',
        metaInfo: {
            title: 'Home',
            titleTemplate: '%s - Lavas',
            meta: [{
                    name: 'keywords',
                    content: 'lavas PWA'
                },
                {
                    name: 'description',
                    content: '基于 Vue 的 PWA 解决方案，帮助开发者快速搭建 PWA 应用，解决接入 PWA 的各种问题'
                }
            ]
        },
        async asyncData({
            store,
            route
        }) {
            setState(store);
        },
        components: {
            MyHeader,
            DataList
        },
        data() {
            return {
                tabs: [{
                        title: '全部',
                        topic: 'all',
                        dataList:[]
                    },
                    {
                        title: '精华',
                        topic: 'good',
                        dataList:[]
                    },
                    {
                        title: '分享',
                        topic: 'share',
                        dataList:[]
                    },
                    {
                        title: '问答',
                        topic: 'ask',
                        dataList:[]
                    },
                    {
                        title: '招聘',
                        topic: 'job',
                        dataList:[]
                    },
                    {
                        title: '测试',
                        topic: 'test',
                        dataList:[]
                    }
                ]
            }
        }
    };
</script>

<style lang="stylus" scoped>
</style>
