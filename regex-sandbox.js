// extracts the daily change
const dailyIncreaseRegex = /\+(\d{0,3},)?(\d{3},)?\d{0,3}/g;
const dailyDecreaseRegex = /\-(\d{0,3},)?(\d{3},)?\d{0,3}/g;

// extracts the daily total
const dailyTotalRegex = /(?<=\\n)(\d{0,3},)?(\d{3},)?\d{0,3}/g;
