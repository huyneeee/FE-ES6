const FooterHome = {
    render() {
        return `
        <!-- footer  -->
        <footer class="w-full border-t-2 border-gray-200 pt-10">
                <div class="grid grid-cols-4 gap-4 h-full">
                        <div class=" h-auto">
                            <div class=" pl-24 py-5">
                                <p class="text-lg font-semibold uppercase mb-8">About</p>
                                <ul class="text-gray-400 text-md ">
                                    <li class="mb-4 ">
                                        <a href="">News & Stories</a>
                                    </li>
                                    <li class="mb-4">
                                        <a href="">History</a>
                                    </li>
                                    <li class="mb-4">
                                        <a href="">Our Studio</a>
                                    </li>
                                    <li class="">
                                        <a href="">Showrooms</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class=" h-auto">
                            <div class=" pl-24 py-5">
                                <p class="text-lg font-semibold uppercase mb-8">CUSTOMER SERVICES</p>
                                <ul class="text-gray-400 text-md ">
                                    <li class="mb-4">
                                        <a href="">Contact Us</a>
                                    </li>
                                    <li class="mb-4">
                                        <a href="">Trade Services</a>
                                    </li>
                                    <li class="mb-4">
                                        <a href="">Login/Resgister</a>
                                    </li>
                                    <li class="">
                                        <a href="">FAQs</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class=" h-auto">
                            <div class=" pl-24 py-5">
                                <p class="text-lg font-semibold uppercase mb-8">FURNITURE</p>
                                <ul class="text-gray-400 text-md ">
                                    <li class="mb-4">
                                        <a href="">Tables</a>
                                    </li>
                                    <li class="mb-4">
                                        <a href="">Chairs</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class=" h-auto">
                            <div class=" pl-24 py-5">
                                <p class="text-lg font-semibold uppercase mb-8">ACCESSORIES</p>
                                <ul class="text-gray-400 text-md ">
                                    <li class="mb-4">
                                        <a href="">Candles & Fragrance</a>
                                    </li>
                                    <li class="mb-4">
                                        <a href="">Stationery</a>
                                    </li>
                                    <li class="mb-4">
                                        <a href="">Kitchen & Dinning</a>
                                    </li>
                                    <li class="mb-4">
                                        <a href="">Textlies</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                </div>      
        </footer>
        <!-- bottom fotter  -->
        <div class="grid grid-cols-2  place-content-center h-24 border-t-2 border-gray-200 place-items-center px-24  box-border">
            <div class="self-center w-full ">
                <ul>
                    <li>
                        <a href="" class="text-gray-500 mr-6 uppercase text-sm">about us</a>
                        <a href="" class="text-gray-500 mr-6 uppercase text-sm">blogs</a>
                        <a href="" class="text-gray-500 mr-6 uppercase text-sm">faqs</a>
                        <a href="" class="text-gray-500 mr-6 uppercase text-sm">order tracking</a>
                        <a href="" class="text-gray-500 uppercase text-sm">contact</a>
                    </li>
                </ul>
            </div>
            <div class="self-center w-full text-right">
                <ul>
                    <li>
                        <a href="" class="text-gray-500 mr-6 uppercase text-sm">connect with us:</a>
                        <a href="" class="text-gray-500 mr-6 uppercase text-sm"><i class="fab fa-behance"></i></a>
                        <a href="" class="text-gray-500 mr-6 uppercase text-sm"><i class="fab fa-facebook-f"></i></a>
                        <a href="" class="text-gray-500 mr-6 uppercase text-sm"><i class="fab fa-google"></i></a>
                        <a href="" class="text-gray-500 uppercase mr-6 text-sm"><i class="fab fa-twitter"></i></a>
                        <a href="" class="text-gray-500 uppercase text-sm"><i class="fab fa-instagram"></i></a>         
                    </li>
                </ul>
            </div>
        </div>
        `
    }
}
export default FooterHome;