import { useMemo, useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import styles from '@/styles/buyforme/map/map.module.css'
import shop from '@/public/buyforme/map/shop_icon.svg'

export default function GoogleMapComponent({ data, chat, mapcolor }) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    });

    if (!isLoaded) return <div>Loading...</div>;
    return <Map data={data} chat={chat} mapcolor={mapcolor} />;
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
]


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
]

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
]

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
]


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
]


function Map({ data, chat, mapcolor }) {
    const [center, setCenter] = useState({ lat: 44, lng: -80 });
    const [usercenter, setUserCenter] = useState({ lat: 44, lng: -80 });

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
        const map = new window.google.maps.Map(document.getElementById("map"), {
            zoom: 14,
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
            content: `<div id="chatbox">${chat}</div>`,
            pixelOffset: new google.maps.Size(0, -30),
            maxWidth: 300,
        });

        google.maps.event.addListener(infowindow, "domready", () => {
            const infoWindowElement = document.getElementById("chatbox"); // 取得 InfoWindow DOM 元素
            infoWindowElement.addEventListener("click", () => {
              // 在這裡處理 click 事件
              console.log("InfoWindow clicked!");
              setCenter({ lat: 0, lng: 180 })
            });
          });

        //預設開啟使用者聊天訊息
        infowindow.open(map, userMarker);

        userMarker.addListener('click', () => {
            // 點擊打開使用者聊天訊息
            infowindow.open(map, userMarker);
        });

        data.map((v, i) => {
            const shopMarker = new window.google.maps.Marker({
                position: { lat: v.lat, lng: v.lng },
                map: map,
                icon: {
                    url: shop.src,
                    labelOrigin: new window.google.maps.Point(30, 100)
                },
                label: {
                    text: v.shop,
                    className: styles.mapLabel
                },
                animation: window.google.maps.Animation.DROP,
            });

            shopMarker.addListener('click', () => {
                // 點擊 Maker 的事件處理程式
                setCenter({ lat: v.lat, lng: v.lng })
                console.log(`${v.shop} Shop Marker 被點擊了`);
                // 在這裡可以執行其他操作或觸發其他函式
            });

            const shop_infowindow = new google.maps.InfoWindow({
                content: `<div id="${v.shop}">123154s6d5adsdawe</div>`,
                pixelOffset: new google.maps.Size(0, -30),
                maxWidth: 300,
            });

            shop_infowindow.open(map, shopMarker);

            shopMarker.addListener('click', () => {
                // 點擊打開使用者聊天訊息
                shop_infowindow.open(map, shopMarker);
            });
        })




    }, [data, center, chat, mapcolor, usercenter]);

    return <div id="map" className={styles.map_container} />;
}