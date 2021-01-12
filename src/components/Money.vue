<template>
    <Layout class-prefix="layout">
        <number-pad :value.sync="record.mount" @submit="updateMount"/>
        <note @update:value="updateNote"/>
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

    type Record = {
        tags: string[];
        type: string;
        note: string;
        mount: number;
        creatAt?: Date;
    }
    window.localStorage.setItem('Version','0.1');
    @Component({
        components: {Note, Types, Tags, NumberPad}
    })
    export default class Money extends Vue {
        tags: string[] = ["衣", "食", "住", "行", "宠物", "蹦迪", "喝酒"];
        record: Record = {
            tags: [],
            type: "-",
            note: "",
            mount: 0,

        };
        recordList: Record[] = JSON.parse(window.localStorage.getItem('recordList')|| '[]');
        updateMount() {
            const oldRecord: Record = JSON.parse(JSON.stringify(this.record));
            oldRecord.creatAt = new Date();
            this.recordList.push(oldRecord);

        }

        @Watch("recordList")
        onRecordListChange() {
            window.localStorage.setItem("recordList", JSON.stringify(this.recordList));
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