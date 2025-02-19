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
            timeInterval = setInterval(updateClock, 1000)
            updateClock()
            function updateClock() {
              const t = getTimeRemaining(endtime)
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

  // Modal

  const modalTriger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector ('[data-close]');
  
  openModal = () => {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearTimeout(autoOpen);
  }

  modalTriger.forEach((item)=>{
      item.addEventListener('click', () => {
        openModal();
    })
  });


  closeModal = () =>{
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  };

  modalCloseBtn.addEventListener('click', closeModal);
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) closeModal();
  })

  // autoOpen = setTimeout(openModal, 3000);

  showModalByScroll = () => {
    if(window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight){
        openModal();
        window.removeEventListener('scroll', showModalByScroll);
      }
  }

  window.addEventListener('scroll', showModalByScroll);

  //Classes

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector){
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 40;
      this.changeToUAH();
    }

    changeToUAH(){
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div');
      element.innerHTML = `
      <div class="menu__item">
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      </div>
      `;
      this.parent.append(element)
    }

  }

  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    ".menu .container"
  ).render();
  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    18,
    ".menu .container"
  ).render();
  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    16,
    ".menu .container"
  ).render();

  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'Загрузка',
    succes: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };

  forms.forEach(item => {
    postData(item);
  })

  function postData (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      statusMessage.textContent = message.loading;
      form.append(statusMessage);

      const request = new XMLHttpRequest();
      request.open('POST', 'server.php');

      request.setRequestHeader('Content-type', 'application/json');
      const formData = new FormData(form);

      const object = {};
      formData.forEach(function(value, key) {
        object[key] = value;
      })

      const json = JSON.stringify(object);

      request.send(json);

      request.addEventListener('load', ()=>{
        if (request.status === 200){
          console.log(request.response);
          statusMessage.textContent = message.succes;
          form.reset();
          setTimeout(()=>{
            statusMessage.remove();
          }, 2000);
        } else {
          statusMessage.textContent = message.failure;
        }
      })

    })
  }

})