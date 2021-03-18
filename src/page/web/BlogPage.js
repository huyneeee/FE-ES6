import BlogApi from '../../api/BlogApi.js';
import HeaderHome from '../../components/web/HeaderHome.js';
import FooterHome from '../../components/web/FooterHome.js';
import Navigation from '../../components/web/Navigation';
const BlogPage  = {
    async render(){
        const {data : blogs} = await BlogApi.getAll();
        return `
        ${HeaderHome.render()}
        ${Navigation.render()}
        <!-- breadcrumbs  -->
        <div class="flex items-center h-14 px-24 uppercase py-10 ">
            <a href="#" class="text-gray-500 font-thin text-md mr-4">Home</a>
            <span class="mr-4 text-gray-500">></span>
            <p class="text-gray-900">Blog</p>
        </div>
        <div class="flex-col  justify-center w-full mb-24 mt-5 px-24 ">
            <div class="grid grid-cols-3 gap-5 ">
                ${blogs.map(blog =>{
                    return `
                    <div class=" h-auto ">
                    <div class=" w-full h-80 bg-gray-500 bg-no-repeat bg-cover bg-center  "
                        style="background-image: url('${blog.image}');">
                    </div>
                    <div class="text-left mt-5">
                        <a href="#/blogs/${blog.id}" class="text-md font-semibold uppercase ">${blog.name}</a>
                        <p class="italic text-gray-400 text-sm mt-3"><i class="fas fa-calendar-alt"></i> ${blog.date_post}</p>
                        <p class="text-gray-400 font-xs mt-4">${blog.content}</p>
                    </div>

                </div>
                    `
                }).join('')}
            </div>
            </div>
            ${FooterHome.render()}
        `
    },
    afterRender(){
        
    }
}
export default BlogPage;