import React from 'react';
import {connect} from 'react-redux';
import Login from "../components/Login";
import Register from "../components/Register";
import {BrowserRouter, Switch, Route} from "react-router-dom";


const AppRouter =()=>{
  return(
    <BrowserRouter>
      <div className='container'>
        <Switch>
          <Route path='/' component={Login} exact={true}/>
          <Route path='/register' component={Register} />
        </Switch>
     </div>
    </BrowserRouter>
    
  )
}

const mapStateToProps=(state)=>({auth : state.auth})

export default connect(mapStateToProps)(AppRouter);