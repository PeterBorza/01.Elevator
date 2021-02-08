const main = document.querySelector('main');
const p = console.log;

const div = className => {
	const x = document.createElement('div');
	x.classList.add(className);

	return x;
};

// ****************************************
//  SETUP

const elevator = () => {
	const storeyCount = 7;
	const block = div('block');

	// *************************************************
	//  THE LEVEL SYSTEM

	const myPosition = div('myPosition');

	const buttons = new Array(storeyCount).fill().map(renderButton).reverse();
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
	//  lift a and b position identifiers, counters.
	let counterA = 0;
	let counterB = 6;
	// ******************************************
	//  LIFT A

	const liftA = div('liftA');
	const panelA = div('panel');
	liftA.append(panelA);
	const liftAButtons = new Array(storeyCount)
		.fill()
		.map(renderButton)
		.reverse();
	liftAButtons.forEach(btn => {
		btn.addEventListener('click', () => {
			panelA.childNodes.forEach(child => {
				child.style.color = '#298C93';
			});
			btn.style.color = 'white';
			let targetNumber = btn.innerHTML;
			liftA.style.transform = `translateY(${-targetNumber}00%)`;
			counterA = Number(targetNumber);

			floorLights(myPosition, targetNumber);
		});
		panelA.append(btn);
	});

	// ************************************************
	//  LIFT B

	const liftB = div('liftB');
	const panelB = div('panel');
	liftB.append(panelB);
	const liftBButtons = new Array(storeyCount)
		.fill()
		.map(renderButton)
		.reverse();

	liftBButtons.forEach(btn => {
		btn.addEventListener('click', () => {
			panelB.childNodes.forEach(child => {
				child.style.color = '#298C93';
			});
			btn.style.color = 'white';
			let targetNumber = btn.innerHTML;
			liftB.style.transform = `translateY(${-targetNumber}00%)`;
			counterB = Number(targetNumber);

			floorLights(myPosition, targetNumber);
		});
		panelB.append(btn);
	});

	// **************************************************
	// the direction of each lift established by the position, which is the level number(main store button)

	myPosition.addEventListener('click', e => {
		let counterPos = Number(e.target.innerHTML);
		let distanceAB = Math.floor((counterA + counterB) / 2);
		if (
			(counterA <= counterB && counterPos <= distanceAB) ||
			(counterA >= counterB && counterPos > distanceAB)
		) {
			liftA.style.transform = `translateY(${-counterPos}00%)`;
			counterA = counterPos;
			liftLights(panelA, counterPos);
		} else if (
			(counterA <= counterB && counterPos > distanceAB) ||
			(counterA >= counterB && counterPos <= distanceAB)
		) {
			liftB.style.transform = `translateY(${-counterPos}00%)`;
			counterB = counterPos;
			liftLights(panelB, counterPos);
		}

		// p(counterA, counterPos, counterB);
	});

	block.append(liftA, myPosition, liftB);

	return block;
};

// *******************************************************

const renderButton = (_, i) => {
	const btn = document.createElement('button');
	btn.innerHTML = `${i}`;
	// if (i === 0) {
	// 	btn.innerHTML = 'P';
	// }

	return btn;
};

// **********************************************

const floorLights = (parent, targetNumber) => {
	parent.childNodes.forEach(child => {
		if (child.innerHTML === targetNumber) {
			parent.childNodes.forEach(child => {
				child.classList.remove('open');
			});
			child.classList.add('open');
		}
	});
};

const liftLights = (parent, targetNumber) => {
	parent.childNodes.forEach(child => {
		if (targetNumber == child.innerHTML) {
			parent.childNodes.forEach(child => {
				child.style.color = '#298C93';
			});
			child.style.color = 'white';
		}
	});
};

main.append(elevator());
