import { axiosClient } from './axiosClient.js';
const CommentApi = {
    getAll(){
        const url = `/comment`;
        return axiosClient.get(url);
    },
    getByProduct(id){
        const url = `/comment/${id}`;
        return axiosClient.get(url);
    },
    add(comment){
        const url = `/comment`;
        return axiosClient.post(url,comment);
    },
    remove(id,userId){
        const url = `/comment/${id}/${userId}`;
        return axiosClient.delete(url)
    },
    countCommentByProduct(productId){
        const url = `/commentCountProductId?productId=${productId}`
        return axiosClient.post(url);
    }
}
export default CommentApi;