<template>
    <Layout>
        <div class="title"  >
            <span @click="goBack" ><Icon class="left" name="left"/></span>
            <span>编辑标签</span>
            <span class="right"></span>
        </div >
        <div class="noteLabel">
            <note name="标签名" :placeholder="this.tag.name" :value="tag.name" @update:value="updateTag"/>
        </div>
        <div class="button-wrapper">
            <Button @click="deleteTag">删除标签</Button>
        </div>

    </Layout>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component} from "vue-property-decorator";
    import Note from '@/components/Money/note.vue';
    import Button from '@/components/Button.vue';
    @Component({
        components: {Button, Note}
    })
    export default class EditLabel extends Vue {
       get tag(){
           return this.$store.state.currentTag
       }
        created(){
            const id = this.$route.params.id;
            this.$store.commit('fetchTags');
            this.$store.commit('findTag',id);
            if(!this.tag){
                this.$router.replace('/404')
            }
        }
        updateTag(name: string){
            if(this.tag){
               this.$store.commit('update',{
                   id:this.tag.id,name:name
               });
            }

        }
        deleteTag(){
            if(this.tag){
                this.$store.commit('remove',this.tag.id)

            }

        }
        goBack(){
            this.$router.back()
        }

    }
</script>

<style lang="scss" scoped>
    .title {
        font-size: 20px;
        text-align: center;
        background: white;
        display: flex;
        justify-content: space-between;
        padding: 20px 16px;
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
        font-size: 16px;
    }
</style>