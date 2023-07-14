import { useMemo, useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import styles from '@/styles/buyforme/map/map.module.css'
import shop from '@/public/buyforme/map/shop_icon.svg'

export default function GoogleMapComponent({ data }) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    });

    if (!isLoaded) return <div>Loading...</div>;
    return <Map data={data} />;
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

const user_img = [
    'bubbleTea.svg',
    'candyChief.svg',
    'chip.svg',
    'chocoCookie.svg',
    'sushi.svg',
    'hamburger.svg'
]



function Map({ data }) {
    const [center, setCenter] = useState({ lat: 44, lng: -80 });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            const user_position = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            }
            setCenter(user_position);
        });
    }, []);

    useEffect(() => {
        const map = new window.google.maps.Map(document.getElementById("map"), {
            zoom: 18,
            center: center,
            //mapId: "de35cca39a5847df", // 自訂的地圖識別碼
        });


        new window.google.maps.Marker({
            position: center,
            map: map,
            icon: {
                url: '/buyforme/map/user_icon/' + user_img[Math.floor(user_img.length * Math.random())],
                scaledSize: new window.google.maps.Size(60, 60),
                labelOrigin: new google.maps.Point(30, 70)
            },
            label: {
                text: "匿名食物",
                color: "#4682B4",
                fontSize: 'var(--h7)',
                fontWeight: 'bold',
                className: styles.mapLabel
            },
            opacity: 1,
            animation: google.maps.Animation.BOUNCE,
        });

        data.map((v, i) => {
            new window.google.maps.Marker({
                position: { lat: v.lat, lng: v.lng },
                map: map,
                icon: {
                    url: shop.src,
                    labelOrigin: new google.maps.Point(30, 100)
                },
                label: {
                    text:v.shop,
                    color: "#4682B4",
                    fontSize: 'var(--h7)',
                    fontWeight: 'bold',
                    className: styles.mapLabel
                }
            });
        })


    }, [data, center]);

    return <div id="map" className={styles.map_container} />;
}