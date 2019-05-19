const day = (date: string): string =>
  new Date(date).toLocaleString("pt-br", {
    day: "2-digit"
  });

const month = (date: string): string =>
  new Date(date).toLocaleString("pt-br", {
    month: "long"
  });

export const formatedDate = {
  day,
  month
};
