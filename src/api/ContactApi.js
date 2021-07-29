import { axiosClient } from './axiosClient.js';
const ContactApi = {
    getAll(){
        const url = `/contact`;
        return axiosClient.get(url);
    },
    get(id){
        const url = `/contact/${id}`;
        return axiosClient.get(url);
    },
    add(contact){
        const url = `/contact`;
        return axiosClient.post(url,contact);
    },
    remove(id,userId){
        const url = `/contact/${id}/${userId}`;
        return axiosClient.delete(url)
    }
}
export default ContactApi;