<template>
    <div class="newTags-wrapper">
        <button @click="$emit('click', $event)" class="newTags"><slot></slot></button>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component} from "vue-property-decorator";

    @Component
    export default class Button extends Vue {

    }
</script>

<style lang="scss" scoped>
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