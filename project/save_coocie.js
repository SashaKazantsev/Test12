const COLORS = [


    "rgb(62,62,62)",
    'rgb(255,0,0)',
    'rgb(0,255,0)',
    'rgb(0,0,255)',
    'rgb(255,236,26)',
    'rgb(142,229,255)',
    'rgb(137, 243, 54)',
]
console.log(document.cookie)
function get_result_from_cookie(){
    let cookies = document.cookie.split('; ');
    console.log(cookies);
    
    for (let i = 0; i < cookies.length; i++){
        let cookie = cookies[i].split('=');
        console.log(cookie);
        
        if(cookie[0] === 'pixel-result'){
            console.log("Найдено:", cookie[1]);
            return cookie[1];
        }
    }
    return '0'*450; // возвращение 450 пустых
}

function loadFromCookie(){

    const cookie = document.cookie.split('; ').find(row => row.startsWith('pixel-result'))

    if (!cookie) return false;


    const encoded = cookie.split('=')[1]
    const code = atob(encoded)
    if (code.length !== 450) return false;

    for (let i = 0; i<450; i++){
        cells[i].style.backgroundColor = digitToColor(code[i])
    }
}
let temp_result = get_result_from_cookie()
let field = document.querySelector('.field')
if (temp_result != '0'){

    for (let i = 0; i<450; i++){
        let cell = document.createElement('div')//В БУДУЮЩЕМ НАПИСАТЬ С ПОМОЩЬЮ ВЫЗОВА ФУНКЦИИ
        cell.classList.add('cell')//В БУДУЮЩЕМ НАПИСАТЬ С ПОМОЩЬЮ ВЫЗОВА ФУНКЦИИ
        cell.setAttribute('id',`${i}`)//В БУДУЮЩЕМ НАПИСАТЬ С ПОМОЩЬЮ ВЫЗОВА ФУНКЦИИ
        cell.style.backgroundColor = COLORS[parseInt(temp_result[i])]//В БУДУЮЩЕМ НАПИСАТЬ С ПОМОЩЬЮ ВЫЗОВА ФУНКЦИИ
        field.appendChild(cell)//В БУДУЮЩЕМ НАПИСАТЬ С ПОМОЩЬЮ ВЫЗОВА ФУНКЦИИ
    }
} else{
    for (let i = 0; i<450; i++){


    let cell = document.createElement('div')
    cell.classList.add('cell')
    cell.setAttribute('id',`${i}`)
    field.appendChild(cell)

}
}








function saveToCookie(){
    let code =''// ДОДЕЛАТЬ!
}
















//Сохранение кажддую минуту 
setInterval(function(){
    let result = '';
    let temp_cells = document.querySelectorAll('.cell');

    for (let i = 0; i < temp_cells.length; i++){
        let cell = temp_cells[i];
        let color = cell.style.backgroundColor;
        let color_index = '0'; // По умолчанию - ластик

        for(let j = 0; j < COLORS.length; j++){
            let element = COLORS[j];
            if (color === element){
                color_index = j.toString();console.log('Ладно',color_index);
                break;
                
            }
        }
        result += color_index;
    }
    
    const encoded = btoa(result);
    document.cookie = `pixel-result=${result}; max-age=86400;`; // Увеличил время до суток
    console.log(result)
}, 30000); // 60000 мс = 1 минута




//СОхранение результата на компьютер


document.querySelector('.save-tool').addEventListener('click', function(){


    domtoimage.toJpeg(field, {quality:2}).then(function(dataUrl){

        var img = new Image();
        img.src = dataUrl
        let link = document.createElement('a');
        link.download = 'pixel.jpg'
        link.href = dataUrl;
        link.click()
    }).catch(function(error){

        console.error('Ошибка произошла', erorr)
    })
})


window.addEventListener('load', ()=>{

    if(!loadFromCookie()){
        console.log("КУКИ НЕТ, ЧИСТЫЙ ХОЛСТ")
    }
})