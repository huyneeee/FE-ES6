import ProductApi from '../../api/ProductApi.js';
const Pagination = {
     render() {
        const { data: total } = await ProductApi.getAll();
        const total_page =Math.ceil(total.length/row_per_page); //tính số lượng trang
        // console.log(total_page);
        return `
        <div class="flex h-16 w-full  justify-start items-center mt-5">
        <div class="w-10 h-10 bg-black text-white justify-center items-center flex mr-4">
            <span><a href="#/products?page=1">1</a></span>
        </div>
        <div class="w-10 h-10 bg-gray-300 text-black justify-center items-center flex hover:bg-black hover:text-white">
            <span><i class="fas fa-arrow-right"></i></span>
        </div>
    </div>
        `
    }
}
export default Pagination;