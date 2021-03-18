import { $,reRender,parseRequestUrl } from '../src/utils';
import ProductApi from '../src/api/ProductApi';
export const up_cart =(currentpage)=>{
    const arr_product_cart = JSON.parse(localStorage.getItem('arr_product_cart'));
    //  up qty
    const btns_up_qty=$('#cart .btn_up_qty');
        if(btns_up_qty.length){
            btns_up_qty.forEach(btn_up_qty=>{
                const id = btn_up_qty.dataset.id;
                btn_up_qty.onclick=async ()=>{   
                    const find_id=arr_product_cart.findIndex(ele=>ele.id==id); 
                    const sl=arr_product_cart[find_id].sl;
                    const object_product={...arr_product_cart[find_id],sl:sl+1};
                    arr_product_cart.splice(find_id,1,object_product);
                    localStorage.setItem('arr_product_cart',JSON.stringify(arr_product_cart));
                    await reRender(currentpage,'#main-content');
                }
            });
        }else{
            
            btns_up_qty.onclick=async ()=>{   
                const id = btns_up_qty.dataset.id;
                const find_id=arr_product_cart.findIndex(ele=>ele.id==id); 
                const sl=arr_product_cart[find_id].sl;
                const object_product={...arr_product_cart[find_id],sl:sl+1};
                arr_product_cart.splice(find_id,1,object_product);
                localStorage.setItem('arr_product_cart',JSON.stringify(arr_product_cart));
                await reRender(currentpage,'#main-content');
            }
        }
    
}
export const down_cart = (currentpage)=>{
    const arr_product_cart = JSON.parse(localStorage.getItem('arr_product_cart'));
    //  down qty 
    const btns_down_qty=$('#cart .btn_down_qty');
    if(btns_down_qty.length){
        btns_down_qty.forEach(btn_down_qty=>{
            const id = btn_down_qty.dataset.id;
            btn_down_qty.onclick=async ()=>{
                const find_id=arr_product_cart.findIndex(ele=>ele.id==id); 
                const sl=arr_product_cart[find_id].sl;
                if(sl>1){
                    const object_product={...arr_product_cart[find_id],sl:sl-1};
                    arr_product_cart.splice(find_id,1,object_product);
                    localStorage.setItem('arr_product_cart',JSON.stringify(arr_product_cart));
                    await reRender(currentpage,'#main-content');
                }
            }
        })
    }else{
        
        btns_down_qty.onclick=async ()=>{
            const id = btns_down_qty.dataset.id;
            const find_id=arr_product_cart.findIndex(ele=>ele.id==id); 
            const sl=arr_product_cart[find_id].sl;
            if(sl>1){
                const object_product={...arr_product_cart[find_id],sl:sl-1};
                arr_product_cart.splice(find_id,1,object_product);
                localStorage.setItem('arr_product_cart',JSON.stringify(arr_product_cart));
                await reRender(currentpage,'#main-content');
            }
            
        }
    }
}
export const modal_add_cart = (product)=>{
    const { resource : url } = parseRequestUrl();
    //modal add cart
    const modal_add_cart = $('#modal_add_cart');
    $('#name_product_add_cart_modal').innerHTML=`${product.name}`;
    $('#main-content').classList.add("blur-md");
    $('#main-content').style.pointerEvents="none";
    $('#main-content').style.filter = "constact(0.1%)";
    modal_add_cart.classList.remove("hidden");
    $('#delete_modal_cart').onclick=()=>{
        modal_add_cart.classList.add("hidden");
        $('#main-content').classList.remove("blur-md");
        $('#main-content').style.pointerEvents="";
    }
    
    $('#continue_shopping').onclick=()=>{
        window.location.hash=`#/${url ? url : ''}`;
        modal_add_cart.classList.add("hidden");
        $('#main-content').classList.remove("blur-md");
        $('#main-content').style.pointerEvents="";
    }
    $('#view_cart').onclick=()=>{
        window.location.hash='#/cart';
        modal_add_cart.classList.add("hidden");
        $('#main-content').classList.remove("blur-md");
        $('#main-content').style.pointerEvents="";
    }
    // end modal add cart
}

export const add_cart = (currentpage)=>{
     //add-cart
    const btns = $('.add-to-cart');
    if(btns.length){
        btns.forEach( btn => {
            const id = btn.dataset.id;
            btn.onclick =async () => {   

                const { data : product } = await ProductApi.get(id);
                
                modal_add_cart(product);
                if(localStorage.getItem('arr_product_cart')==null){
                    localStorage.setItem('arr_product_cart','[]');
                }
                
                let arr_product_cart=JSON.parse(localStorage.getItem('arr_product_cart'));
   
                if(arr_product_cart.length===0){
                    const object_product = {...product,sl:1};
                    arr_product_cart.push(object_product);   
                   
                }else{
   
                    const arr_id=arr_product_cart.map(obj=>obj.id);  // mảng id 
                    
                    const find_id=arr_id.findIndex(ele=>ele==id); // index id tìm thấy 
                    // nếu tìm thấy id 
                    if(find_id!=-1){
                        const sl=arr_product_cart[find_id].sl;
                        console.log('trung id'+find_id+'so luong'+sl);
                        const object_product = {...product,sl:sl+1};
                        arr_product_cart.splice(find_id,1,object_product);
   
                    }else{
                        console.log('k trung id');
                        const object_product = {...product,sl:1};
                        arr_product_cart.push(object_product); 
                    }
                }    
                localStorage.setItem('arr_product_cart',JSON.stringify(arr_product_cart));
                await reRender(currentpage,'#main-content');
            }
            
        });
    }else{
        const id = btns.dataset.id;
        btns.onclick =async () => {   
            const { data : product } = await ProductApi.get(id);
            modal_add_cart(product);

            if(localStorage.getItem('arr_product_cart')==null){
                localStorage.setItem('arr_product_cart','[]');
            }
                
            let arr_product_cart=JSON.parse(localStorage.getItem('arr_product_cart'));
   
            if(arr_product_cart.length===0){
                const object_product = {...product,sl:1};
                arr_product_cart.push(object_product);   
                   
            }else{
   
                const arr_id=arr_product_cart.map(obj=>obj.id);  // mảng id 
                
                const find_id=arr_id.findIndex(ele=>ele==id); // index id tìm thấy 
                    // nếu tìm thấy id 
                if(find_id!=-1){
                    const sl=arr_product_cart[find_id].sl;
                    console.log('trung id'+find_id+'so luong'+sl);
                    const object_product = {...product,sl:sl+1};
                    arr_product_cart.splice(find_id,1,object_product);
   
                }else{
                    console.log('k trung id');
                    const object_product = {...product,sl:1};
                    arr_product_cart.push(object_product); 
                }
            }
            localStorage.setItem('arr_product_cart',JSON.stringify(arr_product_cart));
            await reRender(currentpage,'#main-content');
        }
    }
     
    
}