/**
 * @author guowenhao
 * @description 动态数字面板功能简版
 */

let countFl = 17962;
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
            showInit(midcount);
        }
    }, 200);
}


// 点击地图第一个按钮 显示弹窗
let btn = document.querySelector(".top");
let dialogs = document.querySelectorAll(".hover_content");
btn.addEventListener('click',()=> {
    dialogs.forEach(item=> {
        item.style.display = "flex";
    })
    setTimeout(()=> {
        dialogs.forEach(item=> {
            item.style.display = "none";
        })
    },5000)
})

