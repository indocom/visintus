import React, { useState, useEffect } from 'react';
import M from 'materialize-css';
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { addPlan, removePlan } from '../../store/actions/planActions';

const AreaDropdown = props => {
  const [isAdded, setIsAdded] = useState([]);
  const { plans, itin, slug, addPlan, removePlan } = props;

  const toggleButtonMessage = index => {
    let newIsAdded = [...isAdded];
    newIsAdded[index] = !newIsAdded[index];
    setIsAdded(newIsAdded);
  };

  const scrollDown = e => {
    e.target.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  };

  useEffect(() => {
    try {
      let idsInItin = itin[slug];
      let status = plans.map(plan => idsInItin.includes(plan._id));
      setIsAdded(status);
    } catch {}
  }, [plans.length]);

  const postList =
    plans && plans.length && plans.length > 0 ? (
      plans.map((plan, index) => {
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
              {isAdded[index] ? (
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

  useEffect(() => {
    let collapsible = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapsible, {
      accordion: false
    });
  }, []);

  return (
    <div className="dropdown">
      <h4 className="center">Area {props.slug}</h4>
      <ul className="collapsible">{postList}</ul>
    </div>
  );
};

const mapStateToProps = ({ plan }) => {
  return {
    itin: plan.itin
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addPlan: (plan, slug) => {
      dispatch(addPlan(plan, slug));
    },
    removePlan: (id, slug) => {
      dispatch(removePlan(id, slug));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AreaDropdown);
