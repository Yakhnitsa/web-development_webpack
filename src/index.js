// import _ from 'lodash';
//
// function component() {
//     const element = document.createElement('div');
//
//     // Lodash, currently included via a script, is required for this line to work
//     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//
//     return element;
// }
//
// document.body.appendChild(component());
//Определяем простую функцию вывода на экран
import {addButton} from "./module";

const hello = name => console.log(`hello ${name}`)

hello('Everyone')
hello('World')
addButton()