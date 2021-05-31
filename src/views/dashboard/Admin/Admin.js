import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CButton,
  CForm,
  CFormGroup,
  CFormText,
  CCardFooter,
  CInput,
  CLabel,
  CSpinner,
  CRow, CAlert,
} from '@coreui/react'
import { DocsLink } from 'src/reusable'
import UserContext from '../../../userContext';
import usersData from '../../users/UsersData'

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = ['id','firstName', 'lastName', 'email']

const Tables = () => {
    const [collapsed, setCollapsed] = React.useState(true)
    const [showElements, setShowElements] = React.useState(true)
    const [firstName, setfirstName] = useState();
  const [lastName, setlastName] = useState();
  const [email, setemail] = useState();
  const [Phone, setPhone] = useState();
  const [listData, setListData] = useState({ lists: [] });
  const [password, setPassword] = useState();
  const [passwordConfirm, setpasswordConfirm] = useState();
  const [err, setErr] = useState();
  const [loading, setLoading] = useState(true);
  const { userData, setUserData } = useContext(UserContext);

  const onChangefirstName = (e) => {
    setfirstName(e.target.value);
  };
  const onChangelastName = (e) => {
    setlastName(e.target.value );
  };
  const onChangeEmail = (e) => {
    setemail( e.target.value );
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value );
  };
  const onChangepasswordConfirm = (e) => {
    setpasswordConfirm( e.target.value );
  };

  const token = localStorage.getItem("Token")
  const orgid = localStorage.getItem("id")
  const headers = {
    headers: {

      "Authorization":`Bearer ${token}`
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/users/get`,headers
      );
      setListData({ lists: result.data.data.newArray });
      setLoading(false);
      console.log(result.data.data.newArray )
    };
    fetchData();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try{
      const body = ({email, password,passwordConfirm,firstName,lastName} );

      const loginResponse = await axios.post(`https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/users`, body,headers);
      console.log(loginResponse);
      setfirstName('')
      setlastName('')
      setemail('' )
      setPassword('')
      setpasswordConfirm( '' )
      const newuserId = loginResponse.data.data.user.id;
      const body1=({newuserId})
      console.log("body"+loginResponse.data.data.user.id)
      const loginResponse1 = await axios.post(`https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/users/orgid`, body1,headers);
      console.log(loginResponse1);
      window.location.reload();
    } catch(err) {
      err.response.data.message && setErr(err.response.data.message)
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
    <>

<CRow>
          <CCol xs="12" md="6">
            <CCard>
              <CCardHeader>
                Admin Form
              </CCardHeader>
              <CCardBody>
                {err ? (
                  <CAlert color="info" closeButton fade={5}>
                    {err}
                  </CAlert>
                ) : null}
                <CForm action="submit" method="post" e className="form-horizontal">

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">First Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="text-input" name="text-input" value={firstName} onChange={onChangefirstName} placeholder="First Name" />
                      <CFormText>Type your first name</CFormText>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Last Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="text-input" name="text-input" placeholder="Last Name" value={lastName} onChange={onChangelastName} />
                      <CFormText>Type your last name</CFormText>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="email-input">Email</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="email" id="email-input" name="email-input" placeholder="Enter Email" autoComplete="email" value={email} onChange={onChangeEmail}/>
                      <CFormText className="help-block">Please enter your email</CFormText>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="number-input">Contact no</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="text" id="number-input" name="phone" type="tel" pattern="[0-7]{3}-[0-9]{4}-[0-9]{2}" placeholder="Contact No" autoComplete="phone" required/>
                      <CFormText className="help-block">Please enter a contact number (format: 07x-xxxx-xxx)</CFormText>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="password-input">Password</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="password" id="password-input" name="password-input" placeholder="Password" autoComplete="new-password" value={password} onChange={onChangePassword} required/>
                      <CFormText className="help-block">Please enter a complex password</CFormText>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="confirm-password-input">Confirm Password</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="password" id="confirm-password-input" name="confirm-password-input" placeholder="Password" autoComplete="new-password" value={passwordConfirm} onChange={onChangepasswordConfirm} required/>
                      <CFormText className="help-block">Please enter the same password as above</CFormText>
                    </CCol>
                  </CFormGroup>

                </CForm>
              </CCardBody>
              <CCardFooter>
                <CButton type="submit" size="lg" color="primary" onClick={submit}> Submit</CButton>

              </CCardFooter>
            </CCard>

          </CCol>

    </CRow>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Admin Table
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={listData.lists}
              fields={fields}
              columnFilter
              hover
              striped
              bordered
              size="sm"
              itemsPerPage={10}
              pagination
              scopedSlots = {{
                'status':
                  (item)=>(
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  ),
                'id':
                  (item) => (
                    <td> {item[0].id} </td>
                  ),
                'firstName':
                  (item) => (
                    <td> {item[0].firstName} </td>
                  ),
                'lastName':
                  (item) => (
                    <td> {item[0].lastName} </td>
                  ),
                'email':
                  (item) => (
                    <td> {item[0].email} </td>
                  ),
              }}
            />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

    </>
  )
}


export default Tables
