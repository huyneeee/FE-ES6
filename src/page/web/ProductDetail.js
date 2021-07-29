import ProductApi from "../../api/ProductApi.js";
import CategoryApi from "../../api/CategoryApi.js";
import { parseRequestUrl,$ } from '../../utils.js';
import {add_cart} from '../../cart.js';
import HeaderHome from '../../components/web/HeaderHome.js';
import FooterHome from '../../components/web/FooterHome.js';
import Navigation from '../../components/web/Navigation';
import Comment from '../../components/web/Comment';
const ProductDetail = {
  async render() {
      window.scrollTo(0,0);
      const { id } = parseRequestUrl();
      const { data : product } = await ProductApi.get(id);
      const { data : category } = await CategoryApi.getId(product.cate_id);
      return `
      ${HeaderHome.render()}
      ${Navigation.render()}
      <!-- breadcrumbs  -->
      <div class="flex items-center h-14 px-24 uppercase py-10 ">
          <a href="#" class="text-gray-500 font-thin text-md mr-4">Home</a>
          <span class="mr-4 text-gray-500">></span>
          <p class="text-gray-900">${product.name}</p>
      </div>
      <!-- content  -->
      <div class="flex w-full px-24 " style="height: 600px;">
          <div class="w-2/5 h-auto flex justify-center ">
              <div class="bg-gray-400 h-2/3 w-3/4 ">
                  <img src="${product.image}" class="h-full w-full" alt="">
              </div>
          </div>
          <div class="w-3/5  h-auto tracking-widest">
              <p class="text-lg font-semibold text-gray-900 mb-10">${product.name}</p>
              <p class="text-sm text-gray-600 mb-5">Category:${category.name}</p>
              <p class="text-sm text-gray-600 mb-5 ">Availability:${product.status ? 'Stock' : 'InStock'}</p>
              <p class="text-sm text-gray-600 mb-5">Quantity:${product.quantity}</p>
              <p class="text-md text-gray-600 font-bold leading-8 mb-5">$${product.price}</p>
              <div class="border border-gray-200 w-full h-auto p-5 box-border bg-gray-100">
                  <div class=" w-1/3 h-auto  ">
                      <p class="text-lg font-bold text-gray-600 mb-2">Quantity</p>
                      <div class="flex ">
                          <div
                              class="w-1/5 bg-gray-300 text-black justify-center items-center flex hover:bg-black hover:text-white">
                              <span>-</span>
                          </div>
                          <div class="w-3/5 ">
                              <input type="text" class="outline-none p-2 border text-center w-full" value="1">
                          </div>
                          <div
                              class="w-1/5 bg-gray-300 text-black justify-center items-center flex hover:bg-black hover:text-white">
                              <span>+</span>
                          </div>
                      </div>
                      <div class="flex justify-center py-3 border-b border-gray-500 mb-4">
                      <button class="border-b-2 border-black font-bold  text-sm add-to-cart focus:outline-none" data-id="${product._id}">ADD TO CARD</button>
                      </div>
                      <div class="flex justify-center">
                          <a href="" class="text-gray-500 mr-6 uppercase text-sm"><i class="fab fa-behance"></i></a>
                          <a href="" class="text-gray-500 mr-6 uppercase text-sm"><i
                                  class="fab fa-facebook-f"></i></a>
                          <a href="" class="text-gray-500 mr-6 uppercase text-sm"><i class="fab fa-google"></i></a>
                          <a href="" class="text-gray-500 uppercase mr-6 text-sm"><i class="fab fa-twitter"></i></a>
                          <a href="" class="text-gray-500 uppercase text-sm"><i class="fab fa-instagram"></i></a>
                      </div>
                  </div>
              </div>
              <p class="text-sm text-gray-600 leading-8 mt-4">The Frankie Sweatshirt is your best friend at long
                  afternoon stadium stints or winter trailside
                  campsites. The soft fleece fabric keeps you toasty as moisture-wicking technology kicks in when the
                  sun comes out.

                  Light green crewneck sweatshirt.
                  Hand pockets.
                  Relaxed fit.
                  Machine wash/dry.</p>
          </div>
      </div>
        <!-- comment -->
        <div class=" w-full flex-col px-24 " id="list_comment">
        ${await Comment.render()}
        </div>
        ${FooterHome.render()}
        `;
  },
  async afterRender(){
    await HeaderHome.afterRender()
    await Comment.afterRender()
    //add-cart
    add_cart(ProductDetail);       
  }
}
export default ProductDetail;
