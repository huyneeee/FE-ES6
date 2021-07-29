import SideBarProducts from '../../components/web/SideBarProducts.js';
import HeaderHome from '../../components/web/HeaderHome.js';
import FooterHome from '../../components/web/FooterHome.js';
import Navigation from '../../components/web/Navigation';
import { $, parseRequestUrl} from '../../utils';
import { add_cart } from '../../cart.js';
import ProductApi from '../../api/ProductApi.js';
import CategoryApi from '../../api/CategoryApi.js';
const ProductsCategoryPage = {
    async render() {
        const { id } = parseRequestUrl();
        const { data: products } = await ProductApi.getProductsByCateId(id);
        const { data: cate} = await CategoryApi.getId(id);
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
                <a href="#/products" class="text-gray-500 font-thin text-md mr-4">Shop</a>
                <span class="mr-4 text-gray-500">></span>
                <p class="text-gray-700">${cate.name}</p>
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
                        <p class="uppercase text-md ">items 1-12 of 20</p>
                    </div>
                </div>
                <!-- products  -->
                <div class="grid grid-cols-3 gap-4 mt-6">
                ${products.map(product => {
                    return `
                        <div class=" h-auto group overflow-hidden">
                        <div  class="relative">
                        <div class=" w-full h-96 bg-gray-500 bg-no-repeat bg-cover bg-center"
                                style="background-image: url('${product.image}');">
                            </div>
                            <div class="absolute top-40 left-32 hidden group-hover:block transition-all ">
                            <a href="#/product/${product._id}">
                                <i class="fas fa-eye text-white text-5xl"></i>
                            </a>     
                            </div>   
                        </div>
                            <div class="text-center mt-5">
                            <p class="text-md font-normal uppercase text-gray-500 ">${product.name}</p>
                                
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
                    <div class="w-10 h-10 bg-black text-white justify-center items-center flex mr-4">
                        <span><a href="">1</a></span>
                    </div>
                    <div class="w-10 h-10 bg-gray-300 text-black justify-center items-center flex mr-4 hover:bg-black hover:text-white">
                    <span><a href="">2</a></span>
                    </div>
                    <div class="w-10 h-10 bg-gray-300 text-black justify-center items-center flex hover:bg-black hover:text-white">
                        <span><i class="fas fa-arrow-right"></i></span>
                    </div>
                </div>
            </div>
        </div>
        ${FooterHome.render()}
            `
    },
    async afterRender(){
        await HeaderHome.afterRender();
        //add-cart
        add_cart(ProductsCategoryPage);
        await SideBarProducts.afterRender();
    }
}
export default ProductsCategoryPage;