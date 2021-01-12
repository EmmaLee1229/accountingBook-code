<template>
    <div class="numberPad">
        <div class="typePad">
            {{output}}
        </div>
        <div class="buttons">
            <button @click="inputContent">1</button>
            <button @click="inputContent">2</button>
            <button @click="inputContent">3</button>
            <button @click="deleteNum">删除</button>
            <button @click="inputContent">4</button>
            <button @click="inputContent">5</button>
            <button @click="inputContent">6</button>
            <button @click="removeAll">清空</button>
            <button @click="inputContent">7</button>
            <button @click="inputContent">8</button>
            <button @click="inputContent">9</button>
            <button @click="ok" class="ok">OK</button>
            <button class="zero" @click="inputContent">0</button>
            <button @click="inputContent">.</button>
        </div>
    </div>

</template>

<script lang="ts">
    import Vue from "vue";
    import {Component, Prop} from "vue-property-decorator";

    @Component
    export default class NumberPad extends Vue {
        @Prop() readonly value!: number;
        output = this.value.toString();

        inputContent(event: MouseEvent) {
            //强制执行类型
            const button = event.target as HTMLButtonElement;
            const input = button.textContent as string;
            if (this.output.length >= 16) {
                return;
            }
            if (this.output === "0") {
                if (input === "0") {
                    return;
                } else if ("123456789".indexOf(input) >= 0) {
                    this.output = input;
                    return this.output;
                } else {
                    this.output += input;
                    return this.output;
                }
            } else if (this.output.indexOf(".") >= 0) {
                if (input === ".") {
                    return;
                } else {
                    this.output += input;
                    return this.output;
                }
            } else {
                return this.output += input;
            }
        }

        deleteNum() {
            if (this.output.length === 1) {
                this.output = "0";
                return this.output;
            } else {
                this.output = this.output.slice(0, -1);
                return this.output;
            }
        }

        removeAll() {
            return this.output = "0";
        }

        ok() {
            this.$emit("update:value", this.output);
            this.$emit("submit", this.output);
            this.output = "0";
        }

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
            height: 72px;

        }

        .buttons {
            @extend %clearFix !optional;

            > button {
                width: 25%;
                height: 64px;
                float: left;
                background: transparent;
                border: none;

                &.ok {
                    height: 64*2px;
                    float: right;
                }

                &.zero {
                    width: 2*25%;
                }

                $color: #E9E8D4;

                &:nth-child(12) {
                    background: #3A465C;
                    color: $color;
                }

                &:nth-child(8), &:nth-child(11), &:nth-child(13) {
                    background: lighten(#3A465C, 4%*3);
                    color: $color;
                }

                &:nth-child(14) {
                    background: lighten(#3A465C, 4%*2);
                    color: $color;
                }

                &:nth-child(4), &:nth-child(7), &:nth-child(10) {
                    background: lighten(#3A465C, 4%*4);
                    color: $color;
                }

                &:nth-child(3), &:nth-child(6), &:nth-child(9) {
                    background: lighten(#3A465C, 4%*5);
                    color: $color;
                }

                &:nth-child(2), &:nth-child(5) {
                    background: lighten(#3A465C, 4%*6);
                    color: $color;
                }

                &:nth-child(1) {
                    background: lighten(#3A465C, 4%*7);
                    color: $color;
                }
            }


        }
    }
</style>