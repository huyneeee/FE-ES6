import CommentApi from '../../api/CommentApi.js';
import ProductApi from '../../api/ProductApi.js';
import {  $, reRender,CheckLogin } from '../../utils.js';
const ListComments = {
    async render() {
        CheckLogin();
        const { data : products } = await ProductApi.getAll();
        const count = async ()=>{
          const  num  = await Promise.all(products.map(product=>CommentApi.countCommentByProduct(product._id)));
          return num;
        }
        const arr = await count();
        console.log(arr);
        return `
        <table class="items-center w-full bg-transparent border-collapse" id="list_order">
        <thead>
          <tr>
            <th
              class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
              STT   
            </th>
            <th
              class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
              ID Products
            </th>

            <th
              class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
               Total Comment
            </th>
          <th
          class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
          Action
        </th>
           
          </tr>
        </thead>
        <tbody>
        ${products.map( (product,index) =>{
          // const { data : count }= await CommentApi.countCommentByProduct(product._id);
        
            return `
                <tr>
                <th
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                ${index}
                </th>
                <td class="border-t-0 px-6 font-semibold align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  ${product.name}
                </td>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
             
                </td>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                <button class="btn btn_detail btn-primary btn-remove px-3 py-2 bg-blue-500 rounded text-white" data-id="${product._id}">Detail</button>
                </td>
            </tr>
            `
        }).join("")}
        
        </tbody>
      </table>
        `
    },
    async afterRender(){

    }
}
export default ListComments;