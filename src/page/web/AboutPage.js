import HeaderHome from '../../components/web/HeaderHome.js';
import FooterHome from '../../components/web/FooterHome.js';
import Navigation from '../../components/web/Navigation';
const AboutPage = {
    render() {
        return `
                ${HeaderHome.render()}
                ${Navigation.render()}
                <div class="container mx-auto px-32">
                <p class="uppercase text-6xl text-center py-6 font-serif">About us</p>
                <div class="grid w-full grid-cols-3 gap-4 h-auto font-serif">
                    <div class="">
                        <p class="text-2xl ">About Us</p>
                    </div>
                    <div class="col-span-2 ">
                        <p class="text-lg font-normal leading-8 tracking-widest">lorem ipsum dolor sit amet, consectetur
                            adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                            anim id est laborum.</p>
                    </div>
                    <div class=" ">
                        <p class="text-2xl ">Our Team</p>
                    </div>
                    <div class="col-span-2 ">
                        <p class="text-lg font-normal leading-8 tracking-widest">lorem ipsum dolor sit amet, consectetur
                            adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                    <div class=" ">
                        <p class="text-2xl ">Press</p>
                    </div>
                    <div class="col-span-2 ">
                        <p class="text-lg font-normal leading-8 tracking-widest">Etiam porta sem malesuada magna mollis euismod.
                        </p>
                    </div>
                </div>

            </div>
            <div class="bg-cover bg-center w-full h-96 mt-8" style="background-image: url('image/bgblog.jpg')"></div>
            <div class="container mx-auto px-32 mt-6 mb-24">
                <div class="grid w-full grid-cols-2 gap-4 h-auto">
                    <div class="h-auto font-serif">
                        <p class="text-6xl">“</p>
                        <p class="text-6xl">Our work does make sense only if it is a faithful withness of his time.</p>
                        <p class="text-6xl text-right">”</p>
                    </div>
                    <div class="bg-cover bg-center w-full" style="background-image: url('image/03_4.jpg')"></div>
                </div>
            </div>
            ${FooterHome.render()}
        `
    },
    afterRender(){}
}
export default AboutPage;