const colors = ['red','green','magenta','blue','yellow','white','black'];

export const addButton = () =>{
    const container = document.querySelector('#container');
    const button = document.createElement('button');
    button.innerText = 'test button';
    button.onclick = () => button.style.color = colors[Math.round(Math.random() * (colors.length -1))];
    container.append(button)
}