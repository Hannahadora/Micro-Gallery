document.addEventListener('DOMContentLoaded',  function() {

    const ui = new UI();

    user = JSON.parse(localStorage.getItem('user'))
    galleries = JSON.parse(localStorage.getItem('galleries'));

    document.querySelector('#un').innerText = user.fullname
    
    if (galleries == null) {
        galleries = [];
        localStorage.setItem('galleries', JSON.stringify(galleries))
    }

    ui.clearFields()

            fetchGalleryImages()

            // Store.displayGalleries()
     
})



createBtn.addEventListener('click', (e) => {
    if(intro.style.display == 'block') {
        intro.style.display = 'none';
        gFormH.style.display = 'block'
    } else {
        intro.style.display = 'block';
        gFormH.style.display = 'none'
    }
    
    e.preventDefault()
})


galleryForm.addEventListener('submit', function(e) {
 
    user = JSON.parse(localStorage.getItem('user'))

    const userId = user.id;
    const Gid = gGUId();
    const title = document.getElementById('gallery-name').value
    const images = []

    const gallery = new Gallery(Gid, userId, title, images);

    galleries = JSON.parse(localStorage.getItem('galleries'));

    const ui = new UI();

    if(title === '' ) {
        ui.showAlert('Please Input a Gallery Name', 'error')
    } else {

        ui.addGalleryToDisplay(gallery);

        Store.addGallery(gallery);

        alert(`${gallery.title} Gallery Created`)

        ui.clearFields();
    }

        // for(i = 0; i < galleries.length; i++){
        //     if(title === galleries[i].title) {
        //         ui.showAlert('Gallery Already Exist', 'error')
        //     }   
        // }

    e.preventDefault()
});


function fetchGalleryImages(current){

    const galleryTemplate =(Gid, title)=>  {
    return `<div class="newTem relative">
                <div class="absolute top-40 left-10 flex flex-col gap-10">
                    <p class="gn text-xs bg-black text-gray-500 rounded text-white">${title} Gallery</p>
                    <div id="viewBtn-${Gid}"></div>
                </div>

        </div>`
    }
    gGUId()

        
    let galleries = localStorage.getItem('galleries');
    console.log(galleries);
    if(galleries){
        galleries && JSON.parse(galleries).map((current, idx, array)=>{

            const button = document.createElement('button')
            button.innerHTML = 'View All Photos'
            button.className = "bg-white px-2 py-1 text-xs font-medium"
            button.style.display = 'block'
            button.addEventListener('click',(e)=> openGallery( e,`${current.Gid}`))

            const parser = new DOMParser();
            const doc = parser.parseFromString(galleryTemplate(current.Gid, current.title), "text/html");
            doc.querySelector(`#viewBtn-${current.Gid}`).appendChild(button)

            const imagesview = document.createElement('div')
            imagesview.classList='pic  h-72 grid grid-cols-3 grid-rows-2 gap-1'

            current && current.images ? current.images.slice(0, 3).map((image, imagidx, imgArray)=>{
                const img = document.createElement('img')
                img.className = 'rounded'
                img.style.width = '100%'
                img.style.height = '100%'
                img.src = localStorage[image]
                imagesview.appendChild(img)   
            }): alert(`no images for gallery ${current.Gid}`)
            
            doc.querySelector(`.newTem`).appendChild(imagesview)
            galleryDisplay.appendChild(doc.documentElement)
        
        })
    }else{
         const imagesview = document.createElement('div')
         imagesview.classList='pic grid grid-cols-2'
         imagesview.innerHTML
         
         galleryDisplay.appendChild(imagesview)
     
    }
}














