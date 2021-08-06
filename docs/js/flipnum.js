/**
 * @author guowenhao
 * @description 动态数字面板功能简版
 */

let countFl = 2000;
let items = document.querySelectorAll(".count_item");
let showInit = (num) => {
    for (let index = 0; index < num.toString().length; index++) {
        items[items.length - index - 1].innerHTML = num.toString()[num.toString().length - index - 1];
    }
}

if (countFl > 0) {
    let midcount = Number((countFl / 2).toFixed(0)) < 1 ? 1 : Number((countFl / 2).toFixed(0));
    showInit(midcount);
    var flipIterval = setInterval(() => {
        let add = Number(((countFl - midcount)/2).toFixed(0));
        if (add < 1) {
            window.clearInterval(flipIterval)
            showInit(midcount);
        } else {
            midcount += add;
            console.log(midcount);
            showInit(midcount);
        }
    }, 100);
}






