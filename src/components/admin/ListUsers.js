import UserApi from '../../api/UserApi.js';
import { reRender, $ ,CheckLogin } from '../../utils.js';
const ListUsers = {
    async render() {
        CheckLogin();
        const { data : users } = await UserApi.getAll();
        return `
        <table class="items-center w-full bg-transparent border-collapse" id="list-users">
        <thead>
          <tr>
            <th
              class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
              ID
            </th>
            <th
              class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
              User Name 
            </th>
            <th
              class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
              Name
            </th>
            <th
            class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
            Avatart
          </th>
          <th
          class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
          Email
        </th>
        <th
        class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
        Role
      </th>
          <th
          class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
          Action
        </th>
           
          </tr>
        </thead>
        <tbody>
        ${users.map((user,index) =>{
            return `
                <tr>
                <th
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                ${index}
                </th>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                ${user.username}
                </td>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                ${user.name}
                </td>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                <div class="bg-cover bg-center w-20 h-20" style="background-image: url(${user.avatar})"></div>
                </td>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                ${user.email}
                </td>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                ${user.role==='admin'? `<i class="fas fa-user-shield text-lg"></i> <b>${user.role}</b>` : `<i class="fas fa-user text-lg"></i> ${user.role}`}
                </td>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                <a href="/#/users/${user.id}/edit" class="btn btn-primary px-3 py-2 bg-blue-500 rounded text-white">Edit</a>
                <button href="/users/${user.id}" class="btn btn-remove btn-primary btn-remove px-3 py-2 bg-red-500 rounded text-white" data-id="${user.id}">Delete</button>
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
        const btns = $('#list-users .btn-remove');
        btns.forEach( btn => {
            const id = btn.dataset.id;
            btn.addEventListener('click',async function(){
                const question = confirm ('Bạn có chắc chắn muốn xóa ?');
                if(question){
                    await UserApi.remove(id);
                    await reRender(ListUsers, '#list-users');
                }
            } )
        })
    }
}
export default ListUsers;