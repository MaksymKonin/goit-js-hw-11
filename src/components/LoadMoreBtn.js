export default class LoadMoreBtn {
  constructor({ selector, isHidden }) {
    this.btn = this.getBtn(selector);
    this.btnSpiner = document.querySelector('button p');
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
    this.btn.textContent = 'Loading... ';
    this.btnSpiner.classList.add('fa', 'fa-spinner', 'fa-pulse');
  }
  enable() {
    this.btn.disable = false;
    this.btn.textContent = 'Load more';
    this.btnSpiner.classList.remove('fa', 'fa-spinner', 'fa-pulse');
  }
}
