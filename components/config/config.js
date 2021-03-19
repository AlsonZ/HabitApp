export const config = {
  scheduleType: {
    everyday: {name: 'everyday', duration: {days: 1}},
    weekly: {name: 'weekly', duration: {weeks: 1}},
    fortnightly: {name: 'fortnightly', duration: {weeks: 2}},
    monthly: {name: 'monthly', duration: {months: 1}},
    yearly: {name: 'yearly', duration: {years: 1}},
    singleTime: {name: 'singleTime'},
    weekday: {
      name: 'weekday',
      days: {
        0: false, // Sunday
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false, // Saturday
      },
    },
    custom: {
      name: 'custom',
      // duration: {days: 1, weeks: 0, months: 0, years: 0},
      duration: {days: 1},
    },
  },
};
