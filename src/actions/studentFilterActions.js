import axios from 'axios';
import {
   STUDENT_FILTER_REQUEST,
   STUDENT_FILTER_SUCCESS,
   STUDENT_FILTER_FAIL,
   UPDATE_FILTERED_STUDENTS,
} from '../constants/filterConstants';

export const filterStudents =
   ({ filterObject }) =>
   async (dispatch) => {
      try {
         dispatch({
            type: STUDENT_FILTER_REQUEST,
         });

         const config = {
            headers: {
               'Content-Type': 'application/json',
            },
         };

         // const { data } = await axios.post(
         //   'https://lobster-app-yjjm5.ondigitalocean.app/api/students/filterStudents',
         //   filterObject,
         //   config
         // )
         // const { data } = await axios.post(
         //    'http://127.0.0.1:5000/api/students/filterStudents',
         //    filterObject,
         //    config
         // );

         const { data } = await axios.post(
            'https://lms-backend-0hls.onrender.com/api/students/filterStudents',
            filterObject,
            config
         );

         dispatch({
            type: STUDENT_FILTER_SUCCESS,
            payload: data,
         });
      } catch (error) {
         dispatch({
            type: STUDENT_FILTER_FAIL,
            payload:
               error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
         });
      }
   };

export const updateFilteredStudents = (updatedData) => async (dispatch) => {
   dispatch({
      type: UPDATE_FILTERED_STUDENTS,
      payload: updatedData,
   });
};
