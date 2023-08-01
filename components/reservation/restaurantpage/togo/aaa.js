// const [ordertime, setOrdertime] = useState();
// const [timepick, setTimepick] = useState();

// const today = new Date();
// const minDate = dayjs(today).add(1, 'day').startOf('day').toDate(); // 明天的开始时间
// const maxDate = dayjs(today).add(31, 'day').endOf('day').toDate(); // 31天后的结束时间

// // 從資料庫取得的店家營業時間
// const shopOpenTimeInfo = {
//     Monday: row.detail?.Monday, // 1 表示營業，0 表示不營業
//     Tuesday: row.detail?.Tuesday,
//     Wednesday: row.detail?.Wednesday,
//     Thursday: row.detail?.Thursday,
//     Friday: row.detail?.Friday,
//     Saturday: row.detail?.Saturday,
//     Sunday: row.detail?.Sunday,
// };

// const openTime = dayjs(row.detail?.open_time, 'HH:mm'); // 將 open_time 字串轉換成 dayjs 物件
// const closeTime = dayjs(row.detail?.close_time, 'HH:mm'); // 將 close_time 字串轉換成 dayjs 物件
// console.log(openTime, closeTime)

// const isShopOpenOnDate = (date) => {
//     const dayOfWeek = date.day(); // 將 date 轉換為 dayjs，取得星期幾的值
//     const dayOfWeekString = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
//     return shopOpenTimeInfo[dayOfWeekString] === 1;
// };

// // const shouldDisableDate = (date) => {
// //     if (!date || date.isBefore(minDate) || date.isAfter(maxDate)) {
// //         return true;
// //     }
// //     return !isShopOpenOnDate(date);
// // };

// const shouldDisableDate = (date) => {
//     if (!date) {
//         return true;
//     }

//     const selectedDateWithoutTime = dayjs(date).startOf('day');
//     if (selectedDateWithoutTime.isBefore(minDate) || selectedDateWithoutTime.isAfter(maxDate)) {
//         return true;
//     }

//     return !isShopOpenOnDate(selectedDateWithoutTime);
// };

// const shouldDisableTime = (time) => {
//     if (!time) {
//         return true;
//     }
//     const selectedTime = dayjs(time);
//     return selectedTime.isBefore(openTime) || selectedTime.isAfter(closeTime);
// };

// const handledatetime = (datetime) => {
//     setOrdertime(datetime);
// };

// const handletime = (time) => {
//     setTimepick(time);
// };