<template>
    <div>
        <label class="note">
            <template v-if="type==='date'">
                <span class="name">{{this.name}}</span>
                <input class="dateStore" :type="type||text" :placeholder="this.placeholder" :value="formatDate(value)" @input="onValueChange($event.target.value)">
            </template>
            <template v-else>
                <span class="name">{{this.name}}</span>
                <input :type="type||text" :placeholder="this.placeholder" :value="value" @input="onValueChange($event.target.value)">
            </template>

        </label>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component, Prop, Watch} from "vue-property-decorator";
    import dayjs from "dayjs";

    @Component
    export default class Note extends Vue {
        @Prop({default:''}) readonly value!: string;
        @Prop({required:true})name!: string;
        @Prop()placeholder!: string;
        @Prop()type?: string;
        onValueChange(value: string) {
            this.$emit("update:value", value);
        }
        formatDate(IsoString: string){
            return dayjs(IsoString).format('YYYY-MM-DD')
        }

    }
</script>

<style lang="scss" scoped>
    .note {
        padding-left: 12px;
        font-size: 14px;
        background: darken(#f5f5f5,5%);
        display: flex;
        align-items: center;
        border-bottom:1px solid #ccc ;

        > .name {
            padding-right: 16px;
            color: darken(#3A465C,20%);
        }

        > input {
            background: transparent;
            border: none;
            flex-grow: 1;
            height: 64px;
            padding-right: 16px;

        }
        >.dateStore{
            height: 40px;

        }

    }
    :focus {
        outline: none;
    }

</style>