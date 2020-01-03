import React, { useState, useEffect } from 'react'
import M from 'materialize-css'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addPlan, removePlan } from '../../store/actions/planActions'

const AreaDropdown = (props) => {
  const [isAdded, setIsAdded] = useState([])
  console.log(isAdded);
  console.log(props);
  const { plans, itin, slug, addPlan, removePlan } = props

  const toggleButtonMessage = (index) => {
    let newIsAdded = [...isAdded];
    newIsAdded[index] = !newIsAdded[index]
    setIsAdded(newIsAdded);
  }
  
  const scrollDown = e => {
    //e.target.scrollIntoView(); 
    const elem = e.target
    // console.log(elem.getBoundingClientRect().top, window.scrollY, elem.getBoundingClientRect().top + window.scrollY )
    const y = 0.6 * (elem.getBoundingClientRect().top + window.scrollY);
    window.scroll({
      top: y,
      behavior: 'smooth'
    }); 
  }


  useEffect(() => {
    try {
      let idsInItin = itin[slug].map(plan => plan._id)
      let status = plans.map(plan => idsInItin.includes(plan._id))
      setIsAdded(status)
    } catch {

    }
  },[plans.length])

  const postList = plans && plans.length && plans.length > 0 ? (
    plans.map((plan, index) => {
        return(
          <li key = {plan._id} onClick={scrollDown}>
            <div className="collapsible-header">
              {plan.name}
              <span><i className="fas fa-angle-down grey-text text-lighten-1"></i></span>
            </div>
            <div className='collapsible-body'>
              <p>{plan.description}</p>
              {/* <Link to= {'/' + plan._id }><button className="btn btn-small indigo darken-4">Know more</button></Link> */}
              {
                isAdded[index] 
                  ? <button className="btn btn-small" onClick = { () => {toggleButtonMessage(index); removePlan(plan._id, slug) }}>Added succesfully!</button>
                  : <button className="btn btn-small indigo darken-4" onClick = { () => {toggleButtonMessage(index); addPlan(plan, slug) }}>Add to your plan!</button>
              }
            </div>
          </li>
        )
      })
    ) : (
      <div className="center">No data yet</div>
    )

  useEffect(() => {
    let collapsible = document.querySelectorAll(".collapsible");
    M.Collapsible.init(collapsible, {})
  }, [])
  
  return (
    <div className="dropdown">
      <h4 className="center">Area {props.slug}</h4>
      <ul className="collapsible">
        { postList }
      </ul>
    </div>
  )
}


const mapStateToProps = ({ plan }) => {
  console.log(plan)
  return {
    itin: plan.itin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPlan : (plan, slug) => { dispatch(addPlan(plan, slug)) },
    removePlan: (id, slug) => { dispatch(removePlan(id, slug)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaDropdown)




// class AreaDropdown extends Component {
//   state = {
//     plans: [
//       {
//         "id": 1,
//         "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
//         "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
//       },
//       {
//         "id": 2,
//         "title": "qui est esse",
//         "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
//       },
//       {
//         "id": 3,
//         "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
//         "body": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto veniam cum enim itaque veritatis debitis numquam, tenetur cumque at inventore est ex totam facere odio ea quisquam recusandae quaerat vitae?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto veniam cum enim itaque veritatis debitis numquam, tenetur cumque at inventore est ex totam facere odio ea quisquam recusandae quaerat vitae?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto veniam cum enim itaque veritatis debitis numquam, tenetur cumque at inventore est ex totam facere odio ea quisquam recusandae quaerat vitae?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto veniam cum enim itaque veritatis debitis numquam, tenetur cumque at inventore est ex totam facere odio ea quisquam recusandae quaerat vitae?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto veniam cum enim itaque veritatis debitis numquam, tenetur cumque at inventore est ex totam facere odio ea quisquam recusandae quaerat vitae?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto veniam cum enim itaque veritatis debitis numquam, tenetur cumque at inventore est ex totam facere odio ea quisquam recusandae quaerat vitae?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto veniam cum enim itaque veritatis debitis numquam, tenetur cumque at inventore est ex totam facere odio ea quisquam recusandae quaerat vitae?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto veniam cum enim itaque veritatis debitis numquam, tenetur cumque at inventore est ex totam facere odio ea quisquam recusandae quaerat vitae?et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
//       }]
//     }

//   componentDidMount(){
//     axios.get('https://jsonplaceholder.typicode.com/posts')
//       .then(res => {
//         const newplans = [...this.state.plans, ...res.data.slice(4,7)];
//         this.setState({
//             plans: newplans
//         });
//       })
//       .then(() => {
//         let collapsible = document.querySelectorAll(".collapsible");
//         M.Collapsible.init(collapsible, {})
//       })       
//     }

//   handleAdd = plan => {
//     console.log(plan);
//     this.props.addPlan(plan);
//     console.log(this.props);
//   }

//   scrollDown = e => {
//     //e.target.scrollIntoView(); 
//     const elem = e.target
//     console.log(elem.getBoundingClientRect().top, window.scrollY, elem.getBoundingClientRect().top + window.scrollY )
//     const y = 0.6 * (elem.getBoundingClientRect().top + window.scrollY);
//     window.scroll({
//       top: y,
//       behavior: 'smooth'
//     }); 
//   }

//   render() {
//     console.log(this.props)
//     const { plans } = this.state
//     const postList = plans.length ? (
//         plans.map(plan => {
//             return(
//               <li key = {plan._id} onClick={this.scrollDown}>
//                 <div className="collapsible-header">
//                   {plan.title}
//                   <span><i className="fas fa-angle-down grey-text text-lighten-1"></i></span>
//                 </div>
//                 <div className='collapsible-body'>
//                   <p>{plan.body}</p>
//                   <Link to= {'/' + plan._id }><button className="btn btn-small indigo darken-4">Know more</button></Link>
//                   <button className="btn btn-small indigo darken-4" onClick = { () => this.handleAdd(plan, this.props.slug) }>Add to your plan!</button>
//                 </div>
//               </li>
//             )
//         })
//     ) : (
//         <div className="center">No data yet</div>
//     )

//     return (
//       <div className="dropdown">
//         <h4 className="center">Area {this.props.area}</h4>
//         <ul className="collapsible">
//           { postList }
//         </ul>
//       </div>
        
//     )
//   }
// }
