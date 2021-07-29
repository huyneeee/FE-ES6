import ProductApi from '../../api/ProductApi.js';
import CategoryApi from '../../api/CategoryApi';
import { $ } from '../../utils.js';
import { add_cart } from '../../cart';
import HomePage from '../../page/web/Home.js';
const OurProducts = {
    async render() {
        const { data: category } = await CategoryApi.getAll();

        const { data: products } = await ProductApi.getProductsByCateId('60616aee3b3f7914bc02f7cd');

        const our_product = products.slice(0, 4);
        return `
            <div class="w-full flex justify-center w-auto h-auto py-5 tabs">
            <ul>
            <li>
               ${category.map(cate => {
            return `
                            <button data-id="${cate._id}" class="tablinks mr-10 pb-2 hover:border-b-2 hover:border-black  focus:outline-none hover:text-gray-700  rounded-none ${cate._id === '60616aee3b3f7914bc02f7cd' ? 'border-b border-gray-500  font-semibold' : ''}">
                            ${cate.name}</button>
                   `
        }).join("")}
                <a href="#/products" class=" pb-2 hover:border-b-2 hover:border-black hover:text-gray-500"> ALL</a>
                </li>
            </ul> 
            </div>
            <div class="grid grid-cols-4 gap-5  mt-6 tabcontent">
            ${our_product.map(product => {
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
        }).join('')}
            </div>
            
        `
    },
    async afterRender() {
        const btns = $('.tablinks');
        btns.forEach(tab => {
            tab.onclick = async () => {

                const active_none = $('.border-b.border-gray-500');
                active_none.classList.remove("border-b", "border-gray-500", "font-semibold");
                tab.classList.add("border-b", "border-gray-500", "font-semibold");
                const id = tab.dataset.id;
                const { data: products } = await ProductApi.getProductsByCateId(id);
                const our_product = products.slice(0, 4);
                const result = our_product.map(product => {
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
                }).join('')
                $('.tabcontent').innerHTML = result;
            }
        });

        //add-cart
        add_cart(HomePage);
    }
}
export default OurProducts;