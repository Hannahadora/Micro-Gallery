document.addEventListener('DOMContentLoaded',  function() {

    const ui = new UI();

    user = JSON.parse(localStorage.getItem('user'))
    galleries = JSON.parse(localStorage.getItem('galleries'));

    document.querySelector('#un').innerText = user.fullname

    galleries.forEach(function(gallery) {
        document.querySelector('#gn').innerHTML = gallery.title + ' ' + 'Photos'
    });

    if (galleries == null) {
        galleries = [];
        localStorage.setItem('galleries', JSON.stringify(galleries))
    }

    
    // Store.displayGalleries()

})

function addImages(Gid, src) {

    galleries = JSON.parse(localStorage.getItem('galleries'))

    let gallery = galleries.find( (el) => el.Gid === Gid)

    if(gallery){
        console.log(galleries,  'gallery', Gid)
        // console.log(src, galleries, gallery)
        console.log(gallery)
        gallery.images.push(src)
    }
     localStorage.setItem('galleries', JSON.stringify(galleries))
}
    
        const images = document.createElement('div')
        images.id = `imageDisplay${Gid}`  
        images.className = 'flex mt-10'
   

        function loadFile(event, Gid) {

            console.log(event)
            console.log(Gid)

            const img = document.createElement('img')
            img.style.weight = '300px'
            img.style.height = '300px'
            img.src = URL.createObjectURL(event.target.files[0])
            // let images = document.querySelector('#photoDisplay' + Gid)
             
            imgRack.appendChild(img)
            // images.appendChild(img)  

            addImages(Gid, img.src)
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