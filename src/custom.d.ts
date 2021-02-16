type RecordItem = {
    tags: string[];
    type: string;
    note: string;
    mount: number;
    creatAt?: string;
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