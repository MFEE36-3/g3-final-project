import React, { createContext, useState, useEffect} from 'react'
import CheckOutContainer from '@/components/checkout/checkoutcontainer/CheckOutContainer'
import CheckOutPage from '@/components/checkout/checkoutpage/CheckOutPage'
import CheckOutLeft from '@/components/checkout/checkoutleft/CheckOutLeft'
import CheckOutRight from '@/components/checkout/checkoutright/CheckOutRight'
export const Cart = createContext()
export default function CheckOutFinal(){
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
        }, []); 
    const [page, setPage] = useState('subscribe')
    const [items, setItems] = useState(
        {
        subscribe: [],
        buy: [],
         order:
         [],
         shop:
         [],
        fee:0
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
    return (
    <>  
        <Cart.Provider value={{page, setPage, items, setItems, showPages}}>
            <CheckOutContainer>
                <CheckOutPage />
                <CheckOutLeft />
                <CheckOutRight />
            </CheckOutContainer>
        </Cart.Provider>
    </>
    )
}



