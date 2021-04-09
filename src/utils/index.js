/**
 * filterObject
 * 过滤数据
 * @param {obj} 过滤对象
 * @param {arr} 过滤所保留的key值集合
 */
 export function filterObject(obj, arr) {
  if (typeof obj !== "object" || !Array.isArray(arr)) {
    throw new Error("参数格式不正确");
  }
  const result = {};
  Object.keys(obj)
    .filter((key) => arr.includes(key))
    .forEach((key) => {
      result[key] = obj[key];
    });
  return result;
}

/**
 * 截取url中的参数
 */
export function getUrlCode() {
  var url = location.search;
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
    }
  }
  return theRequest;
}

/**
 * 重定向地址
 */
export function redirectUrl() {
  const appid = "wxc6249c5392e970ad"; // 微信appid
  const url = window.location.href.split("?")[0];
  let redirect_uri = encodeURIComponent(url);
  window.location.href =
    "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
    appid +
    "&redirect_uri=" +
    redirect_uri +
    "&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect";
}
