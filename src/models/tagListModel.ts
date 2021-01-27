import createID from '@/lib/createId';

const localStorageName = 'tagList';
const tagListModel: tagListType = {
    data: [],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageName) || '[]');
        return this.data;

    },
    create(name) {
        const names = this.data.map(item => item.name);
        if (names.indexOf(name) >= 0) {
            return 'duplicated';
        }
        const id = createID().toString();
        this.data.push({id, name});
        this.save();
        return 'success';


    },
    update(id, name) {
        const ids = this.data.map(item => item.id);
        if (ids.indexOf(id) >= 0) {
            const names = this.data.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                return 'duplicated';
            } else {
                const tag = this.data.filter(data => data.id === id)[0];
                tag.name = name;
                this.save();
                return 'success';
            }
        } else {
            return 'fail';
        }
    },
    delete(id) {
        const ids = this.data.map(item => item.id);
        if (ids.indexOf(id) >= 0) {
            let index = -1;
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].id === id) {
                    index = i;
                    break;
                }
            }
            this.data.splice(index, 1);
            this.save();
            window.alert('删除成功');
            return true;
        } else {
            return false;
        }

    },
    save() {
        window.localStorage.setItem(localStorageName, JSON.stringify(this.data));
    }
};
export default tagListModel;