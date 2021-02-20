<template>
    <Layout>
        <Tabs :data-source="typeList" class-prefix="types" :value.sync="typesValue" />
        <note name='日期' type="date" :value.sync="record.creatAt" class="timer"/>
        <h3>共计：{{sum}} 元</h3>
        <chart :options="x"></chart>
    </Layout>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component} from "vue-property-decorator";
    import Tabs from "@/components/Tabs.vue";
    import note from "@/components//Money/note.vue"
    import 'echarts/lib/chart/pie'
    import typeList from "@/constants/typeList";
    import Chart from '@/components/Chart.vue';
    import _ from 'lodash'
    import clone from "@/lib/clone";
    import dayjs from "dayjs";

    @Component({
        components:{Chart, Tabs,note}
    })
    export default class Echart extends Vue {
        tagString(tags: Tag[]) {
            return tags.length === 0 ? '无' : tags.map(i=>i.name).join(',');
        }
        get sum(){
            const recordList1 = this.recordList.map((r: RecordItem)=>_.pick(r,['creatAt','mount','type','tags']));
            const newRecordList =clone(recordList1).filter((r: RecordItem)=>r.type === this.typesValue).filter((r: RecordItem)=>dayjs(r.creatAt).format('YYYY-MM-DD')===dayjs(this.record.creatAt).format('YYYY-MM-DD'));
            let sumList =0;
            for (let i =0;i<newRecordList.length;i++){
                sumList+=Number(newRecordList[i].mount)

            }
            return sumList
        }
        get x () {
            const recordList1 = this.recordList.map((r: RecordItem)=>_.pick(r,['creatAt','mount','type','tags']));
            const data = []

            for (let i = 0; i <= 360; i++) {
                const t = i / 180 * Math.PI
                const r = Math.sin(2 * t) * Math.cos(2 * t)
                data.push([r, i])
            }
            const newRecordList =clone(recordList1).filter((r: RecordItem)=>r.type === this.typesValue).filter((r: RecordItem)=>dayjs(r.creatAt).format('YYYY-MM-DD')===dayjs(this.record.creatAt).format('YYYY-MM-DD'));
            console.log(newRecordList);
            const dataList=[];
            const nameList =[];
            let sumList =0;
            for (let i =0;i<newRecordList.length;i++){
                dataList.push({value:newRecordList[i].mount,name:this.tagString(newRecordList[i].tags)})
                sumList+=newRecordList[i].mount
                nameList.push(newRecordList[i].type)
            }

            return{
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                },
                series: [
                    {
                        name: typeList,
                        type: 'pie',
                        radius: '50%',
                        data: dataList,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ],
                color:[
                    "#3A465C","#526382","#61769b","#6d80a3","#7a8bab","#5a6c8e"
                ]
            }
        }
        record: RecordItem = {
            tags: [],
            type: "-",
            note: "",
            mount: 0,
            creatAt:new Date().toISOString()

        };
        typesValue= '-';
        typeList = typeList;
        beforeCreate(): void {
            this.$store.commit('fetchRecord')
        }
        get recordList(){
            return this.$store.state.recordList;
        }
    }
</script>

<style lang="scss" scoped>
    .echarts {
        width: 100%;
        height: 100%;
    }
    .timer {
        padding: 10px 0 0 0;
    }
    h3 {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px 0;
        color: #3A465C;
       font-weight: bold;
        font-size: 20px;
    }
    ::v-deep {
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
    }
</style>