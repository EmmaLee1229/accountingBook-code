<template>
    <div class="tags">
        <div class="new">
            <button @click="addTags">新增标签</button>
        </div>
        <ul class="current">
            <li v-for="data in tagList" :key="data.id"
                @click="toggle(data)"
                :class="selectedData.indexOf(data)>=0 &&'selected'"
            >{{data.name}}
            </li>

                <li> <router-link to="/labels">编辑 >></router-link>
                </li>

        </ul>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component} from "vue-property-decorator";

    @Component
    export default class Tags extends Vue {
        get tagList(){
            return this.$store.state.tagList;
        }
        created() {
            this.$store.commit('fetchTags')
        }
        selectedData: string[] = [];

        toggle(data: string) {
            if (this.selectedData.indexOf(data) < 0) {
                this.selectedData=[];
                this.selectedData.push(data);
            } else {
                this.selectedData.splice(this.selectedData.indexOf(data), 1);
            }
            this.$emit('update:value',this.selectedData)
        }

        addTags() {
            const newTag = window.prompt("请输入你想添加的标签");
            if (!newTag) {
                return alert("标签不能为空，请重新输入");
            }
                this.$store.commit('createTag',newTag);

        }

    }
</script>

<style lang="scss" scoped>
    .tags {
        /*margin: 12px;*/
        display: flex;
        flex-direction: column-reverse;
        flex-grow: 1;
        background: #ffffff;
        > .current {
            margin: 12px;
            display: flex;
            font-size: 14px;
            flex-wrap: wrap;

            > li {
                background: #495976;
                height: 24px;
                line-height: 24px;
                border-radius: 12px;
                padding: 0 20px;
                color: #999999;
                margin-right: 16px;
                margin-top: 2px;

                &.selected {
                    background: #3A465C;
                    color: #E9E8D4;
                }
            }
        }

        > .new {
            margin: 12px;
            padding-top: 4px;

            > button {
                color: #999999;
                background: transparent;
                border: none;
                padding-top: 8px;
                padding-right: 3px;
                border-bottom: 1px solid;
            }
        }

    }
</style>