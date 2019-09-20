<template>
    <div>
        <van-nav-bar title="访问错误" left-text="返回" left-arrow @click-left="onClickLeft" />
        <div class="page-error">
            <van-icon name="failure" />
            <p>{{ message }}</p>
        </div>
    </div>
</template>

<script>

 import { Notify } from 'vant';
export default {
    name: 'error',
    computed: {
        message() {
            return this.$route.params.error || '您访问的路径不存在';
        }
    },
    created() {
        Notify({ type: 'warning', message: this.$route.params.error || '糟糕，访问异常~~~' });
        let query = this.$route.query;
        if (Object.keys(query).length !== 0) {
            this.$router.replace({
                name: 'error',
                params: query
            });
        }
    },
    methods: {
        onClickLeft() {
            this.$router.back();
        }
    }
};
</script>

<style lang="stylus" scoped>
.page-error
    display flex
    justify-content center
    align-items center
    flex-direction column
    background #f5f5f5
</style>
