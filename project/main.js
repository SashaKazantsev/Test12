all_photo = document.querySelectorAll('.example-img')


for (let i= 0; i< all_photo.length; i++){

    console.log(all_photo[i])
    
    all_photo[i].addEventListener('click', function(){
        
        all_photo[i].requestFullscreen()
    
        
    })
}