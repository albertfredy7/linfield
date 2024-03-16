import axios from "axios";
import {TEACHER_LOGIN_REQUEST, TEACHER_LOGIN_SUCCESS, TEACHER_LOGIN_FAIL, TEACHER_LOGOUT} from '../constants/teacherConstants'

export const teacherLogin = (email, password) => async (dispatch) => {

    console.log('buddy you are at the actions page')

    try {
      dispatch({
        type: TEACHER_LOGIN_REQUEST,
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
  
      const { data } = await axios.post(
        'https://lobster-app-yjjm5.ondigitalocean.app/api/teachers/login',
        { email, password },
        config
      )

      console.log(`printing the data ${data}`)
  
      dispatch({
        type: TEACHER_LOGIN_SUCCESS,
        payload: data,
      })
  
      localStorage.setItem('teacherInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: TEACHER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }