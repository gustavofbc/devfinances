function darkmode(){
    document.querySelector('body').classList.toggle('body-dark');

    document.querySelector('header').classList.toggle('header-dark');
    
    document.querySelector('.button-mode').classList.toggle('button-mode-active')    
    
    // Cards ====================================== 
    let cards = document.querySelectorAll('.card')
    cards.forEach(card => {
        card.classList.toggle('card-dark')
    });

    // Table ======================================
    let ths = document.querySelectorAll('th');
    ths.forEach(th => {
        th.classList.toggle('th-dark')
    }); 

    const tds = document.querySelectorAll('td');
    tds.forEach(td => {
        //adicionar cor aos itens da coluna "description" na tabela
        if(td.classList.contains('description')){
            td.classList.toggle('td-description-dark')
        }

        td.classList.toggle('td-dark')
    });

    //Footer =======================================
    document.querySelector('.text-footer').classList.toggle('text-footer-dark')

    //Modal =======================================
    document.querySelector('.modal').classList.toggle('modal-dark');

    document.querySelector('.title-modal').classList.toggle('title-modal-dark')
    
    document.querySelector('small').classList.toggle('inform')
}