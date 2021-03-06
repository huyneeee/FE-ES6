import { $, reRender,parseRequestUrl } from '../../utils.js';
import ProductApi from '../../api/ProductApi.js';
import Sidebar from '../../components/admin/SideBar.js';
import CategoryApi from '../../api/CategoryApi.js';
import ListProduct from '../../components/admin/ListProduct';
import { validateEmpty, setError, setSuccess, validateFileImage } from '../../validation';
import Error404Page from '../web/404';
const AddProductPage = {
    async render() {
        const { data: category } = await CategoryApi.getAll();
        return `
                ${Sidebar.render()}
                <div class="relative md:ml-64 bg-gray-100">
                <div class="px-4 md:px-10 mx-auto w-full h-full">
                    <div class="flex flex-wrap">
                        <div class="w-full xl:w-12/12 mb-12 xl:mb-0 px-4 mt-8">
                            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                            <h1 class="text-center uppercase text-2xl font-bold my-4">Add Product</h1>
                            <form id="form-add-product">
                            <div class="shadow overflow-hidden sm:rounded-md">
                            <div class="px-4 py-5 bg-white sm:p-6">
                                <div class="grid grid-cols-6 gap-6">

                                    <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                        <label  class="block text-sm font-medium text-gray-700">Name</label>
                                        <div class="relative">
                                            <input type="text"   id="name_product" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <span class="err absolute right-3 top-3 text-xs "></span>
                                        </div>
                                    </div>

                                    <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                        <label  class="block text-sm font-medium text-gray-700">Image </label>
                                        <div class="relative">
                                            <input type="file"   id="image_product" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" ">
                                            <span class="err absolute right-3 top-3 text-xs "></span>
                                        </div>
                                    </div>
                    
                                    <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                        <label class="block text-sm font-medium text-gray-700">Quantity</label>
                                        <div class="relative">
                                            <input type="number" id="quantity_product"  class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <span class="err absolute right-3 top-3 text-xs "></span>
                                        </div>
                                    </div>

                                    <div class="col-span-6 sm:col-span-3">
                                        <label class="block text-sm font-medium text-gray-700">Price</label>
                                        <div class="relative">
                                            <input type="number" id="price_product"  class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <span class="err absolute right-3 top-3 text-xs "></span>
                                        </div>
                                    </div>
                    
                                    <div class="col-span-6 sm:col-span-3">
                                    <label  class="block text-sm font-medium text-gray-700">Category</label>
                                        <div class="relative">
                                            <select id="cate_id"  class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            ${category.map(cate => {
            return `
                                                    <option value="${cate._id}">${cate.name}</option>
                                                `
        }).join('')}
                                                </select>
                                            <span class="err absolute right-3 top-3 text-xs "></span>
                                        </div>
                                    </div>

                                    <div class="col-span-6 ">
                            <label class="block text-sm font-medium text-gray-700">Description</label>
                            <div class="relative">
                                <textarea name="" id="description" cols="30" rows="5"class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" ></textarea>
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
    },
    async afterRender() {
        const name_product = $('#name_product');
        const image_product = $('#image_product');
        const quantity_product = $('#quantity_product');
        const price_product = $('#price_product');
        const cate_id = $('#cate_id');
        const description = $('#description');
        const { _id:userId ,role} = JSON.parse(localStorage.getItem('user'));
        const inputName = name_product.onchange = () => {
            if (validateEmpty(name_product.value)) {
                setError(name_product, 'Kh??ng ???????c ????? tr???ng!');
            } else {
                setSuccess(name_product);
                return true;
            }
        }


        const inputImage = image_product.onchange = () => {
            if (validateEmpty(image_product.value)) {
                setError(image_product, 'Kh??ng ???????c ????? tr???ng!');
            } else {
                if (validateFileImage(image_product.files[0]) == true) {
                    setSuccess(image_product);
                    return true;
                } else {
                    setError(image_product, 'File kh??ng ????ng ?????nh d???ng!');
                }

            }
        }

        const inputQuantity = quantity_product.onchange = () => {
            if (validateEmpty(quantity_product.value)) {
                setError(quantity_product, 'Kh??ng ???????c ????? tr???ng!');
            } else {
                if (quantity_product.value <= 0) {
                    setError(quantity_product, 'Kh??ng ???????c ????? s??? ??m!');
                } else {
                    setSuccess(quantity_product);
                    return true;
                }

            }
        }
        const inputPrice = price_product.onchange = () => {
            if (validateEmpty(price_product.value)) {
                setError(price_product, 'Kh??ng ???????c ????? tr???ng!');
            } else {
                if (price_product.value <= 0) {
                    setError(price_product, 'Kh??ng ???????c ????? s??? ??m!');
                } else {
                    setSuccess(price_product);
                    return true;
                }
            }
        }
        $('#form-add-product').addEventListener('submit', async e => {
            e.preventDefault();
            if (inputName() == true && inputImage() == true && inputQuantity() == true && inputPrice() == true) {
                let image_product = $('#image_product').files[0];
                let storageRef = firebase.storage().ref(`images/${image_product.name}`);
                storageRef.put(image_product).then(function () {
                    storageRef.getDownloadURL().then(async (url) => {
                        const product = {
                            name: name_product.value,
                            image: url,
                            price: price_product.value,
                            quantity: quantity_product.value,
                            cate_id: cate_id.value,
                            status: true,
                            description: description.value
                        }
                        try{    
                            await ProductApi.add(product,userId);
                            window.location.hash='#/listproduct';
                            await reRender(ListProduct,'#list-products');
                        }catch (err){
                            alert(`${err.response.data.error}`);
                        }
                    })
                })
            }
        })
    }
}
export default AddProductPage;