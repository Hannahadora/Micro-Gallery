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
                    <div class="flex items-center justify-between">
                        <p class="gn text-xs bg-blue-200 text-gray-500 rounded-xl p-2 text-white">${title} Gallery</p>
                        <div id="viewBtn-${Gid}"></div>
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

