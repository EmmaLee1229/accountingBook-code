<template>
    <Layout class-prefix="layout">
        <number-pad :value.sync="record.mount" @submit="updateMount"/>
        <note name='备注' placeholder="请在这里添加备注" @update:value="updateNote"/>
        <tags :data-source.sync="tags" @update:value="updateTags"/>
        <types :value.sync="record.type"/>
    </Layout>

</template>

<script lang="ts">
    import Vue from "vue";
    import {Component, Watch} from "vue-property-decorator";
    import NumberPad from "@/components/Money/numberPad.vue";
    import Tags from "@/components/Money/tags.vue";
    import Types from "@/components/Money/types.vue";
    import Note from "@/components/Money/note.vue";
    import recordListModel from "@/models/recordListModel";
    import tagListModel from "@/models/tagListModel";


    window.localStorage.setItem('Version','0.1');
    const tagList = tagListModel.fetch().map(item=>item.name);
    @Component({
        components: {Note, Types, Tags, NumberPad}
    })
    export default class Money extends Vue {
        tags= tagList;
        record: RecordItem = {
            tags: [],
            type: "-",
            note: "",
            mount: 0,

        };
        recordList = recordListModel.fetch();
        updateMount() {
            const oldRecord: RecordItem = JSON.parse(JSON.stringify(this.record));
            oldRecord.creatAt = new Date();
            this.recordList.push(oldRecord);

        }

        @Watch("recordList")
        onRecordListChange() {
            recordListModel.save(this.recordList);
        }

        updateNote(value: string) {
            this.record.note = value;
        }

        updateTags(value: string[]) {
            this.record.tags = value;
        }
    }

</script>
<style lang="scss">
    .layout-content {
        /*border: 1px solid red;*/
        display: flex;
        flex-direction: column-reverse;
    }
</style>

<style lang="scss" scoped>
    @import "~@/assets/style/reset.scss";
</style>