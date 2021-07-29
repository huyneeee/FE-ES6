import HeaderHome from '../../components/web/HeaderHome.js';
import { $ } from '../../utils.js';
import UserApi from '../../api/UserApi.js';
import FooterHome from '../../components/web/FooterHome.js';
import Navigation from '../../components/web/Navigation.js';
import AuthApi from '../../api/AuthApi';
const LoginPage = {
    render() {
        return `
                ${HeaderHome.render()}
                ${Navigation.render()}
                <p class="text-gray-900 text-xl font-semibold my-8 text-center ">CUSTOMER LOGIN</p>
                <div class="login flex flex-col items-center">
                    <form action="" class="border border-gray-300 shadow-lg h-96 w-2/5 px-8 py-10" id="form-login">
                        <p class="font-semibold text-gray-400 text-md mb-3">REGISTERED CUSTOMERS</p>
                        <hr>
                        <p class="text-gray-400 my-3 text-sm">If you have an account, sign in with your username.</p>
                        <div class="mb-7 relative">
                        <input type="text" class="w-full border-2 border-gray-300 px-2 py-2  rounded focus:outline-none" placeholder="Email" id="email" >
                        <span id="err_user" class=" text-xs text-red-400 absolute right-1 top-3"></span>
                        </div>
                        <div class="relative">
                        <input type="password" class="w-full border-2 border-gray-300 px-2 py-2 rounded focus:outline-none " placeholder="Password" id="password">
                        <span id="err_pass" class=" text-xs text-red-400 absolute right-1 top-3"></span>
                        </div>
                        <div class="flex justify-center">
                            <button type="submit"
                                class="px-8 py-3 text-sm bg-black opacity-80 mt-10 hover:opacity-100 text-white  ">SIGN IN</button>
                        </div>
                    </form>
                    <div class="w-2/5 mt-20 text-center mb-10">
                        <p class="text-gray-900 text-xl font-semibold mb-2">NEW CUSTOMERS</p>
                        <p class="text-gray-400 text-md mb-8">Creating an account has many benefits: check out faster, keep more than one
                            address, track orders and more.</p>
                        <a href="#/register" class="px-8 py-3 text-sm bg-black opacity-80 mt-8 hover:opacity-100 text-white ">CREATE AN
                            ACCOUNT</a>
                    </div>
                </div>
            ${FooterHome.render()}
        `
    },
    async afterRender() {
        await HeaderHome.afterRender();
        const email = $('#email');
        const password = $('#password');
        const err_user = $('#err_user');
        const err_pass = $('#err_pass');


        password.oninput = () => {
            err_pass.innerHTML = '';
            password.style.border = 'solid 1px gray';
        }
        // const inputEmail =email.onchange=()=>{
        //     if(email.value==''){
        //         email.style.border='solid 1px red';
        //         err_user.innerHTML='Tài khoản không được để trống <i class="fas fa-exclamation-circle"></i>';
        //         return false;
        //     }else{
        //         const user_invalid=users.find(user=>user.email===email.value.trim());
        //         if(user_invalid){
        //             err_user.innerHTML='<i class="fas fa-check-circle text-green-400"></i>';
        //             email.style.border='solid 1px green';
        //                 if(user_invalid.password===password.value.trim()){
        //                     localStorage.setItem('user',JSON.stringify(user_invalid));
        //                     const user=JSON.parse(localStorage.getItem('user'));
        //                     return true;
        //                 }else{  
        //                     err_pass.innerHTML='Sai password <i class="fas fa-exclamation-circle"></i>';
        //                     password.style.border='solid 1px red';
        //                 }
        //         }else{
        //             email.style.border='solid 1px red';
        //             err_user.innerHTML='Tài khoản không xác định <i class="fas fa-exclamation-circle"></i>';
        //             return false;
        //         }
        //     }

        // } 
        $('#form-login').addEventListener('submit', async e => {
            e.preventDefault();
            const profile = {
                email: $('#email').value,
                password: $('#password').value
            }

            try {
                const { data: userSignIn } = await AuthApi.signIn(profile);
                // console.log(userSignIn);
                if(localStorage.getItem('user')==null){
                    localStorage.setItem('user',JSON.stringify(userSignIn.user));
                    localStorage.setItem('token',JSON.stringify(userSignIn.token));
                }                
                err_pass.innerHTML = '<i class="fas fa-check-circle text-green-400"></i>';
                password.style.border = 'solid 1px green';

                window.location.hash = '/';
            } catch (err) {
                if (err.response.data.email) {
                    email.style.border = 'solid 1px red';
                    err_user.innerHTML = `${err.response.data.error}<i class="fas fa-exclamation-circle"></i>`;
                } else {
                    err_user.innerHTML = '<i class="fas fa-check-circle text-green-400"></i>';
                    email.style.border = 'solid 1px green';
                }
                if (err.response.data.password) {
                    err_pass.innerHTML = `${err.response.data.error}<i class="fas fa-exclamation-circle"></i>`;
                    password.style.border = 'solid 1px red';
                }
            }
        })
    }
}
export default LoginPage;