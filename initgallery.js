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

            Store.displayGalleries()
     
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
        return   ` <div class = "galTem">
                        <div>
                            <div class="relative flex flex-col gap-10">
                                <p class="gn text-xs bg-blue-200 text-gray-500 rounded-xl p-2 text-white">${title} Gallery</p>
                                <div id="viewBtn-${Gid}"></div>
                            </div>
                            <div id="imageDisplay${Gid}" class=" grid grid-cols-2">
                        </div>
                    </div>
                 `              
    }

    gGUId()

    galleries = JSON.parse(localStorage.getItem('galleries'));
    if(galleries) {
        galleries = galleries.map((current, idx, array) => {
            current && current.images ? current.images.slice(0, 3).map((image, imagidx, imgArray)=>{
                console.log(current, galleries)

                const parser = new DOMParser();

                const button = document.createElement('button')
                    button.innerHTML = 'View All Photos'
                    button.className = "bg-white px-2 py-1 text-xs"
                    button.style.display = 'block'
                    button.addEventListener('click',(e)=> openGallery( e,`${current.Gid}`))  
                        
                const doc = parser.parseFromString(galleryTemplate(current.Gid, current.title), "text/html")
                doc.querySelector(`#viewBtn-${current.Gid}`).appendChild(button)
                galleryDisplay.appendChild(doc.documentElement)
                
                const img = document.createElement('img')
                img.style.background = 'red'
                img.src = image
                document.querySelector(`#imageDisplay-${current.Gid}`).appendChild(img)
                galleryDisplay.appendChild(imageDisplay)
            }): alert('nothing')
        })
    }
}














