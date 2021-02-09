<template>
    <div>
        <Layout>
            <div class="labels">
                <router-link  v-for="tag in tags" :key="tag.id"
                :to="`/labels/EditLabel/${tag.id}`"
                class="tag"
                >
                    <span>{{tag.name}}</span>
                    <Icon name="right" class="rightIcon"></Icon>
                </router-link>
            </div>
            <Button @click="createTags">新增标签</Button>
        </Layout>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component} from "vue-property-decorator";
    import Button from '@/components/Button.vue';

    @Component({
        components: {Button}
    })
    export default class Labels extends Vue {
        get tags(){
            return this.$store.state.tagList;
        }
      created() {
            this.$store.commit('fetchTags');
        }
        createTags() {
            const name = window.prompt("请输入您想增加的标签名");
            if (name) {
               this.$store.commit('createTag',name);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .labels {
        background: #fff;
        font-size: 16px;
        color: #3A465C;

        >.tag {
            padding: 0 20px;
            display: flex;
            align-items: center;
            min-height: 40px;
            justify-content: space-between;
            border-bottom: 1px solid lighten(#333333, 70%);
            color: #3A465C;
        }
    }

    .newTags {
        background: #3A465C;
        color: white;
        border-radius: 4px;
        border: none;
        height: 40px;
        padding: 0 16px;

        &-wrapper {
            text-align: center;
            padding: 16px;
            margin-top: 44-16px;
        }
    }
</style>