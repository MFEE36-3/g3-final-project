import React, { createContext, useState, useEffect} from 'react'
import CheckOutContainer from '@/components/checkout/checkoutcontainer/CheckOutContainer'
import CheckOutPage from '@/components/checkout/checkoutpage/CheckOutPage'
import CheckOutLeft from '@/components/checkout/checkoutleft/CheckOutLeft'
import CheckOutRight from '@/components/checkout/checkoutright/CheckOutRight'
export const Cart = createContext()
export default function CheckOutFinal(){
    const [page, setPage] = useState('subscribe')
    const [orderId, setOrderId] = useState('')
    // const host = "http://192.168.50.169:8000"
    const host = "http://127.0.0.1:3002"
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
    const [memberInfo, setMemberInfo] = useState({})
  ///fetch api  localhost3000 blablablab / memberInfo.sid 
    const member = {
        sid:1,
        nickname:'皮卡丘的朋友',
        name:'解膩龜',
        address:'全家',
        phone:'0912345657',
      }
    useEffect(() => {
        const subscribeItem = localStorage.getItem("subscribe");
        const buyItem = localStorage.getItem("buy");
        const orderItem = localStorage.getItem("order");
        const shopItem = localStorage.getItem("shop");
        const parsedSubscribeItem = subscribeItem && Object.entries(JSON.parse(subscribeItem)).map(items => items.pop()) || [];
        const parsedBuyItem = buyItem &&  Object.entries(JSON.parse(buyItem)).map(items => items.pop())|| [];
        const parsedOrderItem = orderItem && Object.entries(JSON.parse(orderItem)).map(items => items.pop())|| [];
        const parsedShopItem = shopItem && Object.entries(JSON.parse(shopItem)).map(items => items.pop())|| [];

        setItems(prev => ({
            ...prev,
            subscribe: parsedSubscribeItem,
            buy: parsedBuyItem,
            order: parsedOrderItem,
            shop: parsedShopItem
        }))
        ///////member
        const member = JSON.parse(localStorage.getItem('auth'))
        setMemberInfo(member)
        }, []); 
        useEffect(()=>{
            const subscribeItem = JSON.parse(localStorage.getItem("subscribe"));
            const buyItem = JSON.parse(localStorage.getItem("buy"));
            const orderItem = JSON.parse(localStorage.getItem("order"));
            const shopItem = JSON.parse(localStorage.getItem("shop"));
            const updatedShopItems = items.shop.reduce((result, item)=> {
              result[item.itemId] = item
              return result
            },{})
            localStorage.setItem('shop',JSON.stringify(updatedShopItems))
        },[items])
    return (
    <>  
        <Cart.Provider value={{page, setPage, items, setItems, showPages, memberInfo, member, host}}>
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



