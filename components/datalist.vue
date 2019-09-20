<template title="数据列表组件">
    <ul class="topic-list">
        <li class="topic-item" v-for="(topic, index) in dataList" :key="index">
            <!-- <router-link :to="{ name: 'detail', params: {id : topic.id} }"> -->
            <div class="info">
                <img v-lazy="topic.author.avatar_url" alt="用户头像" class="user-avatar" />
                <div class="content">
                    <p class="c-info">
                        <span class="name">{{ topic.author.loginname }}</span>
                        <span class="status">
                            <b>{{ topic.reply_count }}</b>
                            /{{ topic.visit_count }}
                        </span>
                    </p>
                    <p class="t-content">{{ topic.title }}</p>
                    <p><timeago :datetime="topic.last_reply_at" locale="zh-CN"></timeago></p>
                </div>
            </div>
            <!-- </router-link> -->
        </li>
    </ul>
</template>

<script>
import Vue from 'vue';
import { Lazyload } from 'vant';
// options 为可选参数，无则不传
Vue.use(Lazyload, {
    loading: require('@/static/img/default-person.png'),
    error: require('@/static/img/default-person.png')
});

import VueTimeago from 'vue-timeago';
Vue.use(VueTimeago, {
    name: 'Timeago',
    locale: 'en',
    locales: {
        'zh-CN': require('date-fns/locale/zh_cn'),
        ja: require('date-fns/locale/ja')
    }
});

export default {
    props: {
        dataList: {
            type: Array,
            default: null
        }
    },
    data() {
        return {};
    },
    methods: {}
};
</script>

<style lang="stylus">
.topic-list
    width 100%
    .topic-item
        width 100%
        display block
        padding 5px
        border-bottom 1px solid #efeded
        .title
            color #333333
            font-size 12px
            &::before
                display inline-block
                content attr(title)
                padding 2px 6px
                margin-top -2px
                font-size 14px
                border-radius 10px
                margin-right 10px
                vertical-align middle
                text-align center
                color #ffffff
                font-weight 400
        .info
            padding-top 5px
            display flex
            flex-direction row
            .user-avatar
                margin-right 10px
                width 40px
                height 40px
                border-radius 100%
            .content
                flex 1
                font-size 14px
                padding-right 12px
            p
                display inline-flex
                width 100%
                color #333333
            .name
                flex 1
                text-align justify
            span
                font-size 12px
            b
                color #6a911a
                flex 1
            time:first-of-type
                flex 1
                text-align right
                font-size 12px
            .t-content
                margin 10px -5px 2px
                text-align justify
                overflow hidden
                text-overflow ellipsis
                display -webkit-box
                -webkit-box-orient vertical
                -webkit-line-clamp 2
                font-size 12px
                line-height 20px
            .c-info
                margin-top 12px
</style>
