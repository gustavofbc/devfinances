const Modal = {
// REFATORAR -> criar a função toggle
    open(){
        //abrir modal
        //adicionar a class active ao modal
        document.querySelector('.modal-overlay').classList.add('active')
    },
    close(){
        //fechar modal
        //remover a class active do modal
        document.querySelector('.modal-overlay').classList.remove('active')
    }
}

const Transaction = {
    //adicionando o "transactions" como atalho no all
    all: [
        {
            description: 'Luz',
            amount: -50000,
            date: '23/01/2021'
        },
        {
            description: 'Website',
            amount: 500000,
            date: '23/01/2021'
        },
        {
            description: 'Internet',
            amount: -20000,
            date: '23/01/2021'
        },
        {
            id: 4,
            description: 'App',
            amount: 100000,
            date: '23/01/2021'
        },
    ],
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
        tr.innerHTML = DOM.innerHTMLTransaction(transaction);
    
        DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount);

        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="assets/minus.svg" alt="Remover transação">
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

    formateDate() {
        console.log('Formatar os dados')
    },
    validateField() {
        const {description, amount, date} = Form.getValues()
        
        if(description.trim() === "" ||
           amount.trim() === "" ||
           date.trom() )
            {
                throw new Error('Por favor, preencha todos os campos!')
        }
        
    },

    submit(event) {
        event.preventDefault();

        //validar as campos
        Form.validateField();
        //formatar os dados
        Form.formateDate();
    }
}

const App = {
    init() {

        Transaction.all.forEach((transaction) =>{
            DOM.addTransaction(transaction)
        })
        
        DOM.updateBalance();

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
