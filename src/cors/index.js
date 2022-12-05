import COS from 'cos-js-sdk-v5'
import options from './options/option.js'
var cos = new COS({
    // getAuthorization 必选参数
    getAuthorization: function (options, callback) {
        // 异步获取临时密钥
        // 服务端 JS 和 PHP 例子：https://github.com/tencentyun/cos-js-sdk-v5/blob/master/server/
        // 服务端其他语言参考 COS STS SDK ：https://github.com/tencentyun/qcloud-cos-sts-sdk
        // STS 详细文档指引看：https://cloud.tencent.com/document/product/436/14048

        var url = 'http://127.0.0.1:3000/sts'; // url替换成您自己的后端服务
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function (e) {
            try {
                var data = JSON.parse(e.target.responseText);
                var credentials = data.credentials;
                console.log(data.credentials)
            } catch (e) {
            }
            if (!data || !credentials) {
              return console.error('credentials invalid:\n' + JSON.stringify(data, null, 2))
            };
            callback({
              TmpSecretId: credentials.tmpSecretId,
              TmpSecretKey: credentials.tmpSecretKey,
              SecurityToken: credentials.sessionToken,
              // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
              StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
              ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000000
          });
        };
        xhr.send();
    },
    //配置CDN加速
    Domain: `ehrcos.wyfjs.top`,// 自定义加速域名，Domain 参数支持模板，这个例子里 {Bucket} 会在请求时按传入的 Bucket 自动替换
    Protocol: 'http:',// 请求协议： 'https:' 或 'http:'
})
function uploadToCos(key,file,onProgress){
  return cos.uploadFile({
    Bucket: options.Bucket,
    Region: options.Region,
    Key: key,              /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
    Body: file, // 上传文件对象
    onProgress
  })
}
export {uploadToCos}
