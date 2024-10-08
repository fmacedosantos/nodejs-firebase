firebase.auth().onAuthStateChanged((user) => {
    if(user){
        window.location.href = './pages/home/home.html'
    }
})

function oninputEmail() {
    toggleButtonsDisable();
    toggleEmailErrors();
}

function oninputPassword() {
    toggleButtonsDisable();
    togglePasswordErrors();
}

function login() {
    showLoading();
    firebase.auth().signInWithEmailAndPassword(
        form.email().value, form.password().value
    ).then(response => {
        hideLoading();
        window.location.href = './pages/home/home.html';
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error))
    });

}

function getErrorMessage(error){
    if(error.code == 'auth/invalid-credential'){
        return 'Credenciais inválidas!';
    }
    return error.message;
    
}

function register() {
    window.location.href = './pages/register/register.html';
}

function recoverPassword(){
    showLoading();
    firebase.auth().sendPasswordResetEmail(form.email().value).then(() => {
        hideLoading();
        alert('Email enviado com sucesso!')
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error))
    })
}

function isEmailValid() {
    const email = form.email().value;
    if(!email){
        return false;
    }
    return validateEmail(email)
}

function toggleEmailErrors() {
    const email = form.email().value;

    form.emailRequiredError().style.display = email ? 'none' : 'block';
    form.emailInvalidError().style.display = validateEmail(email) ? 'none' : 'block';
}

function isPasswordValid(){
    const password = form.password().value;
    if(!password){
        return false
    }
    return true;
}

function togglePasswordErrors(){
    const password = form.password().value;

    form.passwordRequiredError().style.display = password ? 'none': 'block';
}

function toggleButtonsDisable() {
    const emailValid = isEmailValid();
    form.recoverPassword().disabled = !emailValid;

    const passwordValid = isPasswordValid();

    form.loginButton().disabled = !emailValid || !passwordValid;
}

const form = {
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    password: () => document.getElementById('password'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    recoverPassword: () => document.getElementById('recover-password-button'),
    loginButton: () => document.getElementById('login-button'),
}