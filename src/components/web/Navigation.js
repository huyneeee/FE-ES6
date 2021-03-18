const Navigation = {
    render(){
        return `
        <!-- navbar  -->
        <div class="flex justify-around w-full items-center py-7 bg-white ">
            <ul class="justify-between flex uppercase text-sm font-semibold">
                <li class="p-3 "><a href="#" class="text-gray-800 tracking-widest">Home</a></li>
                <li class="p-3"><a href="#/products" class="text-gray-800 tracking-widest">shop</a></li>
                <li class="p-3"><a href="#/about" class="text-gray-800 tracking-widest">About</a></li>
                <li class="p-3"><a href="#/blogs" class="text-gray-800 tracking-widest">Blog</a></li>
                <li class="p-3"><a href="#/contact" class="text-gray-800 tracking-widest">Contact</a></li>
            </ul>
        </div> 
        `
    },
    afterRender(){}
}
export default Navigation;