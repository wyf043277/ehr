import COS from 'cos-js-sdk-v5'
import options from './options/option.js'


// SECRETID 和 SECRETKEY请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
let cos = new COS({
    SecretId: options.SecretId,
    SecretKey: options.SecretKey,
});
function uploadToCos(key,file,onProgress){
  return cos.uploadFile({
    Bucket: options.Bucket,
    Region: options.Region,
    Key: key,              /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
    Body: file, // 上传文件对象
    onProgress
  })
}
export {cos,uploadToCos}
