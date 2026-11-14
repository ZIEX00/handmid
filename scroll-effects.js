const revealSelectors = [
  ".announcement",
  ".site-header",
  "footer",
  "main > section",
  ".custom-form",
  ".catalog-header",
  ".catalog-nav",
  ".tracking-panel",
  ".category-card",
  ".product-card",
  ".review-grid > article",
  ".saved-order",
  ".tracking-result > *",
];
const revealSelector = revealSelectors.join(",");

if (
  "IntersectionObserver" in window &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const observedElements = new WeakSet();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.dataset.scrollReveal = entry.isIntersecting ? "visible" : "hidden";
      });
    },
    { threshold: 0, rootMargin: "0px 0px -24px 0px" },
  );

  function observeElement(element) {
    if (observedElements.has(element)) return;
    observedElements.add(element);
    element.dataset.scrollReveal = "hidden";
    observer.observe(element);
  }

  function observeTree(root) {
    if (!(root instanceof Element)) return;
    if (root.matches(revealSelector)) observeElement(root);
    root.querySelectorAll(revealSelector).forEach(observeElement);
  }

  observeTree(document.body);
  new MutationObserver((records) => {
    records.forEach((record) => {
      record.addedNodes.forEach(observeTree);
    });
  }).observe(document.body, { childList: true, subtree: true });
}
