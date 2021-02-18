<template>
    <div class="x" >
            <Layout>
                <Tabs :data-source="typeList" class-prefix="types" :value.sync="typesValue" />
                <ol class="dateList" v-if="result.length>0">
                    <li v-for="(results,index) in result" :key="index" >
                            <h3 class="title">{{formatDate(results.title)}} <span class="sumMoney">{{'¥ '+results.sum}}</span></h3>

                        <ol class="moneyList">
                            <li v-for="item in results.items" :key="item.id" class="record">
                                <span>{{tagString(item.tags)}}</span>
                                <span class="note">{{limitShow(item.note)}}</span>
                                <span>¥{{item.mount}}</span>
                            </li>
                        </ol>
                    </li>
                </ol>
                <div v-else class="noResult">
                    未存入任何数据
                </div>
            </Layout>

    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {Component} from "vue-property-decorator";
    import Tabs from '@/components/Tabs.vue';
    import dateList from "@/constants/DateConstants";
    import typeList from "@/constants/typeList";
    import dayjs from 'dayjs'
    import clone from '@/lib/clone';
    @Component(
        {
            components:{Tabs}
        }
    )
    export default class Statistics extends Vue{
        tagString(tags: Tag[]) {
            return tags.length === 0 ? '无' : tags.map(i=>i.name).join(',');
        }
        limitShow(note: string){
            if(note.length>25){
                const newNote = note.substring(0,14)+'...';
                return newNote;
            }else{
                return note;
            }
        }
        formatDate(date: string){
            const now = new Date();
            if(dayjs(date).isSame(now,'day')){
                return '今天';
            }else {
                return dayjs(date).format('YYYY年M月D日');
            }
        }
        get recordList(){
            return this.$store.state.recordList;
        }
        get result(){
            const {recordList} = this;
            // const hashTable: {[key: string]: {title: string;list: RecordItem[];sum: number}} ={};
            const newRecordList =clone(recordList).filter((r: RecordItem)=>r.type === this.typesValue).sort((a: RecordItem,b: RecordItem)=>dayjs(b.creatAt).valueOf()-dayjs(a.creatAt).valueOf());
            type storeListType =[{title: string;items: RecordItem[];sum: number}]
            if(newRecordList.length ===0){return []}
            const storeList = [{title:dayjs(newRecordList[0].creatAt).format("YYYY-MM-DD"),items:[newRecordList[0]],sum:Number(newRecordList[0].mount)}] as storeListType;
            for (let i=1;i<newRecordList.length;i++){
                const current = newRecordList[i];
                const last = storeList[storeList.length-1];
                if(dayjs(current.creatAt).isSame(dayjs(last.title),"day")){
                    last.items.push(current);
                    last.sum+= JSON.parse(current.mount);
                }else {
                    storeList.push({title:dayjs(current.creatAt).format("YYYY-MM-DD"),items:[current],sum:Number(current.mount)});
                }
                // const date = newRecordList[i].creatAt.split('T')[0];
                // console.log(newRecordList[i].creatAt);
                // hashTable[date] = hashTable[date] || {title:date,list:[],sum:0};
                // hashTable[date].list.push(recordList[i]);
                // hashTable[date].sum += JSON.parse(recordList[i].mount);
            }
            return storeList
        }
        typesValue= '-';
        typeList = typeList;
        beforeCreate(): void {
            this.$store.commit('fetchRecord')
        }

    }
</script>

<style scoped lang="scss">
    .noResult {
        padding: 10px;
        font-size: 20px;
        color: #495976;
        text-align: center;

    }
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