import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createID from '@/lib/createId';
import router from '@/router';

Vue.use(Vuex);
type rootTag = {
    recordList: RecordItem[];
    tagList: Tag[];
    currentTag?: Tag;
}
const store = new Vuex.Store({
    state: {
        recordList: [],
        tagList: [],
        currentTag: undefined
    } as rootTag,
    mutations: {
        fetchRecord(state) {
            state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
            return state.recordList;
        },
        saveRecord(state) {
            window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
        },
        createRecord(state, record: RecordItem) {
            const oldRecord: RecordItem = clone(record);
            oldRecord.creatAt = new Date().toISOString();
            state.recordList.push(oldRecord);
            store.commit('saveRecord');
        },
        fetchTags(state) {
            state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
            return state.tagList;
        },
        findTag(state, id: string) {
            state.currentTag = state.tagList.filter(t => t.id === id)[0];
        },
        createTag(state, name: string) {
            const names = state.tagList.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                window.alert('标签名重复了');
                return 'duplicated';
            }
            const id = createID().toString();
            state.tagList.push({id, name: name});
            store.commit('saveTags');
            window.alert('添加成功');
            return 'success';
        },
        remove(state, id: string) {
            let index = -1;
            for (let i = 0; i < state.tagList.length; i++) {
                if (state.tagList[i].id === id) {
                    index = i;
                    break;
                }
            }
            state.tagList.splice(index, 1);
            window.alert('删除成功');
            store.commit('saveTags');
            router.back();
        },
        update(state, payload: { id: string; name: string }) {
            const {id, name} = payload;
            const idList = state.tagList.map(item => item.id);
            if (idList.indexOf(id) >= 0) {
                const names = state.tagList.map(item => item.name);
                if (names.indexOf(name) >= 0) {
                    window.alert('标签名重复');
                } else {
                    const tag = state.tagList.filter(item => item.id === id)[0];
                    tag.name = name;
                    store.commit('saveTags');
                }
            }
        },
        saveTags(state) {
            window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
        }
    },
    actions: {},
    modules: {}
});
export default store;