<template>
    <div>
        <Layout>
            <ul class="labels">
                <li  v-for="tag in tags" :key="tag">
                    <span>{{tag}}</span>
                    <Icon name="right" class="rightIcon"></Icon>
                </li>
            </ul>
            <div class="newTags-wrapper">
                <button class="newTags" @click="createTags">新增标签</button>
            </div>
        </Layout>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component} from "vue-property-decorator";
    import tagListModel from "@/models/tagListModel";
    const tagList = tagListModel.fetch();
    @Component
    export default class Labels extends Vue {
        tags = tagList;
        createTags() {
            const name = window.prompt("请输入您想增加的标签名");
            if (name) {
                const message = tagListModel.create(name);
                if (message === "success") {
                    window.alert("标签添加成功");

                } else if (message === "duplicated") {
                    window.alert("标签重复，添加失败");
                }

            }
        }
    }
</script>

<style lang="scss" scoped>
    .labels {
        background: #fff;
        font-size: 16px;
        color: #3A465C;

        > li {
            padding: 0 20px;
            display: flex;
            align-items: center;
            min-height: 40px;
            justify-content: space-between;
            border-bottom: 1px solid lighten(#333333, 70%);
        }
    }

    .newTags {
        background: #3A465C;
        color: white;
        border-radius: 4px;
        border: none;
        height: 40px;
        padding: 0 16px;

        &-wrapper {
            text-align: center;
            padding: 16px;
            margin-top: 44-16px;
        }
    }
</style>