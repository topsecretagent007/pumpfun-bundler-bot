import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

export const retrieveEnvVariable = (variableName: string) => {
  const variable = process.env[variableName] || '';
  if (!variable) {
    console.log(`${variableName} is not set`);
    process.exit(1);
  }
  return variable;
};

// Define the type for the JSON file content

export const randVal = (min: number, max: number, count: number, total: number, isEven: boolean): number[] => {

  const arr: number[] = Array(count).fill(total / count);
  if (isEven) return arr

  if (max * count < total)
    throw new Error("Invalid input: max * count must be greater than or equal to total.")
  if (min * count > total)
    throw new Error("Invalid input: min * count must be less than or equal to total.")
  const average = total / count
  // Randomize pairs of elements
  for (let i = 0; i < count; i += 2) {
    // Generate a random adjustment within the range
    const adjustment = Math.random() * Math.min(max - average, average - min)
    // Add adjustment to one element and subtract from the other
    arr[i] += adjustment
    arr[i + 1] -= adjustment
  }
  // if (count % 2) arr.pop()
  return arr;
}


// export const saveDataToFile = (newData: string[], filePath: string = "data.json") => {
//   try {
//     let existingData: string[] = [];

//     // Check if the file exists
//     if (fs.existsSync(filePath)) {
//       // If the file exists, read its content
//       const fileContent = fs.readFileSync(filePath, 'utf-8');
//       existingData = JSON.parse(fileContent);
//     }

//     // Add the new data to the existing array
//     existingData.push(...newData);

//     // Write the updated data back to the file
//     fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

//   } catch (error) {
//     try {
//       if (fs.existsSync(filePath)) {
//         fs.unlinkSync(filePath);
//         console.log(`File ${filePath} deleted and create new file.`);
//       }
//       fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
//       console.log("File is saved successfully.")
//     } catch (error) {
//       console.log('Error saving data to JSON file:', error);
//     }
//   }
// };


export const saveDataToFile = (newData: string[], fileName: string = "data.json") => {
  const folderPath = 'keys';
  const filePath = path.join(folderPath, fileName);

  try {
    // Create the folder if it doesn't exist
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    let existingData: string[] = [];

    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // If the file exists, read its content
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      existingData = JSON.parse(fileContent);
    }

    // Add the new data to the existing array
    existingData.push(...newData);

    // Write the updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    console.log("File is saved successfully.");

  } catch (error) {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`File ${filePath} deleted and will be recreated.`);
      }
      fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
      console.log("File is saved successfully.");
    } catch (error) {
      console.log('Error saving data to JSON file:', error);
    }
  }
};


export const sleep = async (ms: number) => {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

// // Function to read JSON file
// export function readJson(filename: string = "data.json"): string[] {
//   if (!fs.existsSync(filename)) {
//     // If the file does not exist, create an empty array
//     fs.writeFileSync(filename, '[]', 'utf-8');
//   }
//   const data = fs.readFileSync(filename, 'utf-8');
//   return JSON.parse(data) as string[];
// }

// Function to read JSON file from the "keys" folder
export function readJson(fileName: string = "data.json"): string[] {
  const folderPath = 'keys';
  const filePath = path.join(folderPath, fileName);

  if (!fs.existsSync(filePath)) {
    // If the file does not exist, create an empty array file in the "keys" folder
    fs.writeFileSync(filePath, '[]', 'utf-8');
  }

  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data) as string[];
}

export function deleteConsoleLines(numLines: number) {
  for (let i = 0; i < numLines; i++) {
    process.stdout.moveCursor(0, -1); // Move cursor up one line
    process.stdout.clearLine(-1);        // Clear the line
  }
}
