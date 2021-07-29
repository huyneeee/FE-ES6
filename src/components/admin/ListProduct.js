import ProductApi from '../../api/ProductApi.js';
import { reRender, $, CheckLogin, parseRequestUrl } from '../../utils.js';
const ListProduct = {
  async render() {
    // const { id } = parseRequestUrl(); 
    CheckLogin();
    const { data: products } = await ProductApi.getAll();
    return `
        <table class="items-center w-full bg-transparent border-collapse" >
        <thead>
          <tr>
            <th
              class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
              ID
            </th>
            <th
              class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
              Name 
            </th>
            <th
              class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
              Image
            </th>
            <th
              class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
              Price
            </th>
            <th
            class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
            Quantity
          </th>
          <th
          class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
          Status
        </th>
        <th
        class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
        Action
      </th>
          </tr>
        </thead>
        <tbody>
        ${products.map((product, index) => {
      return `
                <tr>
                <th
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                ${index}
                </th>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                ${product.name}
                </td>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                <div class="bg-cover bg-center w-20 h-20" style="background-image: url(${product.image})"></div>
                </td>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                ${product.price}
                </td>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                ${product.quantity}
                </td>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                ${product.status ? '<span class="text-green-500"><i class="fas fa-circle"></i> Stoking</span>' : '<span class="text-red-500"><i class="fas fa-circle"></i> Out of stockg</span>'}
                </td>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                <a href="/#/product/${product._id}/edit" class="btn btn-primary px-3 py-2 bg-blue-500 rounded text-white">Edit</a>
                <button href="/product/${product._id}" class="btn btn-remove btn-primary btn-remove px-3 py-2 bg-red-500 rounded text-white" data-id="${product._id}">Delete</button>
                </td>
            </tr>
            `
    }).join("")}
        
        </tbody>
      </table>
        `
  },
  async afterRender() {
    CheckLogin();
    const { _id: userId, role } = JSON.parse(localStorage.getItem('user'));
    const btns = $('#list-products .btn-remove');
    btns.forEach(btn => {
      const id = btn.dataset.id;
      btn.addEventListener('click', async function () {
        const question = confirm('Bạn có chắc chắn muốn xóa ?');
        if (question) {
          try {
            await ProductApi.remove(id, userId);
            await reRender(ListProduct, '#list-products')
          } catch (err) {
            alert(`${err.response.data.error}`);
          }
        }
      })
    })
  }
}
export default ListProduct;