import createDataContext from "./createDataContext";
import url from "../api/url";
import { navigate } from "../navigationRes";
const apiReducer = (state, action) => {
  switch (action.type) {
    case "getDATA":
      return { ...state, data: action.payload };

    case "getEvac":
      return { ...state, evacuees: action.payload };
    case "delEvacuees":
      return {
        ...state,
        evacuees: state.evacuees.filter((evac) => evac._id !== action.payload),
      };
    default:
      return state;
  }
};
// dd pag kuwa evacuess
const getEvacuees = (dispatch) => async (_id, date) => {
  if (date) {
    try {
      const res = await url.get("/evac", {
        params: {
          _id,
          date: date,
          isMili: false,
        },
      });
      //console.log(res.data);
      dispatch({ type: "getEvac", payload: res.data });
    } catch (error) {
      console.log(error.message);
    }
  } else {
    try {
      const res = await url.get("/evac", {
        params: {
          _id,
          date: Date.now(),
          isMili: true,
        },
      });
      //console.log(res.data);
      dispatch({ type: "getEvac", payload: res.data });
    } catch (error) {
      console.log(error.message);
    }
  }
};
const addEvacuation =
  (dispatch) => async (location, name, capacity, address) => {
    //console.log(location);
    try {
      const res = await url.post("/", {
        name,
        location: {
          type: "Point",
          coordinates: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
        },
        capacity,
        address,
      });
      //console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

const addEvacuees = (dispatch) => async (name, _id) => {
  try {
    const res = await url.post("/evac", {
      name,
      _id,
      date: Date.now(),
    });
  } catch (error) {
    console.log(error.message);
  }
};
const getData = (dispatch) => async () => {
  try {
    const res = await url.get("/", { params: { date: Date.now() } });
    dispatch({ type: "getDATA", payload: res.data });
    //console.log(res.data);
  } catch (error) {
    console.log(error.message);
  }
};

const deleteEvacuation = (dispatch) => async (_id) => {
  console.log(_id);
  try {
    const res = await url.delete("/", {
      data: {
        _id,
      },
    });
    dispatch({ type: "delEvacuation", payload: _id });
    //console.log(res.data);
    navigate("Main");
  } catch (error) {
    console.log(error.message);
  }
};

const deleteEvacuees = (dispatch) => async (_id) => {
  console.log(_id);
  try {
    const res = await url.delete("/evac", {
      data: {
        _id,
      },
    });
    dispatch({ type: "delEvacuees", payload: _id });
    console.log(res.data);
    navigate("Main");
  } catch (error) {
    console.log(error.message);
  }
};

export const { Provider, Context } = createDataContext(
  apiReducer,
  {
    addEvacuation,
    getData,
    addEvacuees,
    getEvacuees,
    deleteEvacuation,
    deleteEvacuees,
  },
  { data: null, evacuees: null }
);
