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
    constructor(Gid, title, images) {
        this.title = title;
        this.Gid = Gid;
        // this.userId = userId;
        this.images = images
    }
}


class UI {
    addGalleryToDisplay(gallery) {
        const row = document.createElement('div') 
              row.className = 'newGallery border border-gray-700 border-dashed rounded-xl py-3 px-5'
               row.innerHTML = `
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-5">
                            <p class="gn text-sm bg-blue-500 rounded-xl p-2 text-white">${gallery.title} Gallery</p>
                            <div>
                                <p><input type="file" accept="image/*" name="image" id="file"  onchange="loadFile(event)" style="display: none;"></p>
                                <p><label for="file" title="Upload Images" style="cursor: pointer;" class="upload shadow"><i class="hover:text-green-500 fas fa-cloud-upload-alt"></i></label></p>
                            </div>
                        </div>
                        <i title="deleteGallery" class="delete fas fa-trash-alt hover:text-red-500 cursor-pointer"></i>
                    </div>
                    <div class="imageDisplay grid grid-cols-2">
                    </div>
                `
            galleryDisplay.appendChild(row)
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

    static removeGallery() {

    }
}

document.addEventListener('DOMContentLoaded',  function() {
    const ui = new UI();

    ui.clearFields()

    Store.displayGalleries()
});


galleryForm.addEventListener('submit', function(e) {
    gGUId()
    const Gid = galleryId;
    const title = document.getElementById('gallery-name').value
    const images = document.querySelector('.imageDisplay')

    const gallery = new Gallery(Gid, title, images);

    const ui = new UI();

    if(title === '' ) {
        ui.showAlert('Please Input a Gallery Name', 'error')
    // } if(title === `${galleries.gallery.title}`) {
    //     ui.showAlert('Gallery Already Exist', 'error')
    } else {
        ui.addGalleryToDisplay(gallery);

        Store.addGallery(gallery);

        alert(`${gallery.title} Gallery Created`)

        ui.clearFields();
    }

    
    e.preventDefault()
})

galleryDisplay.addEventListener('click', function(e) {

    if (e.target.classList.contains('delete')) {
        if(confirm(`You are about to delete this Gallery`)) {
            e.target.parentElement.parentElement.remove();
        }
    }
    e.preventDefault();
});


function loadFile(event) {

    const img = document.createElement('img')
    // img.className = 'pic'
    img.src = URL.createObjectURL(event.target.files[0])
    images = document.querySelector('.imageDisplay')
    images.appendChild(img)   

    console.log('goat')
}

