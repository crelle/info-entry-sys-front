const dev = process.env.NODE_ENV === 'development' ? true : false;
let BaseURL = '';

if(dev) {
    BaseURL = '/api';
} else {
    BaseURL = 'http://1.116.79.69:80'
}

export { BaseURL };