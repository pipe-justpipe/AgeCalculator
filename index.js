document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.btn');
    const inputD = document.querySelector('#inputDD');
    const inputM = document.querySelector('#inputMM');
    const inputY = document.querySelector('#inputYY');

    updateAgeContent();

    [inputD, inputM, inputY].forEach(input => {
        input.addEventListener('input', () => {
            changeBorderColor(true);
            changeTextColor(true);
        });
    });/////

    function updateAgeContent() {
        const date = document.querySelector('#dy');
        const month = document.querySelector('#mnth');
        const year = document.querySelector('#yr');

        const ageDays = localStorage.getItem('ageDays') || '--';
        const ageMonths = localStorage.getItem('ageMonths') || '--';
        const ageYears = localStorage.getItem('ageYears') || '--';

        const currentAgeDays = date.textContent;
        const currentAgeMonths = month.textContent;
        const currentAgeYears = year.textContent;

        date.textContent = ageDays;
        month.textContent = ageMonths;
        year.textContent = ageYears;

        if (currentAgeDays !== ageDays) {
            date.classList.add('age-value-animation');
        }
        if (currentAgeMonths !== ageMonths) {
            month.classList.add('age-value-animation');
        }
        if (currentAgeYears !== ageYears) {
            year.classList.add('age-value-animation');
        }

        setTimeout(() => {
            date.classList.remove('age-value-animation');
            month.classList.remove('age-value-animation');
            year.classList.remove('age-value-animation');
        }, 5000);
    }

    function changeBorderColor(valid) {
        const inpute = document.querySelectorAll('input');
        inpute.forEach(input => {
            input.style.borderColor = valid ? 'var(--Light-grey)' : 'var(--Light-red)';
        });
    }

    function changeTextColor(valid) {
        const textCol = document.querySelectorAll('label');
        textCol.forEach(label => {
            label.style.color = valid ? 'var(--smokey-grey)' : 'var(--Light-red)';
        });
        
        const inpute = document.querySelectorAll('input');
        inpute.forEach(input => {
            const inputIsEmpty = input.value.trim() === '';
            input.style.color = inputIsEmpty ? 'var(--Smokey-grey)' : 'black';
            input.style.fontWeight = inputIsEmpty ? 'normal' : 'bold';
        });
    }
    
    button.addEventListener('click', () => {
        const inputDD = parseInt(inputD.value);
        const inputMM = parseInt(inputM.value);
        const inputYY = parseInt(inputY.value);

        const todayDate = new Date();
        const yy = todayDate.getFullYear();

        const invalid = document.querySelector('#invalid');
        const invalides = document.querySelector('#invalides');
        const invalider = document.querySelector('#invalider');

        function showErrorMessages(dayMessage, monthMessage, yearMessage) {
            invalid.textContent = dayMessage;
            invalides.textContent = monthMessage;
            invalider.textContent = yearMessage;
        }

        function clearErrorMessages() {
            invalid.textContent = '';
            invalides.textContent = '';
            invalider.textContent = '';
        }

        function isValidDate(day, month, year) {
            const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

            return (
                day >= 1 && day <= daysInMonth[month] + (month === 2 && isLeapYear) &&
                month >= 1 && month <= 12 &&
                year >= 1800 && year <= yy
            );
        }

        function isFutureDate(day, month, year) {
            return (
                year > todayDate.getFullYear() ||
                (year === todayDate.getFullYear() && (month > todayDate.getMonth() + 1 || (month === todayDate.getMonth() + 1 && day > todayDate.getDate())))
            );
        }

        function calculateAge(date) {
            const diff = todayDate - date;
            const ageDate = new Date(diff);

            return {
                years: ageDate.getUTCFullYear() - 1970,
                months: ageDate.getUTCMonth(),
                days: ageDate.getUTCDate() - 1
            };
        }

        const isDDRequired = !inputDD;
        const isMMRequired = !inputMM;
        const isYYRequired = !inputYY;

        if (isDDRequired || isMMRequired || isYYRequired) {
            showErrorMessages(
                isDDRequired ? "This field is required" : "",
                isMMRequired ? "This field is required" : "",
                isYYRequired ? "This field is required" : ""
            );

            localStorage.removeItem('ageDays');
            localStorage.removeItem('ageMonths');
            localStorage.removeItem('ageYears');
            
            updateAgeContent(); 
            
            changeBorderColor(false);
            changeTextColor(false);
        } else if (!isValidDate(inputDD, inputMM, inputYY)) {
            showErrorMessages(
                inputDD < 1 || inputDD > 31 ? "Must be a valid day" : "",
                inputMM < 1 || inputMM > 12 ? "Must be a valid month" : "",
        
                inputYY > yy ? "Must be in the past" : inputYY < 1800 ? "Must be a valid year" : ""
            );

            
            localStorage.removeItem('ageDays');
            localStorage.removeItem('ageMonths');
            localStorage.removeItem('ageYears');
            
            updateAgeContent(); 
            
            
            if ([2].includes(inputMM) && inputDD > 28) {
                showErrorMessages("Must be a valid date", "", "");
            }
            if ([4].includes(inputMM) && inputDD > 30) {
                showErrorMessages("Must be a valid date", "", "");
            }
            if ([6].includes(inputMM) && inputDD > 30) {
                showErrorMessages("Must be a valid date", "", "");
            }
            if ([9].includes(inputMM) && inputDD > 30) {
                showErrorMessages("Must be a valid date", "", "");
            }
            if ([11].includes(inputMM) && inputDD > 30) {
                showErrorMessages("Must be a valid date", "", "");
            }

            changeBorderColor(false);
            changeTextColor(false);
        } else if (isFutureDate(inputDD, inputMM, inputYY)) {
            showErrorMessages(
                inputDD > todayDate.getDate() || inputMM > todayDate.getMonth() + 1 || inputYY > todayDate.getFullYear()
                    ? "The date is in the future"
                    : "",
                "The date is in the future",
                "The date is in the future"
            );

            
            localStorage.removeItem('ageDays');
            localStorage.removeItem('ageMonths');
            localStorage.removeItem('ageYears');
            
            updateAgeContent(); 
            
            changeBorderColor(false);
            changeTextColor(false);
        } else {
            clearErrorMessages();

            changeBorderColor(true);
            changeTextColor(true);

            const inputDate = new Date(inputYY, inputMM - 1, inputDD);
            const age = calculateAge(inputDate);

            localStorage.setItem('ageDays', age.days);
            localStorage.setItem('ageMonths', age.months);
            localStorage.setItem('ageYears', age.years);

            updateAgeContent();
        }
    });
});
