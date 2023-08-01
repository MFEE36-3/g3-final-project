import { useMemo, useState, useEffect, useRef } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import axios from "axios";
import styles from '@/styles/buyforme/map/map.module.css';
import shop from '@/public/buyforme/map/shop_icon.svg';
import Btn from "@/components/common/btn";
import star from '@/public/buyforme/map/star.svg';



export default function GoogleMapComponent({ data, chat, mapcolor, openForm, setOpenForm, setOpentargetstore, review_data, destination }) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    });

    if (!isLoaded) return <div>Loading...</div>;
    return <Map data={data} chat={chat} mapcolor={mapcolor} openForm={openForm} setOpenForm={setOpenForm} setOpentargetstore={setOpentargetstore} review_data={review_data} destination={destination} />;
}

{// const ramens = [
    //     { shop: "双豚ラーメン", lat: 25.027492494837038, lng: 121.46519250548808 },
    //     { shop: "烹星", lat: 25.05607, lng: 121.52514 },
    //     { shop: "Okaeriお帰り你回來啦拉麵", lat: 25.04392, lng: 121.55372 },
    // ];

    // function Map() {

    //     //const center = useMemo(() => ({ lat: 44, lng: -80 }), []);
    //     const [center, setCenter] = useState({ lat: 44, lng: -80 });


    //     useEffect(() => {
    //         navigator.geolocation.getCurrentPosition(function (position) {
    //             const user_position = {
    //                 lat: position.coords.latitude,
    //                 lng: position.coords.longitude,
    //             }
    //             setCenter(user_position);
    //             //localStorage.setItem('center',JSON.stringify(center))
    //         })
    //     }, [])


    //     console.log(center)



    //     return (
    //         <GoogleMap zoom={18} center={center} mapContainerClassName={styles.map_container} mapId="de35cca39a5847df" >
    //             <Marker position={center} icon={{ url: '/28a8513919088d3328aaa40284c6b13e.png', scaledSize: new google.maps.Size(50, 50),}}/>
    //             {ramens.map((v, i) => <Marker position={{ lat: v.lat, lng: v.lng }} icon={shop.src} label={v.shop} title={v.shop} />)}

    //         </GoogleMap>
    //     );
}

const random_user = [
    { img: 'bubbleTea.svg', title: '匿名珍奶' },
    { img: 'candyChief.svg', title: '匿名糖果' },
    { img: 'chip.svg', title: '匿名薯片' },
    { img: 'chocoCookie.svg', title: '匿名餅乾' },
    { img: 'sushi.svg', title: '匿名壽司' },
    { img: 'hamburger.svg', title: '匿名漢堡' }
];

const random_message = [
    '好想吃咖哩!',
    '要加香菜嗎',
    '肚子好餓哦...',
    '有人可以幫買漢堡咪?',
    '怎麼可以這麼熱...',
    '是不是只有兩碗粉',
    '等等偷偷溜去吃滷肉飯，嘻嘻',
    '一袋米要扛幾樓',
    '已躺平zzz',
    '出來打球啊!你當球!',
    '不可能有人把芋頭丟進火鍋煮吧...',
    '好想下班ˊˋ'
];

const random_position = [
    { lat: 24.99883334798432, lng: 121.55824714153377 },
    { lat: 24.996518543558725, lng: 121.51940435489351 },
    { lat: 25.02657602887414, lng: 121.5267783670195 },
    { lat: 25.052712344481815, lng: 121.46891973720228 },
    { lat: 25.06665260769572, lng: 121.52485288879733 },
    { lat: 25.055672073596742, lng: 121.60199310450444 },
    { lat: 25.137069802019663, lng: 121.77767811412008 },
    { lat: 25.135237830131906, lng: 121.54031159842071 },
    { lat: 25.024071745923848, lng: 121.45247414736272 },
    { lat: 25.198846967293726, lng: 121.4386946674482 },
    { lat: 25.068210168775234, lng: 121.62938915434017 },
    { lat: 24.96717931902334, lng: 121.43728609768444 },
];


// -----------地圖樣式------------
const red_style = [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#fea0a0"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#fea0a0"
            }
        ]
    },
    {
        "featureType": "poi.government",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#fea0a0"
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#fea0a0"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "66CDAA"
            }
        ]
    },
    {
        "featureType": "poi.place_of_worship",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#fea0a0"
            }
        ]
    },
    {
        "featureType": "poi.school",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#fea0a0"
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#fea0a0"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffb4b4"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#fbd5d5"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffdfdf"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#fec0c0"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "	#84C1FF"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "	#84C1FF"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
];

const blue_style = [
    {
        "featureType": "all",
        "elementType": "labels.text",
        "stylers": [
            {
                "color": "#a1f7ff"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 13
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#144b53"
            },
            {
                "lightness": 14
            },
            {
                "weight": 1.4
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#a1f7ff"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#a1f7ff"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#a1f7ff"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#a1f7ff"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#08304b"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#0c4152"
            },
            {
                "lightness": 5
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "labels",
        "stylers": [
            {
                "invert_lightness": true
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#a1f7ff"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "invert_lightness": true
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#a1f7ff"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text",
        "stylers": [
            {
                "color": "#a1f7ff"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "lightness": 25
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
            {
                "lightness": "0"
            },
            {
                "saturation": "0"
            },
            {
                "invert_lightness": true
            },
            {
                "visibility": "simplified"
            },
            {
                "hue": "#00e9ff"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#a1f7ff"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "labels.text",
        "stylers": [
            {
                "color": "#a1f7ff"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#0b3d51"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels",
        "stylers": [
            {
                "invert_lightness": true
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "invert_lightness": true
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "color": "#146474"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#021019"
            }
        ]
    }
];

const pink_style = [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-23"
            },
            {
                "lightness": "27"
            },
            {
                "visibility": "on"
            },
            {
                "gamma": "1"
            },
            {
                "hue": "#ff1800"
            },
            {
                "weight": "0.75"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#e74c3c"
            },
            {
                "saturation": "-59"
            },
            {
                "lightness": "30"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "hue": "#ff1800"
            },
            {
                "saturation": "2"
            },
            {
                "lightness": "2"
            },
            {
                "weight": "0.75"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "saturation": "-51"
            },
            {
                "color": "#cbcbcb"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#2c3e50"
            },
            {
                "visibility": "on"
            }
        ]
    }
];


// ------------搜尋半徑樣式--------------

const search_radius = [
    {
        color: '#911010',
        meter: 500,
    },
    {
        color: '#999999',
        meter: 1000,
    },
];





function Map({ data, chat, mapcolor, openForm, setOpenForm, setOpentargetstore, review_data, destination }) {
    const [center, setCenter] = useState({ lat: 44, lng: -80 });
    const [usercenter, setUserCenter] = useState({ lat: 44, lng: -80 });
    const routeAnimationRef = useRef(null);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [review, setReview] = useState([]);


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            const user_position = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            }
            setUserCenter(user_position);
            setCenter(user_position);
        });
    }, []);

    useEffect(() => {


        //抓地點座標
        const geocoder = new google.maps.Geocoder();
        //let address = '台大'; //先給個測試地點


        //顯示路線
        const directionsService = new google.maps.DirectionsService();
        const directionsDisplay = new google.maps.DirectionsRenderer({
            polylineOptions: {
                strokeColor: 'transparent',
            },
            suppressMarkers: true,
        });


        const map = new window.google.maps.Map(document.getElementById("map"), {
            zoom: 13,
            center: center,
            // mapId: "de35cca39a5847df", // 自訂的地圖識別碼
            styles: mapcolor ? blue_style : red_style,
            mapTypeControl: false,
        });

        search_radius.map((v) => {
            const cityCircle = new google.maps.Circle({
                strokeColor: !mapcolor ? v.color : '#FFD306',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: !mapcolor ? v.color : '#FFD306',
                fillOpacity: 0.1,
                map: map,
                center: usercenter,
                radius: v.meter,
            })
        })

        //嘗試console地點座標
        // geocoder.geocode({ 'address': address }, function (results, status) {
        //     if (status === 'OK') {
        //         console.log(results[0].geometry.location.lat(), results[0].geometry.location.lng())
        //         // map.setCenter(results[0].geometry.location);
        //         const search_marker = new google.maps.Marker({
        //             map: map,
        //             position: results[0].geometry.location
        //         });
        //     } else {
        //         console.log(status);
        //     }
        // });

        if (destination.lat) {
            //放置路線圖層
            directionsDisplay.setMap(map);
            //測試路線

            const request = {
                origin: usercenter,
                destination: destination,
                travelMode: 'WALKING'
            };
            // 繪製目的地路線
            directionsService.route(request, function (result, status) {
                if (status === 'OK') {
                    // 回傳路線上每個步驟的細節
                    //console.log(result.routes[0].legs[0].steps);
                    directionsDisplay.setDirections(result);

                    //拿出設定的路線重畫路線
                    const routePath = result.routes[0].overview_path
                    const lineSymbol = {
                        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                        scale: 5,
                        strokeColor: "#393",
                    };

                    const line = new google.maps.Polyline({
                        path: routePath,
                        strokeColor: 'yellow',
                        strokeWeight: 5,
                        icons: [
                            {
                                icon: lineSymbol,
                                offset: "100%",
                            },
                        ],
                        map: map,
                    });

                    animateArrow(line);



                } else {
                    console.log(status);
                }
            });

            //目的地地標


            const search_marker = new google.maps.Marker({
                map: map,
                position: destination,
                label: {
                    text: '取餐地點',
                    className: styles.userLabel,
                },
                icon: {
                    url: '/buyforme/map/destination.svg',
                    scaledSize: new window.google.maps.Size(40, 40),
                    labelOrigin: new window.google.maps.Point(20, 60)
                },
                animation: window.google.maps.Animation.BOUNCE,
            });
        }


        // -------------- 使用者本人位置與圖標 ----------------

        const random_character = random_user[Math.floor(random_user.length * Math.random())];

        const userMarker = new window.google.maps.Marker({
            position: usercenter,
            map: map,
            icon: {
                url: '/buyforme/map/user_icon/' + random_character.img,
                scaledSize: new window.google.maps.Size(60, 60),
                labelOrigin: new window.google.maps.Point(30, 80)
            },
            label: {
                text: random_character.title,
                className: styles.userLabel
            },
            opacity: 1,
            animation: window.google.maps.Animation.BOUNCE,
        });


        //使用者聊天框框
        const infowindow = new google.maps.InfoWindow({
            content: `<div id="chatbox" class=${styles.chatbox_message}>${chat}</div>`,
            pixelOffset: new google.maps.Size(0, -30),
            maxWidth: 300,
        });

        //預設開啟使用者聊天訊息
        infowindow.open(map, userMarker);

        const open_chat_message = userMarker.addListener('click', () => {
            // 點擊打開使用者聊天訊息
            infowindow.open(map, userMarker);
        });


        // -------------- 隨機角色位置與圖標 ----------------


        //洗牌用 直接洗掉原陣列就好
        function shuffleArray(array) {
            return array.sort(() => Math.random() - 0.5);
        }

        shuffleArray(random_message);
        shuffleArray(random_position);


        random_position.map((v, i) => {
            if (Math.random() < 0.5) return;

            const random_player = random_user[Math.floor(random_user.length * Math.random())];

            const playerMarker = new window.google.maps.Marker({
                position: v,
                map: map,
                icon: {
                    url: '/buyforme/map/user_icon/' + random_player.img,
                    scaledSize: new window.google.maps.Size(60, 60),
                    labelOrigin: new window.google.maps.Point(30, 80)
                },
                label: {
                    text: random_player.title,
                    className: styles.userLabel
                },
                opacity: 1,
            });


            //使用者聊天框框
            const infowindow = new google.maps.InfoWindow({
                content: `<div id="chatbox" class=${styles.chatbox_message}>${random_message[i]}</div>`,
                pixelOffset: new google.maps.Size(0, -30),
                maxWidth: 300,
            });

            const open_chat_message = playerMarker.addListener('click', () => {
                // 點擊打開使用者聊天訊息
                infowindow.open(map, playerMarker);
            });

        })




        // -------------- 建立店家位置與圖標 ----------------

        //const markers = []; // 存儲所有的 shopMarker


        // 僅建立一個 infowindow 點擊時才設定資訊
        const shop_infowindow = new google.maps.InfoWindow({
            content: '',
            pixelOffset: new google.maps.Size(0, -30),
            maxWidth: 600,
        });


        data.map((v, i) => {
            const shopMarker = new window.google.maps.Marker({
                position: { lat: Number(v.latitude), lng: Number(v.longitude) },
                map: map,
                icon: {
                    url: shop.src,
                    labelOrigin: new window.google.maps.Point(25, 70),
                    scaledSize: new window.google.maps.Size(50, 50),
                },
                label: {
                    text: v.shop,
                    className: styles.mapLabel
                },
                animation: window.google.maps.Animation.DROP,
            });

            //markers.push(shopMarker); // 將每個 shopMarker 存入 markers 陣列

            const shop_click = shopMarker.addListener('click', () => {
                // 點擊 Marker 的事件處理程式
                map.setCenter({ lat: Number(v.latitude), lng: Number(v.longitude) });
                setSelectedMarker(v.shop);
                
                // 設定視窗內容
                shop_infowindow.setContent(`
                <div id="${v.shop}" class=${styles.shop_infowindow_title}>${v.shop}</div>
                <div class=${styles.shop_infowindow_img_box}>
                <div class=${styles.shop_infowindow_img} style="background-image:url(${process.env.API_SERVER}/img/res-img/0f15caf1-60a3-4825-92df-dd14853ec9d5.jpg)"></div>
                </div>
                <div class=${styles.shop_infowindow_tag_star}>
                <div class=${styles.shop_infowindow_star}>
                <div style="background-image:url(${star.src})" class=${styles.star_img}></div>
                <div>${v.rating}</div>
                </div>
                <div class=${styles.shop_infowindow_tag}>${v.res_cate}</div>
                </div>
                <div class=${styles.shop_infowindow_description}>${v.res_desc}</div>
                ${review_data.rows.filter((review) => review.sid === v.sid) // 篩選符合 v.sid 的評論
                        .map((review) => {
                            if (review.review)
                                return review.review.map((reviewItem) => {
                                    const random_character = random_user[Math.floor(random_user.length * Math.random())];
                                    return (
                                        `<div class=${styles.shop_infowindow_review_box}>
                            <div style="background-image:url('/buyforme/map/user_icon/${random_character.img}')" class=${styles.shop_infowindow_review_img}></div>
                            <div class=${styles.shop_infowindow_review}>${reviewItem.text}</div>
                          </div>`
                                    );
                                }).join('');
                        })
                        .join('')
                    }
                <botton class='btn btn-info ${styles.shop_infowindow_btn}' id="btn_${v.sid}">開團GO!<botton>
                `);
                shop_infowindow.open(map, shopMarker);


            });
            //設定事件
            google.maps.event.addListener(shop_infowindow, "domready", () => {
                const shop_infowindowElement = document.getElementById(`btn_${v.sid}`); // 取得 InfoWindow DOM 元素
                if (shop_infowindowElement) {
                    shop_infowindowElement.addEventListener("click", () => {
                        // 在這裡處理 click 事件
                        setOpenForm(true);
                        setOpentargetstore(v.sid);
                    });
                };
            });
        });


        //跑起來太卡 可惜了

        // // 監聽地圖的縮放層級變化
        // google.maps.event.addListener(map, "zoom_changed", function () {
        //     const currentZoom = map.getZoom();
        //     // 根據地圖縮放層級做相應處理
        //     if (currentZoom >= 15) {
        //         // 在這裡放入放大時標記大小及標籤的處理邏輯
        //         markers.forEach((marker) => {
        //             marker.setIcon({
        //                 url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png", // 新標記圖示
        //                 scaledSize: new google.maps.Size(50, 50), // 新標記大小
        //             });
        //             marker.setLabel("B"); // 新標籤
        //         });
        //     } else {
        //         // 在這裡放入縮小時標記大小及標籤的處理邏輯
        //         markers.forEach((marker) => {
        //             marker.setIcon({
        //                 url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png", // 初始標記圖示
        //                 scaledSize: new google.maps.Size(30, 30), // 初始標記大小
        //             });
        //             marker.setLabel("A"); // 初始標籤
        //         });
        //     }
        // });


        // 監聽地圖的縮放層級變化
        google.maps.event.addListener(map, "zoom_changed", function () {
            const currentZoom = map.getZoom();
            // 若地圖縮放層級大於等於某個值，改變標記大小及標籤
            if (currentZoom >= 15) {                                           //放大後大小
                userMarker.setIcon({
                    url: '/buyforme/map/user_icon/' + random_character.img,
                    scaledSize: new window.google.maps.Size(35, 35),
                    labelOrigin: new window.google.maps.Point(17.5, 50)
                });
                userMarker.setLabel({
                    text: random_character.title,
                    className: styles.userLabel_small
                });
                if (destination.lat) {
                    // search_marker.setIcon({
                    //     url: '/buyforme/map/destination.svg',
                    //     scaledSize: new window.google.maps.Size(20, 20),
                    //     labelOrigin: new window.google.maps.Point(0, 40)
                    // });
                    search_marker.setLabel({
                        text: '取餐地點',
                        className: styles.userLabel_small
                    });
                }
            } else {                                                           //原本大小
                userMarker.setIcon({
                    url: '/buyforme/map/user_icon/' + random_character.img,
                    scaledSize: new window.google.maps.Size(60, 60),
                    labelOrigin: new window.google.maps.Point(30, 80)
                });
                userMarker.setLabel({
                    text: random_character.title,
                    className: styles.userLabel
                });
                if (destination.lat) {
                    search_marker.setIcon({
                        url: '/buyforme/map/destination.svg',
                        scaledSize: new window.google.maps.Size(40, 40),
                        labelOrigin: new window.google.maps.Point(20, 60)
                    });
                    search_marker.setLabel({
                        text: '取餐地點',
                        className: styles.userLabel
                    });
                }
            }
        });




        return (() => {
            // 清除地圖上的事件監聽器和標記
            google.maps.event.clearInstanceListeners(map);
            if (routeAnimationRef.current) {
                clearInterval(routeAnimationRef.current);
            }
            // 移除地圖元素
            const mapElement = document.getElementById("map");
            if (mapElement && mapElement.firstChild) {
                mapElement.removeChild(mapElement.firstChild);
            }
        })


    }, [data, center, chat, mapcolor, usercenter, destination]);

    // Use the DOM setInterval() function to change the offset of the symbol
    // at fixed intervals.
    function animateArrow(line) {
        let count = 0;

        routeAnimationRef.current = setInterval(() => {
            count = (count + 1) % 200;

            const icons = line.get("icons");

            icons[0].offset = count / 2 + "%";
            line.set("icons", icons);
            // console.log(count)
        }, 30);

    }

    return <div id="map" className={styles.map_container} />;
}