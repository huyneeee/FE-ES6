import CategoryApi from '../../api/CategoryApi.js';
const CategoryPage = {
    async render(){
         const { data:category} = await CategoryApi.getAll();
         const hot_category = await category.slice(0,3);
         return `
         <div class="flex  justify-center ">
            ${hot_category.map(cate =>{
                return `
                <!-- categorie -->
                
                    <div class="relative flex-1 w-full h-72 bg-gray-500 bg-no-repeat bg-cover bg-center  "
                        style="background-image: url('${cate.image}');">
                        <div class="absolute w-1/2 right-0 top-16">
                            <p class="text-2xl font-semibold uppercase ">${cate.name}</p>
                            <p class="italic text-gray-400 mb-5">${cate.description}</p>
                            <a href="#/categories/${cate.id}" class="uppercase font-medium border-b-2 border-black pb-2">View now</a>
                        </div>
                    </div>
                `
            }).join('')}
            </div>
         `
    }
}
export default CategoryPage;