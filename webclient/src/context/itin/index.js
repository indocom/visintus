import React from 'react';
import { initPlan, planReducer } from './plan-reducer';
import * as actions from './plan-actions';

const ItinContext = React.createContext();

function ItinProvider(props) {
  const [itin, dispatch] = React.useReducer(planReducer, initPlan);

  const addPlan = (plan, slug) => dispatch(actions.addPlan(plan, slug)); // add a plan
  const removePlan = (id, slug) => dispatch(actions.removePlan(id, slug)); // remove plan
  const removeCategory = slug => dispatch(actions.removeCategory(slug)); // remove the whole category

  return (
    <ItinContext.Provider
      value={{ itin, addPlan, removePlan, removeCategory }}
      {...props}
    />
  );
}

const useItin = () => React.useContext(ItinContext);

export { ItinProvider, useItin };
