import React, { useState } from 'react'
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


  CCardHeader
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { DocsLink } from 'src/reusable'
var imageName = require('src/assets/img_avatar.png')
const Tabs = () => {
  const [active, setActive] = useState(1)
  const lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.'

  return (
    <CRow>
      <CCol xs="12" sm="6" md="4" className="mb-4">
        <CCard>

          <CCardBody>
            <div className="image-container" align="center">
              <label><img src={imageName.default} height="200px" /> </label>
              <h1><b>Kasun charuka</b></h1>
              <p>hello i am php developer</p>
              <CRow className="align-items-center mt-3">


                <CCol col="3" sm="2" md="2" xl className="mb-1 mb-xl-0">
                  <CButton active block color="success" aria-pressed="true" style={{width:'150px'}}>FOLLOW</CButton>
                </CCol>
                <CCol col="3" sm="2" md="2" xl className="mb-1 mb-xl-0">
                  <CButton active block color="danger" aria-pressed="true" style={{width:'150px'}}>REMOVE</CButton>
                </CCol>

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
                  <CInput id="text-input" name="text-input" placeholder=" "  />

                </CCol>
              </CFormGroup>


              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">Last name</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id="text-input" name="text-input" placeholder=""  />

                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">Email</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id="text-input" name="text-input" placeholder="" />

                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">phone</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id="text-input" name="text-input" placeholder="" />

                </CCol>
              </CFormGroup>


              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="email-input">occupation</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput type="email" id="email-input" name="email-input" placeholder="" autoComplete="" />

                </CCol>
              </CFormGroup>


              <CCardFooter>
                <CButton type="submit" size="lg" color="primary"> Submit</CButton>

              </CCardFooter>




            </CForm>
          </CCardBody>
        </CCard>
      </CCol>


    </CRow>
  )
}

export default Tabs
