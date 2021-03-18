export default class Error404Page {
    static render() {
        return `
        <div class="bg-cover bg-center w-screen h-screen " style="background-image: url(https://38.media.tumblr.com/546c0cd48d71f210f9b67a389003790d/tumblr_neq0yw9rMA1tm16jjo1_500.gif)">
        <div class=" flex  justify-center  h-full py-56">
            <div class="w-96 text-center h-96 ">
                <p class="text-9xl font-extrabold tracking-widest text-gray-300 mb-10 ">404</p>
                <p class="text-3xl font-bold text-gray-300">Page not found <i class="far fa-frown"></i></p>
            </div>  
        </div>
    </div>
        `
    }
}