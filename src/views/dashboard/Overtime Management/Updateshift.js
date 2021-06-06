import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {

    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CButton,
    CForm,
    CSelect,
    CFormGroup,
    CFormText,
    CCardFooter,
    CInput,
    CLabel,
    CRow,
} from '@coreui/react'

import { useHistory, useLocation  } from 'react-router-dom';




const Tables = () => {

  const [ot_startTime, setot_startTime] = useState([]);;
  const [shiftName, setshiftName] = useState([]);
  const [id, setid] = useState([]);
  const [newshiftName, setnewshiftName] = useState([]);
  const [start_time, setstart_time] = useState([]);
  const [end_time, setend_time] = useState([]);


  const orgid = localStorage.getItem("id")
  const history = useHistory();
  const location = useLocation();
  const data = location.state;


  const onChangenewshiftName = (e) => {
    setnewshiftName(e.target.value);
  };

  const handleChange = (event) => {
    setot_startTime(event.target.value);
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

      setnewshiftName(data.shiftName)
      setot_startTime(data.ot_startTime)
      setid(data.id)
      //console.log(data.shiftName)

  }, []);






const onUpdate = async (e) => {

    e.preventDefault();
    try{
      const body = ({id, newshiftName,ot_startTime} );
      const loginResponse = await axios.post(`https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/shift/Update`, body,headers);
      console.log(loginResponse);
      setid('')
      setnewshiftName('')
      setot_startTime('')
      history.push('/Shift Configuration')


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
                      <CLabel htmlFor="text-input">Shift Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="text-input" name="text-input" placeholder="Shift Name" value={newshiftName} onChange={onChangenewshiftName}/>
                      <CFormText>Please Enter New Shift Name</CFormText>
                    </CCol>
                  </CFormGroup>


                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">OT Start Time</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect custom name="OT Start Time" id="OT Start Time" value={ot_startTime} onChange={handleChange}>

                      <option value="0">Please select</option>
                      <option value="5">5 mins</option>
                      <option value="10">10 mins</option>
                      <option value="15">15 mins</option>
                      <option value="30">30 mins</option>
                      <option value="45">45 mins</option>
                    </CSelect>
                    <CFormText>Select New OT Start Time</CFormText>
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
