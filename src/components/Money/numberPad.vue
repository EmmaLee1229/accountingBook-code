<template>
    <div class="numberPad">
        <div class="typePad">
            1000
        </div>
        <div class="buttons">
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>删除</button>
            <button>4</button>
            <button>5</button>
            <button>6</button>
            <button>清空</button>
            <button>7</button>
            <button>8</button>
            <button>9</button>
            <button class="ok">OK</button>
            <button class="zero">0</button>
            <!--                <button>+</button>-->
            <!--                <button>-</button>-->
            <button>.</button>
        </div>
    </div>

</template>

<script>
    export default {
        name: "numberPad"
    }
</script>

<style lang="scss" scoped>
    .numberPad {
        $color-shadow: rgba(0, 0, 0, 0.25);
        .typePad {
            font-size: 36px;
            font-family: Consolas, monospace;
            padding: 9px 16px;
            text-align: right;
            box-shadow: inset 0 -3px 3px -3px $color-shadow,
            inset 0 3px 3px -3px $color-shadow;

        }

        .buttons {
            @extend %clearFix !optional;
            > button {
                width: 25%;
                height: 64px;
                float: left;
                background: transparent;
                border:none;
                &.ok {
                    height: 64*2px;
                    float: right;
                }
                &.zero {
                    width: 2*25%;
                }
                $color:#E9E8D4;
                &:nth-child(12){
                    background: #3A465C;
                    color: $color;
                }
                &:nth-child(8),&:nth-child(11),&:nth-child(13){
                    background: lighten(#3A465C,4%*3);
                    color: $color;
                }
                &:nth-child(14){
                    background: lighten(#3A465C,4%*2);
                    color: $color;
                }
                &:nth-child(4),&:nth-child(7),&:nth-child(10){
                    background: lighten(#3A465C,4%*4);
                    color: $color;
                }
                &:nth-child(3),&:nth-child(6),&:nth-child(9){
                    background: lighten(#3A465C,4%*5);
                    color: $color;
                }
                &:nth-child(2),&:nth-child(5){
                    background: lighten(#3A465C,4%*6);
                    color: $color;
                }
                &:nth-child(1){
                    background: lighten(#3A465C,4%*7);
                    color: $color;
                }
            }


        }
    }
</style>