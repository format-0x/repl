export default `function handleNamedArgs(func, rawArgs) {
  const isNotUndefined = (value) => typeof value !== 'undefined';
  const FUNCTION_ARGS = /^(?:function)?\\s*[^(]*\\(\\s*([^)]*)\\)/;
  const match = func.toString().match(FUNCTION_ARGS);

  if (!match) throw new Error('');

  const [, args] = match;
  const extractedArgs = args
    .replace(/(?:\\s+|=[^),]+)/g, '')
    .split(',');
  const [lastArg] = extractedArgs.slice(-1);
  const seenRest = /^\\./.test(lastArg);
  const used = [];
  const handledArgs = extractedArgs
    .slice(0, extractedArgs.length - +seenRest)
    .map((arg, i) => {
      const [argument] = [rawArgs[arg], rawArgs[i]].filter(isNotUndefined);

      used.push(arg, i + '');

      return argument;
    });

  if (seenRest) {
    const rest = Object.keys(rawArgs)
      .filter((key) => !used.includes(key))
      .map((key) => rawArgs[key]);

    handledArgs.push(...rest);
  }

  return func.apply(this, handledArgs);
}`;
