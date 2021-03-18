import { reRender, $ , parseRequestUrl } from '../../utils.js';
import BlogApi from '../../api/BlogApi.js';
import Sidebar from '../../components/admin/SideBar.js';
import ListBlogs from '../../components/admin/ListBlogs';
import { validateEmpty, setError,setSuccess,validateFileImage} from '../../validation';
const EditBlogsPage = {
    async render() /*html*/ {
        const { id } = parseRequestUrl();
        const { data: blog } = await BlogApi.get(id);
        return `
        ${Sidebar.render()}
        <div class="relative md:ml-64 bg-gray-100">
        <div class="px-4 md:px-10 mx-auto w-full h-full">
            <div class="flex flex-wrap">
                <div class="w-full xl:w-12/12 mb-12 xl:mb-0 px-4 mt-8">
                    <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                    <h1 class="text-center uppercase text-2xl font-bold my-4">Edit Blog</h1>
                    <form id="form-edit-blog">
                    <div class="shadow overflow-hidden sm:rounded-md">
                    <div class="px-4 py-5 bg-white sm:p-6">
                        <div class="grid grid-cols-6 gap-6">

                         <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                            <label  class="block text-sm font-medium text-gray-700">Name</label>
                            <div class="relative">
                                <input type="text"   id="name" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value="${blog.name}">
                                <span class="err absolute right-3 top-3 text-xs "></span>
                             </div>
                         </div>

                         
                         <div class="col-span-6 ">
                            <label  class="block text-sm font-medium text-gray-700">Image </label>
                            <div class="bg-cover bg-center w-40 h-40" style="background-image: url(${blog.image})"></div>
                            <input type="hidden" value="${blog.image}" id="old_image">
                            <div class="relative">
                            <input type="file" id="image" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" >
                            <span class="err absolute right-3 top-3 text-xs "></span>
                            </div>
                         </div>
            
                        <div class="col-span-6 ">
                            <label class="block text-sm font-medium text-gray-700">Content</label>
                            <div class="relative">
                                <textarea name="" id="content" cols="30" rows="5"class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" >${blog.content}</textarea>
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
        const name = $('#name');
        const content = $('#content');
        const inputContent =content.onchange= ()=>{
            if(validateEmpty(content.value)){
                setError(content,'Không được để trống!');
            }else{
                setSuccess(content);
                return true;
            }
        }
        const inputName =name.onchange= ()=>{
            if(validateEmpty(name.value)){
                setError(name,'Không được để trống!');
            }else{
                setSuccess(name);
                return true;
            }
        }
        $('#form-edit-blog').addEventListener('submit',async e => {
            e.preventDefault();
            const today= new Date();
            const date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();


            if(inputName()==true && inputContent()==true){
                let image = $('#image').files[0];
                if(image){
                    if(validateFileImage(image)==true){
                        setSuccess($('#image'));
                        let storageRef =  firebase.storage().ref(`images/${image.name}`);
                        storageRef.put(image).then(function(){
                            storageRef.getDownloadURL().then(async (url)=>{
                                    const blog = {
                                    id:$('#id').value,
                                    name:$('#name').value,
                                    image:url,
                                    content:$('#content').value,
                                    date_post:date
                                    }
                                    const { id } = parseRequestUrl();
                                    if(BlogApi.edit(id,blog)){
                                        alert('Sửa bài viết thành công');
                                        window.location.hash='#/listblogs';
                                        await reRender(ListBlogs,'#list-blogs');
                                    }
                            })
                        })
                    }else{
                        setError($('#image'),'File không đúng định dạng!');
                    }
                }else{
                    const blog = {
                        id:$('#id').value,
                        name:$('#name').value,
                        image:$('#old_image').value,
                        content:$('#content').value,
                        date_post:date
                        }
                        const { id } = parseRequestUrl();
                        if(BlogApi.edit(id,blog)){
                            alert('Sửa bài viết thành công');
                            window.location.hash='#/listblogs';
                            await reRender(ListBlogs,'#list-blogs');
                        }
                }
            }
           
        })
    }
}
export default EditBlogsPage;