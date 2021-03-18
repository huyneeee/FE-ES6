import SideBar from '../../components/admin/SideBar.js';
import ListCategory from '../../components/admin/ListCategory.js';
const ListCategoryAdmin = {
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
                              List Category
                            </h3>
                          </div>
                          <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                            <a href="#/addcategory"
                              class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button">
                              Add Category
                            </a>
                          </div>
                        </div>
                      </div>
                            <div class="block w-full overflow-x-auto" >
                                <!-- Projects table -->
                                ${await ListCategory.render()}
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
      return `${await ListCategory.afterRender()}`
  }
}  
export default ListCategoryAdmin;