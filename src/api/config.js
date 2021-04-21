const dev = process.env.NODE_ENV === 'development' ? true : false;
let BaseURL = '';

if(dev) {
    BaseURL = '/api'; // 本地webpack本地代理
} else {
    BaseURL = '/api'; // 服务器ngix反向代理
}

export { BaseURL };