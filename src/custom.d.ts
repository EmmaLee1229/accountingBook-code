type RecordItem = {
    tags: string[];
    type: string;
    note: string;
    mount: number;
    creatAt?: Date;
}
interface Window {
    tagList: Tag[];
    update: (id: string,name: string) => 'success' | 'duplicated' | 'fail';
    remove: (id: string) => boolean;
    createTag: (message: string) => void;
    findTag: (id: string) => {id: string;name: string};
}
type Tag = {
    id: string;
    name: string;
}
type tagListType = {
    data: Tag[];
    fetch: () => Tag[];
    create: (data: string) => 'success' | 'duplicated';
    update: (id: string, data: string) => 'success' | 'duplicated' | 'fail';
    delete: (id: string) => boolean;
    save: () => void;
}