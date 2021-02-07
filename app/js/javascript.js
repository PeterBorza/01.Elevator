const main = document.querySelector('main');
const p = console.log;

const div = className => {
	const x = document.createElement('div');
	x.classList.add(className);

	return x;
};

// ******************************************
//  Constants

const storeyCount = 7;

// ****************************************
//  SETUP

const elevator = () => {
	const block = div('block');

	//  SHAFT A and SETUP, FUNCTIONS

	const shaftA = div('shaftA');
	const liftA = div('liftA');
	const liftAButtons = new Array(storeyCount).fill().map(renderLiftButton);
	liftAButtons.forEach(btn => liftA.append(btn));
	shaftA.append(liftA);

	//  SHAFT B and SETUP, FUNCTIONS

	const shaftB = div('shaftB');
	const liftB = div('liftB');
	const liftBButtons = new Array(storeyCount).fill().map(renderLiftButton);
	liftBButtons.forEach(btn => liftB.append(btn));
	shaftB.append(liftB);

	// *************************************************

	const myPosition = div('myPosition');

	const buttons = new Array(storeyCount)
		.fill()
		.map(renderBlockButton)
		.reverse();
	buttons.forEach(btn => myPosition.append(btn));

	// *************************************************************
	// EVENTLISTENER TO STOREY BUTTONS

	let a = 0;
	let b = 6;

	liftA.addEventListener('click', e => {
		if (e.target.tagName === 'BUTTON') {
			let target = e.target.textContent;
			liftA.style.transform = `translateY(${-target}00%)`;
			a = Number(target);
			p(a, b);
		}
	});

	liftB.addEventListener('click', e => {
		if (e.target.tagName === 'BUTTON') {
			let target = e.target.textContent;
			liftB.style.transform = `translateY(${-target}00%)`;
			b = Number(target);
			p(a, b);
		}
	});

	myPosition.addEventListener('click', e => {
		let pos = Number(e.target.textContent);
		let middle = Math.floor((a + b) / 2);
		if ((a <= b && pos <= middle) || (a >= b && pos > middle)) {
			liftA.style.transform = `translateY(${-pos}00%)`;
			a = pos;
		} else if ((a <= b && pos > middle) || (a >= b && pos <= middle)) {
			liftB.style.transform = `translateY(${-pos}00%)`;
			b = pos;
		}
	});

	// **********************************************************

	block.append(shaftA, myPosition, shaftB);

	return block;
};

// *******************************************************

const renderBlockButton = (_, i) => {
	const arrowUp = document.createElement('i');
	const arrowDown = document.createElement('i');
	arrowUp.classList.add('fas', 'fa-chevron-up');
	arrowDown.classList.add('fas', 'fa-chevron-down');
	const btn = document.createElement('button');
	const span = document.createElement('span');
	span.textContent = `${i}`;
	btn.prepend(arrowUp, span, arrowDown);

	return btn;
};

const renderLiftButton = (_, i) => {
	const btn = document.createElement('button');
	btn.textContent = `${i}`;

	return btn;
};

const renderElevator = elevator();

main.append(renderElevator);
