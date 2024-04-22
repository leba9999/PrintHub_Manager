// Utility function to make object keys case-insensitive
const makeKeysCaseInsensitive = (obj: Record<string, any>) => {
  const result: Record<string, any> = {};
  for (const key in obj) {
    result[key.toLowerCase()] = obj[key];
  }
  return result;
};

export { makeKeysCaseInsensitive };
