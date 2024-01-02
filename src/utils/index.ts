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