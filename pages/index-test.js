// import 你寫好的layout檔案
import BlankLayout from '@/components/layout/blank-layout'


const Home =()=>{
  
  return (
    <>
      <p>This is a test page</p>
    </>
  )
}

// 把你要用的layout 設定成你頁面的getLayout屬性
Home.getLayout = BlankLayout

export default Home
