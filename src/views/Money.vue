<template>
    <Layout class-prefix="layout">
        <number-pad :value.sync="record.mount" @submit="updateMount"/>
        <note name='备注' placeholder="请在这里添加备注" :value="record.note" @update:value="updateNote"/>
        <tags @update:value="updateTags"/>
        <Tabs :value.sync="record.type" :data-source="typeList" class="title"/>

    </Layout>

</template>

<script lang="ts">
    import Vue from "vue";
    import {Component} from "vue-property-decorator";
    import NumberPad from "@/components/Money/numberPad.vue";
    import Tags from "@/components/Money/tags.vue";
    import Note from "@/components/Money/note.vue";
    import Tabs from "@/components/Tabs.vue";
    import typeList from "@/constants/typeList";


    window.localStorage.setItem("Version", "0.1");
    @Component({
        components: {Tabs, Note, Tags, NumberPad}
    })
    export default class Money extends Vue {
        get recordList() {
            return this.$store.state.recordList;
        }

        typeList = typeList;
        record: RecordItem = {
            tags: [],
            type: "-",
            note: "",
            mount: 0,

        };

        //recordList = this.$store.state.recordList;
        created() {
            this.$store.commit("fetchRecord");
        }

        updateMount() {
            if (this.record.tags.length === 0) {
                return window.alert("请至少选择一个标签");
            }
            this.$store.commit("createRecord", this.record);
            window.alert("添加成功");
            this.record.note = ' ';
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

        > .title {

        }
    }
</style>

<style lang="scss" scoped>
    @import "~@/assets/style/reset.scss";
</style>