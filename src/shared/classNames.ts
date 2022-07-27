const classNames = (...args: string[]) => {
  return args.filter((arg) => Boolean(arg.trim())).join(" ");
};

export default classNames;
