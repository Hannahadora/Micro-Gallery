class Gallery {
    constructor(Gid, userId, title, images) {
        this.title = title;
        this.Gid = Gid;
        this.userId = userId;
        this.images = [

        ]
    }
}
 
function gGUId() {
    return randomString(3);
};

const galleryTemplate =(Gid, title)=>  {
    return   ` <div class = "galTem">
                    <div>
                        <div class="relative flex flex-col gap-10">
                            <p class="gn text-xs bg-blue-200 text-gray-500 rounded-xl p-2 text-white">${title} Gallery</p>
                            <div id="viewBtn-${Gid}"></div>
                        </div>
                        
                    </div>
                </div>
             `              
}


const photoTemplate = (Gid, title) => {
    return  ` <div id="pageTwo" class="bg-gray-700">
            <Nav class="wedge bg-gray-700  w-full fixed top-0 z-50">
                <h1><a href="#" class="nav text-sm">Gallery</a></h1>
                <a href="login.html" id="un" class="nav"></a>
            </Nav>

            <div class="wedge bg-white mt-10 flex items-center justify-between">
                <button class="px-5 py-1 my-3 font-medium border hover:border-black rounded text-sm"><a href="initgallery.html">Close</a></button>
                <p id="gn" class="px-5 py-1 my-3 font-medium text-sm">${title}</p>
                <div class="flex items-center justify-between gap-5">
                    <button id="DeleteBtn" class="px-5 py-1 my-3 font-medium bg-red-300 hover:bg-red-500 rounded text-sm">Delete Gallery</button>
                   
                    <div >
                        <p id="uploadBtn-${Gid}"></p>
                    </div>
                </div>
            </div>

            <div id="imgRack-${Gid}" class="wedge grid grid-cols-3 my-10">

            </div>

        </div>
        `
              
}

class UI {
    addGalleryToDisplay(gallery) {
    
        gGUId()

        const parser = new DOMParser();

        const button = document.createElement('button')
            button.innerHTML = 'View All Photos'
            button.className = "bg-white px-2 py-1 text-xs"
            button.style.display = 'block'
            button.addEventListener('click',(e)=> openGallery( e,`${gallery.Gid}`))  
                
        const doc = parser.parseFromString(galleryTemplate(gallery.Gid, gallery.title), "text/html")
        doc.querySelector(`#viewBtn-${gallery.Gid}`).appendChild(button)
        galleryDisplay.appendChild(doc.documentElement)


    }

    openGalleryToDisplay() {

        gGUId()

        const parser = new DOMParser();

        const uploadInput = document.createElement('input')

                uploadInput.setAttribute( 'accept', "image/*" )
                uploadInput.id = "file"
                uploadInput.style.display = 'block'
                uploadInput.setAttribute('type', "file")
                uploadInput.addEventListener('change',(e)=> loadFile( e,`${gallery.Gid}`))

        const doc = parser.parseFromString(photoTemplate(gallery.Gid, gallery.title), "text/html")
        doc.querySelector(`#uploadBtn-${gallery.Gid}`).appendChild(uploadInput)
        document.body.appendChild(doc.documentElement)
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




{/* <div>
<input type="file"  accept="image/*" name="image" id="file"  onchange="loadFile(event)" style="display: none;">
<label for="file" style="cursor: pointer;" class="upload">Upload Image</label>
</div> */}