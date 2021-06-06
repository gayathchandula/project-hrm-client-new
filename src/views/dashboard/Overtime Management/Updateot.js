import React, { useEffect, useState} from 'react';
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
    CCardFooter,
    CInput,
    CLabel,
    CRow,
} from '@coreui/react'

import { useHistory, useLocation  } from 'react-router-dom';



const fields = ['shiftName','start_time', 'end_time', 'ot_startTime', {
  key: 'show_details',
  label: 'Action',

  sorter: false,
  filter: false
}]

const Tables = () => {
    const [otHrsMax, setotHrsMax] = useState([]);
    const [otHrsMin, setotHrsMin] = useState([]);
    const [incharge_email, setincharge_email] = useState([]);
  const [ot_startTime, setot_startTime] = useState([]);;
  const [shiftName, setshiftName] = useState([]);
  const [id, setid] = useState([]);
  const [newshiftName, setnewshiftName] = useState([]);
  const [start_time, setstart_time] = useState([]);
  const [end_time, setend_time] = useState([]);

  const [otRate, setotRate] = useState([]);


  const history = useHistory();
  const location = useLocation();
  const orgid = localStorage.getItem("id")
  const data = location.state;


  const onChangeMax_Hours = (e) => {
    setotHrsMax(e.target.value);
  };
  const onChangeMin_Hours = (e) => {
    setotHrsMin(e.target.value );
  };
  const onChangeInchemail = (e) => {
    setincharge_email(e.target.value );
  };
  const onChangehour_rate = (e) => {
    setotRate( e.target.value );
  };
  const token = localStorage.getItem("Token")
  const headers = {
    headers: {

      "Authorization":`Bearer ${token}`
    }
  };

  useEffect(() => {
    const data = location.state;
    console.log(data)
    setincharge_email(data.incharge_email)
    setotHrsMax(data.otHrsMax)
    setotHrsMin(data.otHrsMin)
    setotRate(data.otRate)
    setid(data.id)


  }, []);






const onUpdate = async (e) => {

    e.preventDefault();
    try{
      const body = ({id, otHrsMax,otHrsMin,incharge_email,otRate} );
      const loginResponse = await axios.post(`https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/overtime/updatedetails`, body,headers);
      console.log(loginResponse);
      setincharge_email('')
      setotHrsMax('')
      setotHrsMin('')
      setotRate('')
      setid('')
      history.push('/Overtime Configuration')


    } catch(err) {
      //err.response.data.message&& setErr(err.response.data.message)
    }

};


  return (

    <>
    <CRow>
        <CCol xs="12" md="6">
            <CCard>
              <CCardHeader>
              Shift Configuration Update Form
              </CCardHeader>
              <CCardBody>
                <CForm action="submit" method="post" className="form-horizontal">
                <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">OT Max Hour</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="text-input" name="text-input" placeholder="Max Hour" value={otHrsMax} onChange={onChangeMax_Hours}/>
                      <CFormText>Please Enter New OT Max Hour</CFormText>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">OT Min Hour</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="text-input" name="text-input" placeholder="Min Hour" value={otHrsMin} onChange={onChangeMin_Hours}/>
                      <CFormText>Please Enter New OT Min Hour</CFormText>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">OT Rate</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="text-input" name="text-input" placeholder="OT rate" value={otRate} onChange={onChangehour_rate}/>
                      <CFormText>Please Enter New OT Rate</CFormText>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Incharge Email</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="text-input" name="text-input" placeholder="Incharge Email" value={incharge_email} onChange={onChangeInchemail}/>
                      <CFormText>Please Enter New Incharge Email</CFormText>
                    </CCol>
                  </CFormGroup>



                </CForm>
              </CCardBody>
              <CCardFooter>
                <CButton type="submit" size="lg" color="primary" onClick={onUpdate}> Submit</CButton>

              </CCardFooter>
            </CCard>

          </CCol>

    </CRow>



    </>
  )
}

export default Tables
