import HeaderHome from '../../components/web/HeaderHome';
import FooterHome from '../../components/web/FooterHome';
import Navigation from '../../components/web/Navigation';
import BlogApi from '../../api/BlogApi.js';
import { $, parseRequestUrl } from '../../utils';
const BlogsPageDetail = {
    async render(){
        const { id } = parseRequestUrl();
        const { data : blog } =await BlogApi.get(id);
        return `
            ${HeaderHome.render()}
            ${Navigation.render()}
            <div class="flex items-center h-14 px-24 uppercase py-10 ">
                <a href="#" class="text-gray-500 font-thin text-md mr-4">Home</a>
                <span class="mr-4 text-gray-500">></span>
                <a href="#/blogs" class="text-gray-500 font-thin text-md mr-4">Blogs</a>
                <span class="mr-4 text-gray-500">></span>
                <p class="text-gray-900">${blog.name}</p>
            </div>
            <div class="flex h-full w-full px-24">
            <div class="flex-1 h-full mb-10">
                <div class="bg-cover bg-center w-full  " style="background-image: url(${blog.image});height:500px"></div>
                <div class="px-10 py-5">
                    <p class="italic font-semibold text-gray-500">${blog.date_post}</p>
                    <p class="text-lg mt-5 font-thin tracking-widest">${blog.content}</p>
                    <p class="text-lg font-thin tracking-widest">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor provident ipsum dolorem, iste necessitatibus quod quam ea porro eum. Quo quasi error quam voluptate eos consequatur? Veritatis mollitia dolor iste ipsam suscipit expedita repellat enim consectetur, animi impedit vero tenetur voluptatem, tempora, hic ducimus libero quibusdam doloribus aut optio nobis!</p>
                </div>  
            </div>
            </div>
            ${FooterHome.render()}
        `
    },
    afterRender(){}
}
export default BlogsPageDetail;