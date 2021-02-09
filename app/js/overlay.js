// ****************************************
//  STARTUP
const startUpPage = () => {
	const overLay = div('overlay');

	overLay.addEventListener('click', () => {
		// overLay.style.transition = 'transform 700ms ease-in-out';
		overLay.style.transform = 'translateY(-100%)';
		setTimeout(() => overLay.remove(), 1000);
	});

	const title1 = document.createElement('h1');
	title1.textContent = 'Welcome to the BLOCK.';
	const title2 = document.createElement('h2');
	title2.textContent = 'Click on the page and let the elevators unravel.';
	const title3 = document.createElement('h3');

	let i = 0;
	let txt =
		'Let the journey begin as you choose your destination by clicking on the desired level , or just grab the elevator of choice for a spin...';

	function typeWriter() {
		if (i < txt.length) {
			title3.innerHTML += txt.charAt(i);
			i++;
			setTimeout(typeWriter, 40);
		}
	}
	typeWriter();

	overLay.append(title1, title2, title3);

	return overLay;
};

main.append(startUpPage());
