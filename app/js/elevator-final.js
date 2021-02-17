// SETUP ****************************************

const storeyCount = 7;
//  lift a and b position identifiers, counters.
let counterA = 0;
let counterB = 6;

const elevator = () => {
	const block = div('block');

	const audioFile = document.createElement('audio');
	audioFile.setAttribute('controls', 'true');
	audioFile.setAttribute('src', '/img/Elevatormusic.mp3');
	audioFile.setAttribute('autoplay', 'autoplay');
	audioFile.setAttribute('loop', 'loop');
	audioFile.setAttribute('type', 'audio/mpeg');
	main.append(audioFile);

	// ************************************************
	//  LIFT A

	const liftA = div('liftA');
	const doorA = div('doorA');
	const panelA = div('panel');
	liftA.append(panelA, doorA);
	elevatorPanelSetup(counterB, 'A', panelA);

	// ************************************************
	//  LIFT B

	const liftB = div('liftB');
	const doorB = div('doorB');
	const panelB = div('panel');
	liftB.append(panelB, doorB);
	elevatorPanelSetup(1, 'B', panelB);

	// SHAFT *********************************************

	const shaft = div('shaft');

	const buttons = new Array(storeyCount).fill().map(renderButton).reverse();
	buttons[counterB].classList.add('level-lights');
	buttons.forEach(btn => {
		btn.setAttribute('data-location', 'floor-button');
		arrow(btn, 'down');
		arrow(btn, 'up');
		btn.addEventListener('click', e => {
			childrenOf(shaft)
				.find(item => item.classList.contains('level-lights'))
				.classList.remove('level-lights');
			e.target.classList.add('level-lights');
		});
		shaft.append(btn);
	});

	block.append(liftA, shaft, liftB);

	// ***************************************************
	//  EVENTLISTENERS on the main block element

	block.addEventListener('click', e => {
		let target = e.target;
		let state = target.getAttribute('data-number');
		const floorButtons = childrenOf(shaft);
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

		//  lift arrives to desired level, liftlights go off
		const transitionFinish = target => {
			target.addEventListener('transitionend', () => {
				document
					.querySelectorAll('i')
					.forEach(item => (item.style.opacity = '0'));
			});
		};

		const elevatorIsOnFloor = (
			currentFloor,
			desiredFloor,
			color,
			whichLift
		) => {
			currentFloor > desiredFloor && moveState(floorButtons, color, 1);
			currentFloor < desiredFloor && moveState(floorButtons, color, 0);
			currentFloor = desiredFloor && alertState(whichLift);
		};

		// ***** TARGETS

		if (target.getAttribute('data-location') === 'liftA-button') {
			doorsTransition(doorA, floorButtons);
			toggleLightOf(panelA, 'lift-lights', target);
			controlLights(shaft, state, 'level-lights');
			moveTo(liftA, state);
			counterA = state;
			elevatorIsOnFloor(currentPositionA, counterA, 'red', liftA);
			transitionFinish(liftA, doorA);
		} else if (target.getAttribute('data-location') === 'liftB-button') {
			doorsTransition(doorB, floorButtons);
			toggleLightOf(panelB, 'lift-lights', target);
			controlLights(shaft, state, 'level-lights');
			moveTo(liftB, state);
			counterB = state;
			elevatorIsOnFloor(currentPositionB, counterB, 'limegreen', liftB);
			transitionFinish(liftB, doorB);
		} else if (target.getAttribute('data-location') === 'floor-button') {
			// THE SYSTEM, CONDITIONED BY EACH LIFT'S POSITION.

			let distanceOfAfromTarget = Math.abs(counterA - state);
			let distanceOfBfromTarget = Math.abs(counterB - state);

			// ************** FUNCTIONS **********************

			const liftAisMoving = () => {
				doorsTransition(doorA, floorButtons);
				moveTo(liftA, state);
				controlLights(panelA, state, 'lift-lights');
				counterA = state;
				elevatorIsOnFloor(currentPositionA, counterA, 'red', liftA);
				transitionFinish(liftA);
			};
			const liftBisMoving = () => {
				doorsTransition(doorB, floorButtons);
				moveTo(liftB, state);
				controlLights(panelB, state, 'lift-lights');
				counterB = state;
				elevatorIsOnFloor(
					currentPositionB,
					counterB,
					'limegreen',
					liftB
				);
				transitionFinish(liftB);
			};

			// ****************** CONCEPT ***********************

			if (distanceOfAfromTarget < distanceOfBfromTarget) {
				liftAisMoving();
			} else if (distanceOfAfromTarget > distanceOfBfromTarget) {
				liftBisMoving();
			} else if (counterA <= counterB) {
				liftAisMoving();
			} else {
				liftBisMoving();
			}
		} else return;
	});
	return block;
};
main.append(elevator());
