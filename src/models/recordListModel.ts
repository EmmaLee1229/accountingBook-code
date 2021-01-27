import clone from '@/lib/clone';

const localStorageName = 'recordList';
const recordListModel = {
    data:[]as RecordItem[],
    create(record: RecordItem){
        const oldRecord: RecordItem = clone(record);
        oldRecord.creatAt = new Date();
        this.data.push(oldRecord);
    },
    fetch() {
        this.data =JSON.parse(window.localStorage.getItem(localStorageName)|| '[]') as RecordItem[];
        return this.data;

    },
    save() {
        window.localStorage.setItem(localStorageName, JSON.stringify(this.data));
    }
};
export default recordListModel;