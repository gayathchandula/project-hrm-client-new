import React, { useEffect, useState} from "react";
import axios from "axios";
import {
  CBadge,
  CCard,
  CCardBody,
  CButton,
  CCardHeader,
  CCol,
  CSpinner,
  CDataTable,
  CRow, CAlert, CForm, CFormGroup, CLabel, CInput, CFormText, CSelect, CCardFooter
} from '@coreui/react'
import Timer from 'react-compound-timer'

const getBadge = reviewstatusId => {
  switch (reviewstatusId) {
    case 1 : return 'success'
    case 2 : return 'danger'
    case 3 : return 'warning'

    default: return 'primary'
  }
}

const fields = ['leavetype',{
  key:'employeeName',
  label: 'Name'
},{
  key:'employeeepf',
  label: 'EPF No'
},'leaveRequestedDate','numberOfDays','reason',{
  key: 'show_details',
  label: 'Action',

  sorter: false,
  filter: false
}]
const fields1 = [{
  key:'employeeName',
  label: 'Name'
},{
  key:'employeeepf',
  label: 'EPF No'
},'leavetype','leaveRequestedDate','numberOfDays','reason','reviewstatusId']
const Tables = () => {
  const [LeaveTypeId, setLeaveTypeId] = useState("");
  const [reason, setReason] = useState("");
  const [leaveRequestedDate, setDate] = useState("");
  const [employeeTypeId, setemployeeTypeId] = useState("");
  const [err, setErr] = useState();
  const [epf, setepf] = useState("");
  const [listData, setListData] = useState({ lists: [] });
  const [loading, setLoading] = useState(true);
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

  function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
      minutes = parseInt(timer / 60, 10)
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      if (--timer < 0) {
        timer = duration;
      }
      //console.log(parseInt(seconds))
      window.localStorage.setItem("seconds",seconds)
      window.localStorage.setItem("minutes",minutes)
    }, 1000);
  }

  window.onload = function () {
    let sec;
    sec  = parseInt(window.localStorage.getItem("seconds"))
    let min;
    min = parseInt(window.localStorage.getItem("minutes"))

    if(parseInt(min*sec)){
      var fiveMinutes = (parseInt(min*60)+sec);
    }else{
      var fiveMinutes = 60 * 5;
    }
    // var fiveMinutes = 60 * 5;

    startTimer(fiveMinutes);
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
      const result = await axios(
        `https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/employeeslist`,headers
      );
      setListData({ lists: result.data.data.EmployeeList });
      setLoading(false);
      //console.log(result)
    };


      fetchData()
    test()

  }, []);
  // {listData3.lists.map((country, key) => (
  //   <option key={key} value={country.id}>
  //     {country.departmentName}
  //   </option>
  // ))}

  function test () {



    setInterval(function () {
      console.log(listData.lists.find(item => item.firstName === "Gayath"))
          console.log(new Date().toLocaleString())

    }, 5000)


  }

  // function test () {
  //
  //
  //
  //     setInterval(function () {
  //       //console.log(listData.lists.find(item => item.firstName === "Jude"))
  //       listData.lists.find(function test1(country, key) {
  //         if (country.firstName = 'Jude') {
  //           //console.log(new Date().toLocaleString())
  //           console.log(listData.lists.find(item => item.firstName === "Jude"))
  //           console.log(country.firstName)
  //         }
  //       })
  //     }, 5000)
  //
  //
  // }

  const onSubmit = async (OTLogId) => {
    const reviewStatus = 1 ;


    try{
      const body = ({reviewStatus,OTLogId});
      const loginResponse = await axios.post(`https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/leaveRequests/update`, body,headers);
      console.log(loginResponse);
      window.location.reload();

    } catch(err) {
      //err.response.data.message&& setErr(err.response.data.message)
    }

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
              Shift Swap application
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
                    <CLabel htmlFor="text-input"> Employee EPF No: </CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="text-input" name="text-input" type="number" placeholder="EPF No:" value={epf} onChange={onChangeepf} required/>
                    <CFormText>Please Enter Epf No:</CFormText>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input"> Time </CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect onChange={onChangenumberOfDays} value={numberOfDays} required>
                      <option selected>Select the Hours</option>
                      <option value="24">24 hours</option>
                      <option value="48">48 hours</option>
                    </CSelect>
                    <CFormText>Please select:</CFormText>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input"> Expire Date </CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="text-input" name="date" type="date"  value={epf} onChange={onChangeepf} required/>
                    <CFormText>Please select:</CFormText>
                  </CCol>
                </CFormGroup>

                {/*<CFormGroup row>*/}
                {/*  <CCol md="3">*/}
                {/*    <CLabel htmlFor="select">Timer</CLabel>*/}
                {/*  </CCol>*/}
                {/*  <CCol>*/}
                {/*    <Timer*/}
                {/*      initialTime={30000 * 60 * 48 + 5000}*/}
                {/*      direction="backward"*/}
                {/*    >*/}
                {/*      {() => (*/}
                {/*        <React.Fragment>*/}
                {/*          <Timer.Days /> days*/}
                {/*          <Timer.Hours /> hours*/}
                {/*          <Timer.Minutes /> minutes*/}
                {/*          <Timer.Seconds /> seconds*/}
                {/*        </React.Fragment>*/}
                {/*      )}*/}
                {/*    </Timer>*/}
                {/*    <CFormText>Select your Leave Type</CFormText>*/}
                {/*  </CCol>*/}


                {/*</CFormGroup>*/}

              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="lg" color="primary" onClick={onSubmit}> Submit Request</CButton>

            </CCardFooter>
          </CCard>

        </CCol>


      </CRow>

      <CRow>
        <CCol xs="6" md="4">
          <CCard>
            <CCardHeader>
              Shift Swap
            </CCardHeader>
            <CCardBody>


                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input"> EPF No: </CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="text-input" name="text-input" type="number" placeholder="EPF No:" value={epf} onChange={onChangeepf} required/>
                  </CCol>
                </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input"> EPF No: </CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id="text-input" name="text-input" type="number" placeholder="EPF No:" value={epf} onChange={onChangeepf} required/>
                </CCol>
              </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input"> Time </CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect onChange={onChangenumberOfDays} value={numberOfDays} required>
                      <option selected>Select the Hours</option>
                      <option value="24">24 hours</option>
                      <option value="48">48 hours</option>
                    </CSelect>
                    <CFormText>Please select:</CFormText>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Timer</CLabel>
                  </CCol>
                  <CCol>
                    <Timer
                      initialTime={30000 * 60 * 48 + 5000}
                      direction="backward"
                    >
                      {() => (
                        <React.Fragment>
                          <Timer.Days /> days
                          <Timer.Hours /> hours
                          <Timer.Minutes /> minutes
                          <Timer.Seconds /> seconds
                        </React.Fragment>
                      )}
                    </Timer>
                    <CFormText>Select your Leave Type</CFormText>
                  </CCol>


                </CFormGroup>


            </CCardBody>
            <CCardFooter>


            </CCardFooter>
          </CCard>

        </CCol>


      </CRow>


    </>
  )
}

export default Tables
