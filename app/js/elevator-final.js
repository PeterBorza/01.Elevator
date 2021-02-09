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
	liftAButtons.forEach((btn, i) => {
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

	// SHAFT *********************************************

	const myPosition = div('myPosition');
	const buttons = new Array(storeyCount).fill().map(renderButton).reverse();

	buttons.forEach(btn => {
		btn.setAttribute('data-name', 'floor-button');

		arrow(btn, 'down');
		arrow(btn, 'up');
		myPosition.append(btn);
	});

	block.append(liftA, myPosition, liftB);

	// ***************************************************
	// ***************************************************

	//  EVENTLISTENERS on the main block element

	block.addEventListener('click', e => {
		let target = e.target;
		let state = Number(target.innerText);

		e.stopPropagation;
		const mainButtons = Array.from(myPosition.children);
		let currentPositionA = counterA;
		let currentPositionB = counterB;

		// *************************************
		//  if elevator is on the floor already

		if (counterA == state) {
			liftA.classList.add('lift-animation');
			return;
		} else if (counterB == state) {
			liftB.classList.add('lift-animation');
			return;
		} else {
			liftA.classList.remove('lift-animation');
			liftB.classList.remove('lift-animation');
		}

		// STATE CHANGE FUNCTIONS

		const moveState = index => {
			mainButtons.forEach(btn => {
				btn.style.color = 'transparent';
				Array.from(btn.children)[index].style.opacity = '1';
			});
		};

		const transitionFinish = target => {
			target.addEventListener('transitionend', () => {
				mainButtons.forEach(btn => {
					btn.style.color = 'limegreen';
					Array.from(btn.children).forEach(
						item => (item.style.opacity = '0')
					);
				});
			});
		};

		// LIFT A BUTTONS***********************************************

		if (target.getAttribute('data-name') == 'liftA-button') {
			// animating the panel buttons
			Array.from(panelA.children).forEach(item => {
				item.classList.remove('panel-open');
			});
			target.classList.add('panel-open');

			liftA.style.transform = `translateY(${-state}00%)`;

			floorLights(myPosition, state);
			counterA = state;

			// DIRECTION OF LIFT A

			currentPositionA > counterA ? moveState(1) : moveState(0);

			// TRANSITIONEND LIFT A

			transitionFinish(liftA);

			// LIFT B BUTTONS********************************************
		} else if (target.getAttribute('data-name') == 'liftB-button') {
			// animating the panel buttons
			Array.from(panelB.children).forEach(item => {
				item.classList.remove('panel-open');
			});
			target.classList.add('panel-open');

			liftB.style.transform = `translateY(${-state}00%)`;

			floorLights(myPosition, state);
			counterB = state;

			// DIRECTION OF LIFT B

			currentPositionB > counterB ? moveState(1) : moveState(0);

			// TRANSITIONEND LIFT B

			transitionFinish(liftB);

			// FLOOR BUTTONS***********************************************
		} else if (target.getAttribute('data-name') == 'floor-button') {
			e.stopPropagation;
			let floorNumber = Number(target.innerText);
			let distanceAB = Math.floor((counterA + counterB) / 2);

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

				//  State change
				currentPositionA > counterA ? moveState(1) : moveState(0);

				transitionFinish(liftA);
			} else if (
				(counterA <= counterB && floorNumber > distanceAB) ||
				(counterA >= counterB && floorNumber <= distanceAB)
			) {
				liftB.style.transform = `translateY(${-floorNumber}00%)`;
				liftLights(panelB, floorNumber);
				counterB = floorNumber;

				// state change
				currentPositionB > counterB ? moveState(1) : moveState(0);

				transitionFinish(liftB);
			}
			p(
				`state: ${state} - currentPosA: ${currentPositionA} -  currentPosB: ${currentPositionB} - counterA: ${counterA} - counterB: ${counterB}`
			);
		} else return;
	});

	return block;
};

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
