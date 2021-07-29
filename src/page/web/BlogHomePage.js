import BlogApi from '../../api/BlogApi.js';
const BlogHomePage  = {
    async render(){
        const {data : blogs} = await BlogApi.getAll();
        return `
        <div class="flex-col  justify-center w-full my-24 px-24 ">
            <p class="text-2xl font-semibold uppercase w-full text-center flex-1 mb-1">news & blog</p>
            <p class="text-center text-gray-500 text-md">MOST TRENDY FURNITURE</p>
            <div class="grid grid-cols-3 gap-5 mt-6">
                ${blogs.map(blog =>{
                    return `
                    <div class=" h-auto ">
                    <div class=" w-full h-80 bg-gray-500 bg-no-repeat bg-cover bg-center  "
                        style="background-image: url('${blog.image}');">
                    </div>
                    <div class="text-left mt-5">
                        <a href="#/blog/${blog._id}" class="text-md font-semibold uppercase ">${blog.name}</a>
                        <p class="italic text-gray-400 text-sm mt-3"><i class="fas fa-calendar-alt"></i> ${blog.createdAt.slice(0,10)}</p>
                        <p class="text-gray-400 font-xs mt-4">${blog.content}</p>
                    </div>

                </div>
                    `
                }).join('')}
            </div>
            </div>
        `
    }
}
export default BlogHomePage;