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