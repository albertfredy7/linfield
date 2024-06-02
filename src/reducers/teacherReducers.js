import {TEACHER_LOGIN_REQUEST, TEACHER_LOGIN_SUCCESS, TEACHER_LOGIN_FAIL, TEACHER_LOGOUT} from '../constants/teacherConstants'

export const teacherLoginReducer = (state = {}, action) => {
    switch (action.type) {
      case TEACHER_LOGIN_REQUEST:
        return { loading: true }
      case TEACHER_LOGIN_SUCCESS:
        return { loading: false, teacherInfo: action.payload }
      case TEACHER_LOGIN_FAIL:
        return { loading: false, error: action.payload }
    //   case USER_LOGOUT:
    //     return {}
      default:
        return state
    }
  }