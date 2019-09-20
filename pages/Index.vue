<template>
    <home />
</template>

<script>
function setState(store) {}

import Home from '@/components/home.vue';
export default {
    name: 'index',
    metaInfo: {
        title: 'CNode哈哈社区',
        titleTemplate: '%s - Lavas',
        meta: [
            {
                name: 'keywords',
                content: 'lavas PWA'
            },
            {
                name: 'description',
                content: '基于 Vue 的 PWA 解决方案，帮助开发者快速搭建 PWA 应用，解决接入 PWA 的各种问题'
            }
        ]
    },
    async asyncData({ store, route }) {
        setState(store);
    },
    components: {
        Home
    }
};
</script>

<style lang="stylus" scoped>

</style>
