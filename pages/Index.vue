<template>
    <div>
        <van-tabs
            sticky
            color="#80bd01"
            background="#444444"
            title-inactive-color="#ffffff"
            title-active-color="#80bd01"
        >
            <van-tab v-for="(tab,index) in tabs" :title="tab.title" :key="index">
                <data-list />
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    function setState(store) {}

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
            DataList
        },
        data() {
            return {
                tabs: [{
                        title: '全部',
                        topic: 'all'
                    },
                    {
                        title: '精华',
                        topic: 'good'
                    },
                    {
                        title: '分享',
                        topic: 'share'
                    },
                    {
                        title: '问答',
                        topic: 'ask'
                    },
                    {
                        title: '招聘',
                        topic: 'job'
                    },
                    {
                        title: '测试',
                        topic: 'test'
                    }
                ]
            }
        }
    };
</script>

<style lang="stylus" scoped>
</style>
