export const sortByDate = <T extends { [key: string]: any }>(
  arr: T[] | undefined,
  dateKey: keyof T = "date",
  order: "asc" | "dsc" = "dsc"
) => {
  if (arr?.length) {
    const newArr = [...arr];
    return newArr.sort((a, b) =>
      order === "dsc"
        ? new Date(a[dateKey]).getTime() - new Date(b[dateKey]).getTime()
        : new Date(b[dateKey]).getTime() - new Date(a[dateKey]).getTime()
    );
  }
  return [];
};
