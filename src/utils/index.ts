export const formDataObj = (jsonData: any) => {
  const formData = new FormData();

  // Iterate through the properties of the 'data' object
  for (const key in jsonData) {
    if (jsonData.hasOwnProperty(key)) {
      if (typeof jsonData[key] === "object" && jsonData[key] !== null) {
        // If it's an array, iterate through the elements and append them with the same key
        if (Array.isArray(jsonData[key])) {
          for (let i = 0; i < jsonData[key].length; i++) {
            formData.append(`${key}[]`, jsonData[key][i]);
          }
        } else {
          // If it's an object, iterate through its properties
          for (const nestedKey in jsonData[key]) {
            if (jsonData[key].hasOwnProperty(nestedKey)) {
              formData.append(`${key}.${nestedKey}`, jsonData[key][nestedKey]);
            }
          }
        }
      } else {
        // If it's not an object or array, append the key-value pair directly
        formData.append(key, jsonData[key]);
      }
    }
  }
};


export function convertMinutesToHours(minutes: number) {
  let hours = Math.floor(minutes / 60);
  let remainingMinutes = minutes % 60;

  return hours + " hours " + remainingMinutes + " minutes";
}

export function isToday(date: any) {
  var givenDate = new Date(date);

  // Get the current date
  var currentDate = new Date();

  // Check if the given date is equal to today's date
  if (givenDate <= currentDate) {
    return true;
  } else {
    return false;
  }
}


export function convertTo12HourClock(time24: string): string {
  // Split the time string into hours and minutes
  const timeSplit: string[] = time24.split(":");
  let hours: number = parseInt(timeSplit[0]);
  const minutes: string = timeSplit[1];

  // Determine AM or PM
  const meridiem: string = (hours >= 12) ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = (hours > 12) ? hours - 12 : hours;
  hours = (hours === 0) ? 12 : hours;

  // Add leading zero to hours if less than 10
  const formattedHours: string = (hours < 10) ? "0" + hours : hours.toString();

  // Return the formatted time
  return formattedHours + ":" + minutes + " " + meridiem;
}





