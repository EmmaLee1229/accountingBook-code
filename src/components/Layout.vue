<template>
    <div>
        <div class="nav-wrapper">
            <div class="content">
                <slot></slot>
            </div>
            <Nav/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Layout"
    }
</script>

<style scoped>
    .nav-wrapper {
        border: 1px solid red;
        display: flex;
        flex-direction: column;
        height: 100vh;
    }
    .content {
        border: 1px solid blue;
        flex-grow: 1;
        overflow: auto;
    }
</style>