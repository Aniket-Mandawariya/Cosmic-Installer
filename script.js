const toast = document.querySelector(".toast");
let toastTimer = 0;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 2200);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(`Copied: ${text}`);
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
    showToast(`Copied: ${text}`);
  }
}

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", () => copyText(button.dataset.copy));
});

const isWindows = /Windows/i.test(navigator.userAgent);
if (!isWindows) {
  showToast("Cosmic installer is built for Windows PCs.");
}
