function Panel(){
	this.main = null;

	this.navi = function(stage){
		
		if(this.main === null){
			$(stage).toggleClass('d-none');
			this.main = $(stage);
			$('.nav-item.menu-items[target-panel="'+ this.main[0].id +'"]').toggleClass('active');
			
		}else{
			this.main.toggleClass('d-none');
			$(stage).toggleClass('d-none');
			$($('.nav-item.menu-items[target-panel="'+ this.main[0].id +'"]')[0]).toggleClass('active');
			this.main = $(stage);
			$($('.nav-item.menu-items[target-panel="'+ this.main[0].id +'"]')[0]).toggleClass('active');
		}

	}

	this.pracownicy = function(){
		const controler = {

			get: function(){
				$.ajax({
					url: '/employee',
					method: 'GET',
					dataType: 'json',
				}).done(function(msg){
					let tbody = $('tbody#pracownicy');

					msg.forEach(function(el,index){
						let tr = $('<tr></tr>');
						let td = $(`<td>${index + 1}</td>
									<td target-id="${el._id}">${el.firstname}</td>
									<td target-id="${el._id}">${el.lastname}</td>
									<td target-id="${el._id}">${el.email}</td>
									<td target-id="${el._id}">${el.type}</td>
									<td target-id="${el._id}">${el.createdate.split('T')[0]} ${el.createdate.split('T')[1].split(':')[0]}:${el.createdate.split('T')[1].split(':')[1]}</td>
									<td target-id="${el._id}">${el.contractdate}</td>
									<td target-id="${el._id}">${el.position}</td>
									<td target-id="${el._id}">${el.phonenumber}</td>
									<td><button type="button" data-toggle="modal" id="${el._id}" data-target="#update" class="btn btn-warning btn-icon-text">
                            <i class="mdi mdi-account-settings"></i></button>
                            <button type="button" data-toggle="modal" id="${el._id}" data-target="#delete" class="btn btn-danger btn-icon-text">
                            <i class="mdi mdi-delete"></i></button></td>`);
						tr.append(td);
						tbody.append(tr);

					})
					$('button[data-target="#delete"]').click(function(el){
						let dataUser = $('td[target-id="'+el.currentTarget.id+'"]');
						$('button#delete').attr('user-id', el.currentTarget.id);

						$('span#daneUsun').text(`${$(dataUser[0]).text()} ${$(dataUser[1]).text()}`)
					})
					$('button[data-target="#update"]').click(function(el){

						let dataUser = $('td[target-id="'+el.currentTarget.id+'"]');
						$('button#patch').attr('user-id', el.currentTarget.id);

						$($('input#firstnamePatch')[0]).attr('placeholder',$(dataUser[0]).text())
						$($('input#lastnamePatch')[0]).attr('placeholder',$(dataUser[1]).text())
						$($('input#emailPatch')[0]).attr('placeholder',$(dataUser[2]).text())
						$($('input#positionPatch')[0]).attr('placeholder',$(dataUser[6]).text())
						$($('input#phonenumberPatch')[0]).attr('placeholder',$(dataUser[7]).text())
						$($('input#typePatch')[0]).attr('placeholder',$(dataUser[3]).text())
						$($('input#contractdatePatch')[0]).attr('placeholder',$(dataUser[5]).text())
					})
				}).fail(function(msg){
					if(msg.status == 401){
						alert(msg.responseText)
					}else{
						alert(msg.responseText)
					}
				})
			},
			put: function(){
				let firstname = $('input#firstname')[0].value;
				let lastname = $('input#lastname')[0].value;
				let email = $('input#email')[0].value;
				let position = $('input#position')[0].value;
				let phonenumber = $('input#phonenumber')[0].value;
				let password = $('input#password')[0].value;
				let type = $('input#type')[0].value;
				let contractdate = $('input#contractdate')[0].value;

				$.ajax({
					url: '/employee',
					method: 'PUT',
					dataType: 'json',
					data:{ firstname, lastname, email, position, phonenumber, password, type, contractdate}
				}).done(function(msg){
					console.log(msg);
					alert('Zapytanie poszło pomyślnie')
				}).fail(function(msg){
					if(msg.status == 401){
						alert(msg.responseText)
					}else{
						alert(msg.responseText)
					}
				})
			},
			patch: function(){

				let firstname = $('input#firstnamePatch')[0].value;
				let lastname = $('input#lastnamePatch')[0].value;
				let email = $('input#emailPatch')[0].value;
				let position = $('input#positionPatch')[0].value;
				let phonenumber = $('input#phonenumberPatch')[0].value.split(' ').join('');
				let type = $('input#typePatch')[0].value;
				let contractdate = $('input#contractdatePatch')[0].value;

				let dataUser = {
					firstname,
					lastname,
					email,
					position,
					phonenumber,
					type,
					contractdate
				}
				
				for(const [key, value] of Object.entries(dataUser)){
					if(value === ""){
						delete dataUser[key];
					}
				}

				$.ajax({
					url: '/employee',
					method: 'PATCH',
					dataType: 'json',
					data: {
						id: $('button#patch').attr('user-id'),
						update: {
							...dataUser
						}
					}
				}).done(function(msg){
					console.log(msg);
					alert('Zapytanie poszło pomyślnie')
				}).fail(function(msg){
					if(msg.status == 401){
						alert(msg.responseText)
					}else{
						alert(msg.responseText)
					}
				})
			},
			delete: function(){
				$.ajax({
					url: '/employee',
					method: 'DELETE',
					dataType: 'json',
					data: {
						id: $('button#delete').attr('user-id')
					}
				}).done(function(msg){
					console.log(msg);
					alert('Zapytanie poszło pomyślnie')
				}).fail(function(msg){
					if(msg.status == 410){
						alert(msg.responseText)
						$('tbody#pracownicy').empty()
						panel.pracownicy().get()
					}else{
						alert(msg.responseText)
					}
				})
			}
		}

		return controler;
	}//koniec pracownicy

	this.menu = function(){
		let controler = {
			get: function(){
				$.ajax({
					url: '/menu',
					method: 'GET',
					dataType: 'json',
				}).done(function(msg){
					let tbody = $('tbody#menu');
					window.menuDish = msg;

					msg.forEach(function(el,index){
						let tr = $('<tr></tr>');
						let td = $(`<td>${index + 1}</td>
									<td target-id="${el._id}">${el.name}</td>
									<td target-id="${el._id}">${el.price.toFixed(2)} zł</td>
									<td target-id="${el._id}">${el.category}</td>
									<td target-id="${el._id}">${el.ingredients.join(', ')}</td>
									<td><button type="button" data-toggle="modal" id="${el._id}" data-target="#updateMenu" class="btn btn-warning btn-icon-text">
                            <i class="mdi mdi-account-settings"></i></button>
                            <button type="button" data-toggle="modal" id="${el._id}" data-target="#deleteMenu" class="btn btn-danger btn-icon-text">
                            <i class="mdi mdi-delete"></i></button></td>`);
						tr.append(td);
						tbody.append(tr);

					})
					$('button[data-target="#deleteMenu"]').click(function(el){
						let dataUser = $('td[target-id="'+el.currentTarget.id+'"]');
						$('button#deleteMenu').attr('menu-id', el.currentTarget.id);

						$('span#daneUsunMenu').text(`${$(dataUser[0]).text()} ${$(dataUser[2]).text()}`)
					})
					$('button[data-target="#updateMenu"]').click(function(el){

						let dataUser = $('td[target-id="'+el.currentTarget.id+'"]');
						$('button#patchMenu').attr('menu-id', el.currentTarget.id);

						$($('input#name')[0]).attr('placeholder',$(dataUser[0]).text())
						$($('input#price')[0]).attr('placeholder',$(dataUser[1]).text().substr(0, dataUser[1].innerHTML.length -2))
						$($('input#category')[0]).attr('placeholder',$(dataUser[2]).text())
						$($('input#ingredients')[0]).attr('placeholder',$(dataUser[3]).text())
					})
				}).fail(function(msg){
					if(msg.status == 401){
						alert(msg.responseText)
					}else{
						alert(msg.responseText)
					}
				})
			},
			put: function(){
				let name = $('input#nameAdd')[0].value;
				let price = $('input#priceAdd')[0].value;
				let category = $('input#categoryAdd')[0].value;
				let ingredients = $('input#ingredientsAdd')[0].value.split(',');

				$.ajax({
					url: '/menu',
					method: 'PUT',
					dataType: 'json',
					data:{ name, price, category, ingredients }
				}).done(function(msg){
					console.log(msg);
					alert('Zapytanie poszło pomyślnie')
				}).fail(function(msg){
					if(msg.status == 401){
						alert(msg.responseText)
					}else{
						alert(msg.responseText)
					}
				})
			},
			patch: function(){

				let name = $('input#name')[0].value;
				let price = $('input#price')[0].value;
				let category = $('input#category')[0].value;
				let ingredients = $('input#ingredients')[0].value.split(',');

				let dataUser = {
					name,
					price,
					category,
					ingredients
				}
				
				for(const [key, value] of Object.entries(dataUser)){
					if(value === "" || value.length <= 1){
						delete dataUser[key];
					}
				}

				$.ajax({
					url: '/menu',
					method: 'PATCH',
					dataType: 'json',
					data: {
						id: $('button#patchMenu').attr('menu-id'),
						update: {
							...dataUser
						}
					}
				}).done(function(msg){
					console.log(msg);
					alert(msg)

					$('input#name')[0].value = "";
					$('input#price')[0].value = "";
					$('input#category')[0].value = "";
					$('input#ingredients')[0].value = "";
				}).fail(function(msg){
					if(msg.status == 401){
						alert(msg.responseText)
					}else{
						alert(msg.responseText)
					}

					$('input#name')[0].value = "";
					$('input#price')[0].value = "";
					$('input#category')[0].value = "";
					$('input#ingredients')[0].value = "";
				})
			},
			delete: function(){
				$.ajax({
					url: '/menu',
					method: 'DELETE',
					dataType: 'json',
					data: {
						id: $('button#deleteMenu').attr('menu-id')
					}
				}).done(function(msg){
					console.log(msg);
					alert(msg)
				}).fail(function(msg){
					if(msg.status == 410){
						alert(msg.responseText)
						$('tbody#menu').empty()
						panel.menu().get()
					}else{
						alert(msg.responseText)
					}
				})
			}
		}
		return controler
	}//koniec menu

	this.orders = function(){
		const controler = {
			get: function(){
				window.menuDish

				$.ajax({
					url: '/order',
					method: 'GET',
					dataType: 'json',
				}).done(function(msg){
					let tbody = $('tbody#orders');

					msg.forEach(function(el,index){
						let nazwy = [];
						let cena = 0;
						let ilosc = 0;
						
						el.ids.forEach(function(orderIds,index){
							ilosc = ilosc + orderIds.value
							window.menuDish.forEach(function(el,index){
								if(orderIds.id == el._id){
									let allItems = el.name;
									if(orderIds.value > 1){
										allItems = allItems + " x" + orderIds.value;
									}
									nazwy.push(allItems)
									cena = cena + (el.price * orderIds.value)
								}
							})
						})
						let ids = [];
						for(let i=0;i<el.ids.length;i++){
							ids.push(el.ids[i].id + '.' + el.ids[i].value);
						}

						let tr = $('<tr></tr>');
						let td = $(`<td>${index + 1}</td>
									<td target-id="${el._id}">${el.nameUser}</td>
									<td target-id="${el._id}">${el.phoneNumber}</td>
									<td target-id="${el._id}">${el.location}</td>
									<td target-id="${el._id}">${el.description}</td>
									<td target-id="${el._id}" cart-ids="${ids.join(',')}">${nazwy.join(", ")}</td>
									<td target-id="${el._id}">${ilosc}</td>
									<td target-id="${el._id}">${cena.toFixed(2)} zł</td>
									<td target-id="${el._id}">${el.date.split('T')[0]} ${el.date.split('T')[1].split(':')[0]}:${el.date.split('T')[1].split(':')[1]}</td>
									<td>
                            <button type="button" data-toggle="modal" id="${el._id}" onClick="panel.orders().delete('${el._id}')" class="btn btn-success btn-icon-text">
                            <i class="mdi mdi-check"></i></button>
                            <button type="button" data-toggle="modal" id="${el._id}" data-target="#fullOrder" class="btn btn-primary btn-icon-text">
                            <i class="mdi mdi-arrow-expand "></i></button></td>`);
						tr.append(td);
						tbody.append(tr);

					})
					$('button[data-target="#fullOrder"]').click(function(el){
						let orderInfo = $('td[target-id="'+el.currentTarget.id+'"]');
						$('#orderName').text(`${$(orderInfo[0]).text()}`);
						$('#orderNumber').text(`${$(orderInfo[1]).text()}`);
						$('#orderLocation').text(`${$(orderInfo[2]).text()}`);
						$('#orderDesc').text(`${$(orderInfo[3]).text()}`);
						$('#orderValue').text(`${$(orderInfo[5]).text()}`);
						$('#orderPrice').text(`${$(orderInfo[6]).text()}`);
						$('#orderDate').text(`${$(orderInfo[7]).text()}`);

						let ids = $(orderInfo[4]).attr('cart-ids').split(',');
						let item;

						for(const id in ids){
							let idAndValue = ids[id].split('.')

							window.menuDish.forEach(function(el,ind){
								if(idAndValue[0] == el._id){
									item = el.name + ' x' + idAndValue[1] + ': ' + el.ingredients.join(', ');
									$('#orderItems').append($('<p class="display-4">'+ item +'</p>'))
								}
							})
						}
					})
				}).fail(function(msg){
					if(msg.status == 401){
						alert(msg.responseText)
					}else{
						alert(msg.responseText)
					}
				})
			},
			delete: function(ID){
				$.ajax({
					url: '/order',
					method: 'DELETE',
					dataType: 'json',
					data: {
						id: ID
					}
				}).done(function(msg){
					console.log(msg);
					alert(msg)
				}).fail(function(msg){
					if(msg.status == 410){
						alert(msg.responseText)
						$('tbody#orders').empty();
						panel.orders().get();
					}else{
						alert(msg.responseText)
					}
				})
			}
		};
		return controler;
	}
}

let panel = new Panel();
panel.navi('#emploee-main')
panel.menu().get()
panel.pracownicy().get()
panel.orders().get()

setInterval(function(){
	$('tbody#orders').empty();
	panel.orders().get();
}, 60000)