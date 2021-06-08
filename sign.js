const signupForm = document.getElementById('signUpForm');
const fullname = document.getElementById('fullname');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const gender = document.getElementById('gender');
const address = document.getElementById('address');
const password = document.getElementById('password');
let user = {}
let users

  function createUser(signupForm){ 
  
    user = {
        id: randomString(3),
        fullname: signupForm.fullname.value,
        email: signupForm.email.value,
        password: signupForm.password.value
    }
   localStorage.setItem('user', JSON.stringify(user))
   user = JSON.parse(localStorage.getItem('user'))

  }


  function saveUser() {
    if(localStorage.getItem('users') === null) {
        users = [];
    } else {
        users = JSON.parse(localStorage.getItem('users'))
    }
    users.push(user)
    localStorage.setItem('users', JSON.stringify(users))
  }


signupForm.addEventListener('submit', validateSignup)
function validateSignup(e) {
    
        createUser(signupForm)
        saveUser()
        alert('Account Created')
        location.href = "initgallery.html"

    e.preventDefault()
}
