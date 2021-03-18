import ContactApi from '../../api/ContactApi.js';
import {  $, reRender,CheckLogin } from '../../utils.js';
const ListContact = {
    async render() {
        CheckLogin();
        const { data: contact} = await ContactApi.getAll();
        return `
        <table class="items-center w-full bg-transparent border-collapse" id="list-contact">
        <thead>
          <tr>
            <th
              class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
              Stt
            </th>
            <th
              class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
              Name 
            </th>
            <th
              class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
              Phone
            </th>
            <th
            class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
            Email
          </th>
          <th
          class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
          Massage
        </th>
          <th
          class="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
          Action
        </th>
           
          </tr>
        </thead>
        <tbody>
        ${contact.map((c,index) =>{
            return `
                <tr>
                <th
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                ${index}
                </th>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                ${c.name}
                </td>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                ${c.phone}
                </td>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                ${c.email}
                </td>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                ${c.massage}
                </td>
                <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                <button href="/#/contact/${c.id}" class="btn btn-remove btn-primary btn-remove px-3 py-2 bg-red-500 rounded text-white" data-id="${c.id}">Delete</button>
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
      const btns = $('#list-contact .btn-remove');
      btns.forEach( btn => {
          const id = btn.dataset.id;
          btn.addEventListener('click',async function(){
              const question = confirm ('Bạn có chắc chắn muốn xóa ?');
              if(question){
                  await ContactApi.remove(id);
                  await reRender(ListContact,'#list-contact');
              }
          } )
      })
  }
}
export default ListContact;