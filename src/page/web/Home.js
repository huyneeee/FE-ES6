import CategoryPage from './CategoryPage.js';
import BlogHomePage from './BlogHomePage.js';
import OurProducts from '../../components/web/OurProducts';
import HeaderHome from '../../components/web/HeaderHome.js';
import FooterHome from '../../components/web/FooterHome.js';
import { $ } from '../../utils.js';
import { add_cart } from '../../cart.js';
import ProductApi from '../../api/ProductApi.js';
import BlogApi from '../../api/BlogApi.js';

const HomePage = {
    async render() {
        return `
        
        ${HeaderHome.render()}
        <!-- banner  -->
        <div class="bg-cover bg-center w-full relative"
            style="background-image: url(https://firebasestorage.googleapis.com/v0/b/shop-ff2b2.appspot.com/o/images%2Fslider-home2_1.png?alt=media&token=0be14b5d-397d-4dfe-a718-ab17bfb43241); height: 35rem;">
            <div class="absolute  top-1/3 left-1/4">
                <p class="text-4xl font-bold uppercase ">c l e a r a n c e</p>
                <p class="uppercase text-2xl font-mormal text-gray-800 pb-1">Giver a timeless classic a home</p>
                <p class=" text-gray-400 mb-5">It is a long established fact that a reader will</p>
                <a href="#/products" class="uppercase font-medium border-b-2 border-black pb-2">View now</a>
            </div>
            <div class="flex justify-around w-full items-center py-3 absolute top-0 mt-3">
                <ul class="justify-between flex uppercase text-sm font-semibold">
                    <li class="p-3"><a href="#" class="text-gray-800 tracking-widest">Home</a></li>
                    <li class="p-3"><a href="#/products" class="text-gray-800 tracking-widest">shop</a></li>
                    <li class="p-3"><a href="#/about" class="text-gray-800 tracking-widest">About</a></li>
                    <li class="p-3"><a href="#/blogs" class="text-gray-800 tracking-widest">Blog</a></li>
                    <li class="p-3"><a href="#/contact" class="text-gray-800 tracking-widest">Contact</a></li>
                </ul>
            </div>
        </div>
        <!-- category -->
        ${await CategoryPage.render()}
        <!-- service  -->
        <div class="grid grid-cols-3  place-content-center h-48 place-items-center text-center border-b-2  box-border">
            <div class="self-center w-full border-r-2 ">
                <p class="font-semibold uppercase tracking-wide pb-3">free shiping</p>
                <p class="italic text-gray-400">100% Money back - 30 days</p>
            </div>
            <div class="self-center w-full border-r-2 ">
                <p class="font-semibold uppercase tracking-wide pb-3">MONEY BACK</p>
                <p class="italic text-gray-400">100% Money back - 30 days</p>
            </div>
            <div class="self-center w-full  ">
                <p class="font-semibold uppercase tracking-wide pb-3">24H SUPPORT</p>
                <p class="italic text-gray-400">Services support fast 24/7</p>
            </div>
        </div>
       <!-- Our Products -->
       <div class="flex-col  justify-center w-full my-24 px-24 ">
           <p class="text-2xl font-semibold uppercase w-full text-center flex-1">Our products</p>
           ${await OurProducts.render()}    
        </div>
       </div>
        <!-- sale  -->
        <div class=" w-full flex px-24 relative" style="height:650px;background-color:#f6f6f6">
            <div class=" w-1/3 h-full box-border py-40 ">
                <div class="bg-cover bg-center w-full h-full  " style="background-image: url(https://firebasestorage.googleapis.com/v0/b/shop-ff2b2.appspot.com/o/images%2F02_1_1.jpg?alt=media&token=01163e4c-94ea-4923-90ea-fd6fb1cbadd9)"></div>
            </div>
            <div class=" h-full w-2/3  relative">
                <div class="absolute top-56 left-56">
                    <p class="italic text-gray-400 mb-8 ">The Frankie Sweatshirt is your best friend at long afternoon stadium stints or winter trailside campsites... </p>
                    <a href="#" class=" uppercase font-medium border-double border-b-4 border-black pb-2">add to cart</a>
                </div>
            </div>
            <div class="absolute top-1/4 left-1/2  max-w-prose mx-auto" >
                <p class="text-4xl uppercase font-bold pb-6">Sale up to 45%!</p>
            </div>
            
        </div>
        <!-- blog -->
        ${await BlogHomePage.render()}
        <!-- send mail  -->
        <div class=" w-full flex-col flex items-center justify-center relative " style="height:500px;background-color:#f6f6f6">
            <div class="text-center  ">
                <p class="text-4xl mb-3 w-full font-bold uppercase">keep updated</p>
                <p class="italic text-gray-400">Sign up for our newletter to recevie updates an exlusive offers</p>
            </div>
            <div class="w-1/2 bg-red-400 flex mt-10">
                <input type="text" placeholder="Enter your email" class="outline-none border-2 border-gray-400 px-8 py-3 w-2/3"style="background-color:#f6f6f6">
                <button class="px-6 py-3 uppercase bg-black border-none text-white w-1/3">subscribe</button>
            </div>
           
        </div>
        ${FooterHome.render()}
        `
    },
    async afterRender() {
        await OurProducts.afterRender();
        await HeaderHome.afterRender();
        //add-cart
        add_cart(HomePage);
    }
}
export default HomePage;

