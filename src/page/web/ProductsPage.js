import ProductApi from '../../api/ProductApi.js';
import HeaderHome from '../../components/web/HeaderHome.js';
import FooterHome from '../../components/web/FooterHome.js';
import SideBarProducts from '../../components/web/SideBarProducts.js';
import {add_cart} from '../../cart';
import { parseRequestUrl,reRender } from '../../utils.js';
import Navigation from '../../components/web/Navigation';
const ProductsPage = {
    async render() {
        const request = parseRequestUrl();
        const current_page = request.resource.substr(-1,1);
        const { data: total } = await ProductApi.countProduct();

        const row_per_page = 6; // số bản ghi trên 1 trang
        const total_page =Math.ceil(total/row_per_page); //tính số lượng trang
        // tạo mảng index pagintion
        const arr_index_page=[];
        for(let i = 0; i < total_page;i++){
            arr_index_page.push(i);
        }
        
        const { data: products } = await ProductApi.getProductPagination(current_page ? current_page : '1');

        return `
                ${HeaderHome.render()}
                ${Navigation.render()}
                <!-- banner  -->
                <div class="bg-cover bg-center w-full relative box-border"
                    style="background-image: url(image/category-image.jpg); height: 35rem;">
                </div>
                <div class="flex items-center h-14 px-24 uppercase py-10 ">
                <a href="#" class="text-gray-500 font-thin text-md mr-4">Home</a>
                <span class="mr-4 text-gray-500">></span>
                <p class="text-gray-900">Shop</p>
            </div>
            <!-- content  -->
            <div class="flex h-auto w-full px-24">
            ${await SideBarProducts.render()}
                <div class="w-3/4 pl-10">
                    <div class="flex h-16 w-full  justify-around items-center">
                        <div class="flex-1">
                            <span class="text-2xl p-2 bg-gray-400"><i class="fas fa-th"></i></span>
                            <span class="text-2xl p-2 "><i class="fas fa-list-ul"></i></span>
                        </div>
                        <div class="flex-1 text-right">
                            <p class="uppercase text-md ">items ${current_page==='s'?'1':current_page}-${total_page} of ${row_per_page}</p>
                        </div>
                    </div>
                    <!-- products  -->
                    <div class="grid grid-cols-3 gap-4 mt-6"id="list_product_page">
                    ${products.map(product => {
                    return `
                    <div class=" h-auto group overflow-hidden">
                    <a href="#/product/${product._id}">
                    <div class=" w-full h-96 bg-gray-500 bg-no-repeat bg-cover bg-center  "
                          style="background-image: url('${product.image}');">
                      </div>
                    </a>
                      <div class="text-center mt-5">
                      <a  class="text-md font-normal uppercase text-gray-500 ">${product.name}</a>    
                          <div class="flex mt-3">
                                  <div class="flex-1">
                                  <button class="border-b-2 border-black font-bold  text-sm add-to-cart focus:outline-none transform -translate-x-32 group-hover:translate-x-20 transition-all duration-500" data-id="${product._id}">ADD TO CARD</button>
                                  </div>
                                  <div class="flex-1">
                                  <p class="font-extrabold text-md transform -translate-x-16 group-hover:translate-x-40 transition-all duration-500">$${product.price}</p>
                                  </div>
                          </div>
                      </div>
                  </div>
                        `
                }).join("")}
                    </div>
                    <!-- pagination  -->
                  <div class="flex h-16 w-full  justify-start items-center mt-5">
                    ${arr_index_page.map(ele=>{
                        return `
                            <div class="w-10 h-10  ${current_page==ele+1 ? 'bg-black' : 'bg-gray-400'} hover:bg-gray-900  hover:text-white  text-white  justify-center items-center flex mr-4">
                            <span><a href="/#/products?page=${ele+1}">${ele+1}</a></span>
                        </div>
                        `
                    }).join('')}
                    
                </div>
                </div>
            </div>
            ${FooterHome.render()}
        `
    },
    async afterRender(){
        await HeaderHome.afterRender();
        //add-cart
        add_cart(ProductsPage);
        await SideBarProducts.afterRender();
    }
}
export default ProductsPage;


