export const toDate = (value: Date | string): Date => {
  return value instanceof Date ? value : new Date(value);
};
