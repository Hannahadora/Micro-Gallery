let routeGid = undefined;
document.addEventListener('DOMContentLoaded',  function(Gid) {
    
    const urlId = location.href.split('=')[1]

    routeGid = urlId

    user = JSON.parse(localStorage.getItem('user'))
    document.querySelector('#un').innerText = user.fullname

    galleries = JSON.parse(localStorage.getItem('galleries'));

    galleries.forEach(function(gallery) {
        if(!urlId) {
            alert('404')
        }else if(gallery.Gid === urlId) {
            document.querySelector('#gn').innerHTML = gallery.title + ' ' + 'Photos'
        }
    });

    fetchImages(Gid)

})

function addImages(Gid, src) {

    galleries = JSON.parse(localStorage.getItem('galleries'))

    let gallery = galleries.find( (el) => el.Gid === Gid)

    if(gallery){
        gallery.images.push(src)
    }
     localStorage.setItem('galleries', JSON.stringify(galleries))
}
    
   

function loadFile(event, Gid) {

    // console.log(Gid)
    if(!Gid){
        if(!routeGid) {
            alert("Gallary not found")
        }
        Gid = routeGid
    }

    const img = document.createElement('img')
    img.style.weight = '250px'
    img.style.height = '250px'
    img.src = URL.createObjectURL(event.target.files[0])
    // let images = document.querySelector('#photoDisplay' + Gid)
        
    imgRack.appendChild(img)
    // images.appendChild(img)  

    addImages(Gid, img.src)
}





function fetchImages(Gid){

    if(!Gid){
        if(!routeGid) {
            alert("Gallery not found")
        }
        Gid = routeGid
    }

    galleries = JSON.parse(localStorage.getItem('galleries'))
    
   galleries.forEach((gallery) => {
       if (gallery.Gid === routeGid) {

        gallery.images.map((image, imagidx, imgArray)=>{
            const img = document.createElement('img')
            img.style.background = 'red'
            img.src = image
            imgRack.appendChild(img)   

            console.log(gallery)
        })
        } 
   })
    
}



// galleryDisplay.addEventListener('click', function(e, Gid) {

//     if (e.target.classList.contains('delete')) {
//         if(confirm(`You are about to delete this Gallery`)) {
//             e.target.parentElement.parentElement.remove();
        
//             Store.removeGallery(Gid)
//         }
//     }
    
//     // e.preventDefault();
// });










