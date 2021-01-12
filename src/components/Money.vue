<template>
    <Layout class-prefix="layout">
        {{this.record}}}
<!--        <number-pad :value="record.mount" @update:value="updateNumber"/>-->
        <number-pad :value.sync="record.mount"/>
        <note @update:value ="updateNote"/>
        <tags :data-source.sync="tags" @update:value ="updateTags"/>
        <types :value.sync="record.type" />
    </Layout>

</template>

<script lang="ts">
    import Vue from "vue";
    import {Component} from "vue-property-decorator";
    import NumberPad from "@/components/Money/numberPad.vue";
    import Tags from "@/components/Money/tags.vue";
    import Types from "@/components/Money/types.vue";
    import Note from "@/components/Money/note.vue";

    type Record = {
        tags: string[];
        type: string;
        note: string;
        mount: number;
    }
    @Component({
        components: {Note, Types, Tags, NumberPad}
    })
    export default class Money extends Vue {
        tags: string[] = ["衣", "食", "住", "行", "宠物", "蹦迪", "喝酒"];
        record: Record={
            tags:[],
            type:'-',
            note:'',
            mount:0
        }
        // updateType(value:string) {
        //     this.record.type = value;
        // }
        // updateNumber(value:number){
        //     this.record.mount = value;
        // }
        updateNote(value: string){
            this.record.note = value;
        }
        updateTags(value: string[]){
            this.record.tags = value
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