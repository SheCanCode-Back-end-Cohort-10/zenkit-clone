import { durationCalculator } from "../../src/utils/helperFunctions.js";

describe('durationCalculator', () => {
  test('calculates duration between start and end date in minutes', () => {
    const startDate = '2022-09-20T10:00:00.000Z';
    const endDate = '2022-09-20T10:30:00.000Z';
    expect(durationCalculator(startDate, endDate)).toEqual({
      durationPeriod: 30,
      durationType: 'Minutes'
    });
  });

  test('calculates duration between start and end date in hours', () => {
    const startDate = '2022-09-20T10:00:00.000Z';
    const endDate = '2022-09-20T12:30:00.000Z';
    expect(durationCalculator(startDate, endDate)).toEqual({
      durationPeriod: 2,
      durationType: 'Hours'
    });
  });
});
