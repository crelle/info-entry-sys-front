const dev = process.env.NODE_ENV === 'development' ? true : false;
let BaseURL = '/api';

// if(dev) {
//     BaseURL = '/api'; // 本地webpack本地代理
// } else {
//     // BaseURL = 'http://10.10.10.32:8080'; // 服务器ngix反向代理 
//     BaseURL = 'http://139.196.125.106:8083'; // 服务器ngix反向代理 
//     console.log("################################");
// }

export { BaseURL };