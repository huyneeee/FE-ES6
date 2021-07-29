import { axiosClient } from './axiosClient';
const AuthApi = {
    getAll(){
        const url = `/users`;
        return axiosClient.get(url);
    },
    signIn(profile){
        const url = `/signin`;
        return axiosClient.post(url,profile);
    },
    signUp(profile){
        const url = `/signup`;
        return axiosClient.post(url,profile);
    },
    signOut(){
        const url = `/signout`;
        return axiosClient.get(url);
    }

}
export default AuthApi;