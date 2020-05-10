import { actionTypes } from './plan-actions';

export const initPlan = {
  itin: localStorage.getItem('plan-info')
    ? JSON.parse(localStorage.getItem('plan-info')).itin
    : {
        // intro: [
        //   {
        //     _id: 0,
        //     name: 'Introduction to NUS',
        //     description: 'Lorem ipsum si dolor amet'
        //   }
        // ]
      }
};

export const planReducer = (state = initPlan, action) => {
  switch (action.type) {
    case actionTypes.addPlan: {
      const sameSlug = state.itin[action.slug];
      if (typeof sameSlug !== 'undefined') {
        if (sameSlug.filter(plan => plan._id === action.plan._id).length > 0) {
          return state;
        } else {
          let newPlan = [...sameSlug, action.plan._id];
          let newPlanInfo = {
            ...state,
            itin: {
              ...state.itin,
              [action.slug]: newPlan
            }
          };
          localStorage.setItem('plan-info', JSON.stringify(newPlanInfo));
          return newPlanInfo;
        }
      } else {
        let newPlanInfo = {
          ...state,
          itin: {
            ...state.itin,
            [action.slug]: [action.plan._id]
          }
        };
        localStorage.setItem('plan-info', JSON.stringify(newPlanInfo));
        return newPlanInfo;
      }
    }

    case actionTypes.removePlan: {
      const sameSlug = state.itin[action.slug];
      let newPlan = sameSlug.filter(id => id !== action.id);

      let newPlanInfo = {
        ...state,
        itin: {
          ...state.itin,
          [action.slug]: newPlan
        }
      };
      localStorage.setItem('plan-info', JSON.stringify(newPlanInfo));
      return newPlanInfo;
    }

    case actionTypes.removeCategory: {
      let newPlanInfo = {
        ...state,
        itin: {
          ...state.itin
        }
      };
      delete newPlanInfo.itin[action.slug];
      localStorage.setItem('plan-info', JSON.stringify(newPlanInfo));
      return newPlanInfo;
    }

    default: {
      throw new Error('Unhandled type in Plan Reducer: ' + action.type);
    }
  }
};
