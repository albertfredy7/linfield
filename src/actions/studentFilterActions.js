import axios from "axios";
import {STUDENT_FILTER_REQUEST,STUDENT_FILTER_SUCCESS,STUDENT_FILTER_FAIL} from '../constants/filterConstants'

export const  filterStudents = ({filterObject}) => async (dispatch) => {

    try {
      dispatch({
        type: STUDENT_FILTER_REQUEST,
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
  
      const { data } = await axios.post(
        'https://lobster-app-yjjm5.ondigitalocean.app/api/students/filterStudents',
        filterObject,
        config
      )
  
      dispatch({
        type: STUDENT_FILTER_SUCCESS,
        payload: data,
      })
  
    } catch (error) {
      dispatch({
        type: STUDENT_FILTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }