<template>
    <div>
        <label class="note">
            <span class="name">{{this.name}}</span>
            <input type="text" :placeholder="this.placeholder" :value="value" @input="onValueChange($event.target.value)">
        </label>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component, Prop, Watch} from "vue-property-decorator";

    @Component
    export default class Note extends Vue {
        @Prop({default:''}) readonly value!: string;
        @Prop({required:true})name!: string;
        @Prop()placeholder!: string
        @Watch("value")
        onValueChange(value: string) {
            this.$emit("update:value", value);
        }

    }
</script>

<style lang="scss" scoped>
    .note {
        padding-left: 12px;
        font-size: 14px;
        /*background: #f5f5f5;*/
        display: flex;
        align-items: center;

        > .name {
            padding-right: 16px;
        }

        > input {
            background: transparent;
            border: none;
            flex-grow: 1;
            height: 64px;
            padding-right: 16px;
        }
    }

    :focus {
        outline: none;
    }

</style>