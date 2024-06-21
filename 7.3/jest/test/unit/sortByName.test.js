const sorting = require("../../app");

describe("Books names test suit right", () => {
  it("Books names should be sorted in ascending order", () => {
    const input = [
      "Гарри Поттер",
      "Властелин Колец",
      "Волшебник изумрудного города",
    ];
    const expected = [
      "Властелин Колец",
      "Волшебник изумрудного города",
      "Гарри Поттер",
    ];
    const output = sorting.sortByName(input);

    expect(output).toEqual(expected);
  });
});

describe("Books names test suit right", () => {
  it("Without params throws exception", () => {
    expect(() => sorting.sortByName()).toThrow(TypeError);
  });
});
// один из вариантов matchers который проверяет, что выброшено нужное исключение

describe("Books names test suit right", () => {
  it("To test return 0 case", () => {
    const input = ["Властелин Колец", "Властелин Колец"];
    const expected = ["Властелин Колец", "Властелин Колец"];
    const output = sorting.sortByName(input);

    expect(output).toEqual(expected);
  });
});

