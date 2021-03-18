import { $ } from '../../utils.js';
const HeaderHome = {
    render() {
        const user = JSON.parse(localStorage.getItem('user'));
        const arr_product_cart = JSON.parse(localStorage.getItem('arr_product_cart'));   
        if(arr_product_cart!=null){
            var subtotal = arr_product_cart.reduce( ( sum, { sl,price } ) => sum + sl*price , 0);        
        }
        return `
                <!-- navbar-->
                <div id="nav_bar" class="grid grid-cols-3  place-content-center h-24 place-items-center border-b border-gray-200  box-border px-24 relative">
                    <div class="self-center w-full ">
                        <p class="text-md uppercase tracking-wide pb-3">wellcome to huyneeee!</p>
                    </div>
                    <div class="self-center w-full text-center">
                        <p class="font-semibold uppercase tracking-wide pb-3">Logo</p>
                    </div>
                    <div class="self-center w-full text-right ">
                        <ul>
                            <li class="uppercase relative">   
                            ${user ? `
                                        <button id="btn_dropdown"class="focus:outline-none">
                                            <img class="inline-block h-9 w-9 rounded-full ring-2 ring-white mr-6" src="${user.avatar}" alt="">
                                        </button>
                                        <ul id="menu_dropdown" class="border border-gray-400  absolute right-32 top-10 z-10 hidden" >
                                            
                                            ${user.role === 'admin' ? `<li class="px-4 py-2 text-sm text-center border-b border-gray-400"><i class="fas fa-user-alt mr-2"></i><button id="btn_admin"class="focus:outline-none">Admin</button></li>` : ``}

                                            <li class="px-4 py-2 text-sm">
                                            <i class="fas fa-sign-out-alt mr-2"></i><button class="focus:outline-none" id="logout">Logout</button>
                                            </li>
                                        </ul>`
                : '<a href="#/login"class="font-thin text-sm mr-6">Log in</a>'}      
                                
                                <button id="btn_review_cart" class="font-thin text-md font-semibold mr-6 focus:outline-none ">Cart(${arr_product_cart ? arr_product_cart.length : '0'})</button>
                                <div class="w-82 h-auto border border-black bg-white absolute z-10 right-0 top-12 px-10 py-5 hidden" id="review_cart">
                                    <div class="absolute top-0 right-2">
                                    <button class="focus:outline-none" id="cancel"><i class="fas fa-times text-xl"></i></button>
                                    </div>                          
                                        ${arr_product_cart ? `
                                        <div class="flex text-sm">
                                        <div class="flex-1 text-left">${arr_product_cart ? `<b>${arr_product_cart.length}</b>` : '0'} Items</div>
                                        <div class="flex-1 text-right">Subtotal:<b>$${subtotal ? subtotal : ''}</b></div>
                                    </div>
                                    <a href="#/checkout" class="flex justify-center px-6 py-2 text-sm uppercase bg-black border-none text-white w-full mt-5">PROCEED TO CHECKOUT</a>
                                    <hr class="my-3 text-gray-400">
                                    <table class="table-fixed  w-full">
                                        <tbody>
                                        <tr>
                                            ${arr_product_cart.map(product => {
                                                return `
                                                    <td class="flex my-1">
                                                    <div class="bg-cover bg-center w-1/4 h-18 mr-3 relative" style="background-image: url(${product.image})">
                                                    <div class="absolute top-1 right-1 text-white text-xs rounded-full h-4 w-4 bg-red-500 flex items-center justify-center">${product.sl}</div>
                                                    </div>
                                                    <div class="w-3/4">
                                                    <p class=" text-sm text-left font-semibold text-gray-500">${product.name}</p>
                                                    <p class="w-full text-sm text-left font-bold  text-gray-900 mt-1">$${product.price}</p>
                                                    </div>
                                                    </td>
                                                `
                                                 }).join('')
                                            }
                                        </tr>
                                        </tbody>
                                    </table>
                                    <hr class="my-3 text-gray-400">
                                    <a href="#/cart" class=" flex justify-center px-6 py-2 uppercase bg-black border-none text-white w-full mt-5">VIEW AND EDIT CART</a>
                                        ` : '<p class="text-center text-sm">Bạn chưa có sản phẩm nào trong giỏ hàng !</p>'}   
                                </div>
                                <a href=""class="font-thin text-sm mr-6"><i class="fas fa-search"></i></a>
                                <a href=""class="font-thin text-sm "><i class="fas fa-bars"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            `
    },
    async afterRender() {
        // click review_cart 
        const review_cart = $('#review_cart');
        const btn_review_cart = $('#btn_review_cart');
        btn_review_cart.onclick = () => {
            if (review_cart.style.display === "none") {
                review_cart.style.display = "block";
                $('#cancel').onclick = () => {
                    review_cart.style.display = "none";
                }
            } else {
                review_cart.style.display = "none";
            }
        }
        // click admin and logout
        const logout = $('#logout');
        const menu_dropdown = $('#menu_dropdown');
        const btn_dropdown = $('#btn_dropdown');
        $('#nav_bar').style.backgroundColor = "#f6f6f6";
        btn_dropdown.onclick = () => {
            if (menu_dropdown.style.display === "none") {
                menu_dropdown.style.display = "block";
            } else {
                menu_dropdown.style.display = "none";
            }
        }
        logout.onclick = () => {
            localStorage.removeItem('user');
            window.location.hash='#/login'; 
        }
        $('#btn_admin').onclick = () => {
            // window.location.replace('#/listproduct')
            window.location.hash='#/listproduct';
        }
    }
}
export default HeaderHome;