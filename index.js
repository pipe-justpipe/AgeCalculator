document.addEventListener('DOMContentLoaded', ()=> {

    const button = document.querySelector('.btn');
    let date = document.querySelector('#dy');
    let month = document.querySelector('#mnth');
    let year = document.querySelector('#yr');
    let inputYY = ''
    let inputMM = ''
    let inputDD = ''

    const todayDate = new Date();
   
    date.textContent = localStorage.getItem("ageDays")
    month.textContent =  localStorage.getItem("ageMonths") ;
    year.textContent =  localStorage.getItem("ageYears") ;



    document.querySelector('#inputDD').value = localStorage.getItem("inputDD")
    document.querySelector('#inputMM').value = localStorage.getItem("inputMM")
    document.querySelector('#inputYY').value = localStorage.getItem("inputYY")

    
   
    


    button.addEventListener('click', () => {

        

         inputDD = parseInt(document.querySelector('#inputDD').value);
         inputMM = parseInt(document.querySelector('#inputMM').value);
         inputYY = parseInt(document.querySelector('#inputYY').value);



         

            const dd = todayDate.getDate();
            const mm = todayDate.getMonth()+1;
            const yy = todayDate.getFullYear();


            let ageYears = yy  - inputYY;
            let ageMonths = mm - inputMM;
            let ageDays = dd - inputDD;
        

         console.log(inputDD)

        function validation() {
            const invalid = document.querySelector('#invalid');
            const invalides = document.querySelector('#invalides');
            const invalider = document.querySelector('#invalider');
    
            if (!inputDD || !inputMM || !inputYY){
                invalid.textContent = "Must be a valid date";
                invalides.textContent = "Must be a valid date";
                invalider.textContent = "Must be a valid date";


                date.textContent = "--";
                month.textContent =  "--";
                year.textContent =  "--";
                return

            }
            if (inputDD < 1|| inputMM < 1 || inputDD > 31  || inputMM > 12 ){
                invalid.textContent = "Must aa a valid date";
                invalides.textContent = "Must aa a valid date";


                date.textContent = "--";
                month.textContent =  "--";
                year.textContent =  "--";
                return
        
            }
            
            if(inputMM === 2 && inputDD > 28 ){
                invalid.textContent = "Must bb a valid date";
                invalides.textContent = "Must bb a valid date";

                date.textContent = "--";
                month.textContent =  "--";
                year.textContent =  "--";
                return
            }

            invalid.textContent = "";
            invalides.textContent = "";
            invalider.textContent = "";



           calculateAge(ageDays, ageMonths, ageYears)
        } ; 

        validation();



        function calculateAge(ageDays, ageMonths, ageYears){
            if ( ageMonths <= 0) {  //|| (ageMonths === 0 && ageDays < 0)
                ageYears--;
                
                ageMonths += 12;
                
            }
    
            if (ageDays < 0){
                const daysInLastMonth = new Date(yy,mm-1,0).getDate();
                // console.log(daysInLastMonth);
                ageDays += daysInLastMonth;
                ageMonths--;
            } 

            localStorage.setItem("ageDays", ageDays);
            localStorage.setItem("ageMonths", ageMonths);
            localStorage.setItem("ageYears", ageYears);


            localStorage.setItem("inputDD", inputDD);
            localStorage.setItem("inputMM", inputMM);
            localStorage.setItem("inputYY", inputYY);

            date.textContent = ageDays;
            month.textContent =  ageMonths;
            year.textContent =  ageYears;

            console.log(ageDays, ageMonths, ageYears);


        }

       
       
            
        // return {years: ageYears, months: ageMonths, days: ageDays};
    });

});