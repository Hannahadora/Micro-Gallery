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
    img.className = 'rounded cursor-pointer'
    img.style.width = '100%'
    img.style.height = '250px'
    img.addEventListener('click', openModal(Gid + file.name))

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




function openModal(Gid, src) {
   const modal = document.createElement('div')
   modal.id = 'myModal'
   modal.className = 'modal bg-red-200'

   const close = document.createElement('p')
   close.className = 'close'
   close.innerHTML = 'close'

   const modalContent = document.createElement('img')
   modalContent.className = 'modal-content'
   modalContent.id = `${Gid}/${file.name}`
   modalContent.src = localStorage[Gid + file.name]

   const modalCaption = document.createElement('p')
   modalCaption.id = 'caption'   
   modalCaption.innerHTML = `${file.name}`

    modal.appendChild(modalContent)
    modal.appendChild(close)
    modal.appendChild(modalCaption)

    document.body.appendChild(modal)
    
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
            img.className = 'rounded'
            img.style.width = '100%'
            img.style.height = '250px'
            img.src = localStorage[image]
            img.addEventListener('click', openModal(Gid + file.name))
            imgRack.appendChild(img)   

            console.log(gallery)
        })
        } 
   })
    
}



galleryContent.addEventListener('click', function(e, Gid) {
    if (e.target.classList.contains('delete')) {
        if(confirm(`You are about to delete this Gallery`)) {
            e.target.parentElement.parentElement.remove(   );
        
            Store.removeGallery(Gid)
            location.href = 'initgallery.html'
        }
    }
    
    // e.preventDefault();
});










