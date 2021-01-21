<template>
    <Layout>
        <div class="title">
            <Icon class="left" name="left"/>
            <span>编辑标签</span>
            <span class="right"></span>
        </div >
        <div class="noteLabel">
            <note name="标签名" :placeholder="this.tag.name" />
        </div>
        <div class="button-wrapper">
            <Button>删除标签</Button>
        </div>

    </Layout>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component} from "vue-property-decorator";
    import Note from '@/components/Money/note.vue';
    import tagListModel from "@/models/tagListModel";
    import Button from '@/components/Button.vue';
    @Component({
        components: {Button, Note}
    })
    export default class EditLabel extends Vue {
        tag: {id: string;name: string}|undefined;
        created(){
            const id = this.$route.params.id;
            tagListModel.fetch();
            const tags = tagListModel.data;
             this.tag = tags.filter(item=>item.id===id)[0]

        }

    }
</script>

<style lang="scss" scoped>
    .title {
        font-size: 16px;
        text-align: center;
        background: white;
        display: flex;
        justify-content: space-between;
        padding: 12px 16px;
        align-items: center;
        color: #3A465C;
        font-weight: bold;
        >.left {
            width: 24px;
            height: 24px;
        }
        >.right {
            width: 24px;
            height: 24px;
        }
    }
    .noteLabel {
        background: white;
        margin-top: 8px;
    }
    .button-wrapper {
        text-align: center;
        padding: 16px;
        margin-top: 44-16px;
    }
</style>