import { actions } from "./Actions";

export const initialTask = {
  title: "",
  description: "",
  due: "",
  priority: "low",
  isFinished: false,
};
export const initialTaskUpdate = {
  id:"",
  title: "",
  description: "",
  due: "",
  priority: "low",
  isFinished: false,
};





export const reducer = (state, action) => {
  switch (action.type) {
    case actions.LOADING_START:
      return { ...state, loading: true };
      case actions.FETCH_SUCCESS:
        return {
          ...state,
          loading: false,
          tasks: [...action.payload]
        };
    case actions.FETCH_ERROR:
      return { ...state, loading: false, error: action.payload };
    case actions.SHOW_MODAL_DELETE:
      return {
        ...state,
        loading: false,
        deleteTaskId: action.payload,
        showModalDelete: true,
      };
    case actions.CONFIRM_DELETE:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
        loading: false,
        deleteTaskId: "",
        showModalDelete: false,
      };
    case actions.CANCEL_DELETE:
      return {
        ...state,
        loading: false,
        deleteTaskId: null,
        showModalDelete: false,
      };
    case actions.SHOW_MODAL_UPDATE:
    return {
      ...state,
      loading: false,
      editedTask: state.tasks.find((task) => task._id === action.payload),
      updateTaskId: action.payload,
      showModalUpdate: true,
    };
    case actions.CANCEL_UPDATE:
      return {
        ...state,
        loading: false,
        editedTask: initialTaskUpdate,
        updateTaskId: null,
        showModalUpdate: false,
      };
      case actions.CONFIRM_UPDATE:
        return {
          ...state,
          loading: false,
          tasks: state.tasks.map((task) =>
            task._id === action.payload._id ? action.payload : task
          ),
          updateTaskId: null,
          editedTask: initialTaskUpdate,
          showModalUpdate: false,
        };
    case actions.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
        taskToggled: initialTaskUpdate,
      };
    case actions.HANDLE_CHANGE:
      return {
        ...state,
        task: { ...state.task, [action.payload.name]: action.payload.value },
      };
    case actions.HANDLE_CHANGE_UPDATE:
      return {
        ...state,
        editedTask: {
          ...state.editedTask,
          [action.payload.name]: action.payload.value,
        },
      };
    case actions.TASK_TOGGLED:
      return {
        ...state,
        taskToggled: state.tasks.find((task) => task._id === action.payload),
      };
    case actions.FORMAT_DATE:
      return { ...state, task: { ...state.task, due: action.payload } };
    case actions.FORMAT_DATE_UPDATE:
      return {
        ...state,
        editedTask: { ...state.editedTask, due: action.payload },
      };
    case actions.FORMAT_DATE_TOGGLED:
      return {
        ...state,
        taskToggled: { ...state.taskToggled, due: action.payload },
      };
    case actions.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        task: initialTask,
      };
    default:
      return state;
  }
};
// export const useTasksState = (initialState) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   return [state, dispatch];
// };
