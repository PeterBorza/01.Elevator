const liftInfo = div('command-line');
const floorUpdate = document.createElement('h3');
const floorSpan = document.createElement('span');
floorUpdate.innerText = 'You are on floor: ';
const liftAUpdate = document.createElement('h3');
const liftASpan = document.createElement('span');
liftAUpdate.innerText = 'Lift A is on floor: ';
const liftBUpdate = document.createElement('h3');
const liftBSpan = document.createElement('span');
liftBUpdate.innerText = 'Lift B is on floor: ';
floorUpdate.append(floorSpan);
liftAUpdate.append(liftASpan);
liftBUpdate.append(liftBSpan);
liftInfo.append(floorUpdate, liftAUpdate, liftBUpdate);
main.append(liftInfo);

const commands = (target, panelA, panelB) => {
	floorSpan.innerHTML = `${numberOf(target)}`;
	floorSpan.style.color = 'white';

	liftBSpan.innerHTML = `${numberOf(target)}`;
	childrenOf(panelA).forEach(item => {
		if (item.classList.contains('lift-lights')) {
			liftASpan.innerHTML = `${numberOf(item)}`;
			liftASpan.style.color = 'red';
		}
	});
	childrenOf(panelB).forEach(item => {
		if (item.classList.contains('lift-lights')) {
			liftBSpan.innerHTML = `${numberOf(item)}`;
			liftBSpan.style.color = 'limegreen';
		}
	});
};
