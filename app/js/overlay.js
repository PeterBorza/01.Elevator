// ****************************************
//  STARTUP
const startUpPage = () => {
	const overLay = div('overlay');
	const header = div('header');
	const headerTyper = div('header-typer');

	overLay.addEventListener('click', () => {
		overLay.classList.add('animate');
		setTimeout(() => overLay.remove(), 1300);
	});

	const title1 = document.createElement('h1');
	const title2 = document.createElement('h2');
	title2.textContent = 'Click on the page and let the elevators unravel.';
	const title3 = document.createElement('h3');
	title3.textContent =
		'Let the journey begin as you choose your destination by clicking on the desired level , or just grab the elevator of choice for a spin...';

	// *************************************

	let txt = 'Welcome to the block.';
	let time = '150';

	let myArr = txt.split('');

	myArr.map((item, i) => {
		const span = document.createElement('span');
		span.textContent = item;
		span.classList.add('animation');
		span.style.animationDelay = `${Math.floor(Math.random() * time) * i}ms`;
		title1.append(span);
		return span;
	});

	// **************************************

	header.append(title1, title2);
	headerTyper.append(title3);
	overLay.append(header, headerTyper);

	return overLay;
};

main.append(startUpPage());
