import { sortByDate } from "./index";

const exampleArr = [
  { id: 1, date: "2022-01-01" },
  { id: 2, date: "2022-02-01" },
  { id: 3, date: "2021-12-31" },
];

describe("Given the sortByDate util with a default dateKey", () => {
  it("should return an array sorted by date", () => {
    expect(sortByDate(exampleArr)).toEqual([
      { id: 3, date: "2021-12-31" },
      { id: 1, date: "2022-01-01" },
      { id: 2, date: "2022-02-01" },
    ]);
  });
});
