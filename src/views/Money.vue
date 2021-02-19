<template>
    <Layout class-prefix="layout">
            <number-pad :value.sync="record.mount" @submit="updateMount"/>
             <note name='日期' type="date" :value.sync="record.creatAt"/>
            <note name='备注' type="text" placeholder="请在这里添加备注" :value="record.note" @update:value="updateNote"/>
            <tags @update:value="updateTags"/>
            <Tabs :value.sync="record.type" :data-source="typeList" class="title"/>
        <div class="box" v-if="isShow" @click="showOff">
               <div class="container">
                   <img src="../../public/img/qrcode.png" alt="">
                   <h3>请扫二维码，使用手机观看效果更加！：）</h3>
             </div>
             </div>
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
    window.localStorage.setItem('count','0');
    @Component({
        components: {Tabs, Note, Tags, NumberPad}
    })
    export default class Money extends Vue {
        isShow = false;
        showCode(isShow: boolean){
            if (window.innerWidth>450){
                console.log(window.innerWidth);
                this.isShow = true;
                console.log(this.isShow);
                // window.alert('请扫二维码，使用手机观看效果更加！：）');
                return this.isShow;
            }
        }
        get recordList() {
            return this.$store.state.recordList;
        }
        showOff(){
            this.isShow = false;
            window.localStorage.setItem('count','1');

        }

        typeList = typeList;
        record: RecordItem = {
            tags: [],
            type: "-",
            note: "",
            mount: 0,
            creatAt:new Date().toISOString()

        };
        //recordList = this.$store.state.recordList;
        created() {
            this.$store.commit("fetchRecord");
            if(window.localStorage.getItem('count')==='0'){
                this.showCode(this.isShow);
            }

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
        display: flex;
        flex-direction: column-reverse;
        .box {
            /*display: none;*/
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            left: 0;
            background: rgba(51,51,51,0.5);
            z-index: 3;//根据自己页面情况设置
        }
        .container img {
            position: absolute;
            top: 50%;//以下3行设置弹框居中页面，根据自己页面情况选择
            left: 50%;
            transform: translate(-50%, -50%);
            background: #fff;
            z-index: 5;//根据自己页面情况设置
        }
        .container h3 {
            position: absolute;
            top: 75%;//以下3行设置弹框居中页面，根据自己页面情况选择
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 5;
            color: white;
        }

    }

</style>

<style lang="scss" scoped>
    @import "~@/assets/style/reset.scss";
</style>