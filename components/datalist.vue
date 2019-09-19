<template title="数据列表组件">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :error.sync="error" error-text="请求失败，点击重新加载" @load="onLoad">
            <ul class="topic-list">
                <li class="topic-item" v-for="(topic, index) in dataList" :key="index">
                    <!-- <router-link :to="{ name: 'detail', params: {id : topic.id} }"> -->
                    <div class="info">
                        <img :src="topic.author.avatar_url" alt="用户头像" class="user-avatar" />
                        <div class="content">
                            <p class="c-info">
                                <span class="name">{{ topic.author.loginname }}</span>
                                <span class="status">
                                    <b>{{ topic.reply_count }}</b>
                                    /{{ topic.visit_count }}
                                </span>
                            </p>
                            <p class="t-content">{{ topic.title }}</p>
                            <p>
                                <time>{{ topic.last_reply_at | formatDate }}</time>
                            </p>
                        </div>
                    </div>
                    <!-- </router-link> -->
                </li>
            </ul>
        </van-list>
    </van-pull-refresh>
</template>

<script>
// import * as util from '@/util/utils.js'
import api from '@/util/api.js';

let page = 1;
export default {
    props: {
        tab: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            dataList: [],
            loading: false,
            finished: false,
            error: false,
            refreshing: false
        };
    },
    methods: {
        onLoad() {
            console.log('onload.........');
            this._getData();
        },
        _getData() {
            console.log('_getData...........');
            api.getData({
                tab: 'good',
                page: page,
                limit: 10
            }).then(res => {
                console.log(res.data.success);
                let data = [];
                if (res.data.success) {
                    page++;
                    data = res.data.data || [];
                    // this.finished = data.length < 10
                    this.dataList = data;
                    this.finished = true;
                    console.log(this.dataList.length);
                } else {
                    data = [];
                    this.error = true;
                }
                // if (page > 2) { //拼接下一页数据
                //     this.dataList = this.dataList.concat(data)
                // } else {
                //     this.dataList = data
                // }
            });
        },
        onRefresh() {}
    },
    filters: {
        formatDate: function(value) {
            return '9/19';
        }
    }
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
                color #333333
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
