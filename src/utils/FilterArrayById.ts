export function filterArrayById(twoDimensionalArray:Array<Array<any>>, itemId:string) {
    // Iterate through the outer array
    for (let i = 0; i < twoDimensionalArray.length; i++) {
        // Iterate through the inner array
        for (let j = 0; j < twoDimensionalArray[i].length; j++) {
            // Check if the current item has the specified ID
            if (twoDimensionalArray[i][j].id === itemId) {
                // Remove the item from the inner array
                twoDimensionalArray[i].splice(j, 1);
                return twoDimensionalArray; // Return the modified array
            }
        }
    }

    return twoDimensionalArray;
}