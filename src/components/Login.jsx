import React from 'react'
import {Redirect, Prompt} from 'react-router-dom';
import { compose, withState } from 'recompose'

// add sự kiện submit login form
// khi name và pass đúng => sử dụng localStorage để set giá trị user = true
const onLogin = () => {
  const name = document.getElementById('userName').value
  const pass = document.getElementById('passWord').value
  if((name === 'MinhDT') && (pass === 'MinhDT')){
    return localStorage.setItem('user', true)
  }
}

const enhance = compose(withState('status', 'changeStatus', false))

const Login = ({status, changeStatus}) => {
  console.log(status)
 // lấy user từ trong localStorage nếu == 'true' thì sẽ Redirect. Còn không sẽ ở trang Login
 if(localStorage.getItem('user') === 'true'){
    return <Redirect to='/' />
  }
  return (
    <div className="d-flex justify-content-center">
      <div className="w-50 p-3">
        <h1>This is Login Page</h1>
        <form onSubmit={onLogin}>
          <legend>Login</legend>
          <div className="form-group">
            <label>User Name</label>
            <input type="text" className="form-control" id="userName" placeholder="User Name" name="txtUserName" onChange={() => changeStatus(true)} />
          </div>
          <div className="form-group">
            <label>PassWord</label>
            <input type="password" className="form-control" id="passWord" placeholder="Input field" name="txtPassWord" />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
      <Prompt
        when={status}
        message="Are you sure you want to leave?"
      />
    </div>
  )
}

export default enhance(Login)
