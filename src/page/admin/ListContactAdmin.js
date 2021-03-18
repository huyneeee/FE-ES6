import SideBar from '../../components/admin/SideBar.js';
import ListContact from '../../components/admin/ListContact.js';
const ListContactAdmin = {
    async render()  {
        return `
        ${SideBar.render()}
        <div class="relative md:ml-64 bg-gray-100">
            <div class="px-4 md:px-10 mx-auto w-full h-full">
                <div class="flex flex-wrap">
                    <div class="w-full xl:w-12/12 mb-12 xl:mb-0 px-4 mt-8">
                        <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                        <div class="rounded-t mb-0 px-4 py-3 border-0">
                        <div class="flex flex-wrap items-center">
                          <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 class="font-semibold text-base text-gray-800">
                              List Contact
                            </h3>
                          </div>
                        </div>
                      </div>
                            <div class="block w-full overflow-x-auto" >
                                <!-- Projects table -->
                                ${await ListContact.render()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    },
    async afterRender() {
        await SideBar.afterRender();
        return `${await ListContact.afterRender()}`
  }
}  
export default ListContactAdmin;