
# # 專案共用內容說明

<br>
<br>

1. **資料夾結構**


    (1) components

       *common : 主要的共用元件(input & btn ...)跟測試元件放這裡。
        icons  : 不知道幹嘛的，先放著，大概也不會用到。
       *layout : header,footer,主要layout跟空白layout都放在這邊,
                 除了少數人頁面需要用到客製化layout基本上都不用動這邊。
               


    (2) data
        
        有固定不會動需要呈現在頁面上的資料可以放這邊(不是變動的不用去資料庫撈的資料),
        當然也可以直接寫在自己的頁面上,但可能看起來會比較雜亂。

        依照自己的需求如果是自己頁面用到的就創一個資料夾放自己的data。 e.g. data/member/navbar_titles.json


    (3) hooks

        跟上面一樣，可以寫自己客製的hooks，自己的hooks一樣建一個自己的資料夾丟進去。
       


    (4) public

        你頁面上會用到的圖片放這邊，一樣自己創一個資料夾放。
        商城圖片因為不會再變動，所以所有的圖片可以都丟這裡。
        論壇圖片、商家圖片等等也都丟這邊，
        會員圖片跟商家圖片因為可以讓他上傳，最後再用後端api把圖片存回這邊的資料夾就好。


    (5) styles

        個人的css.module檔一樣自己建一個資料夾丟裡面，然後在自己需要的頁面中引入。
        !!!!!!不要用css檔掛在_app.js上，除非你命名很認真或是class name保證不會跟別人衝突!!!!!!


    (6) pages

        最重要的地方，下面拉出來寫。

<br>
<br>

2. **關於路由**

    pages資料夾內放的通通都是可以直接透過url開啟的頁面，
    所以不必要的東西不要放在這邊，
    目前最外層有放 2 個測試與說明用檔案、api資料夾(老師應該拿來解說用的)、以及posts資料夾。 

    (1) 公用檔案介紹
    
        a. index-test 檔案

            主要demo如果想使用自己客製化layout的情況要怎麼寫


        b. mui-components 檔案

            主要demo丟在components/common資料夾裡面的mui或其他元件要如何使用、
            可以改變樣式的寫法有哪些(當然還有其他做法)，
            以及元件實際的樣子跟用法(包括它內建的取值方法)。

        c. posts

            裡面的[id].js即是示範動態路由的部分，先看看老師上課怎麼教，或是想知道的話我可以先丟範例給你們看。


    (2) 自己的資料夾與頁面

        請依照路由規畫表，建立自己的資料夾，以及下面的頁面們。
        先建好資料夾裡面至少要丟個檔案，不然git push的時候空資料夾會直接不見。

        e.g. pages/member/profile/index.js


    (3) 動態路由

        建立方法如下，
        e.g. /reservation-togo/search/[keywords].js     //第一層動態路由
        e.g. /reservation-togo/search/[keywords]/[advance-keywords].js     //兩層的動態路由


<br>
<br>

3. **mui元件**

    現在有 2 個，一個是 **_Ipnut_** ，一個是 **_Btn_**。

    (1) Input

        可以傳入的參數如下:

        InputTest({label='input name',placeholder='',helperText='',required=false,error=false})
        -------------------------------------------------------------------------------------------        
        label       : 欄位名稱   (default='input name')          //自己改欄位名稱
        placeholder : 欄位提示   (default='')                    //看你要不要用，不用就不要傳這個參數 
        helperText  : 欄位說明   (default='')                    //看你要不要用，不用就不要傳這個參數
        required    : 必填欄位   (default=false)                 //要必填的話就傳 required=true
        error       : 出錯樣式   (default=false)                 //可以寫判斷，填錯或不符欄位要求就設 error=true
    
    (2)

        可以傳入的參數如下:

        Btn({ text = 'set text'})
        -------------------------------------------------------------------------------------------        
        text       : 按鈕名稱   (default='set text')             //自己改按鈕名稱 其他rwd跟css寫好ㄌ

<br>
<br>

4. **環境設置**

    我 git ignore .vscode資料夾了，所以如果想要用老師的prettier設定還有要不要分號設定那些的話，
    <br>再自己寫進 .vscode 的 settings.json檔就可以了。



