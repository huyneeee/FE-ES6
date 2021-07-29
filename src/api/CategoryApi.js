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
    add(category,userId){
        const url = `/category/${userId}`;
        return axiosClient.post(url,category);
    },
    remove(id,userId){
        const url = `/category/${id}/${userId}`;
        return axiosClient.delete(url)
    },
    edit(id,category,userId){
        const url = `/category/${id}/${userId}`;
        return axiosClient.put(url,category)
    }
}
export default CategoryApi;