const filterBtn = document.getElementById('filter-btn');
const createBtn = document.getElementById('createGallery');
const gFormH = document.getElementById('gFormH');
const intro = document.getElementById('intro');
const galleryForm = document.getElementById('gallery-form')
const galleryDisplay = document.getElementById('galleryDisplay');
const galleryDisplayView = document.getElementById('galleryDisplayView');
let galleryId;

createBtn.addEventListener('click', function() {
    if(intro.style.display === 'block') {
        intro.style.display = 'none'
        gFormH.style.display = 'block'
    } else {
        intro.style.display = 'block'
        gFormH.style.display = 'none'
    }
})



function loadFile(event, Gid) {
    console.log(event)
    const img = document.createElement('img')
    img.classList='pic grid grid-col'
    img.style.background = 'red'
    img.src = URL.createObjectURL(event.target.files[0])
    let images = document.querySelector('#imageDisplay' + Gid)
    // document.body.appendChild(img)
    console.log(images)  
    images.appendChild(img)   

 
}


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


const galleryTemplate =(gid)=>  {
    return `<div><div class="flex items-center justify-between">
        <div class="flex items-center gap-5">
            <p class="gn text-xs bg-blue-200 text-gray-500 rounded-xl p-2 text-white">Gallery</p>
            <div >
                <p id="uploadBtn-${gid}"></p>
                <p><label for="file" title="Upload Images" style="cursor: pointer;" class="upload shadow"><i class="hover:text-green-500 fas fa-cloud-upload-alt"></i></label></p>
            </div>
        </div>
        <i title="deleteGallery" class="delete fas fa-trash-alt hover:text-red-500 cursor-pointer"></i>
        </div>
        <div id="imageDisplay${gid}" class=" grid grid-cols-2">
        </div></div>`
}

galleryForm.addEventListener('submit', function(e) {
    e.preventDefault()

    gGUId()
    const parser = new DOMParser();

    const uploadInput = document.createElement('input')

            uploadInput.setAttribute( 'accept', "image/*" )
            uploadInput.id = "file"
            uploadInput.style.display = 'block'
            uploadInput.setAttribute('type', "file")
            uploadInput.addEventListener('change',(e)=> loadFile( e,`${galleryId}`))

    const doc = parser.parseFromString(galleryTemplate(galleryId), "text/html")
    doc.querySelector(`#uploadBtn-${galleryId}`).appendChild(uploadInput)
    galleryDisplay.appendChild(doc.documentElement)

    console.log(galleryId)

})


// function fetchImages(){

//     let galleries= localStorage.getItem('galleries');
//     console.log(galleries);
//     if(galleries){
//         galleries && JSON.parse(galleries).map((current, idx, array)=>{
//             // add the name of the gallery to the DOM
        
//             // create the elements holding a gallery
//             const parser = new DOMParser();
//             const doc = parser.parseFromString(galleryTemplate(current.Gid), "text/html");
        
//             // create div element
//             const imagesview = document.createElement('div')
//             imagesview.classList='pic grid grid-col'

//             // create img element that will be added into the div element
//             current && current.images ? current.images.map((image, imagidx, imgArray)=>{
//                 const img = document.createElement('img')
//                 img.style.background = 'red'
//                 img.src = URL.createObjectURL(image)
//                 imagesview.appendChild(image)   
//             }): alert(`no images for gallery ${current.Gid}`)
            
//             galleryDisplayView.appendChild(doc.documentElement)
        
//             console.log(current.Gid)
//         })
//     }
  
// }

+

+--=-98765432176543211-=-0987654321 qwertyuiop[]\789+87\
';lkjhgfdsaASDFVBNM'