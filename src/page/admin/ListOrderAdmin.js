import SideBar from '../../components/admin/SideBar.js';
import ListOrder from '../../components/admin/ListOrder.js';
import {$} from '../../utils'
import OrderDetailNewApi from '../../api/OrderDetailNewApi.js';
const ListOrderAdmin = {
    async render()  {
        return `
        ${SideBar.render()}
        <div class="relative md:ml-64 bg-gray-100" id="main">
            <div class="px-4 md:px-10 mx-auto w-full h-full">
                <div class="flex flex-wrap">
                    <div class="w-full xl:w-12/12 mb-12 xl:mb-0 px-4 mt-8">
                        <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                        <div class="rounded-t mb-0 px-4 py-3 border-0">
                        <div class="flex flex-wrap items-center">
                          <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 class="font-semibold text-base text-gray-800">
                              List Order
                            </h3>
                          </div>
                        </div>
                      </div>
                            <div class="block w-full overflow-x-auto" >
                                <!-- Projects table -->
                                ${await ListOrder.render()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- modal -->
        <div class="hidden w-9/12 h-auto bg-gray-100 border border-gray-300 rounded absolute top-20 z-10 left-40" id="modal_order_detail">
          <div class="absolute right-3 top-2 ">
              <button id="btn_delete" class="focus:outline-none"><i class="fas fa-times text-3xl"></i></button>
          </div>
          <table class="items-center w-full bg-red-300 border-collapse mt-10">
          <thead>
                    <tr>
                        <th
                        class="px-6 bg-red-300 text-gray-600 align-middle border border-solid border-white py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        ID Order 
                        </th>
                        <th
                        class="px-6 bg-red-300 text-gray-600 align-middle border border-solid border-white py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        Name Product
                        </th>
                        <th
                        class="px-6 bg-red-300 text-gray-600 align-middle border border-solid border-white py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        Image
                        </th>
                        <th
                        class="px-6 bg-red-300 text-gray-600 align-middle border border-solid border-white py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        Price
                        </th>
                        <th
                        class="px-6 bg-red-300 text-gray-600 align-middle border border-solid border-white py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-cư">
                        Quantity
                        </th>
                    </tr>
                </thead>
                <tbody id="list_order_detail"></tbody>
          </table>
        </div>        
        `
    },
    async afterRender() {
      await SideBar.afterRender();
      await ListOrder.afterRender();
      const btns=$('#list_order .btn_detail');
      const modal_order_detail =$('#modal_order_detail');
      const btn_delete =$('#btn_delete');
     btns.forEach(btn => {
        btn.onclick= async ()=>{
            $('#nav').classList.add('blur-md');
            $('#main').classList.add('blur-md');
            modal_order_detail.classList.remove('hidden');
            modal_order_detail.classList.add('flex');
            const id=btn.dataset.id;
            // const { data : order_detail } = await OrderDetailNewApi.getAll();
            // const arr_order_detail_by_id=order_detail.filter(order=>order.id_order===id);
            const { data : arr_order_detail_by_id } = await OrderDetailNewApi.getOrderDetailByIdOrder(id)
            const model = arr_order_detail_by_id.map(ele=>{
                  return `    
                    <tr>
                          <th
                          class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                          ${ele.id_order}
                          </th>
                          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                          ${ele.name}
                          </td>
                          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                          <div class="bg-cover bg-center w-20 h-20" style="background-image: url(${ele.image})"></div>
                          </td>
                          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                          ${ele.price}
                          </td>
                          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-center text-xs whitespace-no-wrap p-4">
                          ${ele.sl}
                          </td>
                    </tr>
                  `
              }).join('')
              $('#list_order_detail').innerHTML=model;
            }             
        btn_delete.onclick=()=>{
            modal_order_detail.classList.remove('flex');
            $('#main').classList.remove('blur-md');
            modal_order_detail.classList.add('hidden');
            $('#nav').classList.remove('blur-md');
        }
     });
  }
}  
export default ListOrderAdmin;