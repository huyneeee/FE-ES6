import BlogApi from '../../api/BlogApi.js';
import {  $, reRender,CheckLogin } from '../../utils.js';
const ListBlog = {
    async render() {
        CheckLogin();
        const { data: blogs} = await BlogApi.getAll();
        return `
        <table class="items-center w-full bg-transparent border-collapse" id="list-blogs">
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
            Date Post
          </th>
          <th
          class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
          Action
        </th>
           
          </tr>
        </thead>
        <tbody>
        ${blogs.map((blog,index) =>{
            return `
                <tr>
                <th
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                ${index}
                </th>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                ${blog.name}
                </td>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                <div class="bg-cover bg-center w-20 h-20" style="background-image: url(${blog.image})"></div>
                </td>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                ${blog.date_post}
                </td>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                <a href="/#/blogs/${blog.id}/edit" class="btn btn-primary px-3 py-2 bg-blue-500 rounded text-white">Edit</a>
                <button href="/#/blogs/${blog.id}" class="btn btn-remove btn-primary btn-remove px-3 py-2 bg-red-500 rounded text-white" data-id="${blog.id}">Delete</button>
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
      const btns = $('#list-blogs .btn-remove');
      btns.forEach( btn => {
          const id = btn.dataset.id;
          btn.addEventListener('click',async function(){
              const question = confirm ('Bạn có chắc chắn muốn xóa ?');
              if(question){
                  await BlogApi.remove(id);
                  await reRender(ListBlog,'#list-blogs');
              }
          } )
      })
  }
}
export default ListBlog;