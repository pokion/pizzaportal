function Cart(){
	this.cart = [];
	this.span = $("#cartCount");
	this.cartContent = $("#cartContent");
	this.menu;

	this.add = function(id){
		this.cart.push(id);
		this.span.text(Number(this.span.text()) + 1)
	}
}