import { dogTypes } from './types';

const fetchRandomDog = () => {
    return new Promise((resolve, reject) => {
        return resolve("https://images.dog.ceo/breeds/stbernard/n02109525_14999.jpg");
    });
};

export const getRandomDog = () => dispatch => {
    dispatch({
        type: dogTypes.GET_RANDOM_DOG,
        payload: fetchRandomDog()
    })
}

export const resetRandomDog = () => dispatch => {
    // Not all actions need to be async (or have a payload)
    dispatch({
        type: dogTypes.RESET_RANDOM_DOG
    });
};