import { axiosClient } from './axiosClient';
const UserApi = {
    getAll(){
        const url = `/users`;
        return axiosClient.get(url);
    },
    get(id){
        const url = `/users/${id}`;
        return axiosClient.get(url);
    },
    remove(id){
        const url = `/users/${id}`;
        return axiosClient.delete(url);
    },
    add(user){
        const url = `/users`;
        return axiosClient.post(url, user);
    },
    edit(id,user){
        const url = `/users/${id}`;
        return axiosClient.put(url,user);
    }
}
export default UserApi;