export const initialState = {
  isCreatedCourse: {
    data: {},
    loading: true
  },
  listCourse: {
    data: {},
    loading: true
  },
  listCourseFitler: {
    data: {},
    loading: true
  },
  listCourseByUser: {
    data: {},
    loading: true
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_COURSE_REQUEST":
      return {
        ...state,
        isCreatedCourse: { ...initialState.isCreatedCourse }
      };
    case "CREATE_COURSE_SUCCESS":
      return {
        ...state,
        isCreatedCourse: { data: action.payload, loading: false }
      };
    case "GET_COURSE_REQUEST":
      return { ...state, listCourse: { ...initialState.listCourse } };
    case "GET_COURSE_SUCCESS":
      return { ...state, listCourse: { data: action.payload, loading: false } };
    case "FILTER_COURSE_BY_TRAINING_REQUEST":
      return {
        ...state,
        listCourseFitler: { ...initialState.listCourseFitler }
      };
    case "FILTER_COURSE_BY_TRAINING_SUCCESS":
      return {
        ...state,
        listCourseFitler: { data: action.payload, loading: false }
      };
    case "GET_COURSE_BY_USER_REQUEST":
      return {
        ...state,
        listCourseByUser: { ...initialState.listCourseByUser }
      };
    case "GET_COURSE_BY_USER_SUCCESS":
      return {
        ...state,
        listCourseByUser: { data: action.payload, loading: false }
      };

    default:
      return state;
  }
};
