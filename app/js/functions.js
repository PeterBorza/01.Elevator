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
const numberOf = element => element.getAttribute('data-number');
// iterating over arrays to find certain states
const childrenOf = element => Array.from(element.children);
//  the lifts are in motion
const moveTo = (item, number) =>
	(item.style.transform = `translateY(${-number}00%)`);
// turn on/off the floorlights or the liftpanelbutton lights
const toggleLightOf = (element, className, target) => {
	childrenOf(element)
		.find(item => item.className === className)
		.classList.remove(className);
	target.classList.add(className);
};
// Controling the floor lights
const controlLights = (parent, targetNumber, className) => {
	childrenOf(parent)
		.find(item => item.classList.contains(className))
		.classList.remove(className);
	childrenOf(parent).forEach(
		item => targetNumber === numberOf(item) && item.classList.add(className)
	);
};
//  Mapping over arrays to get buttons
const renderButton = (_, i) => {
	const btn = document.createElement('button');
	btn.innerText = `${i}`;
	btn.setAttribute('data-number', `${i}`);

	return btn;
};
const renderLiftButton = item => {
	const btn = document.createElement('button');
	btn.innerText = `${item}`;
	btn.setAttribute('data-number', `${item}`);

	return btn;
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
// ******
//  liftbuttons array
const swapPairs = n => {
	const arr = Array(n)
		.fill()
		.map((_, i) => i)
		.reverse();
	const myArr = [];
	arr.forEach(
		(item, i) =>
			item % 2 == 0 && myArr.push(...arr.slice(i, i + 2).reverse())
	);
	return myArr;
};

// panel buttons setup
const elevatorPanelSetup = (index, liftName, panel) => {
	let myArr = swapPairs(storeyCount);
	const liftButtons = myArr.map(renderLiftButton);
	liftButtons[index].classList.add('lift-lights');
	liftButtons.forEach(btn => {
		btn.setAttribute('data-location', `lift${liftName}-button`);
		if (btn.getAttribute('data-number') % 2 == 1) {
			btn.style.borderRight = '1px solid white';
		}
		panel.append(btn);
	});
	return liftButtons;
};
