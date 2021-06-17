import React, { useState, useEffect } from 'react';
import axios from "axios";
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
  CSpinner,
  CLabel,
  CRow, CAlert,
} from '@coreui/react'





const Tables = () => {
  const [LeaveTypeId, setLeaveTypeId] = useState("");
    const [reason, setReason] = useState("");
    const [leaveRequestedDate, setDate] = useState("");
  const [err, setErr] = useState();
    const [epf, setepf] = useState("");
    const [listData, setListData] = useState({ lists: [] });
    const [loading, setLoading] = useState(true);
    const orgid = localStorage.getItem("id")
    const [numberOfDays, setnumberOfDays] = useState("");
    const onChangeLeaveTypeId = (e) => {
      setLeaveTypeId(e.target.value);
    };
    const onChangeReason = (e) => {
      setReason(e.target.value );
    };
    const onChangeepf = (e) => {
        setepf( e.target.value );
    };
    const onChangeDate = (e) => {
      setDate( e.target.value );
    };
    const onChangenumberOfDays = (e) => {
      setnumberOfDays( e.target.value );
    };
    const token = localStorage.getItem("Token")
    const headers = {
        headers: {

            "Authorization":`Bearer ${token}`
        }
    };
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios(
          `https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/LeaveTypes/list`,headers
        );
        setListData({ lists: result.data.data.LeaveTypesDetails });
        setLoading(false);
      };
      fetchData();
    }, []);
    const onSubmit = async (data) => {

      setErr("");
        const body = ({ epf,LeaveTypeId,reason,leaveRequestedDate,numberOfDays});


    axios.post(`https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/leaveRequests/admin/create`, body, headers)
    .then((res) => {
        if (res.status === 200) {
          window.location.reload();
            alert('upload success');
        }
    }).catch((err) => {
        console.error(err);
      err.response.data.message && setErr(err.response.data.message)
    });
    };



   if (loading) {
    return <CSpinner />
  }
  return (

    <>
    <CRow>
        <CCol xs="12" md="10">
            <CCard>
              <CCardHeader>
                New Leave Application Form
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
                      <CLabel htmlFor="text-input"> Employee EPF No: </CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="text-input" name="text-input" type="number" placeholder="EPF No:" value={epf} onChange={onChangeepf} required/>
                      <CFormText>Please Enter Epf No:</CFormText>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Leave Type</CLabel>
                  </CCol>
                  <CCol>
                  <CSelect
                  name="Countries"
                  onChange={onChangeLeaveTypeId}
                  value={LeaveTypeId}
                  required
                  >
                    <option>Please Select Leave Type</option>
                    {listData.lists.map((country, key) => (
            <option key={key} value={country.id}>
              {country.LeaveTypeName}
            </option>
          ))}

                  </CSelect>
                      <CFormText>Select your Leave Type</CFormText>
                  </CCol>


                </CFormGroup>



                <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Reason</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="text-input" name="text-input" placeholder="Reason" value={reason} onChange={onChangeReason} required/>
                      <CFormText>Please Enter Reason</CFormText>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Date</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="text-input" type="date" name="text-input" placeholder="Special Date" value={leaveRequestedDate} onChange={onChangeDate} required/>
                      <CFormText>Please select Date</CFormText>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input"> Number of days</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                    <CSelect onChange={onChangenumberOfDays} value={numberOfDays} required>
                      <option selected>Select the Days</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </CSelect>
                      <CFormText>Please Select Days</CFormText>
                    </CCol>
                  </CFormGroup>
                </CForm>
              </CCardBody>
              <CCardFooter>
                <CButton data-testid="toggle" type="submit" size="lg" color="primary" onClick={onSubmit}> Submit Request</CButton>

              </CCardFooter>
            </CCard>

          </CCol>


    </CRow>



    </>
  )
}

export default Tables
