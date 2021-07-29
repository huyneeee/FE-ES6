import { reRender,$, parseRequestUrl } from '../../utils.js';
import CategoryApi from '../../api/CategoryApi.js';
import Sidebar from '../../components/admin/SideBar.js';
import ListCategory from '../../components/admin/ListCategory.js';
import { validateEmpty,validateFileImage, setError,setSuccess} from '../../validation';
const AddCategoryPage = {
    async render() {
        return `
        ${Sidebar.render()}
        <div class="relative md:ml-64 bg-gray-100">
        <div class="px-4 md:px-10 mx-auto w-full h-full">
            <div class="flex flex-wrap">
                <div class="w-full xl:w-12/12 mb-12 xl:mb-0 px-4 mt-8">
                    <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                    <h1 class="text-center uppercase text-2xl font-bold my-4">Add Category</h1>
                    <form id="form-add-category">
                    <div class="shadow overflow-hidden sm:rounded-md">
                    <div class="px-4 py-5 bg-white sm:p-6">
                        <div class="grid grid-cols-6 gap-6">

                         <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                            <label  class="block text-sm font-medium text-gray-700">Name</label>
                            <div class="relative">
                                <input type="text"   id="name_category" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <span class="err absolute right-3 top-3 text-xs "></span>
                            </div>
                         </div>


                         <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                            <label  class="block text-sm font-medium text-gray-700">Image </label>
                            <div class="relative">
                                <input type="file"   id="image_category" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
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
        const name_category=$('#name_category');
        const image=$('#image_category');
        const description=$('#description');
        const { _id:userId ,role} = JSON.parse(localStorage.getItem('user'));
        const inputNameCate =name_category.onchange= ()=>{
            if(validateEmpty(name_category.value)){
                setError(name_category,'Không được để trống!');
            }else{
                setSuccess(name_category);
                return true;
            }
        }
        const inputImage =image.onchange= ()=>{
            if(validateEmpty(image.value)){
                setError(image,'Không được để trống!');
            }else{
                if(validateFileImage(image.files[0])==true){
                    setSuccess(image);
                    return true;
                }else{
                    setError(image,'File không đúng định dạng!');
                }
                
            }
        }
        const inputDescription = description.onchange= ()=>{
            if(validateEmpty(description.value)){
                setError(description,'Không được để trống!');
            }else{
                setSuccess(description);
                return true;
            }
        }
        $('#form-add-category').addEventListener('submit',async e => {
            e.preventDefault();  
                    
            if(inputNameCate()==true && inputImage()==true && inputDescription()==true){
                 let image_category = $('#image_category').files[0];
            
            let storageRef =  firebase.storage().ref(`images/${image_category.name}`);
            storageRef.put(image_category).then(function(){
                storageRef.getDownloadURL().then(async(url)=>{
                    const category = {
                    name:$('#name_category').value,
                    image:url,
                    description:$('#description').value,
                }
                
                try{    
                    await CategoryApi.add(category,userId);
                    alert('Thêm danh mục thành công!');
                    window.location.hash='#/listcategory';
                    await reRender(ListCategory,'#list-category');
                }catch (err){
                    console.log(err.response.data);
                    alert(''+err.response.data.error);
                    window.location.hash = '#/listcategory';
                     await reRender(ListCategory,'#list-category');
                }
                })
            })
            }
        })
                    
    }
}
export default AddCategoryPage;