let cart;
let request = $.ajax({
	dataType: 'json',
	url: '/menu',
	type: 'get'
});

request.done(function(resp){
	cart  = new Cart();
	cart.menu = resp;

	let sortArray = []

	let tab = $('#v-pills-tab');
	let tabContent = $('#v-pills-tabContent');

	resp.forEach(function(elem){
		if(sortArray.includes(elem.category)){
			let index = sortArray.findIndex(x => x === elem.category);

			let div =	`<div class="col-md-4 text-center">
							<div class="menu-wrap">
								<a href="javascript:void(0);" class="menu-img img mb-4" style="background-image: url(images/pizza-1.jpg);"></a>
								<div class="text">
									<h3><a href="#">${elem.name}</a></h3>
									<p>${elem.ingredients.join(", ")}</p>
									<p class="price"><span>${elem.price.toFixed(2)} zł</span></p>
									<p><a href="javascript:cart.add('${elem._id}')" class="btn btn-white btn-outline-white">Add to cart</a></p>
								</div>
							</div>
						</div>`;
			$(`#tabAppend${index}`).append(div);

		}else{
			let index = sortArray.push(elem.category) - 1;
			let tabToAppend = `<a class="nav-link" id="v-pills-${index}-tab" data-toggle="pill" href="#v-pills-${index}" role="tab" aria-controls="v-pills-${index}" aria-selected="false">${elem.category}</a>`
			tab.append($(tabToAppend));

			let tabContentToAppend =	`<div class="tab-pane fade" id="v-pills-${index}" role="tabpanel" aria-labelledby="v-pills-${index}-tab">
											<div class="row" id="tabAppend${index}">
											</div>
										</div>`;

			tabContent.append($(tabContentToAppend));
			console.log(elem)
			let div =	`<div class="col-md-4 text-center">
							<div class="menu-wrap">
								<a href="javascript:void(0);" class="menu-img img mb-4" style="background-image: url(images/pizza-1.jpg);"></a>
								<div class="text">
									<h3><a href="#">${elem.name}</a></h3>
									<p>${elem.ingredients.join(", ")}</p>
									<p class="price"><span>${elem.price.toFixed(2)} zł</span></p>
									<p><a href="javascript:cart.add('${elem._id}')" class="btn btn-white btn-outline-white">Add to cart</a></p>
								</div>
							</div>
						</div>`;
			$(`#tabAppend${index}`).append(div);
		}
	})

	$(tab.children("a")[0]).addClass("show active")
	$(tab.children("a")[0]).attr("aria-selected", "true")
	$(tabContent.children("div")[0]).addClass("show active")
})