import CommentApi from '../../api/CommentApi';
import UserApi from '../../api/UserApi';
import { $ , parseRequestUrl, reRender } from '../../utils';
const Comment = {
    async render(){
        const { id } = parseRequestUrl();
        const { data : comments } = await CommentApi.getByProduct(id);
  
        const user =  JSON.parse(localStorage.getItem('user'));
        
        var arr=[];
        const mapLoop = async ()=>{
            const promise = comments.map(async cmt => {
                const { data:user} = await UserApi.get(cmt.id_user);

                const { name , avatar} = user;
                const obj = {...cmt,name,avatar};
                arr.push(obj);
                return arr;
            })
            const arr_comments=await Promise.all(promise);
            return arr_comments[0];
        }
        const arr_comments =await mapLoop();
      
        return `
            <div class=""> 
                <p class="text-xl my-4 font-semibold  w-full uppercase">Comment</p>
            </div>
            ${arr_comments ? arr_comments.map(cmt=>{
                return `
                <div class="flex my-5">
                    <div class="w-1/12 justify-center  flex">
                        <div class="flex">
                            <img class="inline-block h-16  w-16 rounded-full ring-2 ring-white " src="${cmt.avatar}" alt="">
                        </div>  
                    </div>
                    <div class="w-11/12 bg-gray-300 px-10 py-5 rounded-3xl">
                        <p class="text-lg font-semibold">${cmt.name}</p>
                        <p class="mb-2">${cmt.content}</p>
                        <i class="far fa-thumbs-up text-lg mr-3"></i>
                        <i class="fas fa-share text-lg mr-3"></i>
                        <span>${cmt.createdAt.slice(0,10)}</span>
                    </div>
                </div>
                `
            }).join(''):''}
            
            <hr>
            <div class="flex w-100 h-24 my-8 relative">
                ${user ? `
                    <div class="w-1/12 ">
                        <img class="ml-10 inline-block h-14  w-14 rounded-full ring-2 ring-white " src="${user.avatar}" alt="">
                    </div>

                    <div class="w-11/12 ml-2">
                        <input type="text" class=" w-full py-4 px-3 bg-gray-100 border-none rounded-2xl focus:outline-none" placeholder="Write a comment..."id="content_cmt" >
                        <div class="text-2xl  absolute right-9 top-3">
                            <i class="far fa-smile text-gray-300 mr-2"></i>
                            <i class="fas fa-camera text-gray-300 mr-2"></i>
                            <i class="far fa-sticky-note text-gray-300"></i>
                        </div>
                    </div>
                `:'<a href="#/login" class="text-md text-gray-500">Login to Comment !</a>'}
            </div>
        `
    },
    async afterRender(){
        const user =  JSON.parse(localStorage.getItem('user'));
        const { id } = parseRequestUrl();

        const content=$("#content_cmt");

        content.onkeydown= async(event)=>{
            if(content.value.trim().length>0){
                if(event.keyCode==13){
                    const comment = {
                        "id_user":user._id,
                        "id_product":id,
                        "content":content.value
                    }
                    if(CommentApi.add(comment)){
                        await reRender(Comment,"#list_comment");
                    }
                    
                }
            }  
        }
    }
}
export default Comment;
