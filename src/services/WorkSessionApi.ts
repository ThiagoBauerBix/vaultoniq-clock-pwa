import axios from 'axios'

export default {
    getWorkSession(
        task_id: string | null,
        worksession_id: string | null,
        ){
        return axios
            .get(`tasks/${task_id}/work-sessions/${worksession_id}/`)
            .then((response) => Promise.resolve(response))
            .catch((error) => Promise.reject(error))
    },

    postWorkSession(
        task_id: string | null,
        worksession_data: object 
        ) {
        return axios
            .post(`tasks/${task_id}/work-sessions/`, worksession_data)
            .then((response) => Promise.resolve(response))
            .catch((error) => Promise.reject(error))
    }
}