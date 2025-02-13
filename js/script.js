window.addEventListener( 'DOMContentLoaded', ()=>{

  const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

        hideAll = () => {
          tabs.forEach( item => {
            item.classList.remove('tabheader__item_active');
          })
          tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
          })
        }
        showTab = (i = 0) => {
          tabsContent[i].classList.add('show', 'fade');
          tabsContent[i].classList.remove('hide');
          tabs[i].classList.add('tabheader__item_active');
        }
        
        hideAll();
        showTab();

        tabsParent.addEventListener('click', (e)=>{
            const target = e.target;

            if(target && target.classList.contains('tabheader__item')){
              tabs.forEach((item, i)=>{
                if(target == item){
                  hideAll();
                  showTab(i);
                }
              })
            }

        })

        // Timer


        
        const deadline = '03.03.2025'

        addZero = (n) =>{
          if (n>0 && n < 10) return `0${n}`
          else return n
        }

        getTimeRemaining = (endtime) => {
          const t = Date.parse(endtime) - Date.parse(new Date()),
                days = Math.floor(t / (1000 * 60 * 60 * 24)),
                hours = Math.floor(t / (1000 * 60 * 60) % 24),
                minutes = Math.floor(t / (1000 * 60) % 60),
                seconds = Math.floor((t / 1000) % 60);


          return{
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
          }
        }
        SetClock = (selector, endtime) => {
          const timer = document.querySelector(selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateClock, 1000);

                updateClock();

                function updateClock() {
                  const t = getTimeRemaining(endtime);

                  days.innerHTML = addZero(t.days);
                  hours.innerHTML = addZero(t.hours);
                  minutes.innerHTML = addZero(t.minutes);
                  seconds.innerHTML = addZero(t.seconds);

                  if (t.total < 0){
                    clearInterval(timeInterval);
                  }
                }
        }
        SetClock('.timer', deadline);







})