import React, { createContext, useContext, useState} from 'react'
import CheckOutContainer from '@/components/checkout/checkoutcontainer/CheckOutContainer'
import CheckOutPage from '@/components/checkout/checkoutpage/CheckOutPage'
import CheckOutLeft from '@/components/checkout/checkoutleft/CheckOutLeft'
import CheckOutRight from '@/components/checkout/checkoutright/CheckOutRight'
import pika from '@/public/trycheckoutimage/pika.jpg'
import poka from '@/public/trycheckoutimage/poka.png'
import hogeda from '@/public/trycheckoutimage/hogeda.png'
import jayni from '@/public/trycheckoutimage/jayni.png'
import miuha from '@/public/trycheckoutimage/miuha.png'

export const Cart = createContext()
export default function CheckOut(){
    const [page, setPage] = useState('subscribe')
    const [items, setItems] = useState(
        {
        subscribe:
        [
            {
                itemId: 1,
                itemName: "皮卡",
                src: pika,
                price: 1200,
                amount:1
            },
            {
                itemId: 2,
                itemName: "皮丘",
                src: pika,
                price: 1500,
                amount:2
            }
        ],
         buy:
         [   
            {
            itemId: 1,
            itemName: "皮卡丘",
            src: pika,
            price: 1200,
            amount:1
            },
            {
            itemId: 2,
            itemName: "新葉喵",
            src: miuha,
            price: 900,
            amount:2
            },
            {
            itemId: 3,
            itemName: "傑尼龜",
            src: jayni,
            price: 69,
            amount:3
            },
            {
            itemId: 4,
            itemName: "呆火鱷",
            src: hogeda,
            price: 520,
            amount:1
            },
            {
            itemId: 5,
            itemName: "波加曼",
            src: poka,
            price: 220,
            amount:5
            },
            {
            itemId: 6,
            itemName: "公的波加曼",
            src: poka,
            price: 720,
            amount:2
            }
         ],
         order:
         [   
             {
               itemId: 1,
               itemName: "皮卡乒",
               src: pika,
               price: 1100,
               amount:1
             },
             {
               itemId: 2,
               itemName: "新葉狗",
               src: miuha,
               price: 450,
               amount:4
             },
             {
               itemId: 3,
               itemName: "傑尼姑",
               src: jayni,
               price: 123,
               amount:2
             },
             {
               itemId: 4,
               itemName: "呆火餓",
               src: hogeda,
               price: 200,
               amount:5
             },
             {
               itemId: 5,
               itemName: "波加慢吞吞",
               src: poka,
               price: 100,
               amount:1
             }
         ],
         shop:
         [   
             {
               itemId: 1,
               itemName: "皮卡乓",
               src: pika,
               price: 900,
               amount:10
             },
        
         ]
         }
       );
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
    const handlePagesDeal = (p) => {
        switch (page){
            case 'subscribe':
                return p.subscribe;
            case 'buy':
                return p.buy;
            case 'order':
                return p.order;
            default:
                return p.shop
        }
    }
    }
    const minus = (p,i) =>{
        setItems(prev => {
            const updateAmount = {...prev,}
        })
    }
    const plus = (p,i) =>{
        setItems(prev => {
            const itemIndex = showPages(prev)?.findIndex(item => item.itemId === i);
            if (itemIndex !== -1) {
            prev[p].amount += 1
            }
            return {...prev}
        })
    }
    return (
    <Cart.Provider value={{page, setPage, items, setItems, showPages ,minus, plus}}>
        <CheckOutContainer>
            <CheckOutPage />
            <CheckOutLeft />
            <CheckOutRight />
        </CheckOutContainer>
    </Cart.Provider>
    )
}
