 <!DOCTYPE html>
 <html lang="ja">

 <head>
     <meta charset="utf-8">
     <meta name="viewport" content="width=device-width, initial-scale=1">

     <title>laravelView側タイトル</title>
     {{-- <!-- @viteReactRefresh は @vite() より先に読み込む必要がある --> --}}
     {{-- Reactのソース変更時に、リロードせずに変更を即座に反映できる --}}
     @viteReactRefresh
     {{-- <!-- @vite() ではエントリポイントとなるファイルを指定 --> --}}
     @vite(['resources/css/app.css', 'resources/scss/app.scss', 'resources/ts/index.tsx'])
 </head>

 <body>
     <!-- index.tsxの内容を追加する部分 -->
     <div id="app"></div>
 </body>

 </html>
