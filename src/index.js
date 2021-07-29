import HomePage from './page/web/Home.js';
import HeaderHome from './components/web/HeaderHome.js';
import ProductDetail from './page/web/ProductDetail.js';
import Error404Page from './page/web/404.js';
import { parseRequestUrl, $ } from './utils.js';
import ProductsPage from './page/web/ProductsPage.js';
import BlogsPage from './page/web/BlogPage.js';
import CartPage from './page/web/CartPage.js';
import ListProductsAdmin from './page/admin/ListProductsAdmin.js';
import AboutPage from './page/web/AboutPage.js';
import ProductsCategoryPage from './page/web/ProductsCategoryPage.js';
import AddProductPage from './page/admin/AddProductPage.js';
import ListCategoryAdmin from './page/admin/ListCategoryAdmin.js';
import AddCategoryPage from './page/admin/AddCategoryPage.js';
import ListUsersAdmin from './page/admin/ListUsersAdmin.js';
import AddUserPage from './page/admin/AddUserPage.js';
import LoginPage from './page/web/LoginPage.js';
import RegisterPage from './page/web/RegisterPage.js';
import EditUserPage from './page/admin/EditUserPage.js';
import EditProductsPage from './page/admin/EditProductsPage.js';
import EditCategoryPage from './page/admin/EditCategoryPage.js';
import OrderPage from './page/web/OrderPage.js';
import ContacPage from './page/web/ContactPage.js';
import ListOrderAdmin from './page/admin/ListOrderAdmin.js';
import ListCommentsAdmin from './page/admin/ListCommentsAdmin.js';
import BlogsPageDetail from './page/web/BlogsPageDetail';
import ListBlogsAdmin from './page/admin/ListBlogsAdmin';
import AddBlogsPage from './page/admin/AddBlogsPage.js';
import EditBlogsPage from './page/admin/EditBlogsPage.js';
import ListContactAdmin from './page/admin/ListContactAdmin.js';
// tao duong dan 
const routes = {
    '/': HomePage,
    '/products': ProductsPage,
    '/products?page=1': ProductsPage,
    '/products?page=2': ProductsPage,
    '/product/:id': ProductDetail,
    '/category/:id':HomePage,
    '/blogs':BlogsPage,
    '/blog/:id':BlogsPageDetail,
    '/about':AboutPage,
    '/contact':ContacPage,
    '/categories/:id':ProductsCategoryPage,
    //add-admin
    '/addproduct':AddProductPage,
    '/adduser':AddUserPage,
    '/addcategory':AddCategoryPage,
    '/addblogs':AddBlogsPage,
    //list-admin
    '/listproduct':ListProductsAdmin,
    '/listcategory':ListCategoryAdmin,
    '/listuser':ListUsersAdmin,
    '/listorder':ListOrderAdmin,
    '/listcomments':ListCommentsAdmin,
    '/listblogs':ListBlogsAdmin,
    '/listcontact':ListContactAdmin,
    //edit
    '/user/:id/edit':EditUserPage,
    '/product/:id/edit':EditProductsPage,
    '/category/:id/edit':EditCategoryPage,
    '/blogs/:id/edit':EditBlogsPage,
    //bonus
    '/checkout':OrderPage,
    '/login':LoginPage, 
    '/register':RegisterPage,
    '/cart':CartPage,
  
    
    
}

const  router = async () => {
    const request = parseRequestUrl();
    const parseUrl = (request.resource ? `/${request.resource}` : '/')  + (request.id ? '/:id' : '') + (request.action ? `/${request.action}` :'');
    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Page;
    const main = $('#main-content');
    main.innerHTML = await screen.render();
    await screen.afterRender();

}
window.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router);  



