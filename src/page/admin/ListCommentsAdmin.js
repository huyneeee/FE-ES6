import { reRender, $ } from "../../utils";
import SideBar from '../../components/admin/SideBar.js';
import ListComments from '../../components/admin/ListComments';
import CommentApi from '../../api/CommentApi';
import ProductApi from '../../api/ProductApi';
import UserApi from '../../api/UserApi';
const ListCommentsAdmin = {
    async render() {
        // const { data: products } = await ProductApi.getAll();
        // const { data: commemts } = await CommentApi.getAll();

        // const arr_id_product = commemts.map(cmt => cmt.id_product).reduce((acc, curent) => {
        //     return acc.includes(curent) ? acc : [...acc, curent];
        // }, [])
        // console.log(arr_id_product);
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
                          List Comments
                        </h3>
                      </div>
                    </div>
                  </div>
                        <div class="block w-full overflow-x-auto" >
                            <!-- Projects table -->
                            ${await ListComments.render()}
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
      <table class="items-center w-full bg-pink-200 border-collapse mt-10">
      <thead>
                <tr>
                    <th
                    class="px-6 text-gray-600 align-middle border border-solid border-white py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                    STT
                    </th>
                    <th
                    class="px-6 text-gray-600 align-middle border border-solid border-white py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                    User Comment
                    </th>
                    <th
                    class="px-6  text-gray-600 align-middle border border-solid border-white py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                    Content
                    </th>
                    <th
                    class="px-6 text-gray-600 align-middle border border-solid border-white py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                    Date
                    </th>
                    <th
                    class="px-6 text-gray-600 align-middle border border-solid border-white py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                    Action
                    </th>
                </tr>
            </thead>
            <tbody id="list_comment_detail"></tbody>
      </table>
    </div>  
        `
    },
    async afterRender() {
        await SideBar.afterRender();
        const btns = $('#list_order .btn_detail');
        const modal_order_detail = $('#modal_order_detail');
        const btn_delete = $('#btn_delete');
        //hi???n modal
        btns.forEach(btn => {
            btn.onclick = async () => {
                $('#nav').classList.add('blur-md');
                $('#main').classList.add('blur-md');
                modal_order_detail.classList.remove('hidden');
                modal_order_detail.classList.add('flex');
                const id = btn.dataset.id;
                const { data: comments } = await CommentApi.getAll();
                const comment_by_product = comments.filter(comment => comment.id_product === id);

                const model = comment_by_product.map((ele, index) => {

                    return `    
                    <tr>
                          <th
                          class="border-t-0 px-6  align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                          ${index}
                          </th>
                          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                          ${ele.id_user}
                          </td>
                          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm  whitespace-no-wrap p-4">
                          ${ele.content}
                          </td>
                          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0  text-xs whitespace-no-wrap p-4">
                          ${ele.createdAt.slice(0, 10)}
                          </td>
                          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0  text-xs whitespace-no-wrap p-4">
                          <button  class="btn btn-remove  px-3 py-2 bg-red-500 rounded text-white" data-id="${ele._id}">Delete</button>
                          </td>
                          
                    </tr>
                  `
                }).join('')
                $('#list_comment_detail').innerHTML = model ? model : '<p class="my-5 text-center">S???n ph???m ch??a c?? l?????t comment n??o c??? !</p>';
                //x??a comment
                const btn_remove = document.querySelectorAll('#list_comment_detail .btn-remove');
                const { _id: userId } = JSON.parse(localStorage.getItem('user'));
                btn_remove.forEach(btn => {
                    btn.onclick = async () => {
                        const id = btn.dataset.id;
                        const question = confirm('B???n c?? ch???c ch???n mu???n x??a ?');
                        if (question) {
                            try {
                                await CommentApi.remove(id, userId);
                                window.location.hash = '#/listcomments';
                                modal_order_detail.classList.add('hidden');
                                modal_order_detail.classList.remove('flex');
                                $('#main').classList.remove('blur-md');
                                $('#nav').classList.remove('blur-md');
                            } catch (error) {
                                alert(`${error.response.data.error}`);
                            }

                        }
                    }
                })

            }
            // ???n modal    
            btn_delete.onclick = () => {
                modal_order_detail.classList.remove('flex');
                $('#main').classList.remove('blur-md');
                modal_order_detail.classList.add('hidden');
                $('#nav').classList.remove('blur-md');
            }
        });
    }
}
export default ListCommentsAdmin;