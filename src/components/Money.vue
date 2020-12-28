<template>
    <Layout class-prefix="layout">
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
        <div>
            <label class="note">
                <span class="name">备注</span>
                <input type="text" placeholder="请在这里添加备注">
            </label>
        </div>
        <div class="tags">

            <div class="new">
                <button>新增标签</button>
            </div>
            <ul class="current">
                <li class="selected">衣</li>
                <li>食</li>
                <li>住</li>
                <li>行</li>
            </ul>
        </div>
        <ul class="types">
            <li class="selected">支出</li>
            <li>收入</li>
        </ul>



    </Layout>

</template>

<script>
    export default {
        name: "Money"
    }
</script>
<style lang="scss">
    .layout-content {
        border: 1px solid red;
        display: flex;
        flex-direction: column-reverse;

    }
</style>

<style lang="scss" scoped>
    @import "~@/assets/style/reset.scss";

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

    .tags {
        margin: 12px;
        display: flex;
        flex-direction: column-reverse;
        flex-grow: 1;

        > .current {
            display: flex;
            font-size: 14px;

            > li {
                background: #495976;
                height: 24px;
                line-height: 24px;
                border-radius: 12px;
                padding: 0 20px;
                color: #999999;
                margin-right: 16px;
                margin-top: 2px;

                &.selected {
                    background: #3A465C;
                    color: #E9E8D4;
                }
            }
        }

        > .new {
            padding-top: 4px;

            > button {
                color: #999999;
                background: transparent;
                border: none;
                padding-top: 8px;
                padding-right: 3px;
                border-bottom: 1px solid;
            }
        }

    }

    .note {
        padding-left: 12px;
        font-size: 14px;
        background: #f5f5f5;
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