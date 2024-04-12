import { startDateToStartTime, endDateToEndTime, durationCalculator } from './dateUtils';

describe('startDateToStartTime', () => {
  test('converts start date to start time', () => {
    const startDate = '2022-09-20T12:30:00.000Z';
    expect(startDateToStartTime(startDate)).toBe('10:30:00 AM'); // Expected output may vary based on timezone
  });
});

describe('endDateToEndTime', () => {
  test('converts end date to end time', () => {
    const endDate = '2022-09-20T14:45:00.000Z';
    expect(endDateToEndTime(endDate)).toBe('12:45:00 PM'); // Expected output may vary based on timezone
  });
});

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
