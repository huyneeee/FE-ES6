import { $,parseRequestUrl } from '../../utils';
const SideBar = {

    render(){
      const  {resource} =parseRequestUrl();
        return `
        <nav
        class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6" id="nav">
        <div
          class="md:flex-col md:items-stretch md:min-h-full md:flex-no-wrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          <button
            class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button" onclick="toggleNavbar('example-collapse-sidebar')">
            <i class="fas fa-bars"></i>
          </button>
          <a class="md:block text-left md:pb-2 text-gray-700 mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 px-0"
            href="#/">
            HUY NEEEE
          </a>
          <ul class="md:hidden items-center flex flex-wrap list-none">
            <li class="inline-block relative">
              <a class="text-gray-600 block" href="#pablo" onclick="openDropdown(event,'user-responsive-dropdown')">
                <div class="items-center flex">
                  <span
                    class="w-12 h-12 text-sm text-white bg-gray-300 inline-flex items-center justify-center rounded-full"><img
                      alt="..." class="w-full rounded-full align-middle border-none shadow-lg"
                      src="https://scontent.fhan5-3.fna.fbcdn.net/v/t1.0-9/136415274_2780920485455236_3790817701055726266_n.jpg?_nc_cat=106&ccb=2&_nc_sid=09cbfe&_nc_ohc=rdsoqjEmtvIAX9XsN82&_nc_ht=scontent.fhan5-3.fna&oh=d21829c7514665d660ef3b7ed604ad52&oe=603E89F4" /></span>
                </div>
              </a>
              <div class="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                id="user-responsive-dropdown">
                <a href="#pablo"
                  class="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800">Action</a><a
                  href="#pablo"
                  class="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800">Another
                  action</a><a href="#pablo"
                  class="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800">Something
                  else here</a>
                <div class="h-0 my-2 border border-solid border-gray-200"></div>
                <a href="#pablo"
                  class="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800">Seprated
                  link</a>
              </div>
            </li>
          </ul>
          <div
            class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded hidden"
            id="example-collapse-sidebar">
            <div class="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-gray-300">
              <div class="flex flex-wrap">
                <div class="w-6/12">
                  <a class="md:block text-left md:pb-2 text-gray-700 mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 px-0"
                    href="#/">
                   HUY NEEEE
                  </a>
                </div>
                <div class="w-6/12 flex justify-end">
                  <button type="button"
                    class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onclick="toggleNavbar('example-collapse-sidebar')">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            <form class="mt-6 mb-4 md:hidden">
              <div class="mb-3 pt-0">
                <input type="text" placeholder="Search"
                  class="px-3 py-2 h-12 border border-solid border-gray-600 placeholder-gray-400 text-gray-700 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal" />
              </div>
            </form>
            <!-- Divider -->
            <hr class="my-4 md:min-w-full" />
            <!-- Heading -->
            <h6 class="md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Admin Layout Pages
            </h6>
            <!-- Navigation -->
  
            <ul class="md:flex-col md:min-w-full flex flex-col list-none"id="navigation">
              <li class="items-center li">
                <a href="#/listproduct"
                  class="text-xs uppercase py-3 font-bold block ${resource==='listproduct'?'text-pink-600':'text-gray-500'} hover:text-pink-600">
                  <i class="fas fa-tv mr-2 text-sm opacity-75"></i>
                  List Products
                </a>
              </li>
  
              <li class="items-center li">
                <a href="#/listcategory"
                  class="text-xs uppercase py-3 font-bold block ${resource==='listcategory'?'text-pink-600':'text-gray-500'} hover:text-pink-600">
                  <i class="fas fa-tools mr-2 text-sm  "></i>
                  List Category
                </a>
              </li>
              <li class="items-center li">
              <a href="#/listuser"
                class="text-xs uppercase py-3 font-bold block ${resource==='listuser'?'text-pink-600':'text-gray-500'} hover:text-pink-600">
                <i class="fas fa-users mr-2 text-sm "></i>
                List Users
              </a>
            </li>
            <li class="items-center li">
              <a href="#/listorder"
                class="text-xs uppercase py-3 font-bold block ${resource==='listorder'?'text-pink-600':'text-gray-500'} hover:text-pink-600">
                <i class="fas fa-shopping-cart mr-2 text-sm "></i>
                List Order
              </a>
            </li>
            <li class="items-center li">
              <a href="#/listcomments"
                class="text-xs uppercase py-3 font-bold block ${resource==='listcomments'?'text-pink-600':'text-gray-500'} hover:text-pink-600">
                <i class="fas fa-comments"></i>
                List Comments
              </a>
            </li>
            <li class="items-center li">
            <a href="#/listblogs"
              class="text-xs uppercase py-3 font-bold block ${resource==='listblogs'?'text-pink-600':'text-gray-500'} hover:text-pink-600">
              <i class="fas fa-paste"></i>
              List Blogs
            </a>
          </li>
          <li class="items-center li">
          <a href="#/listcontact"
            class="text-xs uppercase py-3 font-bold block ${resource==='listcontact'?'text-pink-600':'text-gray-500'} hover:text-pink-600 ">
            <i class="fas fa-id-card"></i>
            List Contact
          </a>
        </li>
            </ul>
  
          </div>
        </div>
      </nav>
        `
    },
    async afterRender(){}
}
export default SideBar;
