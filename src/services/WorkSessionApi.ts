import axios from 'axios'
import api from '../services/api'

export default {
    getWorkSession(
        task_id: string | null,
        worksession_id: string | null,
        ){
        return axios
            .get(`/tasks/${task_id}/work-sessions/${worksession_id}/`)
            .then((response) => Promise.resolve(response))
            .catch((error) => Promise.reject(error))
    },

    postWorkSession(
        task_id: string | null,
        worksession_data: object,
        ) {
        return api
            .post(`/tasks/${task_id}/work-sessions/`, worksession_data, 
           
            )
            .then((response) => Promise.resolve(response))
            .catch((error) => Promise.reject(error))
    },

    postPreviews(
        task_id: string | null,
        previews: any,
        ) {
            console.log(previews.getAll('images'))
        return api
            .post(`/tasks/${task_id}/media/`, previews, 
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            .then((response) => Promise.resolve(response))
            .catch((error) => Promise.reject(error))
    },

    getPreviews(
        item: string,
        ) {
        return api
            .get(item) 
            .then((response) => Promise.resolve(response))
            .catch((error) => Promise.reject(error))
    }
}