/**
 * 存储用户信息
 */
export const saveUserInfo = (content) => {
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.sessionStorage.setItem("userInfo", content);
}

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return JSON.parse(window.sessionStorage.getItem("userInfo"));
}

/**
 * 删除用户信息
 */
export const removeUserInfo = () => {
  window.sessionStorage.removeItem("userInfo");
}

/**
 * 获取用户信息中的token
 */
export const getToken = () => {
  var userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
  return userInfo ? userInfo.token : "";
}

/**
 * 获取用户信息中的corpID
 */
export const getCorpID = () => {
  var userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
  return userInfo ? userInfo.corpID : "";
}
