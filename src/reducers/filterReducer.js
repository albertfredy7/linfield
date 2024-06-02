import {STUDENT_FILTER_REQUEST, STUDENT_FILTER_SUCCESS, STUDENT_FILTER_FAIL, UPDATE_FILTERED_STUDENTS} from '../constants/filterConstants'

export const studentFilterReducer = (state = {}, action) => {
    switch (action.type) {
      case STUDENT_FILTER_REQUEST:
        return { loading: true }
      case STUDENT_FILTER_SUCCESS:
        return { loading: false, filteredStudents: action.payload }
      case STUDENT_FILTER_FAIL:
        return { loading: false, error: action.payload }
        case UPDATE_FILTERED_STUDENTS:
          return {
            loading: false,
            filteredStudents: action.payload,
          };
      default:
        return state
    }
  }