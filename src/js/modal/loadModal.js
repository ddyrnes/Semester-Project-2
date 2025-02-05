export async function loadModal() {
  if (document.getElementById("universal-modal")) {
    return;
  }

  const response = await fetch("/modalTemplate.html");
  const modalHtml = await response.text();

  const wrapper = document.createElement("div");
  wrapper.innerHTML = modalHtml;
  document.body.appendChild(wrapper);

  await new Promise((resolve) => setTimeout(resolve, 100));
}
