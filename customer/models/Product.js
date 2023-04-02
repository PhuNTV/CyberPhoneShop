function Product(name,price,screen,backCamera,frontCamera,img,desc,type) {
    this.name = name;
    this.price = price;
    this.screen = screen;
    this.backCamera = backCamera;
    this.frontCamera = frontCamera;
    this.img = img;
    this.desc = desc;
    this.type = type;
}
function CartItem(name,img,price){
    this.name = name;
    this.img = img;
    this.price = price;
    this.quality = 1;
}