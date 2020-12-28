<template>
    <div>
        <label class="note">
            <span class="name">备注</span>
            <input type="text" placeholder="请在这里添加备注">
        </label>
    </div>
</template>

<script>
    export default {
        name: "note"
    }
</script>

<style lang="scss" scoped>
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

</style>