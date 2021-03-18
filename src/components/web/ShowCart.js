
const ShowCart = {
    async render(){
        const arr_product_cart = JSON.parse(localStorage.getItem('arr_product_cart'));   
        if(arr_product_cart!=null){
            var subtotal = arr_product_cart.reduce( ( sum, { sl,price } ) => sum + sl*price , 0);        
        }
        if(arr_product_cart){
            return `
            <div class="flex w-full px-24 h-auto my-10" id="cart">
            <div class="w-2/3 h-auto flex-col ">
                <p class="text-left text-lg font-normal uppercase py-4">shopping cart</p>
                    <table class="table-fixed border-collapse border border-gray-400 w-full mb-5" >
                    <thead>
                        <tr class="uppercase tracking-widest ">
                            <th class="border border-gray-300 py-4 w-2/3 font-semibold text-sm ">Item</th>
                            <th class="border border-gray-300 py-4 px-6 w-1/9 font-semibold text-sm">qty</th>
                            <th class="border border-gray-300 py-4 px-2 w-1/9 font-semibold text-sm">SUM</th>
                            <th class="border border-gray-300 py-4 px-2 w-1/9 font-semibold text-sm">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${arr_product_cart.map((product,index)=>{
                            return `
                                <tr>
                                <td class=" p-4 flex  border-b border-gray-300">
                                    <div class="bg-cover bg-center w-1/4 h-24 mr-3 " style="background-image: url(${product.image})"></div>
                                    <div class="row w-3/4">
                                    <a href="#/products/${product.id}" class="w-full text-md font-normal  text-gray-900">${product.name}</a>
                                    <p class="w-full text-md font-bold  text-gray-900 mt-3">$${product.price}</p>
                                    </div>
                                </td>
                                <td class="border border-gray-300 text-center">
                                    <div class="flex flex-col ">
                                        <div><button data-id="${product.id}" class="btn_up_qty focus:outline-none"><i class="fas fa-caret-up text-4xl"></i></button></div>
                                        <div>${product.sl}</div>
                                        <div><button data-id="${product.id}" class="btn_down_qty focus:outline-none"><i class="fas fa-caret-down text-4xl"></i></button></div>
                                    </div>
                                </td>
                                <td class="border border-gray-300 text-center">$${product.price*product.sl}</td>
                                <td class="border border-gray-300 text-center"><button class="remove-product-cart focus:outline-none" data-id="${product.id}"><i class="fas fa-trash text-2xl"></i></button></td>
                                </tr>
                            `
                        }).join('')}
                    </tbody>
                </table>
                <a href="#/products" class="px-6 py-3 uppercase bg-black border-none text-white w-1/4 mt-5">CONTINUE SHOPPING</a>
            </div>
            <div class="w-1/3  h-auto tracking-widest px-10">
                <p class="text-left text-lg font-semibold uppercase py-4">summary</p>
                <table class="table-fixed border-collapse border border-gray-400 w-full text-left">
                    <thead>
                    <tr class=" tracking-widest text-gray-500 ">
                        <th class="border border-gray-300 p-4 w-2/3 font-semibold text-sm ">Subtotal</th>
                        <th class="border border-gray-300 p-4 w-1/3 font-semibold text-sm">$<b>${subtotal?subtotal:''}</b></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td class="border border-gray-300 font-semibold text-sm p-4">Shipping</td>
                        <td class="border border-gray-300 p-4 w-1/3 font-semibold text-sm text-gray-500">$0</td>
                    </tr>
                    <tr class=" tracking-widest text-gray-500 ">
                        <td class="border border-gray-300 font-semibold text-sm p-4">Order Total</td>
                        <td class="border border-gray-300 p-4 w-1/3 font-bold text-sm text-gray-900">$<b>${subtotal?subtotal:''}</b></td>
                    </tr>
                    </tbody>
                </table>
                ${arr_product_cart ? '<a href="#/checkout" class=" flex justify-center px-6 py-3 uppercase bg-black border-none text-white w-full mt-5">PROCEED TO CHECKOUT</a>' : ''} 
            </div>
        </div>     
                  `
        } 
    }
}
export default ShowCart;