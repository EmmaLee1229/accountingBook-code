<template>
    <div class="x" >
            <Layout>
                <Tabs :data-source="typeList" class-prefix="types" :value.sync="typesValue" />
                <Tabs :data-source="dateList" class-prefix="interval" :value.sync="dateValue"/>
                <ol class="dateList">
                    <li v-for="(items,index) in result" :key="index" >
                            <h3 class="title">{{items.title}} <span class="sumMoney">{{'¥ '+items.sum}}</span></h3>

                        <ol class="moneyList">
                            <li v-for="item in items.list" :key="item.id" class="record">
                                <span>{{tagString(item.tags)}}</span>
                                <span class="note">{{limitShow(item.note)}}</span>
                                <span>¥{{item.mount}}</span>
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
        tagString(tags: Tag[]) {
            return tags.length === 0 ? '无' : tags.join(',');
        }
        limitShow(note: string){
            if(note.length>25){
                const newNote = note.substring(0,14)+'...';
                return newNote;
            }else{
                return note;
            }
        }
        get recordList(){
            return this.$store.state.recordList;
        }
        get result(){
            const recordList = this.recordList;
            const hashTable: {[key: string]: {title: string;list: RecordItem[];sum: number}} ={};
            for (let i=0;i<recordList.length;i++){
                const date = recordList[i].creatAt.split('T')[0];
                hashTable[date] = hashTable[date] || {title:date,list:[],sum:0};
                hashTable[date].list.push(recordList[i]);
                hashTable[date].sum += JSON.parse(recordList[i].mount);
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
        %item {
            padding: 8px 16px;
            line-height: 24px;
            display: flex;
            justify-content: space-between;
            align-content: center;
        }
        .title {
            @extend %item;
            background: lighten(#495976,50%);
            border-bottom: 1px solid #ccc;
            font-weight: 500;
            .sumMoney{
                color: darken(#495976,20%);
            }

        }
        .record {
            @extend %item;
            border-bottom: 1px solid #ccc;
        }
        .note {
            margin-right: auto;
            margin-left: 16px;
            color: #999;

        }

    }
</style>