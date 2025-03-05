const closeModal = (modalSelector) => {
  const modal = document.querySelector(modalSelector);
  modal.classList.add("hide");
  modal.classList.remove("show");
  document.body.style.overflow = "";
};

const openModal = (modalSelector, modalTimerId) => {
  const modal = document.querySelector(modalSelector);
  modal.classList.add("show");
  modal.classList.remove("hide");
  document.body.style.overflow = "hidden";

  if (modalTimerId){
    clearTimeout(modalTimerId);
  }
};

function modal(triggerSelector, modalSelector, modalTimerId) {
  const modalTriger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);

  modalTriger.forEach((item) => {
    item.addEventListener("click", () => {
      openModal(modalSelector, modalTimerId);
    });
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == ""){
      closeModal(modalSelector);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal(modalSelector);
    }
  });

  const showModalByScroll = () => {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener("scroll", showModalByScroll);
    }
  };

  window.addEventListener("scroll", showModalByScroll);
}

export default modal;
export { closeModal, openModal };
