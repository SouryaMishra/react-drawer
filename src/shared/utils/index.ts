export const classNames = (...args: string[]) => {
  return args.filter((arg) => Boolean(arg.trim())).join(" ");
};

export const getFocusableElements = (container: HTMLElement) =>
  Array.from(
    container.querySelectorAll<HTMLElement>(
      `a[href], button, input, textarea, select, details, [tabindex]`
    )
  ).filter(
    (el) =>
      !el.hasAttribute("disabled") &&
      !el.getAttribute("aria-hidden") &&
      el.tabIndex !== -1
  );
