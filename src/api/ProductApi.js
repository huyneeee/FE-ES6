import { axiosClient } from './axiosClient';
const ProductApi = {
    getAll(){
        const url = `/products`;
        return axiosClient.get(url);
    },
    get(id){
        const url = `/products/${id}`;
        return axiosClient.get(url);
    },
    getProductPaginate(currentPage,row_per_page){
        const url =`/products?_page=${currentPage}&_limit=${row_per_page}`;
        return axiosClient.get(url);
    },
    getProductsByCateId(id){
        const url = `/products?cate_id=${id}`;
        return axiosClient.get(url);
    },
    remove(id){
        const url = `/products/${id}`;
        return axiosClient.delete(url);
    },
    add(product){
        const url = `/products`;
        return axiosClient.post(url, product);
    },
    edit(id,product){
        const url = `/products/${id}`;
        return axiosClient.put(url,product);
    },
    getProductByCate(cate_id){
        const url = `/products?cate_id=${cate_id}`;
        return axiosClient.get(url);
    },
    getProductByTextSearch(input){
        const url = `/products?name_like=${input}`;
        return axiosClient.get(url);
    }
}
export default ProductApi;