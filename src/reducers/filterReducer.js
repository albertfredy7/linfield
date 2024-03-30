import {STUDENT_FILTER_REQUEST, STUDENT_FILTER_SUCCESS, STUDENT_FILTER_FAIL} from '../constants/filterConstants'

export const studentFilterReducer = (state = {}, action) => {
    switch (action.type) {
      case STUDENT_FILTER_REQUEST:
        return { loading: true }
      case STUDENT_FILTER_SUCCESS:
        console.log('iam at the reducers page')
        return { loading: false, filteredStudents: action.payload }
      case STUDENT_FILTER_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }