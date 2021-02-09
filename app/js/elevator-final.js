const main = document.querySelector('main');
const p = console.log;

const div = className => {
	const x = document.createElement('div');
	x.classList.add(className);

	return x;
};

const arrow = (element, direction) => {
	const arrow = document.createElement('i');
	arrow.classList.add('fas', `fa-chevron-${direction}`, `${direction}-arrow`);
	element.prepend(arrow);
	return arrow;
};

// ****************************************
//  SETUP

const elevator = () => {
	const storeyCount = 7;
	const block = div('block');

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
	liftAButtons[6].classList.add('panel-open');
	liftAButtons.forEach(btn => {
		btn.setAttribute('data-name', 'liftA-button');
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
	liftBButtons[0].classList.add('panel-open');
	liftBButtons.forEach(btn => {
		btn.setAttribute('data-name', 'liftB-button');
		panelB.append(btn);
	});

	// **************************************************
	// the direction of each lift established by the position, which is the level number(button innerText)
	// SHAFT *********************************************
	const myPosition = div('myPosition');
	const buttons = new Array(storeyCount).fill().map(renderButton).reverse();
	// buttons[6].classList.add('light-up');

	buttons.forEach(btn => {
		btn.setAttribute('data-name', 'floor-button');
		myPosition.append(btn);
	});

	block.append(liftA, myPosition, liftB);
	// p(Array.from(myPosition.children));
	// p(Array.from(block.children));

	// ***************************************************
	// ***************************************************

	//  EVENTLISTENERS

	block.addEventListener('click', e => {
		let target = e.target;
		let state = Number(target.innerHTML);

		let currentPositionA = counterA;
		let currentPositionB = counterB;

		// LIFT A BUTTONS***********************************************

		if (target.getAttribute('data-name') == 'liftA-button') {
			Array.from(panelA.children).forEach(item => {
				item.classList.remove('panel-open');
			});
			target.classList.add('panel-open');
			liftA.style.transform = `translateY(${-state}00%)`;

			floorLights(myPosition, state);
			counterA = state;

			// DIRECTION OF LIFT A

			if (currentPositionA > counterA) {
				p('A going down');
			} else {
				p('A going up');
			}

			// TRANSITIONEND LIFT A

			liftA.addEventListener('transitionend', () => {
				p('A arrived');
			});

			// LIFT B BUTTONS********************************************
		} else if (target.getAttribute('data-name') == 'liftB-button') {
			Array.from(panelB.children).forEach(item => {
				item.classList.remove('panel-open');
			});
			target.classList.add('panel-open');

			liftB.style.transform = `translateY(${-state}00%)`;

			floorLights(myPosition, state);
			counterB = state;

			// DIRECTION OF LIFT B

			if (currentPositionB > counterB) {
				p(' B going down');
			} else {
				p(' B going up');
			}

			// TRANSITIONEND LIFT B

			liftB.addEventListener('transitionend', () => p('B arrived'));

			// FLOOR BUTTONS***********************************************
		} else if (target.getAttribute('data-name') == 'floor-button') {
			e.stopPropagation;
			let floorNumber = Number(target.innerText);
			let distanceAB = Math.floor((counterA + counterB) / 2);
			const mainButtons = Array.from(myPosition.children);
			// **toggling the lights

			mainButtons.forEach(item => {
				item.classList.remove('light-up');
			});
			target.classList.add('light-up');

			// *************************
			// THE SYSTEM, CONDITIONED BY EACH LIFT'S POSITION.

			if (
				(counterA <= counterB && floorNumber <= distanceAB) ||
				(counterA >= counterB && floorNumber > distanceAB)
			) {
				liftA.style.transform = `translateY(${-floorNumber}00%)`;
				liftLights(panelA, floorNumber);
				counterA = floorNumber;
				if (currentPositionA > counterA) {
					p('A going down');
					mainButtons.forEach(btn => {
						btn.style.color = 'transparent';
						arrow(btn, 'down');
					});
				} else {
					p('A going up');
					mainButtons.forEach(btn => {
						btn.style.color = 'transparent';
						arrow(btn, 'up');
					});
				}
				liftA.addEventListener('transitionend', () => {
					mainButtons.forEach(btn => {
						btn.firstElementChild.remove();
						btn.style.color = 'white';
					});
				});
			} else if (
				(counterA <= counterB && floorNumber > distanceAB) ||
				(counterA >= counterB && floorNumber <= distanceAB)
			) {
				liftB.style.transform = `translateY(${-floorNumber}00%)`;
				liftLights(panelB, floorNumber);
				counterB = floorNumber;
				if (currentPositionB > counterB) {
					p(' B going down');
					mainButtons.forEach(btn => {
						btn.style.color = 'transparent';
						arrow(btn, 'down');
					});
				} else {
					p(' B going up');
					mainButtons.forEach(btn => {
						btn.style.color = 'transparent';
						arrow(btn, 'up');
					});
				}
				liftB.addEventListener('transitionend', () => {
					mainButtons.forEach(btn => {
						btn.firstElementChild.remove();
						btn.style.color = 'white';
					});
				});
			}
		} else return;
	});

	return block;
};

// *******************************************************
// *******************************************************
//  MAPPING THE BUTTON ARRAY

const renderButton = (_, i) => {
	const btn = document.createElement('button');
	btn.innerText = `${i}`;

	return btn;
};

// **********************************************
// Controling the floor lights

const floorLights = (parent, targetNumber) => {
	parent.childNodes.forEach(child => {
		if (targetNumber === Number(child.innerText)) {
			parent.childNodes.forEach(child => {
				child.classList.remove('light-up');
			});
			child.classList.add('light-up');
		}
	});
};
// ************************************************
//  Controling the buttonlights inside the lift

const liftLights = (parent, targetNumber) => {
	parent.childNodes.forEach(item => {
		if (targetNumber == Number(item.innerHTML)) {
			parent.childNodes.forEach(item => {
				item.classList.remove('panel-open');
			});
			item.classList.add('panel-open');
		}
	});
};

main.append(elevator());
