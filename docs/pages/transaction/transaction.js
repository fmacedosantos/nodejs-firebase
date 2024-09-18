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
    date: () => document.getElementById('date'),
    dateRequiredError: () => document.getElementById('date-required-error'),
    value: () => document.getElementById('value'),
    valueRequiredError: () => document.getElementById('value-required-error'),
    valueLessOrEqualToZeroError: () => document.getElementById('value-less-or-equal-to-zero-error'),
    transactionType: () => document.getElementById('transaction-type'),
    transactionTypeRequiredError: () => document.getElementById('transaction-type-required-error'),
    saveButton: () => document.getElementById('save-button')
}