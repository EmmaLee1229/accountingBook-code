<template>
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
</template>

<script>
    export default {
        name: "tags"
    }
</script>

<style lang="scss" scoped>
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
</style>