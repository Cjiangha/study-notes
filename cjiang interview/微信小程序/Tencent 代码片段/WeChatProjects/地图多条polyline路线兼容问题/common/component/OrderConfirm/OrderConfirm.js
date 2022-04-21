import { anyui } from '@alife/anyui-wx-framework/index.js';
import _a_u_navigateTo from '@alife/anyui-wx-api/lib/navigateTo.js';
anyui._wrapApi('navigateTo', _a_u_navigateTo)
export default class OrderConfirm {
  constructor(context) {
    this._context = context;
    this._leftFn = null;
    this._rightFn = null;
    this._data = null;
    this.leftBtnFn();
    this.rightBtnFn();
  }

  setDialog(data) {
  }

  show() {
    this._context.orderConfirm.show = true;
  }

  hidden() {
    this._context.orderConfirm.show = false;
  }

  leftBtnFn(cb) {
    this._leftFn = cb || this.hidden;
  }

  rightBtnFn(cb) {
    this._rightFn = cb || this.hidden;
  }

  callLeftCb() {
    this._leftFn();
  }

  callRightCb() {
    this._rightFn();
  }

  setFn6101(data) {
  }

  setFn6102(data) {
  }

  setFn1540(data) {
  }

  setFn155(data) {
  }

  setFn154(data) {
   
  }

  setFn28(data) {
  }

}
