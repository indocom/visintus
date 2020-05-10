import React, { useState, useEffect } from 'react';
import M from 'materialize-css';
import { useItin } from '~/context/itin';

const CategoryDropdown = props => {
  const [addedIndexes, setAddedIndexes] = useState([]); // array of indexes of user-selected plans
  const { availablePlans, slug } = props;
  const { itin, addPlan, removePlan } = useItin();

  // initialize user-selected plans
  useEffect(() => {
    if (itin) {
      let idsInItin = itin?.itin[slug];
      let status = availablePlans.map(plan => idsInItin?.includes(plan._id));
      setAddedIndexes(status);
    }
  }, [itin, availablePlans.length]);

  // toggle added to plan / add to plan BUTTON
  const toggleButtonMessage = index => {
    let newAddedIndexes = [...addedIndexes];
    newAddedIndexes[index] = !newAddedIndexes[index];
    setAddedIndexes(newAddedIndexes);
  };

  const scrollDown = e => {
    e.target.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  };

  const postList =
    availablePlans?.length && availablePlans.length > 0 ? (
      availablePlans.map((plan, index) => {
        return (
          <li key={plan._id} onClick={scrollDown}>
            <div className="collapsible-header">
              {plan.name}
              <span>
                <i className="fas fa-angle-down grey-text text-lighten-1"></i>
              </span>
            </div>
            <div className="collapsible-body">
              <p>{plan.description}</p>
              {/* <Link to= {'/' + plan._id }><button className="btn btn-small indigo darken-4">Know more</button></Link> */}
              {addedIndexes[index] ? (
                <button
                  className="btn btn-small"
                  onClick={() => {
                    toggleButtonMessage(index);
                    removePlan(plan._id, slug);
                  }}
                >
                  Added succesfully!
                </button>
              ) : (
                <button
                  className="btn btn-small indigo darken-4"
                  onClick={() => {
                    toggleButtonMessage(index);
                    addPlan(plan, slug);
                  }}
                >
                  Add to your plan!
                </button>
              )}
            </div>
          </li>
        );
      })
    ) : (
      <div className="center">No data yet</div>
    );

  // initialize dropdown
  useEffect(() => {
    let collapsible = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapsible, {
      accordion: false
    });
  }, []);

  return (
    <div className="dropdown">
      <h4 className="center">{props.slug}</h4>
      <ul className="collapsible">{postList}</ul>
    </div>
  );
};

export default CategoryDropdown;
