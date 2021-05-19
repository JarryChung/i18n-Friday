export const filter = <T extends Object, U extends keyof T>(data: T, props: U[]) => {
  const partial: T = Object.create(null);
  props.forEach((p) => {
    partial[p] = data[p];
  });
  return partial;
};
