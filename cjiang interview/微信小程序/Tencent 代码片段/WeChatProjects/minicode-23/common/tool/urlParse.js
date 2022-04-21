export const getSearchFromUrl = (url) => {
  if (!url) {
    return;
  }

  const urlObj = {};
  const urlArray = url.split("?")[1].split("&");
  urlArray.forEach((item) => {
    urlObj[item.split("=")[0]] = item.split("=")[1];
  });
  return urlObj;
};
export function getSearchParam(url, key) {
  if (!url) {
    return;
  }

  const urlObj = {};
  const searchArr = url.split("?");
  const searchStr = searchArr[searchArr.length - 1] || "";
  const urlArray = searchStr.split("&");
  urlArray.forEach((item) => {
    urlObj[item.split("=")[0]] = item.split("=")[1];
  });

  if (key) {
    return urlObj[key];
  }

  return urlObj;
}
