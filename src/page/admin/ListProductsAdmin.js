import SideBar from '../../components/admin/SideBar.js';
import ListProduct from '../../components/admin/ListProduct.js';
import {$} from '../../utils';
import ProductApi from '../../api/ProductApi.js';
const ListProductsAdmin = {
    async render() {
        return `
        ${SideBar.render()}
        <div class="relative md:ml-64 bg-gray-100">
            <div class="px-4 md:px-10 mx-auto w-full h-full">
                <div class="flex flex-wrap">
                    <div class="w-full xl:w-12/12 mb-12 xl:mb-0 px-4 mt-8">
                        <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                        <div class="rounded-t mb-0 px-4 py-3 border-0">
                        <div class="flex flex-wrap items-center">

                          <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 class="font-semibold text-base text-gray-800">
                              List Products
                            </h3>
                          </div>
                          <div class="relative flex-1 px-4 max-w-full flex-grow flex-1">
                          <input type="text" id="text-search" placeholder="Search Product By Name..." class="border-b px-2 py-1 border-gray-500 w-full focus:outline-none rounded-none">
                          <span class="absolute right-7 top-1"><i class="fas fa-search"></i></span>
                        </div> 
                          <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                            <a href="#/addproduct"
                              class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button">
                              Add Product
                            </a>
                          </div>
                        </div>
                      </div>
                            <div class="block w-full overflow-x-auto"id="list-products" >
                                <!-- Projects table -->
                                ${await ListProduct.render()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    },
    async afterRender() {
        await SideBar.afterRender();
        const inputSearch=$('#text-search');
        inputSearch.oninput=async ()=>{

            $('#list-products').removeChild($('#list-products').firstElementChild);
            const { data: products} = await ProductApi.getProductByTextSearch(inputSearch.value);
            const result =  `
                    <table class="items-center w-full bg-transparent border-collapse" >
                    <thead>
                      <tr>
                        <th
                          class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                          ID
                        </th>
                        <th
                          class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                          Name 
                        </th>
                        <th
                          class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                          Image
                        </th>
                        <th
                          class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                          Price
                        </th>
                        <th
                        class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        Quantity
                      </th>
                      <th
                      class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                      Status
                    </th>
                    <th
                    class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                    Action
                  </th>
                      </tr>
                    </thead>
                    <tbody>
                    ${products.map((product,index) =>{
                        return `
                            <tr>
                            <th
                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                            ${index}
                            </th>
                            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                            ${product.name}
                            </td>
                            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                            <div class="bg-cover bg-center w-20 h-20" style="background-image: url(${product.image})"></div>
                            </td>
                            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                            ${product.price}
                            </td>
                            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                            ${product.quantity}
                            </td>
                            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                            ${product.status?'<span class="text-green-500"><i class="fas fa-circle"></i> Stoking</span>':'<span class="text-red-500"><i class="fas fa-circle"></i> Out of stockg</span>'}
                            </td>
                            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                            <a href="/#/products/${product.id}/edit" class="btn btn-primary px-3 py-2 bg-blue-500 rounded text-white">Edit</a>
                            <button href="/products/${product.id}" class="btn btn-remove btn-primary btn-remove px-3 py-2 bg-red-500 rounded text-white" data-id="${product.id}">Delete</button>
                            </td>
                        </tr>
                        `
                    }).join("")}
                    
                    </tbody>
                  </table>
                `
              $('#list-products').innerHTML=result;
            
        }


        return `${await ListProduct.afterRender()}`
    }

}
export default ListProductsAdmin;