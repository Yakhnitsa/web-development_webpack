# Создание web приложения на Webpack
## Установка node и npm

## Создаем базовое приложение:
  `npm init -y` - инициализация приложения, создание файла package.json
  `npm install webpack webpack-cli --save-dev` - локальная установка webpack и webpack-cli
  
  1.2. Создаем базовую структуру файлов
     |- package.json
   + |- index.html
   + |- /src
   +   |- index.js
 
  1.3. Производим изменения в package.json
  
          {
            "name": "webpack-demo",
            "version": "1.0.0",
            "description": "",
        +   "private": true, - Приватный доступ к файлам
        -   "main": "index.js", - убираем файл main.js
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
            |- index.js
            
  1.5. Устанавливаем lodash и импортируем в приложение
  `npm install --save lodash`      
  
    src/index.js:
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
    -    <script src="./src/index.js"></script>
    +    <script src="main.js"></script>
       </body>
      </html>
      
  1.6. Запускаем скрипт npx webpack - он собирает проект и генерирует main.js для нашего приложения.
  На данном этапе можно открыть файл в браузере. javascript должет отработать.
        
        
## Конфигурация webpack

2.1. Настраиваем конфигурацию в файле webpack.config.js
        
        const path = require('path');
        
        module.exports = {
            entry: './src/index.js', - точка входа в приложение
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
  Для наглядности копируем файл index.js в secondary.js и меняем некоторые строки.
  Меняем код webpack.dev.js, прописываем несколько точек входа:
  
        entry: {
            main: './src/index.js',
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
            main: './src/index.js',
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
  - на данном этапе webpack.dev.js больше не нужен, его можно удалить и собирать приложение командой `npm run build`


