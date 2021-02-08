const Modal = {
    toggleModal(){
        document.querySelector('.modal-overlay').classList.toggle('active')
    },
}

const Storage = {
    get() {
        //transforma p/ array
        return JSON.parse(localStorage.getItem("dev.finances:transactions")) || [];
    },
    set(transactions) {
        //transformar o array p/ string
        localStorage.setItem("dev.finances:transactions", JSON.stringify(transactions));
    }
}

const Transaction = {
    //adicionando o "transactions" como atalho no all
    all: Storage.get(),
    add(transaction){
        Transaction.all.push(transaction);

        App.reload();
    },

    remove(index){
        Transaction.all.splice(index, 1);

        App.reload();
    },

    incomes() {
        let income = 0;
        Transaction.all.forEach(transaction => {
            if(transaction.amount > 0){
                income += transaction.amount;
            }
        })

        return income;
    },

    expenses(){
        let expense = 0;
        Transaction.all.forEach(transaction => {
            if(transaction.amount < 0){
                expense += transaction.amount;
            }
        })

        return expense;
    },

    total(){
        return Transaction.incomes() + Transaction.expenses();
    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),
    
    addTransaction(transaction, index) {
        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index);
        //add posição do array do elemento
        tr.dataset.index = index;

        DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction, index) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount);

        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img onclick="Transaction.remove(${index})" src="assets/minus.svg" alt="Remover transação">
            </td>
        `

        return html;
    },

    updateBalance() {
        document.getElementById('income-display').innerHTML = Utils.formatCurrency(Transaction.incomes())
        document.getElementById('expense-display').innerHTML = Utils.formatCurrency(Transaction.expenses())
        document.getElementById('total-display').innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
    }
}

const Utils = {
    formatAmount(value){
        // value = Number(value.replace('/\,\./g,')) * 100
        value = Number(value) * 100;
        return Math.round(value);
    },

    formatDate(date){
        const splittedDate = date.split("-");
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
    },

    formatCurrency(value){
        const signal = Number(value) < 0 ? "-" : ""
        
        value = String(value).replace(/\D/g, '');

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value;
    }
}

const Form = {
    //propriedades:
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    //pegando apenas os valores
    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value,
        }
    },

    //validação dos dados
    validateField() {
        const {description, amount, date} = Form.getValues();
        
        if(description.trim() === "" ||
           amount.trim() === "" ||
           date.trim() === "")
            {
                throw new Error('Por favor, preencha todos os campos!')
        }
        
    },

    //formatar os dados
    formatValues() {
        let {description, amount, date} = Form.getValues();
        
        amount = Utils.formatAmount(amount);
        date = Utils.formatDate(date);

        return {
            description: description,
            amount: amount,
            date: date,
        }
    },

    clearFields() {
        Form.description.value = "";
        Form.amount.value = "";
        Form.date.value = "";
    },

    submit(event) {
        event.preventDefault();

        try{
            //validar as campos
            Form.validateField();
            //formatar os dados
            const transaction = Form.formatValues();
            //salvar a transação
            Transaction.add(transaction);
            //apagar os dados do formulário
            Form.clearFields();
            //fechar o modal
            Modal.toggleModal();

        } catch (error) {
            //retorna a mensagem de erro do método validate
            alert(error.message)
        }

    }
}

const App = {
    init() {

        Transaction.all.forEach((transaction, index) =>{
            DOM.addTransaction(transaction, index)
        })
        
        DOM.updateBalance();
        //atualizando o localStorage
        Storage.set(Transaction.all)

    },
    reload() {
        //limpa os registros anteriores
        DOM.clearTransactions();
        //adiciona os novos
        App.init();
    }
}

//Inicializando a aplicação
App.init();
