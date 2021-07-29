import HeaderHome from '../../components/web/HeaderHome.js';
import { $ } from '../../utils.js';
import UserApi from '../../api/UserApi.js';
import FooterHome from '../../components/web/FooterHome.js';
import Navigation from '../../components/web/Navigation';
import { validateEmail,validateEmpty,validateUserValid,validatePassword ,setError,setSuccess,validateUserText} from '../../validation';
import AuthApi from '../../api/AuthApi.js';
const RegisterPage = {
    async render(){
        const { data: users } = await UserApi.getAll();
        const newid = users.length + 1;
        return `
        ${HeaderHome.render()}
        ${Navigation.render()}
            <p class="text-gray-900 text-xl font-semibold my-8 text-center tracking-widest">CREATE NEW CUSTOMER ACCOUNT</p>
            <div class="resgiter flex justify-center mb-20">
            <div class="flex flex-col  w-2/5">
                <form action="" class="border border-gray-300 rounded shadow-xl px-5 py-3 " id="form-register">
                    <input type="hidden" id="id" value="${newid}">
                    <div class="flex px-4 py-3">
                    <p class="w-1/4 text-gray-500 text-sm">Name <span class="text-red-600 font-bold">*</span> </p>
                    <div class="w-3/4 relative">
                        <input type="text" id="name" class="w-full py-2  px-4 border border-gray-300 rounded">
                        <span class="err absolute right-3 top-3 text-xs "></span>
                    </div>
                </div>
                    <div class="flex px-4 py-3">
                    <p class="w-1/4 text-gray-500 text-sm">Email <span class="text-red-600 font-bold">*</span> </p>
                    <div class="w-3/4 relative">
                        <input type="text" id="email" class="w-full py-2  px-4 border border-gray-300 rounded">
                        <span class="err absolute right-3 top-3 text-xs "></span>
                    </div>
                </div>
                    <div class="flex px-4 py-3">
                        <p class="w-1/4 text-gray-500 text-sm">Password<span class="text-red-600 font-bold">*</span> </p>
                        <div class="w-3/4 relative">
                            <input type="password" id="password" class="w-full py-2  px-4 border border-gray-300 rounded">
                            <span class="err absolute right-3 top-3 text-xs "></span>
                        </div>
                    </div>

                    <div class="flex px-4 py-3">
                        <p class="w-1/4 text-gray-500 text-sm">Confirm Password <span class="text-red-600 font-bold">*</span> </p>
                        <div class="w-3/4 relative">
                            <input type="password" id="password2" class="w-full py-2  px-4 border border-gray-300 rounded">
                            <span class="err absolute right-3 top-3 text-xs "></span>
                        </div>
                    </div>

                   
                

                    
                    <div class="flex justify-between items-center mt-10">
                        <button type="submit" class="px-8 py-3 text-sm bg-black opacity-80  hover:opacity-100 text-white ">CREATE AN ACCOUNT</button>  
                            <a href="#/login" class="font-normal text-gray-900">BACK</a>
                    </div>  
                </form>
            </div>
        </div>
        ${FooterHome.render()}
        `
    },
    async afterRender(){
        const email=$('#email');
        const password=$('#password');
        const password2=$('#password2');
        const name=$('#name');

        const validateInputPass=password.onchange=()=>{
                //password
                if(validateEmpty(password.value)){
                    setError(password,'Không được để trống!');
                }else{
                    if(validatePassword(password.value)==true){
                        setSuccess(password);
                        return true;
                    }else{
                        setError(password,'Mật khẩu của bạn yếu !');
                    }         
                }
        }
        const validateConfirm=password2.onchange=()=>{
            //  confirm pass
                if(validateEmpty(password2.value)){
                    setError(password2,'Không được để trống!');
                }else{
                    if(password2.value===password.value){
                        setSuccess(password2);
                        return true;
                    }else{
                        setError(password2,'Không trùng khớp!');
                    }
                }
        }
        const validateName=name.onchange=()=>{
               name
                if(validateEmpty(name.value)){
                    setError(name,'Không được để trống!');
                }else{
                    setSuccess(name);
                    return true;
                }
        }
        const validateInputEmail=email.onchange=()=>{
             //email
                if(validateEmpty(email.value)){
                    setError(email,'Không được để trống!');
                }else{
                    if(validateEmail(email.value)==false){
                        setError(email,'Email sai định dạng!');
                    }else{
                        setSuccess(email);
                        return true;
                    }        
                }
        }
        $('#form-register').addEventListener('submit',async e => {
            e.preventDefault();

            if( validateInputPass()==true && validateConfirm()==true && validateName()==true &&validateInputEmail()==true){
                const user = {
                    name:name.value,
                    password:password.value,
                    avatar:'https://cdn.iconscout.com/icon/free/png-512/laptop-user-1-1179329.png',
                    email:email.value,
                }

            if(AuthApi.signUp(user)){
                alert('Đăng ký thành công !');
                window.location.hash='#/login';
            }
            }
        })
    }
}
export default RegisterPage;