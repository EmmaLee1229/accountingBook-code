<template>
    <Layout class-prefix="layout">
        <number-pad/>
        <note/>
        <tags/>
        <types/>
    </Layout>

</template>

<script>
    import NumberPad from "@/components/Money/numberPad";
    import Tags from "@/components/Money/tags";
    import Types from "@/components/Money/types";
    import Note from "@/components/Money/note";

    export default {
        name: "Money",
        components: {Note, Types, Tags, NumberPad}
    }
</script>
<style lang="scss">
    .layout-content {
        /*border: 1px solid red;*/
        display: flex;
        flex-direction: column-reverse;
    }
</style>

<style lang="scss" scoped>
    @import "~@/assets/style/reset.scss";
</style>