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
    var randomString = function(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
    }
    // random string length
      galleryId = randomString(3);
    // insert random string to the field
};


class Gallery {
    constructor(Gid, userId, title, images) {
        this.title = title;
        this.Gid = Gid;
        this.userId = userId;
        this.images = images
    }
}
 

class UI {
    addGalleryToDisplay(gallery) {
       
        const uploadInput = document.createElement('input')
            uploadInput.setAttribute( 'accept', "image/*" )
            uploadInput.id = "file"
            uploadInput.style.display = 'block'
            uploadInput.setAttribute('type', "file")
            uploadInput.addEventListener('change',()=> loadFile(`${gallery.Gid}`))

        const row = document.createElement('div') 
            row.className = 'newGallery border border-gray-700 border-dashed rounded-xl py-2 px-3'

            row.insertAdjacentHTML("beforeend", 
            `
             <div class="flex items-center justify-between">
                     <div class="flex items-center gap-5">
                         <p class="gn text-xs  bg-blue-200 text-gray-500 rounded-xl p-2 text-white">${gallery.title} Gallery</p>
                         <div >
                             <p id="${gallery.Gid}"></p>
                             <p><label for="file" title="Upload Images" style="cursor: pointer;" class="upload shadow"><i class="hover:text-green-500 fas fa-cloud-upload-alt"></i></label></p>
                         </div>
                     </div>
                     <i title="deleteGallery" class="delete fas fa-trash-alt hover:text-red-500 cursor-pointer"></i>
                 </div>
                 <div class="imageDisplay${gallery.Gid} grid grid-cols-2">
               </div>
             `
             )
            
            galleryDisplay.appendChild(row)
            row.querySelector(`#${gallery.Gid}`).appendChild(uploadInput)
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

    static removeGallery(title) {
        const galleries = Store.getGalleries();

        galleries.forEach(function(gallery) {
           if(gallery.title === title) {
               gallery.splice(index, 1);
           }
        });

        localStorage.setItem('galleries', JSON.stringify(galleries));

        console.log(title)
    }
}



document.addEventListener('DOMContentLoaded',  function() {
    const ui = new UI();

    user = JSON.parse(localStorage.getItem('user'))
    galleries = JSON.parse(localStorage.getItem('galleries'));
    
    if (galleries == null) {
        galleries = [];
        localStorage.setItem('galleries', JSON.stringify(galleries))
    }

    ui.clearFields()
    
    Store.displayGalleries()

    
});


galleryForm.addEventListener('submit', function(e) {
    gGUId()
    user = JSON.parse(localStorage.getItem('user'))


    const userId = user.id;
    const Gid = galleryId;
    const title = document.getElementById('gallery-name').value
    const images = document.querySelector('.imageDisplay')

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
})

galleryDisplay.addEventListener('click', function(e) {

    if (e.target.classList.contains('delete')) {
        if(confirm(`You are about to delete this Gallery`)) {
            e.target.parentElement.parentElement.remove();
        
            Store.removeGallery(e.target.previousSibling.firstElementChild)
        }
    }

    // if (e.target.parentElement.classList.contains('upload')) {
    //     console.log('goal')
        
    //         const img = document.createElement('img')
    //         img.src = URL.createObjectURL(e.target.file)
    //         images = document.querySelector('.imageDisplay')
    //         images.appendChild(img)   ;
    //     };
    
    // e.preventDefault();
});


function loadFile(event, Gid) {

    const img = document.createElement('img')
    img.classList='pic grid grid-col'
    img.style.width = '100px'
    img.style.height = '100px'
    img.style.background = 'red'
    // img.src = URL.createObjectURL(event.target.files[0]) | '#'
    // let images = document.querySelector('.imageDisplay' + Gid)
    document.body.appendChild(img)
    // console.log(images)  
    // images.appendChild(img)   

 
}


