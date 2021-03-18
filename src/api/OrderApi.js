import { axiosClient } from './axiosClient.js';
const OrderApi = {
    getAll(){
        const url = `/order`;
        return axiosClient.get(url);
    },
    getId(id){
        const url = `/order/${id}`;
        return axiosClient.get(url);
    },
    add(order){
        const url = `/order`;
        return axiosClient.post(url,order);
    },
    remove(id){
        const url = `/order/${id}`;
        return axiosClient.delete(url)
    }
}
export default OrderApi;