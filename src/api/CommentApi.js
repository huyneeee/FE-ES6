import { axiosClient } from './axiosClient.js';
const CommentApi = {
    getAll(){
        const url = `/comment`;
        return axiosClient.get(url);
    },
    getByProduct(id){
        const url = `/comment?id_product=${id}`;
        return axiosClient.get(url);
    },
    getId(id){
        const url = `/comment/${id}`;
        return axiosClient.get(url);
    },
    add(comment){
        const url = `/comment`;
        return axiosClient.post(url,comment);
    },
    remove(id){
        const url = `/comment/${id}`;
        return axiosClient.delete(url)
    }
}
export default CommentApi;