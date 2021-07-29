import { axiosClient } from './axiosClient';
const UserApi = {
    getAll(){
        const url = `/users`;
        return axiosClient.get(url);
    },
    get(id){
        const url = `/user/${id}`;
        return axiosClient.get(url);
    },
    remove(id,userId){
        const url = `/user/${id}/${userId}`;
        return axiosClient.delete(url);
    },
    add(user){
        const url = `/users`;
        return axiosClient.post(url, user);
    },
    edit(id,user,userId){
        const url = `/user/${id}/${userId}`;
        return axiosClient.put(url,user);
    },
    checkPassword(userId,password){
        const url =  `/checkpassword/${userId}`;
        return axiosClient.post(url,password);
    }
}
export default UserApi;