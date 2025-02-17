export function setupDropdowns() {
  console.log('✅ Dropdown script loaded');

  const actionsDropdown = document.getElementById('actions-dropdown');
  const actionsMenu = document.getElementById('actions-menu');
  const addMachineToggle = document.getElementById('toggle-add-machine');
  const addMachineContainer = document.getElementById('add-machine-container');

  if (actionsDropdown && actionsMenu) {
    console.log('✅ Actions Dropdown Found');

    actionsDropdown.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();

      actionsMenu.classList.toggle('d-none');
      actionsMenu.style.display = actionsMenu.classList.contains('d-none')
        ? 'none'
        : 'block';

      console.log('✅ Actions Menu Toggled:', actionsMenu.style.display);
    });
  } else {
    console.error("❌ Error: 'actions-dropdown' or 'actions-menu' not found.");
  }

  if (addMachineToggle && addMachineContainer) {
    console.log('✅ Add Machine Button Found');

    addMachineToggle.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();

      addMachineContainer.classList.toggle('d-none');

      console.log(
        '✅ Add Machine Form Toggled:',
        addMachineContainer.classList.contains('d-none') ? 'Hidden' : 'Visible'
      );
    });
  } else {
    console.error(
      "❌ Error: 'toggle-add-machine' or 'add-machine-container' not found."
    );
  }
}
