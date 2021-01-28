import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import tagListModel from '@/models/tagListModel';
import recordListModel from '@/models/recordListModel';

Vue.config.productionTip = false;
Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);

//recordList store
window.recordList = recordListModel.fetch();
window.createRecord = (record: RecordItem)=>{
    recordListModel.create(record);
}
//tag store
window.findTag = (id: string) => {
    const tags = window.tagList;
    const tag = tags.filter(item => item.id === id)[0];
    return tag;
};
window.tagList = tagListModel.fetch();
window.createTag = (message: string) => {
    if (message === 'success') {
        window.alert('标签添加成功');

    } else if (message === 'duplicated') {
        window.alert('标签重复，添加失败');
    }
};
window.update = (id: string, name: string) => {
    return tagListModel.update(id, name);
};
window.remove = (id: string) => {
    if (tagListModel.delete(id)) {
        return true;
    } else {
        return false;
    }
};
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
