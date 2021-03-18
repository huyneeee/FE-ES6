import HeaderHome from '../../components/web/HeaderHome.js';
import FooterHome from '../../components/web/FooterHome.js';
import { $,reRender} from '../../utils.js';
import {up_cart,down_cart,} from '../../cart.js';
import ShowCart from '../../components/web/ShowCart.js';
import Navigation from '../../components/web/Navigation';

const CartPage = {
    async render(){ 
      const arr_product_cart = JSON.parse(localStorage.getItem('arr_product_cart'));   
      if(arr_product_cart!=null){
          var subtotal = arr_product_cart.reduce( ( sum, { sl,price } ) => sum + sl*price , 0);        
      }
      if(arr_product_cart){
        return `
        ${HeaderHome.render()}
        ${Navigation.render()}
        ${await ShowCart.render()}
        ${FooterHome.render()}
      `
      }else{
        return `
        ${HeaderHome.render()}
        ${Navigation.render()}
        <div class="flex w-full px-24 h-auto my-10">
          <div class="w-full h-auto flex-col ">
              <p class="text-center text-md tracking-widest font-bold uppercase py-4">Bạn chưa có sản phẩm nào trong giỏ hàng !</p>
              <a href="#/products" class="text-center"> < CONTINUE SHOPPING</a>
          </div>
        </div>
        ${FooterHome.render()}
        `
      }
      
    },
    async afterRender(){
      const arr_product_cart = JSON.parse(localStorage.getItem('arr_product_cart'));
      // xóa cart 
      const btns_remove=$('#cart .remove-product-cart');
      if(btns_remove.length){
          btns_remove.forEach(btn => {
              btn.onclick = async ()=>{
                const id = btn.dataset.id;
                const question = confirm ('Bạn có chắc chắn muốn xóa ?');
                if(question){
                  const new_arr= arr_product_cart.filter(product=>product.id!=id);
                  localStorage.setItem('arr_product_cart',JSON.stringify(new_arr));
                  await reRender(CartPage,'#main-content');
                }
              }
           });
      }else{
          btns_remove.onclick = async ()=>{
              const question = confirm ('Bạn có chắc chắn muốn xóa ?');
              if(question){
                  localStorage.removeItem('arr_product_cart');
                  await reRender(CartPage,'#main-content');
              }
            }
      }
    //  up qty
    up_cart(CartPage); 
    //  down qty 
    down_cart(CartPage);

    await HeaderHome.afterRender();               
    }
}
export default CartPage;




