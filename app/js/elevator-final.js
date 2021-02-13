// SETUP ****************************************

const storeyCount = 7;

const elevator = () => {
	const block = div('block');

	//  lift a and b position identifiers, counters.
	let counterA = 0;
	let counterB = 6;

	// ************************************************
	//  LIFT A

	const liftA = div('liftA');
	const panelA = div('panel');
	liftA.append(panelA);
	elevatorPanelSetup(counterB, 'A', panelA);

	// ************************************************
	//  LIFT B

	const liftB = div('liftB');
	const panelB = div('panel');
	liftB.append(panelB);
	elevatorPanelSetup(counterA, 'B', panelB);

	// SHAFT *********************************************

	const shaft = div('shaft');

	const buttons = new Array(storeyCount).fill().map(renderButton).reverse();
	buttons[counterB].classList.add('light-up');
	buttons.forEach(btn => {
		btn.setAttribute('data-location', 'floor-button');

		arrow(btn, 'down');
		arrow(btn, 'up');
		shaft.append(btn);
	});

	block.append(liftA, shaft, liftB);

	// ***************************************************
	//  EVENTLISTENERS on the main block element

	block.addEventListener('click', e => {
		let target = e.target;
		const floorButtons = childrenOf(shaft);
		let state = numberOf(target);

		let currentPositionA;
		let currentPositionB;

		// *************************************
		// STATE CHANGES
		currentPositionA = counterA;
		currentPositionB = counterB;

		if (state == currentPositionA && state !== currentPositionB) {
			alertState(liftA);
		} else if (state == currentPositionB && state !== currentPositionA) {
			alertState(liftB);
		} else if (state == currentPositionA && state == currentPositionB) {
			alertState(liftA);
			alertState(liftB);
			return;
		}

		// STATE CHANGE FUNCTIONS**************************************

		//  transition ends and this happens
		const transitionFinish = target => {
			target.addEventListener('transitionend', () => {
				floorButtons.forEach(btn => {
					childrenOf(btn).forEach(item => (item.style.opacity = '0'));
				});
			});
		};

		// LIFT A BUTTONS***********************************************

		if (target.getAttribute('data-location') == 'liftA-button') {
			// animating the panel buttons

			toggleLightOf(panelA, 'panel-open', target);

			moveTo(liftA, state);

			floorLights(shaft, state);
			counterA = state;

			currentPositionA > counterA
				? moveState(floorButtons, 'red', 1)
				: moveState(floorButtons, 'red', 0);

			transitionFinish(liftA);

			// LIFT B BUTTONS********************************************
		} else if (target.getAttribute('data-location') == 'liftB-button') {
			// animating the panel buttons

			toggleLightOf(panelB, 'panel-open', target);

			moveTo(liftB, state);

			floorLights(shaft, state);
			counterB = state;

			currentPositionB > counterB
				? moveState(floorButtons, 'limegreen', 1)
				: moveState(floorButtons, 'limegreen', 0);

			transitionFinish(liftB);

			// FLOOR BUTTONS***********************************************
		} else if (target.getAttribute('data-location') == 'floor-button') {
			let floorNumber = numberOf(target);
			let distanceAB = Math.floor((counterA + counterB) / 2);

			// **toggling the lights

			let activeFloorButton = floorButtons.find(
				item => item.className === 'light-up'
			);
			activeFloorButton.classList.remove('light-up');
			target.classList.add('light-up');

			// *************************
			// THE SYSTEM, CONDITIONED BY EACH LIFT'S POSITION.

			if (
				(counterA <= counterB && floorNumber <= distanceAB) ||
				(counterA >= counterB && floorNumber > distanceAB)
			) {
				moveTo(liftA, floorNumber);
				liftLights(panelA, floorNumber);
				counterA = floorNumber;

				//  State change
				currentPositionA > counterA
					? moveState(floorButtons, 'red', 1)
					: moveState(floorButtons, 'red', 0);

				transitionFinish(liftA);
			} else if (
				(counterA < counterB && floorNumber > distanceAB) ||
				(counterA > counterB && floorNumber <= distanceAB)
			) {
				moveTo(liftB, floorNumber);
				liftLights(panelB, floorNumber);
				counterB = floorNumber;

				// state change
				currentPositionB > counterB
					? moveState(floorButtons, 'limegreen', 1)
					: moveState(floorButtons, 'limegreen', 0);

				transitionFinish(liftB);
			}
		} else return;
	});

	return block;
};

main.append(elevator());
