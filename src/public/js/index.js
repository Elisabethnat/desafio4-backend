const socket = io();

const productsContainer = document.querySelector('#products-container');
const goToRealTimeProds = document.querySelector('#goToRealTimeProds');

socket.emit('load');


socket.on('products', products => {
	if (products.length === 0) {
		productsContainer.innerHTML = '<h3> No hay productos agregados, anda a <a href="/static/realtimeproducts">/static/realtimeproducts</a> para agregarlos!.</h3>';
	} else {
		productsContainer.innerHTML = '';
		products.forEach(prod => {
			productsContainer.innerHTML += `
			<div class="product-container">
				<p>Id: ${prod.id}</p>
				<p>Title: ${prod.title}</p>
				<p>Description: ${prod.description}</p>
				<p>Price: ${prod.price}</p>
				<p>Status: ${prod.status}</p>
				<p>Code: ${prod.code}</p>
				<p>Stock: ${prod.stock}</p>
			</div>
			`;
		});
	}
});


  goToRealTimeProds.addEventListener('click', () => {
    window.location.href = '/static/realtimeproducts';
  });