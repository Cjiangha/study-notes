const app = getApp()

Page({
  data: {
    formList: [{
      label1: '',
      label2: '',
      label3: '',
      label4: '',
      label5: '',
      label6: ''
    }],
  },
   // 添加账号
   addAccount() {
    const baseAccount = {
      label1: '',
      label2: '',
      label3: '',
      label4: '',
      label5: '',
      label6: ''
    };
    this.data.formList.push(baseAccount);
    this.setData({ formList: this.data.formList });
  },
})
