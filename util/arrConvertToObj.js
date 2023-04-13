const arrConvertToObj = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const pair = arr[i].split("=");
    const key = pair[0];
    const value = pair[1];
    let obj = {};
    obj[key] = value;
    return obj;
  }
};

export default arrConvertToObj;
