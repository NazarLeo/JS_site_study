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
        modal = document.querySelector('.modal');
  
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
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') closeModal();
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) closeModal();
  })

  autoOpen = setTimeout(openModal, 50000); 

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

  const getResource = async (url) => {
    const res = await fetch(url);

    if(!res.ok) throw new Error(`Could not fetch ${url}, status ${res.status}`)

    return await res.json();
  }

  getResource('http://localhost:3000/menu')
    .then(data => {
      data.forEach(({img, altimg, title, descr, price})=>{
        new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
      });
    })

  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'img/form/spinner.svg',
    succes: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };

  forms.forEach(item => {
    bindPostData(item);
  })

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: 'POST',
      headers:{
        'Content-type': 'application/json'
      },
      body: data
    });

    return await res.json();
  }

  function bindPostData (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `
      form.insertAdjacentElement('afterend', statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()))

      postData('http://localhost:3000/requests', json)
      .then(data=>{
        console.log(data);
        showThanksModal(message.succes);
        statusMessage.remove();
      }).catch(()=>{
        showThanksModal(message.failure);
      }).finally(()=>{
        form.reset();
      })
    })
  }

  function showThanksModal(message){
    const prevModalDialog = document.querySelector('.modal__dialog')

    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class = "modal__content">
        <div class = "modal__close" data-close>×</div>
        <div class = "modal__title">${message}</div>
      </div>
    `

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.remove('hide');
      prevModalDialog.classList.add('show');
      closeModal();
    }, 4000)
  }

  fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res => console.log(res));

  //Slider

  const counter = document.querySelector('.offer__slider-counter'),
        slider = document.querySelector('.offer__slider'),
        slides = document.querySelectorAll('.offer__slide'),
        prev = counter.querySelector('.offer__slider-prev'),
        next = counter.querySelector('.offer__slider-next'),
        curr = counter.querySelector('#current'),
        total = counter.querySelector('#total'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;
  
  let slideIndex = 1;
  let offset = 0;
  
  if(slides.length < 10){
    total.textContent = `0${slides.length}`;
    curr.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    curr.textContent = slideIndex;
  }

  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  slidesWrapper.style.overflow = 'hidden';

  slides.forEach(slide=>{
    slide.style.width = width;
  })

  slider.style.position = 'relative';

  const indicators = document.createElement('ol'),
        dots = [];

  indicators.classList.add('carousel-indicators');
  indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
  `;
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++){
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-right: 3px;
      margin-left: 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transition: opacity .6s ease;
    `;
    if (i == 0){
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  };

  next.addEventListener('click', ()=>{
    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)){
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    };

    slidesField.style.transform = `translateX(-${offset}px)`

    if (slideIndex == slides.length){
      slideIndex = 1;
    }else{
      slideIndex++;
    }

    if (slides.length < 10){
      curr.textContent = `0${slideIndex}`;
    } else {
      curr.textContent = slideIndex;
    }

    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
  })

  prev.addEventListener('click', ()=>{
    if (offset == 0){
      offset = +width.slice(0, width.length - 2) * (slides.length - 1)
    } else {
      offset -= +width.slice(0, width.length - 2);
    };

    slidesField.style.transform = `translateX(-${offset}px)`

    if (slideIndex == 1){
      slideIndex = slides.length;
    }else{
      slideIndex--;
    }

    if (slides.length<10){
      curr.textContent = `0${slideIndex}`;
    } else {
      curr.textContent = slideIndex;
    }
    
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
  })

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset =  +width.slice(0, width.length - 2) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`

      if (slides.length<10){
        curr.textContent = `0${slideIndex}`;
      } else {
        curr.textContent = slideIndex;
      }

      dots.forEach(dot => dot.style.opacity = '.5');
      dots[slideIndex - 1].style.opacity = 1;

    });
  })



})