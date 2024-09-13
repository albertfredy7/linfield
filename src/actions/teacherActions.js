import axios from 'axios';
import {
   TEACHER_LOGIN_REQUEST,
   TEACHER_LOGIN_SUCCESS,
   TEACHER_LOGIN_FAIL,
   TEACHER_LOGOUT,
} from '../constants/teacherConstants';

export const teacherLogin = (email, password) => async (dispatch) => {
   try {
      dispatch({
         type: TEACHER_LOGIN_REQUEST,
      });

      const config = {
         headers: {
            'Content-Type': 'application/json',
         },
      };

      // const { data } = await axios.post(
      //   'https://lobster-app-yjjm5.ondigitalocean.app/api/teachers/login',
      //   { email, password },
      //   config
      // )

      // const { data } = await axios.post(
      //   'http://127.0.0.1:5000/api/teachers/login',
      //   { email, password },
      //   config
      // );

      const { data } = await axios.post(
         'https://lms-backend-0hls.onrender.com/api/teachers/login',
         { email, password },
         config
      );

      dispatch({
         type: TEACHER_LOGIN_SUCCESS,
         payload: data,
      });

      localStorage.setItem('teacherInfo', JSON.stringify(data));
   } catch (error) {
      dispatch({
         type: TEACHER_LOGIN_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};
