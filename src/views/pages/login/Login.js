import React, {useContext, useState} from 'react';
import UserContext from '../../../userContext';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CSpinner,
  CAlert,
  CRow
} from '@coreui/react'
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';

import CIcon from '@coreui/icons-react'

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirm, setpasswordConfirm] = useState();
    const [err, setErr] = useState();
    const [loading, setLoading] = useState(false);
    const { setUserData } = useContext(UserContext);

    const history = useHistory();
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
        };
    const onChangePassword = (e) => {
        setPassword(e.target.value );
          };
    // const onChangepasswordConfirm = (e) => {
    //     setpasswordConfirm( e.target.value );
    // };

          const submit = async (e) => {
              e.preventDefault();
            setErr("");
              setLoading(true);
              try{
                  const body = ({email, password,passwordConfirm});
                  const loginResponse = await axios.post("https://hrm-innovigent.herokuapp.com/api/v1/users/login", body);


                  localStorage.setItem("Token", loginResponse.data.data.token);
                  localStorage.setItem("id", loginResponse.data.data.user.organizations[0].id);
                  setUserData({
                    id: loginResponse.data.data.user.organizations[0].id,
                    user: loginResponse.data.data.user.firstName,


                });
                  setLoading(false)
                  console.log(loginResponse.data.data.user.organizations[0].id)
                  history.push("/Dashboard");


              } catch(err) {
                  setLoading(false)
                  err.response.data.message && setErr(err.response.data.message)
                  //err.message&& setErr(err.message)
              }
        };


  if (loading) {
    return (
      <div style={{ padding: "10px 20px", textAlign: "center"}}>
        <CSpinner />
      </div>
    )
  }
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  {err ? (
                      <CAlert color="info" closeButton fade={5}>
                        {err}
                      </CAlert>
                  ) : null}

                  <CForm onSubmit={submit}>


                    <h1>Login</h1>
                    <p className="text-muted">Sign in to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>

                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Email" autoComplete="email" onChange={onChangeEmail}/>


                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" autoComplete="current-password" onChange={onChangePassword} />
                    </CInputGroup>


                    {/* <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" autoComplete="current-password" onChange={onChangepasswordConfirm} />
                    </CInputGroup> */}

                    <CRow>

                      <CCol xs="6">
                        <CButton color="primary" type="submit" value="Submit" className="px-4">Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">



                        {/* <CButton color="link" className="px-0">Forgot password?</CButton> */}
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Don't have a HRM account?<br></br>
                    Join us !</p>
<br></br><br></br>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now !</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
