let loaders = document.querySelectorAll(".loaders");
loaders[0].children[0].children[0].children[0].innerHTML = "用户1";
loaders[1].children[0].children[0].children[0].innerHTML = "用户2";
loaders[2].children[0].children[0].children[0].innerHTML = "用户3";
loaders[3].children[0].children[0].children[0].innerHTML = "用户4";

loaders[0].children[0].children[0].children[1].children[0].innerHTML = 389;
loaders[1].children[0].children[0].children[1].children[0].innerHTML = 312;
loaders[2].children[0].children[0].children[1].children[0].innerHTML = 264;
loaders[3].children[0].children[0].children[1].children[0].innerHTML = 208;
loaders[0].children[0].children[1].setAttribute("style", `background-image: linear-gradient(to right, transparent 0%, #F9190F ${75}%,transparent ${75}%, transparent 100%)`)
loaders[1].children[0].children[1].setAttribute("style", `background-image: linear-gradient(to right, transparent 0%, #FDCF71 ${60}%,transparent ${60}%, transparent 100%)`)
loaders[2].children[0].children[1].setAttribute("style", `background-image: linear-gradient(to right, transparent 0%, #E97CFD ${50}%,transparent ${50}%, transparent 100%)`)
loaders[3].children[0].children[1].setAttribute("style", `background-image: linear-gradient(to right, transparent 0%, #77A2FE ${40}%,transparent ${40}%, transparent 100%)`)

let numShow = document.querySelectorAll(".desc");
numShow[0].children[1].children[0].innerHTML = 111;
numShow[1].children[1].children[0].innerHTML = 222;
numShow[2].children[1].children[0].innerHTML = 333;
numShow[3].children[1].children[0].innerHTML = 444;

// 长方形loader
let shapeLoaders = document.querySelectorAll(".loaders_shaped");
shapeLoaders[0].children[0].children[1].children[0].innerHTML = "用户1"
shapeLoaders[1].children[0].children[1].children[0].innerHTML = "用户2"
shapeLoaders[2].children[0].children[1].children[0].innerHTML = "用户3"
shapeLoaders[3].children[0].children[1].children[0].innerHTML = "用户4"

shapeLoaders[0].children[0].children[1].children[1].childNodes[0].nodeValue = 12330
shapeLoaders[1].children[0].children[1].children[1].childNodes[0].nodeValue = 12032
shapeLoaders[2].children[0].children[1].children[1].childNodes[0].nodeValue = 11390
shapeLoaders[3].children[0].children[1].children[1].childNodes[0].nodeValue = 11080

shapeLoaders[0].children[0].children[0].children[1].setAttribute("style", `background-image: linear-gradient(to right, transparent 0%, #50272B ${74}%,#FF400C ${75}%, #FF400C ${75}%,transparent ${76}%, transparent 100%)`)
shapeLoaders[1].children[0].children[0].children[1].setAttribute("style", `background-image: linear-gradient(to right, transparent 0%, #504A34 ${59}%,#FCB328 ${60}%, #FCB328 ${60}%,transparent ${61}%, transparent 100%)`)
shapeLoaders[2].children[0].children[0].children[1].setAttribute("style", `background-image: linear-gradient(to right, transparent 0%, #483970 ${49}%,#E57AFC ${50}%, #E57AFC ${50}%,transparent ${51}%, transparent 100%)`)
shapeLoaders[3].children[0].children[0].children[1].setAttribute("style", `background-image: linear-gradient(to right, transparent 0%, #213771 ${39}%,#5A88FF ${40}%, #5A88FF ${40}%,transparent ${41}%, transparent 100%)`)


let box1 = document.querySelector(".box_view1").children[0]
let box2 = document.querySelector(".box_view2").children[0]
let box3 = document.querySelector(".box_view3").children[0]

box1.innerHTML = 13
box2.innerHTML = 9
box3.innerHTML = 25