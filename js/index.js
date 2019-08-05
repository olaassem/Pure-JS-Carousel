/*
 * init modules
 */

const moduleElements = document.querySelectorAll("[data-module]");

for (let i = 0; i < moduleElements.length; i++) {
  const el = moduleElements[i];

  import(`./${el.getAttribute("data-module")}.js`).then(Module => {
    new Module.default(el);
  });
}
