const main = document.querySelector('main');
const p = console.log;

const div = className => {
	const x = document.createElement('div');
	x.classList.add(className);

	return x;
};

// ******************************************

const storeyCount = 7;

const num = [5, 6, 3, 4, 1, 2, 0];

// ****************************************
//  SETUP

const elevator = () => {
	const block = div('block');

	// *************************************************
	//  THE SYSTEM

	const myPosition = div('myPosition');

	const buttons = new Array(storeyCount)
		.fill()
		.map(renderBlockButton)
		.reverse();
	buttons.forEach(btn => {
		btn.addEventListener('click', e => {
			e.stopPropagation;
			myPosition.childNodes.forEach(child => {
				child.classList.remove('open');
				btn.classList.add('open');
			});
		});
		myPosition.append(btn);
	});

	// ******************************************
	//  SHAFT A

	let a = 0;
	let b = 6;

	const shaftA = div('shaftA');
	const liftA = div('liftA');
	const panelA = div('panel');
	liftA.append(panelA);
	// const liftAButtons = new Array(storeyCount).fill().map(renderLiftButton);
	const liftAButtons = num.map(renderLiftButton);
	liftAButtons.forEach(btn => {
		btn.addEventListener('click', e => {
			e.stopPropagation;
			panelA.childNodes.forEach(child => {
				child.style.color = '#298C93';
			});
			btn.style.color = 'red';
			let target = btn.innerHTML;
			liftA.style.transform = `translateY(${-target}00%)`;
			a = Number(target);

			floorLights(myPosition, target);
		});
		panelA.append(btn);
	});
	shaftA.append(liftA);

	// ************************************************
	//  SHAFT B

	const shaftB = div('shaftB');
	const liftB = div('liftB');
	const panelB = div('panel');
	liftB.append(panelB);
	// const liftBButtons = new Array(storeyCount).fill().map(renderLiftButton);
	const liftBButtons = num.map(renderLiftButton);

	liftBButtons.forEach(btn => {
		btn.addEventListener('click', e => {
			e.stopPropagation;
			panelB.childNodes.forEach(child => {
				child.style.color = '#298C93';
			});
			btn.style.color = 'red';
			let target = btn.innerHTML;
			liftB.style.transform = `translateY(${-target}00%)`;
			b = Number(target);

			floorLights(myPosition, target);
		});
		panelB.append(btn);
	});
	shaftB.append(liftB);

	// **************************************************
	// EVENTLISTENERS

	myPosition.addEventListener('click', e => {
		let pos = Number(e.target.innerHTML);
		let middle = Math.floor((a + b) / 2);
		if ((a <= b && pos <= middle) || (a >= b && pos > middle)) {
			liftA.style.transform = `translateY(${-pos}00%)`;
			a = pos;
		} else if ((a <= b && pos > middle) || (a >= b && pos <= middle)) {
			liftB.style.transform = `translateY(${-pos}00%)`;
			b = pos;
		}
	});

	block.append(shaftA, myPosition, shaftB);

	return block;
};

// *******************************************************

const renderBlockButton = (_, i) => {
	const btn = document.createElement('button');
	btn.innerHTML = `${i}`;

	return btn;
};
// work on these
const renderLiftButton = item => {
	const btn = document.createElement('button');
	btn.innerHTML = `${item}`;
	btn.setAttribute('data-id', `${item}`);

	return btn;
};

// **********************************************

const floorLights = (element, target) => {
	element.childNodes.forEach(child => {
		if (child.innerHTML === target) {
			element.childNodes.forEach(child => {
				child.classList.remove('open');
			});
			child.classList.add('open');
		}
	});
};

main.append(elevator());
