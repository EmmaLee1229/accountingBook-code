const localStorageName = 'tagList';
type tagListType = {
    data: string[];
    fetch: () => string[];
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
        if (this.data.indexOf(name) >= 0) {
            return 'duplicated';
        } else {
            this.data.push(name);
            return 'success';
        }

    },
    save() {
        window.localStorage.setItem(localStorageName, JSON.stringify(this.data));
    }
};
export default tagListModel;