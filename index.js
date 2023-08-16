document.addEventListener('DOMContentLoaded', ()=>{

const button = document.querySelector('.btn');
let date = document.querySelector('#dy');
let month = document.querySelector('#mnth');
let year = document.querySelector('#yr');
let inputDD = document.querySelector('#inputDD');
let inputMM = document.querySelector('#inputMM');
let inputYY = document.querySelector('#inputYY');


const todayDate = new Date();
const dd = todayDate.getDate();
const mm = todayDate.getMonth()+1;
const yy = todayDate.getFullYear();

console.log(dd, mm, yy);

/*inputDD.addEventListener('input', (event) => 
{let valDD = event.target.value;
    date.textContent= valDD;
});

inputMM.addEventListener('input', (event) =>
{let valMM = event.target.value;
    month.textContent = valMM;
});

inputYY.addEventListener('input', (event) =>
{let valYY = event.target.value;
    year.textContent = valYY;
});*/

    /*date.textContent = inputDD.value;

    inputDD.addEventListener('input', vaDD);
    inputMM.addEventListener('input', vaMM);
    inputYY.addEventListener('input', vaYY);

    function vaDD (event) {
        let valDD = event.target.value;
        date.textContent= valDD;
    }
    
    function vaMM (event){
        let valMM = event.target.value;
        month.textContent = valMM;
    }
    
    function vaYY(event){
        let valYY = event.target.value;
        year.textContent = valYY;
    }

    button.addEventListener('click', () => {
    
        
    });*/

});





