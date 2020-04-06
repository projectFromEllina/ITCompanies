export const getEnumDescription = (value: string | number, enumObject: any) => {
  return enumObject[`${enumObject[value]}Description`];
};
