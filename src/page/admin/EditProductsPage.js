import { reRender, $, parseRequestUrl } from '../../utils.js';
import ProductApi from '../../api/ProductApi.js';
import Sidebar from '../../components/admin/SideBar.js';
import CategoryApi from '../../api/CategoryApi.js';
import ListProduct from '../../components/admin/ListProduct';
import { validateEmpty, validateFileImage, setError, setSuccess } from '../../validation';
const EditProductsPage = {
    async render() /*html*/ {
        const { id } = parseRequestUrl();
        const { data: product } = await ProductApi.get(id);
        const { data: category } = await CategoryApi.getAll();
        return `
        ${Sidebar.render()}
        <div class="relative md:ml-64 bg-gray-100">
        <div class="px-4 md:px-10 mx-auto w-full h-full">
            <div class="flex flex-wrap">
                <div class="w-full xl:w-12/12 mb-12 xl:mb-0 px-4 mt-8">
                    <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                    <h1 class="text-center uppercase text-2xl font-bold my-4">Edit Product</h1>
                    <form id="form-edit-product">
                    <div class="shadow overflow-hidden sm:rounded-md">
                    <div class="px-4 py-5 bg-white sm:p-6">
                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 sm:col-span-3 lg:col-span-3 hidden">
                            <label  class="block text-sm font-medium text-gray-700">ID </label>
                            <input type="text" disabled  id="id_product" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value="${id}">
                         </div>
                         <div class="col-span-6 sm:col-span-3 lg:col-span-3">
                                <label  class="block text-sm font-medium text-gray-700">Name</label>
                                <div class="relative">
                                    <input type="text"   id="name_product" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value="${product.name}">
                                    <span class="err absolute right-3 top-3 text-xs "></span>
                                </div>
                         </div>

                         <div class="col-span-6 ">
                            <label  class="block text-sm font-medium text-gray-700">Image </label>

                            <div class="bg-cover bg-center w-40 h-40" style="background-image: url(${product.image})"></div>
                            <input type="hidden" value="${product.image}" id="old_image">
                            <div class="relative">
                                <input type="file"   id="image_product" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" >
                                <span class="err absolute right-3 top-3 text-xs "></span>
                            </div>
                         </div>
                                   
                        <div class="col-span-6 sm:col-span-3">
                            <label class="block text-sm font-medium text-gray-700">Quantity</label>
                            <div class="relative">
                                <input type="number" id="quantity_product"  class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"value="${product.quantity}">
                                <span class="err absolute right-3 top-3 text-xs "></span>
                            </div>
                        </div>

                        <div class="col-span-6 sm:col-span-3">
                            <label class="block text-sm font-medium text-gray-700">Price</label>
                            <div class="relative">
                                <input type="number" id="price_product"  class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value="${product.price}">
                                <span class="err absolute right-3 top-3 text-xs "></span>
                            </div>
                        </div>
            
                        <div class="col-span-6 ">
                        <label  class="block text-sm font-medium text-gray-700">Category</label>
                        <select id="cate_id"  class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            ${category.map(cate => {
            return `
                                    <option ${cate._id === product.cate_id ? 'selected' : ''} value="${cate._id}">${cate.name}</option>
                                `
        }).join('')}
                        </select>
                    </div>
                    <div class="col-span-6 ">
                    <label  class="block text-sm font-medium text-gray-700">Status</label>
                    <div id="status">
                        <input type="radio" name="status" class="status" checked value="true"> Stocking
                        <input type="radio" name="status" class="status" value=""> Out of stock
                    </div> 
                </div>
                <div class="col-span-6 ">
                <label class="block text-sm font-medium text-gray-700">Description</label>
                <div class="relative">
                    <textarea name="" id="description" cols="30" rows="5"class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" >${product.description}</textarea>
                    <span class="err absolute right-3 top-3 text-xs "></span>
                </div>
            </div>
                        </div>
                    </div>
                    <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Save
                        </button>
                    </div>
                    </div>
                </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `
    }
    ,
    async afterRender() {
        const name_product = $('#name_product');
        const quantity_product = $('#quantity_product');
        const price_product = $('#price_product');
        const description = $('#description');
        const { _id: userId, role } = JSON.parse(localStorage.getItem('user'));
        const { id } = parseRequestUrl();
        const inputName = name_product.onchange = () => {
            if (validateEmpty(name_product.value)) {
                setError(name_product, 'Không được để trống!');
            } else {
                setSuccess(name_product);
                return true;
            }
        }
        const inputdescription = description.onchange = () => {
            if (validateEmpty(description.value)) {
                setError(description, 'Không được để trống!');
            } else {
                setSuccess(description);
                return true;
            }
        }
        const inputQuantity = quantity_product.onchange = () => {
            if (validateEmpty(quantity_product.value)) {
                setError(quantity_product, 'Không được để trống!');
            } else {
                if (quantity_product.value <= 0) {
                    setError(quantity_product, 'Không được để số âm!');
                } else {
                    setSuccess(quantity_product);
                    return true;
                }

            }
        }
        const inputPrice = price_product.onchange = () => {
            if (validateEmpty(price_product.value)) {
                setError(price_product, 'Không được để trống!');
            } else {
                if (price_product.value <= 0) {
                    setError(price_product, 'Không được để số âm!');
                } else {
                    setSuccess(price_product);
                    return true;
                }
            }
        }
        $('#form-edit-product').addEventListener('submit', async e => {
            e.preventDefault();
            var value_status;
            const status = $('.status');
            for (let i = 0; i < status.length; i++) {
                if (status[i].checked) {
                    value_status = Boolean(status[i].value);
                    break;
                }
            }
            if (inputName() == true && inputQuantity() == true && inputPrice() == true && inputdescription() == true) {
                let image_product = $('#image_product').files[0];
                if (image_product) {
                    if (validateFileImage(image_product) == true) {
                        setSuccess($('#image_product'));
                        let storageRef = firebase.storage().ref(`images/${image_product.name}`);
                        storageRef.put(image_product).then(function () {
                            storageRef.getDownloadURL().then(async (url) => {
                                const product = {

                                    name: name_product.value,
                                    image: url,
                                    price: price_product.value,
                                    quantity: quantity_product.value,
                                    cate_id: $('#cate_id').value,
                                    status: true,
                                    description: description.value
                                }
                                try {
                                    await ProductApi.edit(id, product, userId)
                                    alert('Sửa hàng hóa thành công');
                                    window.location.hash = '#/listproduct';
                                    await reRender(ListProduct, '#list-products')
                                } catch ( err ) {
                                    alert(`${err.response.data.error}`);
                                }

                            })
                        })
                    } else {
                        setError($('#image_product'), 'File không đúng định dạng!');
                    }
                } else {
                    const product = {
                        name: $('#name_product').value,
                        image: $('#old_image').value,
                        quantity: $('#quantity_product').value,
                        price: $('#price_product').value,
                        cate_id: $('#cate_id').value,
                        status: value_status,
                        description: description.value
                    }
                    try {
                        await ProductApi.edit(id, product, userId)
                        alert('Sửa hàng hóa thành công');
                        window.location.hash = '#/listproduct';
                        await reRender(ListProduct, '#list-products')
                    } catch (err ){
                        alert(`${err.response.data.error}`);
                    }
                }
            }

        })
    }
}
export default EditProductsPage;