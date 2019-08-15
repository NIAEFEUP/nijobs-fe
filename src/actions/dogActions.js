import { dogTypes } from "./types";

const fetchRandomDog = () => new Promise((resolve, reject) => {
    fetch("https://dog.ceo/api/breeds/image/random")
        .then((res) => res.json())
        .then((data) => {
            if (data.status === "success") {
                return resolve(data.message);
            } else {
                return reject("Dog API fetching unsuccessful");
            }
        })
        .catch(() => reject("API fetching unsuccessful"));
});

export const getRandomDog = () => (dispatch) => {
    dispatch({
        type: dogTypes.GET_RANDOM_DOG,
        payload: fetchRandomDog(),
    });
};

export const resetRandomDog = () => (dispatch) => {
    // Not all actions need to be async (or have a payload)
    dispatch({
        type: dogTypes.RESET_RANDOM_DOG,
    });
};
