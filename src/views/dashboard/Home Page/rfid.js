import React, {  useState } from 'react';
import Link from 'react-router-dom';
import axios from 'axios';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CButton,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CLabel,
  CRow, CAlert,
} from '@coreui/react'



var imageName = require('src/assets/img_avatar.png')


var isEffect = false;
const Tables = () => {
  const [firstName, setfirstName] = useState();
  const [ShiftName, setShiftName] = useState([]);
  const [employeeTypeId, setemployeeTypeId] = useState([]);

  const [rfid, setrfid] = useState();

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE4OTM3Mjc2fQ.YiGSokx728s4K93CjaC7BMWUa1kHO60UwdMitGwKCdQ' ;
  const [err, setErr] = useState();

  const headers = {
    headers: {

      "Authorization":`Bearer ${token}`
    }
  };
  const testIt = async (num) => {
    setErr("");
    setrfid(num)
    if (isEffect) { isEffect = false; return;}

      if (num.length >= 10) {
        try{
          const body = ({rfid} );
          const loginResponse = await axios.post("https://hrm-innovigent.herokuapp.com/api/v1/movements", body,headers);
          setfirstName(loginResponse.data.data.employee.firstName);
          //setlastName(loginResponse.data.data.employee.lastName);
          setShiftName(loginResponse.data.data.ShiftName);
          setemployeeTypeId(loginResponse.data.data.employee.employeeTypeId);

          console.log(loginResponse);

           // Clear RFID field
          setrfid('');

      } catch(err) {
          err.response.data.message && setErr(err.response.data.message)
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

                {err ? (
                  <CAlert color="info" closeButton fade={5}>
                    {err}
                  </CAlert>
                ) : null}

                <CForm action="submit" method="post"  className="form-horizontal">


                <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">RFID Number</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">

                    <CInput id="password" name="text-input" placeholder="RFID No" autoFocus  value={rfid} onChange={(e) => setrfid(e.target.value)} onKeyUp={(e) =>testIt(e.target.value)}/>
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






