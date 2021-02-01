
import clone from '@/lib/clone';
const localStorageName = 'recordList';
const recordStore ={
    //recordList store
    recordList:[]as RecordItem[],
    fetchRecord(){
    this.recordList =JSON.parse(window.localStorage.getItem(localStorageName)|| '[]') as RecordItem[];
    return this.recordList;
    },
    saveRecord() {
        window.localStorage.setItem(localStorageName, JSON.stringify(this.recordList));
    },
    createRecord(record: RecordItem){
        const oldRecord: RecordItem = clone(record);
        oldRecord.creatAt = new Date();
        this.recordList.push(oldRecord);
        recordStore.saveRecord()
    }
}
recordStore.fetchRecord();
export default  recordStore;