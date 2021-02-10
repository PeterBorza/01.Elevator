// ****************************************
//  STARTUP
const startUpPage = () => {
	const overLay = div('overlay');
	const header = div('header');

	const title1 = document.createElement('h1');
	const title2 = document.createElement('button');
	title2.textContent = 'Enter';

	title2.addEventListener('click', () => {
		overLay.classList.add('animate');
		setTimeout(() => overLay.remove(), 1300);
	});

	document.body.addEventListener('keydown', e => {
		if (e.key === 'Enter') {
			overLay.classList.add('animate');
			setTimeout(() => overLay.remove(), 1300);
		}
	});

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
	overLay.append(header);

	return overLay;
};

main.append(startUpPage());
