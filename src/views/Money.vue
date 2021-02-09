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


    window.localStorage.setItem('Version','0.1');
    @Component({
        components: {Note, Types, Tags, NumberPad}
    })
    export default class Money extends Vue {
        get recordList(){
            return this.$store.state.recordList;
        }
        record: RecordItem = {
            tags: [],
            type: "-",
            note: "",
            mount: 0,

        };
        //recordList = this.$store.state.recordList;
        created(){
            this.$store.commit('fetchRecord')
        }

        updateMount() {
            this.$store.commit('createRecord',this.record);
        }
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