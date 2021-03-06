import { reRender, $, parseRequestUrl } from '../../utils.js';
import UserApi from '../../api/UserApi.js';
import Sidebar from '../../components/admin/SideBar.js';
import ListUsers from '../../components/admin/ListUsers.js';
import { validateEmpty, setError, setSuccess, validateEmail, validateFileImage, validatePassword } from '../../validation';
const EditUserPage = {
    async render() /*html*/ {
        const { id } = parseRequestUrl();
        const { data: users } = await UserApi.get(id);
        return `
        ${Sidebar.render()}
        <div class="relative md:ml-64 bg-gray-100">
        <div class="px-4 md:px-10 mx-auto w-full h-full">
            <div class="flex flex-wrap">
                <div class="w-full xl:w-12/12 mb-12 xl:mb-0 px-4 mt-8">
                    <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                    <h1 class="text-center uppercase text-2xl font-bold my-4">Edit User</h1>
                    <form id="form-edit-user">
                    <div class="shadow overflow-hidden sm:rounded-md">
                    <div class="px-4 py-5 bg-white sm:p-6">
                        <div class="grid grid-cols-6 gap-6">
                            <input type="hidden" disabled  id="id"  value="${users.id}">
    
                         <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                            <label  class="block text-sm font-medium text-gray-700">Name</label>
                            <div class="relative">
                                <input type="text"   id="name" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value="${users.name}">
                                <span class="err absolute right-3 top-3 text-xs "></span>
                            </div>
                         </div>

                         <div class="col-span-6">
                            <label  class="block text-sm font-medium text-gray-700">Avatar </label>
                            <div class="bg-cover bg-center w-40 h-40" style="background-image: url(${users.avatar})"></div>
                            <input type="hidden" value="${users.avatar}" id="old_image">
                            <div class="relative">
                                <input type="file"   id="avatar" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" >
                                <span class="err absolute right-3 top-3 text-xs "></span>
                            </div>
                         </div>

                         <div class="col-span-6 sm:col-span-3">
                         <label class="block text-sm font-medium text-gray-700">Old Password</label>
                            <div class="relative">
                                <input type="password" id="password"  class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value="">
                                <span class="err absolute right-3 top-3 text-xs "></span>
                            </div>
                         </div>
                         <input type="hidden" id="old_password" value="">

                         <div class="col-span-6 sm:col-span-3">
                         <label class="block text-sm font-medium text-gray-700">New Password</label>
                            <div class="relative">
                                <input type="password" id="password2"  class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value="">
                                <span class="err absolute right-3 top-3 text-xs "></span>
                            </div>
                         </div>

                         <div class="col-span-6 sm:col-span-3">
                         <label class="block text-sm font-medium text-gray-700">Email</label>
                            <div class="relative">
                                <input type="text" id="email"  class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value="${users.email}">
                                <span class="err absolute right-3 top-3 text-xs "></span>
                            </div>
                         </div>

                         <div class="col-span-6 sm:col-span-3">
                         <label class="block text-sm font-medium text-gray-700">Role</label>
                         <div class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                         <label for="push_everything" class=" text-sm font-medium text-gray-700">
                               Admin
                             </label>
                         <input  type="radio" name="role" value="admin" ${users.role === 1 ? 'checked' : ''} class="role focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300">
                         <label for="push_everything" class=" text-sm font-medium text-gray-700">
                         Customer
                       </label>
                   <input  type="radio" name="role" value="customer" ${users.role === 0 ? 'checked' : ''} class="role focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300">
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

        // const password = $('#password');
        const password2 = $('#password2');
        const email = $('#email');
        const { _id: userId } = JSON.parse(localStorage.getItem('user'));
        const { id } = parseRequestUrl();

        const validateInputPass = password.onchange = async () => {
            const paswordGetApi = {
                password: $('#password').value
            }
            try {
                const { data: password } = await UserApi.checkPassword(id, paswordGetApi);
                setSuccess($('#password'));
                return true;
            } catch (err) {
                setError(password, 'Sai m???t kh???u');
            }

        }

        const validateConfirm = password2.onchange = () => {
            //  confirm pass
            if (validateEmpty(password2.value)) {
                setError(password2, 'Kh??ng ???????c ????? tr???ng!');
            } else {
                if (validatePassword(password.value) == true) {
                    setSuccess(password2);
                    return true;
                } else {
                    setError(password2, 'M???t kh???u c???a b???n y???u !');
                }

            }
        }
        const inputName = name.onchange = () => {
            //name
            if (validateEmpty(name.value)) {
                setError(name, 'Kh??ng ???????c ????? tr???ng!');
            } else {
                setSuccess(name);
                return true;
            }

        }

        const inputEmail = email.onchange = () => {
            //email
            if (validateEmpty(email.value)) {
                setError(email, 'Kh??ng ???????c ????? tr???ng!');
            } else {
                if (validateEmail(email.value) == false) {
                    setError(email, 'Email sai ?????nh d???ng!');
                } else {
                    setSuccess(email);
                    return true;
                }
            }
        }
        $('#form-edit-user').addEventListener('submit', async e => {
            e.preventDefault();
            const role = $('.role');
            var value_role = null;
            for (let i = 0; i < role.length; i++) {
                if (role[i].checked) {
                    value_role = role[i].value;
                    break;
                }
            }
            if (inputName() == true && inputEmail() == true && await validateInputPass() == true && validateConfirm() == true) {
                let image = $('#avatar').files[0];
                if (image) {
                    if (validateFileImage(image) == true ) {
                        setSuccess($('#avatar'));
                        let storageRef = firebase.storage().ref(`images/${image.name}`);
                        storageRef.put(image).then(function () {
                            storageRef.getDownloadURL().then(async (url) => {
                                const user = {
                                    name: $('#name').value,
                                    password: $('#password2').value,
                                    avatar: url,
                                    email: $('#email').value,
                                    role: value_role

                                }
                                try {
                                    await UserApi.edit(id, user, userId)
                                    alert('S???a kh??ch h??ng th??nh c??ng');
                                    window.location.hash = '#/listuser';
                                    await reRender(ListUsers, '#list-users');
                                } catch (err) {
                                    alert(`${err.response.data.error}`);
                                }
                            })
                        })
                    } else {
                        setError($('#avatar'), 'File kh??ng ????ng ?????nh d???ng!');
                    }
                } else {
                    const user = {
                        name: $('#name').value,
                        password: $('#password2').value,
                        avatar: $('#old_image').value,
                        email: $('#email').value,
                        role: value_role

                    }
                    try{
                        await UserApi.edit(id,user,userId)
                        alert('S???a kh??ch h??ng th??nh c??ng');
                        window.location.hash='#/listuser';
                        await reRender(ListUsers, '#list-users');
                    }catch(err){
                        alert(`${err.response.data.error}`);
                    }
                }
            }

        })

    }
}
export default EditUserPage;