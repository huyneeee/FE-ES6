import UserApi from '../src/api/UserApi';
import { $ } from '../src/utils';
export const validateEmail = (email)=>{
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
export const validatePassword = (password)=>{
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return re.test(String(password).toLowerCase());
}
export const validateEmpty = (x) =>{
    if(x.trim()===''){
        return true;
    }
}
export const validateUserText = (username)=>{
    return /^[a-zA-Z0-9_]{5,30}$/.test(username);
}
export const validateUserValid = async(x)=>{
    const { data : users } = await UserApi.getAll();
    const find_user = users.find(user=>user.username===x.value.trim());
    if(find_user){
        return false;
    }else{
        return true;
    }
}
export const validateFileImage = (file)=>{
    const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png','image/jpg'];
    return file && acceptedImageTypes.includes(file['type'])
}
export const validatePhone = (phone)=>{
    return /((09|03|07|08|05)+([0-9]{8})\b)/.test(phone);
}

export const setError=(input,message)=>{
    const formControl = input.parentElement;
    const border=formControl.firstElementChild;
    const small=formControl.querySelector('span');
    while (small.firstChild) {
        small.removeChild(small.firstChild);
    }
    small.appendChild(document.createTextNode(message));
    small.appendChild(document.createElement("i"));
    small.querySelector('i').classList.add("fas","fa-exclamation-circle");
    small.classList.remove("text-green-400");
    small.classList.add("text-red-400");   
    border.style.border="1px solid red";
}
export const setSuccess=(input)=>{
    const formControl = input.parentElement;
    // const border=formControl.querySelector('input');
    const border=formControl.firstElementChild;
    const small=formControl.querySelector('span');
    while (small.firstChild) {
        small.removeChild(small.firstChild);
    }
    small.appendChild(document.createElement("i"));
    small.querySelector('i').classList.add("fas","fa-check-circle");
    small.classList.remove("text-red-400");
    small.classList.add("text-green-400");
    border.style.border="1px solid green";
}