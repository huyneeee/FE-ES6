import CategoryApi from '../../api/CategoryApi.js';
const TabsCategory = {
    async render() {
        const { data: category } = await CategoryApi.getAll();
        return `
        <div class="w-full text-center pt-5">
        <ul>
             <li>
                ${category.map(cate => {
                     return `
                             <a href="#/category/${cate.id}" class="mr-10 pb-2 hover:border-b-2 hover:border-black hover:text-gray-500 active:underline">
                             ${cate.name}</a>
                    `
                 }).join("")}
                 <a href="#/products" class=" pb-2 hover:border-b-2 hover:border-black hover:text-gray-500"> ALL</a>
                 </li>
             </ul>
        `
    }
}
export default TabsCategory;