function saveTransaction(){
    showLoading();

    const transaction = createTransaction();

    firebase.firestore()
    .collection('transactions')
    .add(transaction)
    .then(() => {
        hideLoading();
        window.location.href = '../home/home.html';
    })
    .catch(() => {
        hideLoading();
        alert('Erro ao salvar transação');
    })
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

const form = {
    typeExpense: () => document.getElementById('expense'),
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