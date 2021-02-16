<template>
    <div>
        <ul class="types">
            <li v-for="data in dataSource" :key="data.value" :class="{[classPrefix+'-tabs-item']:classPrefix,'selected':data.value===value}" @click="selectValue(data)">{{data.text}}</li>
        </ul>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component, Prop} from "vue-property-decorator";
    type dataSourceType = {text: string;value: string}

    @Component
    export default class Tabs extends Vue {
        @Prop({required:true,type:Array}) dataSource!: dataSourceType[];
        @Prop(String) readonly value!: string;
        @Prop(String) classPrefix?: string;
        selectValue(data: dataSourceType){
            this.$emit('update:value',data.value)
        }
    }
</script>

<style lang="scss" scoped>
    .types {
        display: flex;
        text-align: center;
        background: #495976;
        font-size: 24px;
        color: #999999;

        > li {
            width: 50%;
            padding: 20px 0;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;

            &.selected {
                background: #3A465C;
                color: #E9E8D4;
            }

            &.selected::after {
                content: '';
                background: #333;
                height: 4px;
                width: 100%;
                bottom: 0;
                left: 0;
                position: absolute;
            }
        }


    }
</style>