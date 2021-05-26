import React, {useEffect, useState} from 'react'
import {
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CCard,
  CCardBody,
  CButton,
  CTabs,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CFormText,
  CCardFooter,


  CCardHeader, CSpinner
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { DocsLink } from 'src/reusable'
import {Link} from "react-router-dom";
import axios from "axios";
var imageName = require('src/assets/img_avatar.png')
const Tabs = () => {
  const [active, setActive] = useState(1)
  const [listData, setListData] = useState({ lists: [] });
  const [loading, setLoading] = useState(true);

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
      setListData({ lists: result.data.data.checkUsers });
      setLoading(false);
      console.log(result.data.data.checkUsers )
    };
    fetchData();
  }, []);
  const lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.'
  if (loading) {
    return (
      <div style={{ padding: "10px 20px", textAlign: "center"}}>
        <CSpinner />
      </div>
    )
  }
  return (
    <CRow>
      <CCol xs="12" sm="6" md="4" className="mb-4">
        <CCard>

          <CCardBody>
            <div className="image-container" align="center">
              <label><img src={imageName.default} height="200px" /> </label>
              <h1><b>{listData.lists[0].firstName} </b></h1>

              <CRow className="align-items-center mt-3">


              </CRow>
            </div>
            <p>overview</p>
            <p>Accounts Details</p>
            <p>Help</p>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" md="8" className="mb-4">
        <CCard>
          <CCardHeader>
            <p><b>PERSONAL PROFILE</b></p>
          </CCardHeader>
          <CCardBody>
            <CForm action="submit" method="post"  className="form-horizontal">

              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="select">First name</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id="text-input" name="text-input" value={listData.lists[0].firstName}  />

                </CCol>
              </CFormGroup>


              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">Last name</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id="text-input" name="text-input" value={listData.lists[0].lastName}  />

                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">Email</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id="text-input" name="text-input" value={listData.lists[0].email} />

                </CCol>
              </CFormGroup>










            </CForm>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol>
        <CCard>
          <CCardBody>
            <CForm>
              <CCol col="3" sm="2" md="2" xl className="mb-1 mb-xl-0">
                <Link to="/Change Password">
                  <CButton active block color="danger" aria-pressed="true"  style={{width:'150px'}}>Change Password</CButton>
                </Link>
              </CCol>



            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Tabs
