export default class LoadMoreBtn {
  constructor({ selector, isHidden }) {
    this.btn = this.getBtn(selector);
    this.btnText = document.querySelector('button span');
    this.btnSpiner = document.querySelector('button i');
    if (isHidden) this.hide();
    else this.show();
  }

  getBtn(selector) {
    return document.querySelector(selector);
  }

  hide() {
    this.btn.classList.add('hidden');
  }

  show() {
    this.btn.classList.remove('hidden');
  }

  disable() {
    this.btn.disable = true;
    this.btnText.textContent = 'Loading... ';
    this.btnSpiner.classList.add('fa', 'fa-spinner', 'fa-pulse');
  }

  enable() {
    this.btn.disable = false;
    this.btnText.textContent = 'Load more';
    this.btnSpiner.classList.remove('fa', 'fa-spinner', 'fa-pulse');
  }
}
