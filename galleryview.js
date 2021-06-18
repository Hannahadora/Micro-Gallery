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
    
   

function previewFile(event, Gid) {

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

    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader()

    reader.addEventListener('load', function() {
        console.log(file)
        img.src = reader.result;
        localStorage[Gid + file.name] = img.src
    }, false);

    if (file) {
        reader.readAsDataURL(file)
    }

    imgRack.appendChild(img)

    addImages(Gid, (Gid + file.name))
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
            img.src = localStorage[image]
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










