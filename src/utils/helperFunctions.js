/**
 * Calculates the duration between two dates and returns it in the appropriate unit (Minutes, Hours, or Days).
 *
 * @param {string} startDate - The start date in the format "YYYY-MM-DDTHH:mm:ss.sssZ".
 * @param {string} endDate - The end date in the format "YYYY-MM-DDTHH:mm:ss.sssZ".
 * @returns {Object} An object containing the duration in the appropriate unit and its type.
 * @example
 * const duration = durationCalculator('2022-01-01T10:30:00.000Z', '2022-01-01T11:30:00.000Z');
 * console.log(duration); // Output: { durationPeriod: 1, durationType: 'Hours' }
 */
export const durationCalculator = (startDate, endDate) => {
    const duration = {
        durationPeriod: 0,
        durationType: ''
    };
  
    var startDateAsNumber = new Date(startDate).getTime();
    var endDateAsNumber = new Date(endDate).getTime();
    var oneHour = 1000*60*60;
    var difference = endDateAsNumber - startDateAsNumber;
    var numberOfHours = difference/oneHour;
    
    if (numberOfHours < 1) {
      let numberOfMinutes = difference/(1000*60);
      duration.durationPeriod = numberOfMinutes;
      duration.durationType = "Minutes"; 
    } else if (numberOfHours >= 1 && numberOfHours < 24) {
      duration.durationPeriod = numberOfHours;
      duration.durationType = "Hours"
    } else if (numberOfHours >= 24 && numberOfHours < 168) {
      duration.durationPeriod = numberOfHours/24;
      duration.durationType = "Days"
    }
  
    return duration;
  };