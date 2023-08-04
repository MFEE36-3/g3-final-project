import React, { createContext, useState, useEffect} from 'react'
import CheckOutContainer from '@/components/checkout/checkoutcontainer/CheckOutContainer'
import CheckOutPage from '@/components/checkout/checkoutpage/CheckOutPage'
import CheckOutLeft from '@/components/checkout/checkoutleft/CheckOutLeft'
import CheckOutRight from '@/components/checkout/checkoutright/CheckOutRight'
export const Cart = createContext()
export default function CheckOutFinal(){
    const [page, setPage] = useState('subscribe')
    const host = process.env.API_SERVER
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
        const parsedBuyItem = buyItem &&  Object.values(JSON.parse(buyItem))|| [];
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
        useEffect(()=>{
            const updatedShopItems = items.shop.reduce((result, item)=> {
              result[item.itemId] = item
              return result
            },{})
            const updatedOrderItems = items.order.reduce((result, item)=> {
                result[item.itemId] = item
                return result
              },{})
            const updatedBuyItems = items.buy.reduce((result, item)=> {
                result[item.itemId] = item
                return result
              },{})
            const updatedSubscribeItems = items.subscribe.reduce((result, item)=> {
                result[item.itemId] = item
                return result
              },{})
            localStorage.setItem('shop',JSON.stringify(updatedShopItems))
            localStorage.setItem('order',JSON.stringify(updatedOrderItems))
            localStorage.setItem('buy',JSON.stringify(updatedBuyItems))
            localStorage.setItem('subscribe',JSON.stringify(updatedSubscribeItems))
        },[items])
    return (
    <>  
        <Cart.Provider value={{page, setPage, items, setItems, showPages, memberInfo, memberInfo, host, memberCoupon}}>
            <div className='overflow-hidden'>
                <CheckOutContainer>
                    <CheckOutPage />
                    <CheckOutLeft />
                    <CheckOutRight />
                </CheckOutContainer>
            </div>
        </Cart.Provider>
    </>
    )
}



