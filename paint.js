//let field = document.querySelector('.field')
//for (let i = 0; i<450; i++){
//
//
//    let cell = document.createElement('div')
//    cell.classList.add('cell')
//    cell.setAttribute('id',`${i}`)
//    field.appendChild(cell)
//
//}

var CURRENT_COLOR = 'rgb(255,0,0)' //начальный цвет
var DEFAULT_COLOR = "rgb(62,62,62)" //Цвет по умолчанию, когда удаляешьт


var COLOR_MAP ={
    'red': 'rgb(255,0,0)',
    'green': 'rgb(0,255,0)',
    'blue': 'rgb(0,0,255)',
    'yellow': 'rgb(255,236,26)',
    'skyblue': 'rgb(142,229,255)',
    'lime': 'rgb(137, 243, 54)',


}

//обработчик клика, каждой ячейке

let cells = document.querySelectorAll('.cell')
for (let i = 0; i<cells.length; i++){

    let cell = cells[i]
    cell.addEventListener('click', function(){

        //При клике меняем цвет ячейки на текущий выбраный цвет
        cell.style.backgroundColor = CURRENT_COLOR
    })

    cell.addEventListener('mouseover', function(){
        if (IS_CLICKED){
            cell.style.backgroundColor = CURRENT_COLOR
        }
    })

    cell.addEventListener('mousedown', function(){

        if (FILL_MODE){
            
                let cell_id = parseInt(cell.getAttribute('id'));

                anime({
                    targets: '.cell',
                    backgroundColor: CURRENT_COLOR,
                    easing: 'linear',
                    duration:500,
                    delay:anime.stagger(50,{grid:[30,50],from: cell_id}),
                })

                setTimeout(()=> {


                    for (let j = 0; j<cells.length; j++){
                        cells[j].style.backgroundColor = CURRENT_COLOR // предположительно не надо
                    }
                },1000)






            
            
        }

        else{

        cell.style.backgroundColor = CURRENT_COLOR}
    })


   
}





let color_cells = document.querySelectorAll('.color-cell')

for (let i = 0; i < color_cells.length; i++){


    let color_cell = color_cells[i]
    color_cell.addEventListener('click', function(){

        //определяем цвет по классу элемента
        let color_class = '';
        if (color_cell.classList.contains('red') ) color_class = 'red'
        else if (color_cell.classList.contains('green') ) color_class = 'green'
        else if (color_cell.classList.contains('blue') ) color_class = 'blue'
        else if (color_cell.classList.contains('yellow') ) color_class = 'yellow'
        else if (color_cell.classList.contains('skyblue') ) color_class = 'skyblue'
        else if (color_cell.classList.contains('lime') ) color_class = 'lime'

        CURRENT_COLOR = COLOR_MAP[color_class]
        FILL_MODE = false;


        document.querySelector('.selected').classList.remove('selected')
        color_cell.classList.add('selected')

    })
}


var IS_CLICKED = false;

document.addEventListener('mousedown', function(){

    IS_CLICKED = true;

})

document.addEventListener('mouseup', function(){

    IS_CLICKED = false;
})


document.querySelector('.eraser').addEventListener('click',function(){


    CURRENT_COLOR = DEFAULT_COLOR;

    document.querySelector('.selected').classList.remove('selected')
    FILL_MODE = false;

    this.classList.add('selected')
})



var FILL_MODE = false;

document.querySelector('.fill-tool').addEventListener('click',function() {

    FILL_MODE = true;
    
    document.querySelector('.selected').classList.remove('selected')
    this.classList.add('selected')
})

console.log(document.querySelector('.img_buck').style.width)