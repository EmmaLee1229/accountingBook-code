<template>
    <nav>
        <router-link to="/money" class="item" active-class="selected">
            <Icon name="Money Donation"/>
            记账</router-link>
        <router-link to="/statistics" class="item" active-class="selected">
            <Icon name="note"/>
            统计</router-link>
        <router-link to="/charts" class="item" active-class="selected">
            <Icon name="statistics"/>
            图表</router-link>
    </nav>
</template>

<script lang="ts">
    // import x from '../../src/assets/icons/labels.svg';
    // console.log(x)

    const importAll =(requireContext: __WebpackModuleApi.RequireContext)=>requireContext.keys().forEach(requireContext);
    try{
        importAll(require.context('../assets/icons',true,/\.svg$/));
    }catch(err){
        console.log(err);
    }
    export default {

        name: "Nav"
    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";
 nav {
     display: flex;
     /*justify-content: space-between;*/
     box-shadow: 0 0 3px rgba(0,0,0,0.3);
  >.item {
      width: 33.3333%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 2px 0;
      font-size: 12px;
      .icon {
          height: 32px;
          width: 32px;
      }
  }
     > .item.selected {
         color: darken($color-heighlight,20%);
     }
}
</style>