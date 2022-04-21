
Page({
  data: {
    value: "",
    valList: [],
    inputFocus: false,
    encryptedValue: ''
  },

  onLoad(options) {

  },
  focusInput() {
    this.setData({
      inputFocus: true
    })
  },
  onInput(res) {
    const { value, encryptedValue } = res.detail;

    console.log(value);
    // if (value.length > 6) {
    //   return;
    // }
    // let valList = value.split('')
    // console.log(value)

    // console.log(valList)
    // this.setData({
    //   value,
    //   valList

    // })
  },
  onBlur(res) {
    console.log(JSON.stringify(res.detail, null, 2));
    const sm2 = require('miniprogram-sm-crypto').sm2;

    const cipherMode = 1; // 1 - C1C3C2，0 - C1C2C3，默认为1

    let keypair = sm2.generateKeyPairHex();

    let publicKey = keypair.publicKey; // 公钥
    let privateKey = keypair.privateKey; // 私钥

    let verifyResult = sm2.verifyPublicKey(publicKey); // 验证公钥

    const msgString = "123";

    let encryptData = sm2.doEncrypt(msgString, publicKey, cipherMode); // 加密结果
    let decryptData = sm2.doDecrypt(encryptData, privateKey, cipherMode); // 解密结果
  
    console.log(verifyResult);

    console.log(encryptData);

    console.log(decryptData);

    let newPublicKey = "049c044590a2622836377a697bde361e245f0f4e6bcc5daab0d5ef228a4820a1c4bcf5fdf4fad762f2ed158c904c6896310644e26de30b58ff45be27c3f0c35bd5";
    let newPrivateKey = "d5166c1873b93f4b27da2e9be65abdb7b057ac178374d0067a84b95d8953db13";

    let NewVerifyResult = sm2.verifyPublicKey(newPublicKey);

    let NewEncryptData = sm2.doEncrypt(msgString, newPublicKey, cipherMode); // 加密结果
    let NewDecryptData = sm2.doDecrypt(NewEncryptData, newPrivateKey, cipherMode); // 解密结果

    console.log(NewVerifyResult);

    console.log(NewEncryptData);
    console.log(NewDecryptData);
    

    const { encryptedValue } = res.detail;

    if(!encryptedValue){
      return
    }

    console.log(encryptedValue);
    console.log(encryptedValue.indexOf("V02_") > -1 ? encryptedValue.replace("V02_", "") : false);

    let passwordDecryptData = encryptedValue.indexOf("V02_") > -1 ? sm2.doDecrypt(encryptedValue, newPrivateKey, cipherMode) : false; // 解密结果
    let passwordDecryptDatas = encryptedValue.indexOf("V02_") > -1 ? sm2.doDecrypt(encryptedValue.replace("V02_", ""), newPrivateKey, cipherMode) : false; // 解密结果

    console.log('---passwordDecryptData---',passwordDecryptData);
    console.log('--passwordDecryptDatas--',passwordDecryptDatas);

    return

    this.setData({
      encryptedValue
    });
    let param = {encryptedData: encryptedValue};
    // api.fetchInputPwd(param).then(res => {
    //   console.log(res);
    // })
  }
});
