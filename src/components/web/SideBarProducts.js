import { $,parseRequestUrl,reRender } from '../../utils.js';
import CategoryApi from '../../api/CategoryApi.js';
import ProductApi from '../../api/ProductApi.js';
import ProductsPage from '../../page/web/ProductsPage';
const SideBarProducts = {
     async render() {
         const { id } = parseRequestUrl();
         const { data : Categories } = await CategoryApi.getAll();
        return `
                <div class="w-1/4 list-none" id="filter">
                    <li class=" py-6 border-b border-gray-300 menu_parent">
                        <div class=" flex-col ">
                            <span class="text-md text-gray-500 tracking-wider flex-1 font-semibold uppercase ">Now Shopping by</span>
                            <div class="flex flex-col ml-5">
                                <div class=" hidden" id="filter_category">
                                    <p class="text-md flex-1 font-semibold text-gray-500 my-3"></p>
                                    <button class="flex-1 text-right focus:outline-none btn_delete_choose_filter" ><i class="fas fa-times font-bold text-lg"></i></button>
                                </div>
                                <div class=" hidden" id="filter_price">
                                    <p class="text-md flex-1 font-semibold text-gray-500 my-3"id="name_filter_cate">Category:</p>
                                    <button class="flex-1 text-right focus:outline-none btn_delete_choose_filter"><i class="fas fa-times font-bold text-lg"></i></button>
                                </div>
                            </div>
                                                                                               
                        </div>
                    </li>
                    <li class=" py-6 border-b border-gray-300 menu_parent"id="list_filter_category">
                        <div class="flex">
                            <span class="text-lg tracking-wider flex-1 font-semibold uppercase ">Category</span>
                            <button class="flex-1 category focus:outline-none text-right ">
                            <i class="fas fa-chevron-down span "></i>
                            </button>                                                                                          
                        </div>
                        <ul  class="tracking-wider text-gray-600 text-semibold text-md" id="menu_cate">
                        ${Categories.map(cate=>{
                            return `
                            <li class="py-2 mt-3 ml-5">
                                <p>${cate.name} <input type="radio" ${id===cate.id ? 'checked' : ''}  name="cate_check" value="${cate.id}" class="w-4 h-4 cate_check"></p>
                            </li>
                            `
                        }).join('')}
                        </ul>
                    </li>
                    <li class=" py-6 border-b border-gray-300 menu_parent"id="list_filter_price">
                    <div class="flex">
                        <span class="text-lg tracking-wider flex-1 font-semibold uppercase ">Price</span>
                        <button class="flex-1 price focus:outline-none text-right ">
                        <i class="fas fa-chevron-down span "></i>
                        </button>                                                                                          
                    </div>
                    <ul class="tracking-wider text-gray-400 text-semibold text-md" id="menu_price">
                        <li class="py-2 mt-3 ml-5">
                        <a href="#/products"><p>0-50 <input type="radio" value="50" name="price" class="w-4 h-4 btns_price "></p></a>
                        </li>
                        <li class="py-2 mt-3 ml-5 ">
                            <a href="#/products"><p>50-100 <input type="radio" value="100" name="price" class="w-4 h-4 btns_price"></p></a>
                        </li>
                    </ul>
                </li>


                </ul>
            </div>
        `
    },
    async afterRender(){
        const category = $('#list_filter_category .category');
        const price = $('#list_filter_price .price');

        category.onclick=()=>{    
            
               const span=category.firstElementChild;         
               const menu_cate = $('#menu_cate');
               if (menu_cate.style.display === "none") {
                menu_cate.style.display = "block";
                span.classList.remove("fa-chevron-right");
                span.classList.add("fa-chevron-down");
              } else {
                menu_cate.style.display = "none";
                span.classList.remove("fa-chevron-down");
                span.classList.add("fa-chevron-right");
              }
        }
        price.onclick=()=>{
            const span=price.firstElementChild;
            const menu_price = $('#menu_price');
            if (menu_price.style.display === "none") {
                menu_price.style.display = "block";
                span.classList.remove("fa-chevron-right");
                span.classList.add("fa-chevron-down");
           } else {
                menu_price.style.display = "none";
                span.classList.remove("fa-chevron-down");
                span.classList.add("fa-chevron-right");
           }
         }
         $('.btn_delete_choose_filter').forEach(btn=>{
            btn.onclick=async ()=>{
               await reRender(ProductsPage,"#main-content");
           }
         })
  
        const cate_check = $('#filter .cate_check');
        cate_check.forEach(check=>{
            check.onclick=async()=>{
                const id=check.value;
                const { data : category} = await CategoryApi.getId(id);
                $('#filter_category').classList.replace("hidden","flex");   
                $('#filter_category').firstElementChild.innerHTML=`Category:${category.name}`;
                $('#list_filter_category').style.display="none";   
                check.checked=false;
                const { data : products } = await ProductApi.getProductsByCateId(id);
                const result = products.map(product=>{
                    return `
                    <div class=" h-auto group overflow-hidden">
                    <a href="#/products/${product.id}">
                    <div class=" w-full h-96 bg-gray-500 bg-no-repeat bg-cover bg-center  "
                          style="background-image: url('${product.image}');">
                      </div>
                    </a>
                      <div class="text-center mt-5">
                      <a  class="text-md font-normal uppercase text-gray-500 ">${product.name}</a>    
                          <div class="flex mt-3">
                                  <div class="flex-1">
                                  <button class="border-b-2 border-black font-bold  text-sm add-to-cart focus:outline-none transform -translate-x-32 group-hover:translate-x-20 transition-all duration-500" data-id="${product.id}">ADD TO CARD</button>
                                  </div>
                                  <div class="flex-1">
                                  <p class="font-extrabold text-md transform -translate-x-16 group-hover:translate-x-40 transition-all duration-500">$${product.price}</p>
                                  </div>
                          </div>
                      </div>
                  </div>
                        `
                }).join('')
                $('#list_product_page').innerHTML=result;
            }
        });

        const btns_price =$('.btns_price');
        btns_price.forEach(btn=>{
            btn.onclick=async()=>{
                const max = Number(btn.value);
                
                $('#filter_price').classList.replace("hidden","flex");   
                
                $('#list_filter_price').style.display="none";    
                btn.checked=false;
                const { data: products } = await ProductApi.getAll();
                if(max==50){
                    $('#filter_price').firstElementChild.innerHTML=`Price: 0 - 50`;
                    var arr_product = products.filter(product=>Number(product.price)<=max);
                }else if(max==100){
                    $('#filter_price').firstElementChild.innerHTML=`Price: 50 - 100`;
                    var arr_product = products.filter(product=>Number(product.price)>=50&&Number(product.price)<=max);
                }
                const result=arr_product.map(product=>{
                    return `
                    <div class=" h-auto group overflow-hidden">
                    <a href="#/products/${product.id}">
                    <div class=" w-full h-96 bg-gray-500 bg-no-repeat bg-cover bg-center  "
                          style="background-image: url('${product.image}');">
                      </div>
                    </a>
                      <div class="text-center mt-5">
                      <a  class="text-md font-normal uppercase text-gray-500 ">${product.name}</a>    
                          <div class="flex mt-3">
                                  <div class="flex-1">
                                  <button class="border-b-2 border-black font-bold  text-sm add-to-cart focus:outline-none transform -translate-x-32 group-hover:translate-x-20 transition-all duration-500" data-id="${product.id}">ADD TO CARD</button>
                                  </div>
                                  <div class="flex-1">
                                  <p class="font-extrabold text-md transform -translate-x-16 group-hover:translate-x-40 transition-all duration-500">$${product.price}</p>
                                  </div>
                          </div>
                      </div>
                  </div>
                        `
                }).join('')
                $('#list_product_page').innerHTML=result;
                             
            }
        }) 

    }
}
export default SideBarProducts;