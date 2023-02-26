export default {
  beforeMount(el, binding) {
    let iconClass = `bx bx-${binding.value}`;

    if (binding.arg === "full") {
      iconClass = binding.value;
    }
    if (binding.modifiers.red) {
      iconClass += " clr-red";
    } else {
      iconClass += " clr-blue";
    }
    if (binding.modifiers.fs3) {
      iconClass += " fs-3";
    }
    el.innerHTML += `<i class="${iconClass}"></i>`;
  },
};
