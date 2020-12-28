<template>
    <ul class="types">
        <li :class="this.type==='-'&& 'selected'" @click="selectType('-')">支出</li>
        <li :class="this.type==='+'&& 'selected'" @click="selectType('+')">收入</li>
    </ul>
</template>

<script>
    export default {
        name: "types",
        data(){
            return {
                type:'-'
            }
        },
        methods:{
            selectType(type){
                if(type!=='-'&&type!=='+'){
                    throw new Error('type is unknown!')
                }else {
                    this.type = type
                }
            }
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