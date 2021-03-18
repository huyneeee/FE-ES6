import { axiosClient } from './axiosClient.js';
const CategoryApi = {
    getAll(){
        const url = `/category`;
        return axiosClient.get(url);
    },
    getId(id){
        const url = `/category/${id}`;
        return axiosClient.get(url);
    },
    add(category){
        const url = `/category`;
        return axiosClient.post(url,category);
    },
    remove(id){
        const url = `/category/${id}`;
        return axiosClient.delete(url)
    },
    edit(id,category){
        const url = `/category/${id}`;
        return axiosClient.put(url,category)
    }
}
export default CategoryApi;