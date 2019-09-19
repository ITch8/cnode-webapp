<template title="数据列表组件">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh(0)">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :error.sync="error" error-text="请求失败，点击重新加载"
            @load="onLoad">

            <van-cell value="内容" v-for="(topic,index) in dataList" :key="index">
              <template>
                  <ul class="topic-list" ref="topiclist">
                      <li class="topic-item" >
                          <!-- <router-link :to="{ name: 'detail', params: {id : topic.id} }"> -->
                          <div class="info">
                              <img :src="topic.author.avatar_url" alt="用户头像" class="user-avatar">
                              <div class="content">
                                  <p>
                                      <span class="name">{{topic.author.loginname}}</span>
                                      <span class="status"><b>{{topic.reply_count}}</b> /{{topic.visit_count}}</span>
                                  </p>
                                  <p>{{topic.title}}</p>
                                  <p>
                                      <time>{{topic.last_reply_at | formatDate}}</time>
                                  </p>
                              </div>
                          </div>
                          <!-- </router-link> -->
                      </li>
                  </ul>
              </template>
            </van-cell>



        </van-list>
    </van-pull-refresh>
</template>

<script>
    import {
        formatDate
    } from '@/util/utils.js'
    import api from '@/util/api.js'

    let page = 1
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
                console.log('onload.........')
                this._getData()
            },
            _getData() {
                console.log('_getData...........')
                api.getData({
                    tab: 'good',
                    page: page,
                    limit: 10
                }).then((res) => {
                    console.log(res.data.success)
                    let data = []
                    if (res.data.success) {
                        page++
                        data = res.data.data || []
                        // this.finished = data.length < 10
                        this.dataList = data
                        this.finished = true
                        console.log(this.dataList.length)
                    } else {
                        data = []
                        this.error = true
                    }
                    // if (page > 2) { //拼接下一页数据
                    //     this.dataList = this.dataList.concat(data)
                    // } else {
                    //     this.dataList = data
                    // }

                })
            }
        },
        filters: {
            formatDate: function(value) {
                return formatDate(value, true)
            }
        },
    }
</script>

<style lang="less">

    .topic-list {
        width: 100%;

      .topic-item {
        width: 100%;
        display: block;
        padding: @padding;
        border-bottom: 1px solid #efeded;

        .title {
          color: @title;
          font-size: 12px;

          &::before {
            display: inline-block;
            content: attr(title);
            padding: 2px 6px;
            margin-top: -2px;
            font-size: @font-tag;
            border-radius: @radius;
            margin-right: @margin10;
            vertical-align: middle;
            text-align: center;
            color: @white;
            font-weight: 400;
          }

          &.top::before {
            background-color: #E74C3C
          }

          &.good::before {
            background-color: #E67E22
          }

          &.ask::before {
            background-color: #3498DB
          }

          &.job::before {
            background-color: #9B59B6
          }

          &.share::before {
            background-color: #1ABC9C
          }
        }

        .info {
          padding-top: @margin10;
          display: flex;
          flex-direction: row;

          img {
            .author-img;
            margin-right: @margin10;
          }

          .content {
            flex: 1;
            font-size: @font-info;

            p {
              display: inline-flex;
              width: 100%;
              color: @text;

              .name {
                flex: 1;
              }

              span {
                font-size: @font-content;

                b {
                  color: @color42b;
                }
              }

              time:first-of-type {
                flex: 1;
              }
            }
          }
        }
      }
    }
</style>
