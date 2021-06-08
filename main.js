const filterBtn = document.getElementById('filter-btn');
const createBtn = document.getElementById('createGallery');
const gFormH = document.getElementById('gFormH');
const intro = document.getElementById('intro');
const galleryForm = document.getElementById('gallery-form')
const deleteGallery = document.getElementById('deleteGallery');
const galleryDisplay = document.getElementById('galleryDisplay');


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


function gGUId() {
    return randomString(3);
    // insert random string to the field
};


function loadFile(event, Gid) {
    console.log(event)
    const img = document.createElement('img')
    img.classList='pic grid grid-col'
    img.style.background = 'red'
    img.src = URL.createObjectURL(event.target.files[0])
    let images = document.querySelector('#imageDisplay' + Gid)
    // document.body.appendChild(img)
    images.appendChild(img)   

    addImages(Gid, img.src)
 
}

function fetchImages(){

    let galleries= localStorage.getItem('galleries');
    console.log(galleries);
    if(galleries){
        galleries && JSON.parse(galleries).map((current, idx, array)=>{
            // add the name of the gallery to the DOM
        
            // create the elements holding a gallery
            const parser = new DOMParser();
            const doc = parser.parseFromString(galleryTemplate(current.Gid), "text/html");
        
            // create div element
            const imagesview = document.createElement('div')
            imagesview.classList='pic grid grid-cols-2'

            // create img element that will be added into the div element
            current && current.images ? current.images.slice(0, 3).map((image, imagidx, imgArray)=>{
                const img = document.createElement('img')
                img.style.background = 'red'
                img.src = image
                imagesview.appendChild(img)   
            }): alert(`no images for gallery ${current.Gid}`)
            
            galleryDisplayView.appendChild(doc.documentElement)
        
            console.log(current.Gid)
        })
    }else{
         // create div element
         const imagesview = document.createElement('div')
         imagesview.classList='pic grid grid-cols-2'
         imagesview.innerHTML
         
         galleryDisplayView.appendChild(imagesview)
     
    }
  
}

// window.onload= ()=>{
//     fetchImages()
//     alert('it works')
// }


class Gallery {
    constructor(Gid, userId, title, images) {
        this.title = title;
        this.Gid = Gid;
        this.userId = userId;
        this.images = [
    
        ]
    }
}
 
const galleryTemplate =(Gid, title)=>  {
    return `<div><div class="flex items-center justify-between">
        <div class="flex items-center gap-5">
            <p class="gn text-xs bg-blue-200 text-gray-500 rounded-xl p-2 text-white">${title} Gallery</p>
            <div >
                <p id="uploadBtn-${Gid}"></p>
            </div>
        </div>
        <i title="deleteGallery" class="delete fas fa-trash-alt hover:text-red-500 cursor-pointer"></i>
        </div>
        <div id="imageDisplay${Gid}" class=" grid grid-cols-2">
        </div></div>`
}

class UI {
    addGalleryToDisplay(gallery) {
       
        gGUId()
        const parser = new DOMParser();

        const uploadInput = document.createElement('input')

                uploadInput.setAttribute( 'accept', "image/*" )
                uploadInput.id = "file"
                uploadInput.style.display = 'block'
                uploadInput.setAttribute('type', "file")
                uploadInput.addEventListener('change',(e)=> loadFile( e,`${gallery.Gid}`))

        const doc = parser.parseFromString(galleryTemplate(gallery.Gid), "text/html")
        doc.querySelector(`#uploadBtn-${gallery.Gid}`).appendChild(uploadInput)
        galleryDisplay.appendChild(doc.documentElement)

    }

    showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        gFormH.insertBefore(div, galleryForm);

        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000)
    }

    clearFields() {
        gFormH.style.display = 'none'
        intro.remove();
    }
}

class Store {
    static getGalleries() {
        let galleries;
        if(localStorage.getItem('galleries') === null) {
            galleries = [];
        } else {
            galleries = JSON.parse(localStorage.getItem('galleries'));
        }

        return galleries;
    }

    static displayGalleries() {
        const galleries = Store.getGalleries();

        galleries.forEach(function(gallery) {
            const ui = new UI;

            ui.addGalleryToDisplay(gallery);
            
        });
    }

    static addGallery(gallery) {
       const galleries = Store.getGalleries();

       galleries.push(gallery)

       localStorage.setItem('galleries', JSON.stringify(galleries));
    }

    static removeGallery(Gid) {
        const galleries = Store.getGalleries();

        let gallery = galleries.find( (el) => el.Gid == Gid)
        galleries.pop(gallery)

        localStorage.setItem('galleries', JSON.stringify(galleries));

        console.log(Gid)
    }
}



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
    
    Store.displayGalleries()

    // fetchImages()
});


function addImages(Gid, src) {


       let gallery = galleries.find( (el) => el.Gid == Gid)
       gallery.images.push(src)

    //    galleries.push(gallery)
        localStorage.setItem('galleries', JSON.stringify(galleries))

        console.log(src, galleries)
}



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

galleryDisplay.addEventListener('click', function(e, Gid) {

    if (e.target.classList.contains('delete')) {
        if(confirm(`You are about to delete this Gallery`)) {
            e.target.parentElement.parentElement.remove();
        
            Store.removeGallery(Gid)
        }
    }
    
    // e.preventDefault();
});


