import { reRender,$ } from '../../utils.js';
import BlogApi from '../../api/BlogApi.js';
import Sidebar from '../../components/admin/SideBar.js';
import ListBlog from '../../components/admin/ListBlogs.js';
import { validateEmpty, setError,setSuccess,validateFileImage} from '../../validation';
const AddBlogsPage = {
    async render() {
        const { data: blog } = await BlogApi.getAll();
        const newid=blog.length+1;
        return `
        ${Sidebar.render()}
        <div class="relative md:ml-64 bg-gray-100">
        <div class="px-4 md:px-10 mx-auto w-full h-full">
            <div class="flex flex-wrap">
                <div class="w-full xl:w-12/12 mb-12 xl:mb-0 px-4 mt-8">
                    <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                    <h1 class="text-center uppercase text-2xl font-bold my-4">Add Blog</h1>
                    <form id="form-add-blog">
                    <div class="shadow overflow-hidden sm:rounded-md">
                    <div class="px-4 py-5 bg-white sm:p-6">
                        <div class="grid grid-cols-6 gap-6">

                            <div class="col-span-6 sm:col-span-3 lg:col-span-2 hidden">
                            <label  class="block text-sm font-medium text-gray-700">ID </label>
                            <input type="text" disabled  id="id_blog" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value="${newid}">
                         </div>

                         <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                            <label  class="block text-sm font-medium text-gray-700">Name</label>
                            <div class="relative">
                                <input type="text"   id="name_blog" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <span class="err absolute right-3 top-3 text-xs "></span>
                            </div>
                         </div>

                         <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                            <label  class="block text-sm font-medium text-gray-700">Image </label>
                            <div class="relative">
                                <input type="file"   id="image_blog" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <span class="err absolute right-3 top-3 text-xs "></span>
                            </div>
                         </div>
            
                        <div class="col-span-6 ">
                            <label class="block text-sm font-medium text-gray-700">Content</label>
                            <div class="relative">
                                <textarea name="" id="content" cols="30" rows="5"class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" ></textarea>
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
        const name_blog = $('#name_blog');
        const image_blog = $('#image_blog');
        const content = $('#content');
        const { _id : userId } = JSON.parse(localStorage.getItem('user'));
        const inputName =name_blog.onchange= ()=>{
            if(validateEmpty(name_blog.value)){
                setError(name_blog,'Không được để trống!');
            }else{
                setSuccess(name_blog);
                return true;
            }
        }
        const inputImage =image_blog.onchange= ()=>{
            if(validateEmpty(image_blog.value)){
                setError(image_blog,'Không được để trống!');
            }else{
                if(validateFileImage(image_blog.files[0])==true){
                    setSuccess(image_blog);
                    return true;
                }else{
                    setError(image_blog,'File không đúng định dạng!');
                }
            }
        }
        const inputContent = content.onchange= ()=>{
            if(validateEmpty(content.value)){
                setError(content,'Không được để trống!');
            }else{
                setSuccess(content);
                return true;
            }
        }
        $('#form-add-blog').addEventListener('submit',e => {
            e.preventDefault();
            if(inputName()==true&&inputImage()==true&&inputContent()==true){
                let image_blog = $('#image_blog').files[0];   
                let storageRef =  firebase.storage().ref(`images/${image_blog.name}`);
                storageRef.put(image_blog).then(function(){
                    storageRef.getDownloadURL().then(async(url)=>{
                        const blog = {
                        name:$('#name_blog').value,
                        image:url,
                        content:$('#content').value
                    }
                    try{
                        await BlogApi.add(blog,userId);
                        alert('Thêm bài viết thành công!');
                        window.location.hash='#/listblogs';
                        await reRender(ListBlog,'#list-blogs');
                    }catch(error){
                        alert(`${error.response.data.error}`);
                    }
                    })
                })
            }
            
            
        })
    }
}
export default AddBlogsPage;