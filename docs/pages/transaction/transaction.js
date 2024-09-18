if(!isNewTransaction()){
    const uid = getTransactionUid();
    findTransactionByUid(uid);
}

function logout(){
    firebase.auth().signOut().then(() => {
        window.location.href = '../../index.html';
    }).catch(() => {
        alert('Erro ao sair!')
    })
}

function getTransactionUid(){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('uid');
}

function isNewTransaction(){
    return getTransactionUid() ? false : true;
}

function findTransactionByUid(uid){
    showLoading();

    transactionService.findByUid(uid)
    .then(transaction => {
        hideLoading();
        if(transaction){
            fillTransactionScreen(transaction);
            toggleSaveButton();
        } else {
            alert('Documento não encontrado');
            window.location.href = '../home/home.html';
        }
    })
    .catch(() => {
        hideLoading();
        alert('Erro ao recuperar documento');
        window.location.href = '../home/home.html';
    });
}

function fillTransactionScreen(transaction){
    if(transaction.type == 'expense'){
        form.typeExpense().checked = true;
    } else {
        form.typeIncome().checked = true;
    }

    form.date().value = transaction.date;
    form.currency().value = transaction.money.currency;
    form.value().value = transaction.money.value;
    form.transactionType().value = transaction.transactionType;

    if(transaction.description){
        form.description().value = transaction.description;
    }
}

function saveTransaction(){
    showLoading();

    const transaction = createTransaction();

    if(isNewTransaction()){
        save(transaction);
    } else {
        update(transaction);
    }
}

function save(transaction){
    showLoading();

    transactionService.save(transaction)
    .then(() => {
        hideLoading();
        window.location.href = '../home/home.html';
    })
    .catch(() => {
        hideLoading();
        alert('Erro ao salvar transação');
    })
}

function update(transaction){
    showLoading();

    transactionService.update(transaction)
    .then(() => {
        hideLoading();
        window.location.href = '../home/home.html'
    })
    .catch(() => {
        hideLoading();
        alert('Erro ao atualizar transação');
    });
}

function createTransaction(){

    return {
        date: form.date().value,
        description: form.description().value,
        money: {
            currency: form.currency().value,
            value: parseFloat(form.value().value)
        },
        transactionType: form.transactionType().value,
        type: form.typeExpense().checked ? 'expense': 'income',
        user: {
            uid: firebase.auth().currentUser.uid
        }
    }
}

function onInputDate(){
    const date = form.date().value;
    form.dateRequiredError().style.display = !date ? 'block' : 'none';

    toggleSaveButton();
}

function onInputValue(){
    const value = form.value().value;

    form.valueRequiredError().style.display = !value ? 'block' : 'none';
    form.valueLessOrEqualToZeroError().style.display = value <= 0 ? 'block' : 'none';

    toggleSaveButton();
}

function onInputTransactionType(){
    const transactionType = form.transactionType().value;

    form.transactionTypeRequiredError().style.display = !transactionType ? 'block' : 'none';

    toggleSaveButton();
}

function toggleSaveButton(){
    form.saveButton().disabled = !isFormValid();
}

function isFormValid(){
    const date = form.date().value;
    const value = form.value().value;
    const transactionType = form.transactionType().value;

    if(!date){
        return false;
    }

    if(!value || value <= 0){
        return false;
    }

    if(!transactionType){
        return false;
    }

    return true;
}

function cancel(){
    window.location.href = '../home/home.html'
}

const form = {
    typeExpense: () => document.getElementById('expense'),
    typeIncome: () => document.getElementById('income'),
    date: () => document.getElementById('date'),
    dateRequiredError: () => document.getElementById('date-required-error'),
    currency: () => document.getElementById('currency'),
    value: () => document.getElementById('value'),
    valueRequiredError: () => document.getElementById('value-required-error'),
    valueLessOrEqualToZeroError: () => document.getElementById('value-less-or-equal-to-zero-error'),
    transactionType: () => document.getElementById('transaction-type'),
    transactionTypeRequiredError: () => document.getElementById('transaction-type-required-error'),
    currency: () => document.getElementById('currency'),
    description: () => document.getElementById('description'),
    saveButton: () => document.getElementById('save-button')
}
