<template>
    <div class="x" >
            <Layout>
                <Tabs :data-source="typeList" class-prefix="types" :value.sync="typesValue" />
                <Tabs :data-source="dateList" class-prefix="interval" :value.sync="dateValue"/>
                <ol>
                    <li v-for="(items,index) in result" :key="index">
                        <h3>{{items.title}}</h3>
                        <ol>
                            <li v-for="item in items.list" :key="item">{{item}}
                            </li>
                        </ol>
                    </li>
                </ol>
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
        get recordList(){
            return this.$store.state.recordList;
        }
        get result(){
            const recordList = this.recordList;
            const hashTable: {[key: string]: {title: string;list: RecordItem[]}} ={};
            for (let i=0;i<recordList.length;i++){
                const date = recordList[i].creatAt.split('T')[0];
                hashTable[date] = hashTable[date] || {title:date,list:[]};
                hashTable[date].list.push(recordList[i].mount)
            }

            return hashTable
        }
        typesValue= '-';
        typeList = typeList;
        dateValue='day';
        dateList = dateList;
        beforeCreate(): void {
            this.$store.commit('fetchRecord')
        }

    }
</script>

<style scoped lang="scss">
    .x::v-deep {
        .types-tabs-item {
            background: darken(#495976,10%);
            &.selected {
                background: darken(#3A465C,10%);
                color: #E9E8D4;

                &:after {
                    display: none;
                }
            }
        }
        .interval-tabs-item {
            padding: 10px;

            &.selected {
                background: #3A465C;
                color: #E9E8D4;

                &:after {
                    display: none;
                }
            }
        }

    }
</style>