/** Initialize new elements after Astro navigation, keeping persisted elements intact. */
export function initializeSketches<T extends HTMLElement>(
  selector: string,
  create: (element: T) => { destroy(): void },
) {
  const instances = new Map<T, { destroy(): void }>();

  function cleanup() {
    for (const [element, instance] of instances) {
      if (!element.isConnected) {
        instance.destroy();
        instances.delete(element);
      }
    }
  }

  function initialize() {
    cleanup();
    document.querySelectorAll<T>(selector).forEach((element) => {
      if (!instances.has(element)) instances.set(element, create(element));
    });
  }

  initialize();
  document.addEventListener("astro:after-swap", cleanup);
  document.addEventListener("astro:page-load", initialize);
}
