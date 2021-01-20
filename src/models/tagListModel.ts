const localStorageName = 'tagList';
type Tag = {
    id: string;
    name: string;
}
type tagListType = {
    data: Tag[];
    fetch: () => Tag[];
    create: (data: string) => 'success' | 'duplicated';
    save: () => void;
}
const tagListModel: tagListType = {
    data: [],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageName) || '[]');
        return this.data;

    },
    create(name) {
        const names = this.data.map(item=>item.name)
        if (names.indexOf(name) >= 0) {
            return 'duplicated';
        }
            const id = name;
            this.data.push({id,name});
            this.save();
            return 'success';


    },
    save() {
        window.localStorage.setItem(localStorageName, JSON.stringify(this.data));
    }
};
export default tagListModel;