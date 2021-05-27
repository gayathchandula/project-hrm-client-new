import React, { useEffect, useState } from 'react';
//import ReactDOM from 'react-dom';
// import {DebounceInput} from 'react-debounce-input';
import {Link,useHistory } from 'react-router-dom';
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
    CSelect,
    CFormGroup,
    CFormText,
    CCardFooter,
    CInput,
    CInputFile,
    CLabel,
    CRow,
} from '@coreui/react'
import { DocsLink } from 'src/reusable'

import usersData from '../../users/UsersData'
var imageName = require('src/assets/img_avatar.png')

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = ['Employee ID','First Name', 'Last Name', 'Employee Type','Shift Type','Created At', 'Updated At', 'Action']
var isEffect = false;
const Tables = () => {
  const [firstName, setfirstName] = useState();
  const [lastName, setlastName] = useState([]);
  const [ShiftName, setShiftName] = useState([]);
  const [employeeTypeId, setemployeeTypeId] = useState([]);
  const [hour_rate, sethour_rate] = useState([]);
  const [rfid, setrfid] = useState();
  const [listData, setListData] = useState({ lists: [] });
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE4OTM3Mjc2fQ.YiGSokx728s4K93CjaC7BMWUa1kHO60UwdMitGwKCdQ' ;


  const headers = {
    headers: {

      "Authorization":`Bearer ${token}`
    }
  };
  const testIt = async (num) => {
    setrfid(num)
    if (isEffect) { isEffect = false; return;}

      if (num.length >= 10) {
        try{
          const body = ({rfid} );
          const loginResponse = await axios.post("https://hrm-innovigent.herokuapp.com/api/v1/movements", body,headers);

          console.log(loginResponse.data.data.employee.firstName);
           // Clear RFID field
          setfirstName(loginResponse.data.data.employee.firstName);
          setlastName(loginResponse.data.data.employee.lastName);
          setShiftName(loginResponse.data.data.ShiftName);
          setemployeeTypeId(loginResponse.data.data.employee.employeeTypeId);

      } catch(err) {
        //err.response.data.message&& setErr(err.response.data.message)
        setrfid('');
      }

    isEffect = true;
    setrfid('');



    }
  }

  return (

    <>
<CRow className="justify-content-center">
  <CCol xs="12" sm="8" className="col-3 text-center">
    <h1 className="text-center" style={{ padding: "10px 20px", textAlign: "center", color: "black"}}>
      SMART People Management System
    </h1>
    <div>
      <br></br>
    </div>
  </CCol>
  <CCol xs="12" sm="3" className=" text-right">
    <Link to="/login"  style={{ padding: "10px 20px", textAlign: "center"}}>
      <CButton color="primary" className="mt-3" active tabIndex={-1}>Go to Login </CButton>
    </Link>
  </CCol>

</CRow>

<CRow className="justify-content-center">

    <CCol xs="12" sm="8">
    <CCard>
              <CCardHeader>
                Employee Data
              </CCardHeader>
              <CCardBody>



                <CForm action="submit" method="post"  className="form-horizontal">


                <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">RFID Number</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">

                    <CInput id="password" name="text-input" placeholder="RFID No"  value={rfid} onChange={(e) => setrfid(e.target.value)} onKeyUp={(e) =>testIt(e.target.value)}/>
                      <CFormText>Scan RFID Card</CFormText>
                    </CCol>
                  </CFormGroup>


                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <p className="form-control-static">{firstName}</p>
                    {/* <label>First Name :</label> <input type="text" value={firstName} onChange={(e) => setfirstName(e.target.value)}></input> */}

                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Shift</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <p className="form-control-static">{ShiftName}</p>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Employee Type</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <p className="form-control-static">{employeeTypeId} </p>
                  </CCol>
                </CFormGroup>



                </CForm>
              </CCardBody>
            </CCard>
    </CCol>

    <CCol xs="12" sm="3">
          <CCard>
                <CCardHeader>
                    Employee
                 Image
                </CCardHeader>
                <CCol xs="12" sm="10" md="9">
                    <CCard >
                        <CCardBody>
                        <img src={imageName.default} height="180px" />
                        </CCardBody>
                    </CCard>
                 </CCol>

             </CCard>
    </CCol>


</CRow>

    </>
  )
}

export default Tables




//<CInput id="password" name="text-input" placeholder="RFID No"  value={rfid} onChange={(e) => setrfid(e.target.value)} onKeyUp={(e) =>testIt(e.target.value)} />

