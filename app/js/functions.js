const main = document.querySelector('main');
const p = console.log;

// FUNCTIONS**********************************************

// create element with classname
const div = className => {
	const element = document.createElement('div');
	element.classList.add(className);

	return element;
};
// adding arrows inside the floorbuttons via state
const arrow = (element, direction) => {
	const arrow = document.createElement('i');
	arrow.classList.add('fas', `fa-sort-${direction}`, `${direction}-arrow`);
	element.prepend(arrow);
	return arrow;
};
// returns buttons number
const numberOf = element => Number(element.getAttribute('data-number'));
// iterating over arrays to find certain states
const childrenOf = element => Array.from(element.children);
//  the lifts are in motion
const moveTo = (item, number) =>
	(item.style.transform = `translateY(${-number}00%)`);
// turn on/off the floorlights or the liftpanelbutton lights
const toggleLightOf = (element, className, target) => {
	const currentLitButton = childrenOf(element).find(
		item => item.className === className
	);
	currentLitButton.classList.remove(className);
	target.classList.add(className);
	return currentLitButton;
};
// Controling the floor lights
const floorLights = (parent, targetNumber) => {
	childrenOf(parent).forEach(item => {
		if (targetNumber === numberOf(item)) {
			childrenOf(parent).forEach(item => {
				item.classList.remove('light-up');
			});
			item.classList.add('light-up');
			// toggleLightOf(parent, 'light-up', item);
		}
	});
};
//  Controling the buttonlights inside the lift
const liftLights = (parent, targetNumber) => {
	childrenOf(parent).forEach(item => {
		if (targetNumber == numberOf(item)) {
			childrenOf(parent).forEach(item => {
				item.classList.remove('panel-open');
			});
			item.classList.add('panel-open');
		}
	});
};
//  Mapping over arrays to get buttons
const renderButton = (_, i) => {
	const btn = document.createElement('button');
	btn.innerText = `${i}`;
	btn.setAttribute('data-number', `${i}`);
	return btn;
};
// panel buttons setup
const elevatorPanelSetup = (index, liftName, panel) => {
	const liftButtons = new Array(storeyCount)
		.fill()
		.map(renderButton)
		.reverse();
	liftButtons[index].classList.add('panel-open');
	liftButtons.forEach(btn => {
		btn.setAttribute('data-location', `lift${liftName}-button`);
		panel.append(btn);
	});
	return liftButtons;
};
// while elevator is moving, floor  indicators are signaling direction and which elevator is moving
const moveState = (arr, color, index) => {
	arr.forEach(item => {
		childrenOf(item)[index].style.opacity = '1';
		childrenOf(item)[index].style.color = color;
	});
};
//  alert when elevator is already on the requested floor
const alertState = item => item.classList.add('lift-animation');
