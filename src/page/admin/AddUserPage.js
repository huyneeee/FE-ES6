import { reRender, $ } from '../../utils.js';
import UserApi from '../../api/UserApi.js';
import Sidebar from '../../components/admin/SideBar.js';
import ListUsers from '../../components/admin/ListUsers.js';
import { validateEmpty, setError,setSuccess,validateEmail,validatePassword,validateUserValid,validateUserText,validateFileImage} from '../../validation';
const AddUserPage = {
    async render() /*html*/ {
        const { data: users } = await UserApi.getAll();
        const newid = users.length + 1;
        return `
        ${Sidebar.render()}
        <div class="relative md:ml-64 bg-gray-100">
        <div class="px-4 md:px-10 mx-auto w-full h-full">
            <div class="flex flex-wrap">
                <div class="w-full xl:w-12/12 mb-12 xl:mb-0 px-4 mt-8">
                    <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                    <h1 class="text-center uppercase text-2xl font-bold my-4">Add User</h1>
                    <form id="form-add-user">
                    <div class="shadow overflow-hidden sm:rounded-md">
                    <div class="px-4 py-5 bg-white sm:p-6">
                        <div class="grid grid-cols-6 gap-6">

                         <div class="col-span-6 sm:col-span-3 lg:col-span-3">
                            <label  class="block text-sm font-medium text-gray-700">Name</label>
                            <div class="relative">
                                <input type="text"   id="name" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <span class="err absolute right-3 top-3 text-xs "></span>
                            </div>
                         </div>


                         <div class="col-span-6 sm:col-span-3 lg:col-span-3">
                            <label  class="block text-sm font-medium text-gray-700">Avatar </label>
                            <div class="relative">
                                <input type="file"   id="avatar" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" ">
                                <span class="err absolute right-3 top-3 text-xs "></span>
                            </div>
                         </div>

                         <div class="col-span-6 sm:col-span-3">
                         <label class="block text-sm font-medium text-gray-700">User Name</label>
                            <div class="relative">
                                <input type="text" id="username"  class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <span class="err absolute right-3 top-3 text-xs "></span>
                            </div>
                         </div>

                         <div class="col-span-6 sm:col-span-3">
                            <label class="block text-sm font-medium text-gray-700">Password</label>
                            <div class="relative">
                                <input type="password" id="password"  class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <span class="err absolute right-3 top-3 text-xs "></span>
                            </div>
                         </div>

                         <div class="col-span-6 sm:col-span-3">
                            <label class="block text-sm font-medium text-gray-700">Email</label>
                            <div class="relative">
                                <input type="text" id="email"  class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <span class="err absolute right-3 top-3 text-xs "></span>
                            </div>
                         </div>

                         <div class="col-span-6 sm:col-span-3">
                         <label class="block text-sm font-medium text-gray-700">Role</label>
                         <div class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                         <label for="push_everything" class=" text-sm font-medium text-gray-700">
                               Admin
                             </label>
                         <input  type="radio" name="role" value="admin" class="role focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300">
                         <label for="push_everything" class=" text-sm font-medium text-gray-700">
                         Customer
                       </label>
                   <input  type="radio" name="role" value="customer" checked class="role focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300">
                         </div>
                         </div>
        
                        </div>
                    </div>
                    <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Save
                        </button>
                    </div>
                    </div>
                </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `
    }
    ,
    async afterRender() {
        const name = $('#name');
        const image = $('#avatar');
        const username = $('#username');
        const password = $('#password');
        const email = $('#email');
        const inputUsername= username.onchange=async ()=>{
            //username
            if(validateEmpty(username.value)){
                setError(username,'Không được để trống!');
            }else{
                if(await validateUserValid(username)==true){
                    if(validateUserText(username.value)==true){
                        setSuccess(username);
                        return true;
                    }else{
                        setError(username,'Username không đúng định dạng!');
                    }
                    
                }else{
                    setError(username,'Username đã tồn tại!');
                }
                
            }
        }

        const inputPass = password.onchange= ()=>{
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
        const inpurImage = image.onchange= ()=>{
            //password
            if(validateEmpty(image.value)){
                setError(image,'Không được để trống!');
            }else{
                if(validateFileImage(image.files[0])==true){
                    setSuccess(image);
                    return true;
                }else{
                    setError(image,'File không đúng định dạng!');
                }
            }
        }  

        const inputName = name.onchange= ()=>{
            //name
            if(validateEmpty(name.value)){
                setError(name,'Không được để trống!');
            }else{
                setSuccess(name);
                return true;
            }

        }

        const inputEmail =email.onchange= ()=>{
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
        $('#form-add-user').addEventListener('submit',async e => {
            e.preventDefault();
            const { data : users } = await UserApi.getAll();
            const newid=users.length+1;
            const role=$('.role');
            var value_role=null;
            for(let i=0;i<role.length;i++){
                if(role[i].checked){
                    value_role=role[i].value;
                    break;
                }
            }

            if(inputName()==true && await inputUsername()==true && inputEmail()==true &&  inpurImage()==true&& inputPass()==true){
                let avatar = $('#avatar').files[0];
                let storageRef =  firebase.storage().ref(`images/${avatar.name}`);
                storageRef.put(avatar).then(function(){
                    storageRef.getDownloadURL().then(async(url)=>{
                        const user = {
                            id:newid,
                            name:name.value,
                            username:username.value,
                            password:password.value,
                            avatar:url,
                            email:email.value,
                            role:value_role
            
                        }
                        if(UserApi.add(user)){
                            alert('Thêm khách hàng thành công');
                            window.location.hash='#/listuser';
                            await reRender(ListUsers, '#list-users');
                        }
                    })
                })
            }
            })
                        
        
    }
}
export default AddUserPage;