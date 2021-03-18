import { axiosClient } from './axiosClient.js';
const BlogApi = {
    getAll(){
        const url =`/blogs`;
        return axiosClient.get(url);
    },
    get(id){
        const url = `/blogs/${id}`;
        return axiosClient.get(url);
    },
    remove(id){
        const url = `/blogs/${id}`;
        return axiosClient.delete(url)
    },
    add(blog){
        const url = `/blogs`;
        return axiosClient.post(url,blog);
    },
    edit(id,blog){
        const url = `/blogs/${id}`;
        return axiosClient.put(url,blog)
    }
}
export default BlogApi;
