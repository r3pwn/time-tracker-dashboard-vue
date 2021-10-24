const TIME_DATA_PATH = "./time_data.json";

const ActivityProvider = {
    getActivities () {
        return fetch(TIME_DATA_PATH).then((response) => response.json());
    }
}

export default ActivityProvider;