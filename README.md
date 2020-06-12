# Создание web приложения на Webpack
## Установка node и npm

## Создаем базовое приложение:
  `npm init -y` - инициализация приложения, создание файла package.json
  `npm install webpack webpack-cli --save-dev` - локальная установка webpack и webpack-cli
  
  1.2. Создаем базовую структуру файлов
     |- package.json
   + |- index.html
   + |- /src
   +   |- router.js
 
  1.3. Производим изменения в package.json
  
          {
            "name": "webpack-demo",
            "version": "1.0.0",
            "description": "",
        +   "private": true, - Приватный доступ к файлам
        -   "main": "router.js", - убираем файл main.js
            "scripts": {
              "test": "echo \"Error: no test specified\" && exit 1"
            },
            "keywords": [],
            "author": "",
            "license": "ISC",
            "devDependencies": {
              "webpack": "^4.20.2",
              "webpack-cli": "^3.1.2"
            },
            "dependencies": {}
          }

  1.4. Меняем стуктуру каталогов, отделяем файлы продакшена в dist и файлы разработки в src
  
          webpack-demo
          |- package.json
        + |- /dist
        +   |- index.html
        - |- index.html
          |- /src
            |- router.js
            
  1.5. Устанавливаем lodash и импортируем в приложение
  `npm install --save lodash`      
  
    src/router.js:
    + import _ from 'lodash';
    +
      function component() {
        const element = document.createElement('div');
    
    -   // Lodash, currently included via a script, is required for this line to work
        element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    
        return element;
      }
    
      document.body.appendChild(component());   
      
  Производим изменения в HTML странице, меняем js файл (main.js - файл, который генерируется webpack при зборке)
  
      <!doctype html>
      <html>
       <head>
         <title>Getting Started</title>
    -    <script src="https://unpkg.com/lodash@4.16.6"></script>
       </head>
       <body>
    -    <script src="./src/router.js"></script>
    +    <script src="main.js"></script>
       </body>
      </html>
      
  1.6. Запускаем скрипт npx webpack - он собирает проект и генерирует main.js для нашего приложения.
  На данном этапе можно открыть файл в браузере. javascript должет отработать.
        
        
## Конфигурация webpack

2.1. Настраиваем конфигурацию в файле webpack.config.js
        
        const path = require('path');
        
        module.exports = {
            entry: './src/router.js', - точка входа в приложение
            output: {
                filename: 'main.js', - конечный файл main.js
                path: path.resolve(__dirname, 'dist'), - путь по которому собирается приложение
            },
        };    
        
   - Запускаем сборку с использованием файла конфигурации:
  `npx webpack --config webpack.config.js`      
  
2.2. Добавляем npm скрипт для запуска webpack.config.js из npm
    в файле package.json добавляем скрипт в скрипты:
    
          {
            "name": "webpack-demo",
            "version": "1.0.0",
            "description": "",
            "scripts": {
        -      "test": "echo \"Error: no test specified\" && exit 1"
        +      "test": "echo \"Error: no test specified\" && exit 1",
        +      "build": "webpack"
            },
     
   Теперь запуск сборки осуществляется через
   `npm run build`  
   
   
   
## Запуск http сервера и разработка серверного приложения:
   3.1. Устанавливаем и запускаем nmp http-server
   `npm install -D http-server`
   - добавляем скрипт запуска в package.json
   `    "start": "http-server ./dist",` и запускаем сервер `npm-start`
   раздаем содержимое из папки ./dist
   
   На данном этапе у нас есть 2 скрипта `npm start` - запускает сервер на порту 8080
   `npm run build` - запускает webpack и делает сборку всего js скрипта в один файл
   
   3.2. Настраиваем девелоперский режим
   
   При запуске приложения в браузере в консоли разработчика можно увидеть только main.js собранный webpack,
   и абсолютно не удобочитаемый. Исправляем, создаем девелоперские настройки запуска:
   - создаем файл webpack.dev.js

    module.exports = {
        mode:'development',
        devtool: 'inline-source-map',
    };
   - создаем скрипт запуска в package.json
   `"webpack-devmode": "webpack -webpack.dev.js  -w"`-w - watch - режим отслеживания изменений
   Теперь в режиме отладки у нас должны быть видны sources -> top -> webpack:// с исходными файлами
   В сумме у нас есть 3 скрипта

    "start": "http-server ./dist", - npm start - запускает http сервер
    "build": "webpack", npm run build - собирает приложение из файла webpack.comfig.js в один файл main.js
    "webpack-devmode": "webpack --config webpack.dev.js  -w" npm run webpack-devmode - запуск в девелоперском режиме.
    
  3.3. Создаем несколько точек входа в приложение (или разделяем проект на несколько файлов js)
  Для наглядности копируем файл router.js в secondary.js и меняем некоторые строки.
  Меняем код webpack.dev.js, прописываем несколько точек входа:
  
        entry: {
            main: './src/router.js',
            secondary: './src.secondary.js'
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist'),
        },
  Для проверки работы импортируем secondary.js в index.html
  `<script src="./dist/secondary.js"></script>`
  В результате должны скомпилироваться 2 файла main.js и secondary.js  
    
    
  
  
## Подключаем babel-loader для компиляции всего кода в простой javascript
Для гарантирования работоспособности приложения во всех браузерах нужна интерпретация js в простой javascript без стрелочных функций и тд, для гарантирования работы во всех браузерах, включая устаревшие.
Для этого подключаем babel-loader к приложению
`npm install -D babel-loader @babel/core @babel/preset-env`  
Добавляем правила обработки в webpack конфиги webpack.config.js и webpack.dev.js:
    
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread']
            }
          }
        }
      ]
    }
    
## Запускаем девелоперский сервер.
   Для того, чтобы не разделять код на код для запуска сервера и код для запуска девелоперского режима
   можно запустить сервер в девелоперском режиме.

   [гайд из документации](https://webpack.js.org/guides/development/#using-webpack-dev-server)   
   - устанавливаем dev server и необходимые зависимости
   
    npm install --save-dev webpack-dev-server
    npm intall --save-dev html-webpack-plugin
    npm install --save-dev clean-webpack-plugin
   
   
   - меняем webpack.config.js
   
    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const { CleanWebpackPlugin } = require('clean-webpack-plugin');
    
    module.exports = {
        mode:'development',
        entry: {
            main: './src/router.js',
            secondary: './src/secondary.js'
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist'),
        },
        devtool: 'inline-source-map',
        devServer: {
            contentBase: './dist',
        },
        plugins: [
            new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
            new HtmlWebpackPlugin({
                title: 'Development',
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-proposal-object-rest-spread']
                        }
                    }
                }
            ]
        }
    };
    
  - производим изменения в package.json, изменяем скрипт запуска
  `"start": "webpack-dev-server --open"` - запуск девелоперского сервера и открытие его в браузере
  - меняем index.html, теперь следует удалить импорт скриптов js, webpack добавит их сам.
  - на данном этапе webpack.dev.js больше не нужен, его можно удалить 
  и собирать приложение командой `npm run build`
  
## Добавляем Vue.js к приложению
   - Устанавливаем vue.js и vue-loader для работы с однофайловыми компонентами
   [гайд](https://vue-loader.vuejs.org/ru/guide/#vue-cli)
   `npm install vue`
   `npm install -D vue-loader vue-template-compiler`
   `npm install -D vue-style-loader css-loader`
   - Добавляем плагин в webpack.config.js
   
    const VueLoaderPlugin = require('vue-loader/lib/plugin')
    ...
    module.exports = {
      module: {
        rules: [
          // ... другие правила
          {
            test: /\.vue$/,
            loader: 'vue-loader'
          }
        ]
      },
      {
              test: /\.css$/,
              use: [
                'vue-style-loader',
                'css-loader'
              ]
      }
      plugins: [
        // убедитесь что подключили плагин!
        new VueLoaderPlugin()
      ]
    }
   - Создаем простой компонент src/pages/Main.vue
   - Добавляем элемент на главную страницу:
   в файле index.html добавляем элемент
    `<div id="vue-app"></div>`
   в файле router.js добавляем прорисовку созданного элемента 
   
    import Vue from 'vue'
    import Main from './pages/Main.vue'
    
    new Vue({
        el:'#vue-app',
        render: a => a(Main)
    
    });
   
  
  ## Protuction приложения
  ### Настройка конфигурации
  - устанавливаем плагин для сборки файлов конфигурации:
  `npm install --save-dev webpack-merge`
  - Разделяем конфигурацию на 3 файла:
  `webpack.common.js` - общие настройки конфигурации
  - включаем все лоадеры и правила обработки файлов
  `webpack.dev.js` - конфигурация для девелоперского режима 
  `webpack.prod.js` - конфигурация для продакшена
  ### Насройка запуска и сборки
  - Меняем package.json, прописываем сборку и запуск девелоперского режима:

        
          "scripts": {
          ...
            "start": "webpack-dev-server --open --config webpack.dev.js",
            "build": "webpack --config webpack.prod.js"
          },
  
  - Добавляем в router.js уведомление о девелоперском режиме
  
    
    + if (process.env.NODE_ENV !== 'production') {
    +   console.log('Looks like we are in development mode!');
    + }  

  Теперь сборка и запуск осуществляется скриптами:
  `npm start` - запуск девелоперского сервера
  `npm run build`  - сборка проекта
  `npm run http-server` - запуск сервера и раздача контента
  
## Добавление роутера и создание нескольких страниц
   ### Установка роутера и настройка приложения
    `npm install vue-router'
    
   создаем файл router/router.js и настраиваем роутер 
      
      import Vue from 'vue'
      import VueRouter from 'vue-router'
      
      import Main from '../pages/Main.vue'
      import Error from '../pages/404.vue'
      
      Vue.use(VueRouter)
      export default new VueRouter({
          mode:'history',
          routes:
              [
                  { path: '/', component: Main },
                  { path: '*', component: Error }
              ]
      
      })

   - Создаем главную страницу приложения ./App.vue и прописываем ссылки на страницы
   !!!ВАЖНО - роутер работает только по ссылкам router-link прямой переход по ссылке localhost/test ничего не даст
   
    App.vue:
    <template>
        <h1>Webpack development application</h1>
                <router-link to="/">Перейти на главную</router-link>
                <router-link to="/test">Перейти к Test</router-link>
                <router-link to="/not-found">Перейти к Error page</router-link>
        
        <router-view></router-view> - здесь будет отображаться содержание маршрутов
    </template>
    
    404.vue - копируем гугловскую
    
   - Добавляем роутер к приложению в файл router.js
   
    import App from './App.vue'
    import router from './router' - в случаи если router находится не в файле router.js тогда путь прописываем полностью ./router/router
    
    new Vue({
        router, //сокращенная запись для router:router
        el:'#vue-app',
        render: a => a(App)    
    }); 
## Добавление vuetify к приложению [guide](https://vuetifyjs.com/ru/getting-started/quick-start/)
   - Установка приложения через npm
   `npm install vuetify`
   `npm install sass sass-loader fibers deepmerge -D`
   - Добавляем правила в webpack.common.js
   
    // webpack.config.js
    
    module.exports = {
      rules: [
        {
          test: /\.s(c|a)ss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              // Requires sass-loader@^7.0.0
              options: {
                implementation: require('sass'),
                fiber: require('fibers'),
                indentedSyntax: true // optional
              },
              // Requires sass-loader@^8.0.0
              options: {
                implementation: require('sass'),
                sassOptions: {
                  fiber: require('fibers'),
                  indentedSyntax: true // optional
                },
              },
            },
          ],
        },
      ],
    }
   - Создаем файл настройки //src/plugins/vuetify.js 
    
    // src/plugins/vuetify.js
    
    import Vue from 'vue'
    import Vuetify from 'vuetify'
    import 'vuetify/dist/vuetify.min.css'
    
    Vue.use(Vuetify)
    
    const opts = {}
    
    export default new Vuetify(opts)
       
   - Добавляем vuetify к index.js
   
    // src/main.js
    
    import Vue from 'vue'
    import vuetify from '@/plugins/vuetify' // path to vuetify export
    
    new Vue({
      vuetify,
    }).$mount('#app')     
    
   - Добавляем элементы vuetify в приложение (https://vuetifyjs.com/ru/components/app-bars/)
    
    
## Оптимизация приложения
## Проверка ресурсов
   Используем [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)
   Установка: `npm install --save-dev webpack-bundle-analyzer`
   Добавляем плагин в конфигурацию webpack:
   
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
     
    module.exports = {
      plugins: [
        new BundleAnalyzerPlugin()
      ]
    }
   Теперь при запуске приложения по адресу localhost:8080 появится карта всех ваших ресурсов, и частей, из которых они состоят
### Отделяем крупные импорты
   Во время анализа станет известно, какие максимальные части кода содержит приложение с указанием их размера. 
   В этом случаи есть смысл отделить эти части кода от основного файла сборки. 
   Для этого необходимо настроить оптимизацию, а именно splitChunc
   в webpack.common.js добавляем оптимизацию:
   
    module.exports = {
    ...
    optimization: {
           splitChunks: {
               cacheGroups: {
                   //отделяет в отдельный файл содержимое node_modules/vuetify/lib
                   vuetifylib: {
                       test: /[\\/]node_modules[\\/]vuetify[\\/]lib[\\/]/,
                       name: 'vuetifylib',
                       chunks: 'all',
                   },
                   //отделяет в отдельный файл содержимое node_modules/vuetify/src
                   vuetifysrc: {
                       test: /[\\/]node_modules[\\/]vuetify[\\/]src[\\/]/,
                       name: 'vuetifysrc',
                       chunks: 'all',
                   },
                   //отделяет в отдельный файл содержимое node_modules/vue
                   vuelib: {
                       test: /[\\/]node_modules[\\/]vue[\\/]/,
                       name: 'vuelib',
                       chunks: 'all',
                   },
               }
   
           }
       },
   Теперь при сборке от основного файла main.bungle.js отделятся 2 файла vuetifylib.bungle.js и vuetifysrc.bungle.js
### Урезаем аппетиты vuetify (https://vuetifyjs.com/ru/customization/a-la-carte/)

   - Устанавливаем плагин оптимизации
   `npm install vuetify-loader`   
   - Меняем импорт в файле ./plugins/vuetify.js
    
    import Vue from 'vue'
    import Vuetify from 'vuetify/lib'
   - Устанавливаем плагин в webpack.common.js
    
    // webpack.common.js
    
    const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
    
    module.exports = {
      plugins: [
        new VuetifyLoaderPlugin()
      ],
    } 
    
   
### Ленивая загрузка
    [гайд](https://medium.com/@vladislavs.korehovs/optimizing-vue-vuetify-performance-async-loading-5e13ca43706e)
   - один из способов разделить приложение на модули малой кровю это использовать ленивую загрузку компонентов
   достаточно поменять импорт:
    `import App from './App.vue';`
     на `const App = () => import('./App.vue')`
     теперь компонент App.vue загружается отдельным файлом     
### Предрендеринг страниц
    [гайд](https://github.com/chrisvfritz/prerender-spa-plugin)        