
import recordList from '@/store/recordList';
import tagList from '@/store/tagList';

const store = {
        //record store
        ...recordList,
        //tag store
        ...tagList
}
export default store;