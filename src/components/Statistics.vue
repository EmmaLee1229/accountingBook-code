<template>
    <div class="x" >
            <Layout>
                <Tabs :data-source="typeList" class-prefix="types" :value.sync="typesValue" />
                <Tabs :data-source="dateList" class-prefix="interval" :value.sync="dateValue"/>
            </Layout>

    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {Component} from "vue-property-decorator";
    import Tabs from '@/components/Tabs.vue';
    import dateList from "@/constants/DateConstants";
    import typeList from "@/constants/typeList";
    @Component(
        {
            components:{Tabs}
        }
    )
    export default class Statistics extends Vue{
        typesValue= '-';
        typeList = typeList;
        dateValue='day';
        dateList = dateList;

    }
</script>

<style scoped lang="scss">
    .x::v-deep .interval-tabs-item{
        padding: 10px ;
        &.selected {
            background: #3A465C;
            color: #E9E8D4;
            &:after{
                display: none;
            }
        }
    }
</style>