import { axiosClient } from './axiosClient';
const ProductApi = {
    getAll(){
        const url = `/products`;
        return axiosClient.get(url);
    },
    get(id){
        const url = `/product/${id}`;
        return axiosClient.get(url);
    },
    getProductsByCateId(id){
        const url = `/products/category/${id}`;
        return axiosClient.get(url);
    },
    remove(id,userId){
        const url = `/product/${id}/${userId}`;
        return axiosClient.delete(url);
    },
    add(product,userId){
        const url = `/product/${userId}`;
        return axiosClient.post(url, product);
    },
    edit(id,product,userId){
        const url = `/product/${id}/${userId}`;
        return axiosClient.put(url,product);
    },
    getProductByCate(cate_id){
        const url = `/products?cate_id=${cate_id}`;
        return axiosClient.get(url);
    },
    getProductByTextSearch(input){
        const url = `/products/${input}`;
        return axiosClient.get(url);
    },
    getProductByPrice(gte,lte){
        const url = `/products/price?gte=${gte}&lte=${lte}`;
        return axiosClient.post(url);
    },
    getProductPagination(page){
        const url = `/products?page=${page}`;
        return axiosClient.post(url);
    },
    countProduct(){
        const url = `/countproduct`;
        return axiosClient.get(url);
    }
}
export default ProductApi;