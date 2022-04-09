/**
 * Mocks the Math object to return a specified random value
 * @param {*} randomVal the random value to be returned everytime
 * @returns the original Math object to be reset after usage
 */
export const mockRandomMath = (randomVal) => {
    const mockMath = Object.create(global.Math);
    mockMath.random = () => randomVal;

    const originalObj = global.Math;

    global.Math = mockMath;

    return originalObj;
};

/**
 * Mocks the Date.now function to return a specified now value
 * @param {*} nowVal the value to be returned everytime
 * @returns the original Date.now function to be reset after usage
 */
export const mockDateNow = (nowVal) => {
    const originalFn = Date.now;
    Date.now = () => nowVal;

    return originalFn;
};
