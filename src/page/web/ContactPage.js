import HeaderHome from '../../components/web/HeaderHome';
import FooterHome from '../../components/web/FooterHome';
import Navigation from '../../components/web/Navigation';
import { $,reRender } from '../../utils';
import ContactApi from '../../api/ContactApi';
import { validateEmpty ,validateEmail,validatePhone,setError,setSuccess} from '../../validation';
const ContacPage = {
    render(){
        return `
        ${HeaderHome.render()}
        ${Navigation.render()}
            <div class="w-screen my-10">
            <p class="text-4xl text-center">Get in touch with us !</p>
            <div class="flex px-32 my-10">
                <div class="flex-1 ">
                    <span class="text-8xl flex justify-center mt-2"><i class="fas fa-mobile"></i></span>
                    <p class="text-2xl text-center my-3 font-semibold ">PHONE</p>
                    <p class="text-lg text-center my-3">Phone: (+84) 989999999</p>
                    <p class="text-lg text-center my-3">Phone: (+84) 123456789</p>
                </div>
                <div class="flex-1 ">
                    <span class="text-8xl flex justify-center mt-2"><i class="fas fa-map-marked-alt"></i></span>
                    <p class="text-2xl text-center my-3 font-semibold ">ADDRESS</p>
                    <p class="text-lg text-center my-3">1914 Nam Tu Liem, Ha Noi</p>
                </div>
                <div class="flex-1 ">
                    <span class="text-8xl flex justify-center mt-2"><i class="fas fa-envelope"></i></span>
                    <p class="text-2xl text-center my-3 font-semibold ">EMAIL</p>
                    <p class="text-lg text-center my-3">huyneeee@gmail.com</p>
                </div>
            </div>
            <div class="flex">
                <div class="flex-1"></div>
                <div class="flex-1 bg-greend-200">
                    <form action="" id="form_contact">
                    <div class="relative my-3">
                        <input type="text" placeholder="Name" id="name" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <span class="err absolute right-3 top-3 text-xs "></span>
                    </div>
                    <div class="relative my-3">
                        <input type="text" placeholder="Email" id="email" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <span class="err absolute right-3 top-3 text-xs "></span>
                    </div>
                    <div class="relative my-3">
                        <input type="number" placeholder="Phone" id="phone" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <span class="err absolute right-3 top-3 text-xs "></span>
                    </div>
                    <div class="relative my-3">
                            <textarea name="" placeholder="Massage" id="massage" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" id="" cols="30" rows="10"></textarea>
                            <span class="err absolute right-3 top-3 text-xs "></span>
                    </div>
                        <div class="flex justify-center">
                            <button type="submit" class="text-center px-6 py-3 uppercase bg-black border-none text-white w-1/2 mt-5">Send Message</button>
                        </div>
                    </form>
                </div>
                <div class="flex-1"></div>
            </div>
            <p class="text-4xl text-center mt-10">Connect With Us !</p>
            <div class="flex justify-center mt-3">
                <i class="fab fa-facebook text-3xl mx-2"></i>
                <i class="fab fa-instagram text-3xl mx-2"></i>
                <i class="fab fa-twitter text-3xl mx-2"></i>
                <i class="fab fa-pinterest text-3xl mx-2"></i>
            </div>
        </div>
        ${FooterHome.render()}
        ` 
    },
    async afterRender(){
        await HeaderHome.afterRender();
        const name = $('#name');
        const email = $('#email');
        const phone = $('#phone');
        const massage =$('#massage');

        const validateInputName =  name.onchange = ()=>{
            if(validateEmpty(name.value)==true){
                setError(name,'Không được để trống!');
            }else{
                setSuccess(name);
                return true;
            }
        }
        const validateInputEmail = email.onchange = ()=>{
            if(validateEmpty(email.value)==true){
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
        const validateInputPhone=phone.onchange=()=>{
            if(validateEmpty(phone.value)){
                setError(phone,'Không được để trống!');
            }else{
                if(validatePhone(phone.value)==true){
                    setSuccess(phone);
                    return true;   
                }else{
                    setError(phone,'Phone sai định dạng');
                }
            }

       }
       const validateInputMassage = massage.onchange = ()=>{
            if(validateEmpty(massage.value)==true){
                setError(massage,'Không được để trống!');
            }else{
                setSuccess(massage);
                return true;
            }
       }
        $('#form_contact').addEventListener('submit',async e=>{
            e.preventDefault();

            if(validateInputName()==true && validateInputEmail()==true && validateInputPhone()==true && validateInputMassage()==true ){
                    const contact={
                    "name":$('#name').value,
                    "email":$('#email').value,
                    "phone":$('#phone').value,
                    "massage":$('#massage').value
                }
                if(ContactApi.add(contact)){
                    alert("Gửi thông tin liên hệ thành công !");
                    await reRender(ContacPage,"#main-content")
                }
            }
           
            
        })
    }
}
export default ContacPage;