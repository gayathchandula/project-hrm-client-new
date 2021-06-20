import React, { useEffect, useState} from "react";
import axios from "axios";
import moment from 'moment';
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
import CreatableSelect from "react-select/creatable/dist/react-select.esm";

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
const Tables = ({ value,options  }) => {

  const [leaveRequestedDate, setDate] = useState("");
  const [err, setErr] = useState();
  const [employees,setemployees] = useState([]);
  const [swapDate,setswapDate] = useState();
  const [expireDate,setexpireDate] = useState();
  const [listData, setListData] = useState({ lists: [] });
  const [loading, setLoading] = useState(true);
  const [numberOfDays, setnumberOfDays] = useState("");


  const onChangesetswapDate = (e) => {
    setswapDate( e.target.value );
  };
  const onChangenumberOfDays = (e) => {
    setnumberOfDays( e.target.value );
  };
  const onChangeexpireDate = (e) => {
    setexpireDate( e.target.value );
  };
  const onPriceChange = (index, e) => {

    //var employees = this.state.employees.slice()
    employees[index] = e.target.value;
    setemployees( employees);

  }
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
        `https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/authswaps/get`,headers
      );
      setListData({ lists: result.data.data.findAuthorizedShiftSwaps });
      setLoading(false);
      //console.log(result)
    };


      fetchData()
    test()

  }, []);

  const components = {
    DropdownIndicator: null,
    //props => <components.Input {...props} maxLength={2} />;
  };
  const maxOptions = 2;
  const handleChange = (newValue: any, actionMeta: any) => {
    //console.group('Value Changed');
    //console.log(newValue);
    setemployees( newValue );
    console.log(`action: ${actionMeta.action}`);
    //console.groupEnd();

  };


  function test () {


    let newDate = moment(new Date()).format("MMM Do YY");
    setInterval(function () {
      {listData.lists.find((country, key) => {
        if(country.expireDate === newDate)
        {
          try {
            const body = (country.employees);
            const loginResponse = axios.post(`https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/authswaps/update`, body, headers);
            console.log(loginResponse);

          } catch (err) {
            //err.response.data.message && setErr(err.response.data.message)
          }
        }
      }
      )}
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

  const onSubmit = async () => {
    setErr("");
    try{
      const body = ({employees,swapDate,expireDate});
      const loginResponse = await axios.post(`https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/authswaps/create`, body,headers);
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
                    <CInput isMulti id="text-input" name="text-input" type="number" placeholder="EPF No:"  onChange={onPriceChange.bind(this, 0)} required/>
                    <CFormText>Please Enter Epf No:</CFormText>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input"> Employee EPF No: </CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput isMulti id="text-input" name="text-input" type="number" placeholder="EPF No:"   onChange={onPriceChange.bind(this, 1)} required/>
                    <CFormText>Please Enter Epf No:</CFormText>
                  </CCol>
                </CFormGroup>

                {/*<CFormGroup row>*/}
                {/*  <CCol md="3">*/}
                {/*    <CLabel htmlFor="text-input">Employee EPF No:</CLabel>*/}
                {/*  </CCol>*/}
                {/*  <CCol xs="12" md="6">*/}
                {/*    <CreatableSelect*/}
                {/*      isMulti*/}
                {/*      onChange={handleChange}*/}
                {/*      options={employees.length === maxOptions ? [] : options}*/}
                {/*       noOptionsMessage={() => {*/}
                {/*         return employees.length === maxOptions ? 'You have reached the max options value' : 'No options available' ;*/}
                {/*       }}*/}
                {/*      // inputProps ={*/}
                {/*      //   (employees.length <= maxOptions ? employees : 'You have reached the max options value')*/}
                {/*      // }*/}
                {/*      placeholder="Type EPF no and press enter..."*/}
                {/*      components={components}*/}
                {/*    />*/}
                {/*    <CFormText>Enter Employee EPF No</CFormText>*/}
                {/*  </CCol>*/}
                {/*</CFormGroup>*/}


                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input"> Swap Date </CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="text-input" name="date" type="date"  value={swapDate} onChange={onChangesetswapDate} required/>
                    <CFormText>Please select:</CFormText>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input"> Expire Date </CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="text-input" name="date" type="date"  value={expireDate} onChange={onChangeexpireDate} required/>
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
            {listData.lists.map((view, key) => (
              <CCardBody>


              </CCardBody>
            ))}
            <CCardFooter>


            </CCardFooter>
          </CCard>

        </CCol>


      </CRow>


    </>
  )
}

export default Tables
