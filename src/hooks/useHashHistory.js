import {createHashHistory} from 'history';

function useHashHistory() {
    const history = createHashHistory();
    return history;
};

export default useHashHistory;