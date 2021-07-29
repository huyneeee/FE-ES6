import { axiosClient } from './axiosClient.js';
const BlogApi = {
    getAll(){
        const url =`/blog`;
        return axiosClient.get(url);
    },
    get(id){
        const url = `/blog/${id}`;
        return axiosClient.get(url);
    },
    remove(id,userId){
        const url = `/blog/${id}/${userId}`;
        return axiosClient.delete(url)
    },
    add(blog,userId){
        const url = `/blog/${userId}`;
        return axiosClient.post(url,blog);
    },
    edit(id,blog,userId){
        const url = `/blog/${id}/${userId}`;
        return axiosClient.put(url,blog)
    }
}
export default BlogApi;
