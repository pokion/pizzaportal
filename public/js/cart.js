function Cart(){
	this.span = $("#cartCount");
	this.cartContent = $("#cartContent");
	this.cartProducts = $("#cartProducts");
	this.price = $("#priceTotal");
	this.menu;

	this.add = function(id){

		if($('div').find(`[dishId="id${id}"]`).length == 0){

			this.menu.forEach(function(elem){

				if(elem._id == id){

					let divDish = `
						<div class="row border-bottom" dishId="id${elem._id}">
								<div class="col-2 text-center border-right">
									<span class="text-dark font-weight-bold">1</span>
									<br>
									<button type="button" class="btn btn-success rounded p-1" onClick="cart.priceAdd('${elem.price}', 'id${elem._id}')">+</button>
									<button type="button" class="btn btn-danger rounded p-1" onClick="cart.priceAdd('${ - elem.price}', 'id${elem._id}')">-</button>
								</div>
								<div class="col-8 pl-2 border-right">
									<h3 class="text-dark">${elem.name}</h3>
									<h5 class="text-truncate text-dark">${elem.ingredients.join(", ")}</h5>
								</div>
								<div class="col-2">
									<p class="text-center">${elem.price.toFixed(2)}</p>
								</div>
						</div>`;

					this.cartProducts.append($(divDish)[0]);

					cart.priceAdd(elem.price)

				}
			})
		}else{

			this.menu.forEach(function(elem){
				if(elem._id == id){

					cart.priceAdd(elem.price, `id${id}`)

				}
			})
		}
		
	}

	this.active = function(){
		this.cartContent.toggleClass("d-none")
	}

	this.priceAdd = function(num,id){

		this.span.text(Number(this.span.text()) + 1 * (num / Math.abs(num)));
		this.price.text((Number(this.price.text()) + Number(num)).toFixed(2));
		let div = $('div').find(`[dishId="${id}"]`);
		let span = div.find('span');

		(span.text() == '1' && Number(num) < 0) ? div.remove() : span.text((Number(span.text()) + 1 * (num / Math.abs(num))));
	}
}

$('#kasa').click(function(){
	$('#cartProducts').toggleClass('d-none');
	$('#register').toggleClass('d-none');
})