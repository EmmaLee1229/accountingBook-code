<template>
    <Layout class-prefix="layout">
        <number-pad :value.sync="record.mount" @submit="updateMount"/>
        <note name='备注' placeholder="请在这里添加备注" @update:value="updateNote"/>
        <tags/>
        <types :value.sync="record.type" class="title"/>
    </Layout>

</template>

<script lang="ts">
    import Vue from "vue";
    import {Component} from "vue-property-decorator";
    import NumberPad from "@/components/Money/numberPad.vue";
    import Tags from "@/components/Money/tags.vue";
    import Types from "@/components/Money/types.vue";
    import Note from "@/components/Money/note.vue";
    import store from '@/store/index2';


    window.localStorage.setItem('Version','0.1');
    //const tagList.ts = tagListModel.fetch().map(item=>item.name);
    @Component({
        components: {Note, Types, Tags, NumberPad}
    })
    export default class Money extends Vue {
        record: RecordItem = {
            tags: [],
            type: "-",
            note: "",
            mount: 0,

        };
        recordList = store.recordList;
        updateMount() {
            store.createRecord(this.record);
        }
        //
        // @Watch("recordList")
        // onRecordListChange() {
        //     recordListModel.save();
        // }

        updateNote(value: string) {
            this.record.note = value;
        }
    }

</script>
<style lang="scss">
    .layout-content {
        /*border: 1px solid red;*/
        display: flex;
        flex-direction: column-reverse;
        >.title {

        }
    }
</style>

<style lang="scss" scoped>
    @import "~@/assets/style/reset.scss";
</style>