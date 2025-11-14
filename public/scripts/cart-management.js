const addToCardButtonElement=document.querySelector('#product-details btn');
const cartBadgeElement=document.querySelector('.nav-items .badge');

async function addToCart(){
    const productId=addToCardButtonElement.dataset.productid;
    const csrfToken=addToCardButtonElement.dataset.csrf;
    let response;
    try{
      response=await fetch('/cart/items',{
        method:'POST',
        body:JSON.stringify({
            productId:productId,
            _csrf:csrfToken
        }),
        headers:{
            'Content-type':'application/json'
        }

    });
    }catch(error){
        alert('something went wrong!');
        return;
    }

    if(!response){
        alert('something went wrong!');
        return;
    }

    const responseData=await response.json();

    const newTotalQuantity=responseData.newTotalItems;

    cartBadgeElement.textContent=newTotalQuantity;
    
}


addToCardButtonElement.addEventListener("click",addToCart);
