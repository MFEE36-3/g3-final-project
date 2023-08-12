import React, { createContext, useState, useEffect} from 'react'
import CheckOutContainer from '@/components/checkout/checkoutcontainer/CheckOutContainer'
import CheckOutPage from '@/components/checkout/checkoutpage/CheckOutPage'
import CheckOutLeft from '@/components/checkout/checkoutleft/CheckOutLeft'
import CheckOutRight from '@/components/checkout/checkoutright/CheckOutRight'
import chocoCookie from '@/public/buyforme/map/chocoCookie.svg';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
export const Cart = createContext()
export default function CheckOutFinal(){
    const [page, setPage] = useState('subscribe')
    const [token, setToken] = useState(false)
    const host = process.env.API_SERVER
    const router = useRouter()
    const [items, setItems] = useState(
        {
        subscribe: [],
        buy: [],
         order:
         [],
         shop:
         [],
        }
       )
    const showPages = (pages) => {
        switch (page){
            case 'subscribe':
                return pages.subscribe;
            case 'buy':
                return pages.buy;
            case 'order':
                return pages.order;
            default:
                return pages.shop
        }
    }
    const [memberInfo, setMemberInfo] = useState([])
    const [memberCoupon, setMemberCoupon] = useState([])
    useEffect(() => {
        const subscribeItem = localStorage.getItem("subscribe");
        const buyItem = localStorage.getItem("buy");
        const orderItem = localStorage.getItem("order");
        const shopItem = localStorage.getItem("shop");
        const parsedSubscribeItem = subscribeItem && Object.values(JSON.parse(subscribeItem)) || [];
        const parsedBuyItem = buyItem &&  Object.values(JSON.parse(buyItem)) || [];
        const parsedOrderItem = orderItem && Object.values(JSON.parse(orderItem))|| [];
        const parsedShopItem = shopItem && Object.values(JSON.parse(shopItem))|| [];
        
        setItems(prev => ({
            ...prev,
            subscribe: parsedSubscribeItem,
            buy: parsedBuyItem,
            order: parsedOrderItem,
            shop: parsedShopItem
        }))
        ///////member
        const member = JSON.parse(localStorage.getItem('auth'))
        if(member) setToken(true)
        if(!member) {
            Swal.fire({
                title: '請先登入',
                iconHtml: `<img src=${chocoCookie.src}>`,
                customClass: {
                    icon: 'sweetalert_icon'
                  },
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: '前往登入',
                denyButtonText: '我再想想',
            }).then(
                function (result) {
                    if (result.value) router.push('/login')
                });
            return;
        }
        const getInfo = async () =>{
            const response = await fetch(`${host}/member`,{
                method: 'GET',
                headers:{
                    'Authorization':`Bearer ${member.token}`
                }})
            const [data] = await response.json()
            
            setMemberInfo(data)
        }
        getInfo()
        
        const getMemberCoupon = async () => {
            const response = await fetch(`${host}/member/coupon`,{
                headers:{
                    'Authorization' : `Bearer ${member.token}`
                }
            })
            const data = await response.json()
            setMemberCoupon(data)
       } 

       getMemberCoupon()
       }, []); 
        // useEffect(()=>{
        //     const updatedShopItems = items.shop.reduce((result, item)=> {
        //       result[item.itemId] = item
        //       return result
        //     },{})
        //     const updatedOrderItems = items.order.reduce((result, item)=> {
        //         result[item.itemId] = item
        //         return result
        //       },{})
        //     const updatedBuyItems = items.buy.reduce((result, item)=> {
        //         result[item.itemId] = item
        //         return result
        //       },{})
        //     const updatedSubscribeItems = items.subscribe.reduce((result, item)=> {
        //         result[item.itemId] = item
        //         return result
        //       },{})
        //     localStorage.setItem('shop',JSON.stringify(updatedShopItems))
        //     localStorage.setItem('order',JSON.stringify(updatedOrderItems))
        //     localStorage.setItem('buy',JSON.stringify(updatedBuyItems))
        //     localStorage.setItem('subscribe',JSON.stringify(updatedSubscribeItems))
        // },[items])
        const debouncedUpdateLocalStorage = debounce(updateLocalStorage, 500);

        function debounce(func, delay) {
            let timer;
            return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, delay);
            };
        }
        function updateLocalStorage() {
            const updatedShopItems = items.shop.reduce((result, item) => {
              result[item.itemId] = item;
              return result;
            }, {});
            const updatedOrderItems = items.order.reduce((result, item) => {
              result[item.itemId] = item;
              return result;
            }, {});
            const updatedBuyItems = items.buy.reduce((result, item) => {
              result[item.itemId] = item;
              return result;
            }, {});
            const updatedSubscribeItems = items.subscribe.reduce((result, item) => {
              result[item.itemId] = item;
              return result;
            }, {});
            localStorage.setItem('shop', JSON.stringify(updatedShopItems));
            localStorage.setItem('order', JSON.stringify(updatedOrderItems));
            localStorage.setItem('buy', JSON.stringify(updatedBuyItems));
            localStorage.setItem('subscribe', JSON.stringify(updatedSubscribeItems));
          }
          useEffect(() => {
            debouncedUpdateLocalStorage();
          }, [items]);
          
    return (
    <>  
        <Cart.Provider value={{page, setPage, items, setItems, showPages, memberInfo, memberInfo, host, memberCoupon}}> 
        <div className='overflow-hidden' style={{fontFamily:"var(--ff1)"}}>      
            <CheckOutContainer>
                {token ? 
                <>
                    <CheckOutPage />
                    <CheckOutLeft />
                    <CheckOutRight />
                </> :
                <div className='d-flex flex-column justify-content-center align-items-center w-100 fs-1'>
                    <img src={chocoCookie.src}></img>
                    <div style={{fontFamily:"Zen Maru Gothic"}}>請先登入會員</div>
                    <Button variant="contained" className='mt-5 fs-2 bg-danger' onClick={()=> router.push("/login")}>前往登入</Button>
                </div>
                }
            </CheckOutContainer> :
        </div>
        </Cart.Provider>
    </>
    )
}



