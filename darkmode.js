document.addEventListener('DOMContentLoaded', () => {
    const darkModeStorage = localStorage.getItem('dark-mode');
    const html = document.querySelector('html');
    const inputDarkMode = document.getElementById('input-dark-mode');

    //verifica se o modo noturno está habilitado antes ao carregar a página
    if(darkModeStorage){
        html.setAttribute("dark", "true");
        document.querySelector('.button-mode').classList.add('button-mode-active');
    }

    //lógica para alterar de tema
    inputDarkMode.addEventListener('change', () => {
        if(inputDarkMode.checked){
            html.setAttribute("dark", "true");
            localStorage.setItem("dark-mode", true);
            //mudar svg para a versão do modo dark
            document.querySelector('.button-mode').classList.add('button-mode-active');
        } else {
            html.removeAttribute('dark');
            localStorage.removeItem("dark-mode");
            //mudar svg para a versão do modo light
            document.querySelector('.button-mode').classList.remove('button-mode-active');
        }
    })
})

//função antiga:

// function darkmode(){
//     document.querySelector('body').classList.toggle('body-dark');

//     document.querySelector('header').classList.toggle('header-dark');
    
//     document.querySelector('.button-mode').classList.toggle('button-mode-active')    
    
//     // Cards ====================================== 
//     let cards = document.querySelectorAll('.card')
//     cards.forEach(card => {
//         card.classList.toggle('card-dark')
//     });

//     // Table ======================================
//     let ths = document.querySelectorAll('th');
//     ths.forEach(th => {
//         th.classList.toggle('th-dark')
//     }); 

//     const tds = document.querySelectorAll('td');
//     tds.forEach(td => {
//         //adicionar cor aos itens da coluna "description" na tabela
//         if(td.classList.contains('description')){
//             td.classList.toggle('td-description-dark')
//         }

//         td.classList.toggle('td-dark')
//     });

//     //Footer =======================================
//     document.querySelector('.text-footer').classList.toggle('text-footer-dark')

//     //Modal =======================================
//     document.querySelector('.modal').classList.toggle('modal-dark');

//     document.querySelector('.title-modal').classList.toggle('title-modal-dark')
    
//     document.querySelector('small').classList.toggle('inform')
// }