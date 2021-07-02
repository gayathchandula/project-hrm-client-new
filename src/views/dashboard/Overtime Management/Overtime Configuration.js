import React, { useEffect, useState} from 'react';
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
    CTabs,
    CTabContent,
    CNavItem,
    CNavLink,
    CNav,
    CTabPane,
    CFormGroup,
    CFormText,
    CCardFooter,
    CInput,
    CLabel,
    CRow,
} from '@coreui/react'



import { Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment';
import {
  useHistory
} from "react-router-dom";





const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = ['otHrsMax','otHrsMin', 'employeeType', 'otRate',{
  key: 'show_details',
  label: 'Action',

  sorter: false,
  filter: false
}]
const fields1 = ['id','HolidayInfo', 'otAllowancePercentage', 'createdAt',{
  key: 'show_details',
  label: 'Action',

  sorter: false,
  filter: false
}]

const Tables = () => {
  const [otHrsMax, setotHrsMax] = useState([]);
  const [otHrsMin, setotHrsMin] = useState([]);
  const [incharge_email, setincharge_email] = useState([]);
  const [employeeTypeId, setemployeeTypeId] = useState([]);
  const [otRate, setotRate] = useState([]);
  const [otAllowancePercentage, setotpercentage] = useState([]);
  const [SpecialDate, setdate] = useState([]);
  const [SpecialDayName, setspecial] = useState([]);
  const [HolidayInfo, setHolidayInfo] = useState([]);
  const [listData, setListData] = useState({ lists: [] });
  const [listData1, setListData1] = useState({ lists: [] });
  const [listData2, setListData2] = useState({ lists: [] });
  const [listData3, setListData3] = useState({ lists: [] });
  const orgid = localStorage.getItem("id")
  const token = localStorage.getItem("Token")
  const history = useHistory();
  const localizer = momentLocalizer(moment)
  const onChangeMax_Hours = (e) => {
    setotHrsMax(e.target.value);
  };
  const onChangedate = (e) => {
    setdate(e.target.value);
  };
  const onChangeMin_Hours = (e) => {
    setotHrsMin(e.target.value );
  };
  const onChangeemploy_type = (e) => {
    setemployeeTypeId( e.target.value );
  };
  const onChangeInchemail = (e) => {
    setincharge_email(e.target.value );
  };
  const onChangehour_rate = (e) => {
    setotRate( e.target.value );
  };
  const onChangepercentage = (e) => {

    setotpercentage( e.target.value );
  };
  const onChangespecialday = (e) => {
    setspecial( e.target.value );
  };

  const onChangeHolidayInfo = (e) => {
    setHolidayInfo( e.target.value );
  };
  const headers = {
    headers: {

      "Authorization":`Bearer ${token}`
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/overtime`,headers
      );
      setListData({ lists: result.data.data.OtDetails});
      console.log(result.data)
    };
    const fetchData1 = async () => {
        const result = await axios(
          `https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/emptypelist`,headers
        );
        setListData1({ lists: result.data.data.EmployeeTypeDetails  });
        console.log(result)
    };
    const fetchData2 = async () => {
      const result = await axios(
        `https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/overtimereference/list`,headers
      );
      setListData2({ lists: result.data.data.OTReferencesDetails  });
      console.log(result)
  };
  const fetchData3 = async () => {
    const result = await axios(
      `https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/overtimespecial/list`,headers
    );
    setListData3({ lists: result.data.data.OTspecialReferencesDetails  });
    console.log(result)
};
    fetchData();
    fetchData1();
    fetchData2();
    fetchData3();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try{
      const body = ({otHrsMax, otHrsMin,incharge_email,employeeTypeId,otRate} );
      const loginResponse = await axios.post(`https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/overtime`, body,headers);
      console.log(loginResponse);
      setotHrsMax('')
      setotHrsMin('')
      setemployeeTypeId('' )
      setincharge_email('')
      setotRate( '' )
      window.location.reload();
    } catch(err) {
      //err.response.data.message&& setErr(err.response.data.message)
    }
  };
  const submitspecial = async (e) => {
    e.preventDefault();
    try{
      const body = ({SpecialDayName, SpecialDate,} );
      const loginResponse = await axios.post(`https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/overtimespecial/create`, body,headers);
      console.log(loginResponse);
      setspecial('')
      setdate('')
      window.location.reload();
    } catch(err) {
      //err.response.data.message&& setErr(err.response.data.message)
    }
  };
  const submitspecialOt = async (e) => {
    e.preventDefault();
    try{
      const body = ({HolidayInfo, otAllowancePercentage} );
      const loginResponse = await axios.post(`https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/overtimereference/create`, body,headers);
      console.log(loginResponse);
      setHolidayInfo('')
      setotpercentage('')
      window.location.reload();
    } catch(err) {
      //err.response.data.message&& setErr(err.response.data.message)
    }
  };


  const onDelete = async (id) => {

    const Status = 1 ;
    const body = ({id,Status} );


const headers = {
    headers: {

      "Authorization":`Bearer ${token}`
    }
};

axios.post(`https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/overtime/Delete`, body, headers)
.then((res) => {
    if (res.status === 200) {
      window.location.reload();
        alert('delete success');

    }
}).catch((err) => {
    console.error(err);
    alert('Error please try again');
});
};
const onDeleteref = async (id) => {


  const body = ({id} );


const headers = {
  headers: {

    "Authorization":`Bearer ${token}`
  }
};

axios.post(`https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/overtimereference/delete`, body, headers)
.then((res) => {
  if (res.status === 200) {
    window.location.reload();
      alert('delete success');

  }
}).catch((err) => {
  console.error(err);
  alert('Error please try again');
});
};
const onUpdate = (item) => {

  history.push({pathname: '/updateot',
  state: item
})
}

const events= listData3.lists.map((appointment)=>{
  return {
    id: appointment.id,
    title: appointment.SpecialName,
    start: new Date(appointment.SpecialDate),
    end: new Date(appointment.SpecialDate),
    allDay: true
  }
})
  return (

    <>
    <CTabs activeTab="OvertimeConfiguration">
      <CNav variant="tabs">
        <CNavItem>
          <CNavLink data-tab="OvertimeConfiguration">
            Overtime Configuration
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink data-tab="SpecialDays">
            Special Days
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink data-tab="SpecialDaysOT">
            Special Days Rate
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane data-tab="OvertimeConfiguration">

        <CRow>
        <CCol xs="12" md="6">
            <CCard>
              <CCardHeader>
                Overtime Configuration Form
              </CCardHeader>
              <CCardBody>
                <CForm action="submit" method="post"  className="form-horizontal">

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Employee Type</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                   <CSelect
                  name="Countries"
                  onChange={onChangeemploy_type}
                  value={employeeTypeId}
                  >
                    {listData1.lists.map((country, key) => (
            <option key={key} value={country.id}>
              {country.Employee_type}
            </option>
          ))}
                  </CSelect>
                      <CFormText>Please Select Employee type</CFormText>
                  </CCol>
                </CFormGroup>


                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Max OT Hours</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="text-input" name="text-input" type="number" placeholder="Max OT Hours" value={otHrsMax} onChange={onChangeMax_Hours} required/>
                      <CFormText>Please Enter Max OT Hours</CFormText>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Min OT Hours</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="text-input" name="text-input" type="number"  placeholder="Min OT Hours" value={otHrsMin} onChange={onChangeMin_Hours} required/>
                      <CFormText>Please Enter Min OT Hours</CFormText>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="email-input">Email</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="email" id="email-input" name="email-input" placeholder="Enter Email" autoComplete="email" value={incharge_email} onChange={onChangeInchemail} required/>
                      <CFormText className="help-block">Please enter your email</CFormText>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input"> Hour Rate</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="text-input" name="text-input" placeholder="Hour Rate" type="number"   value={otRate} onChange={onChangehour_rate} required/>
                      <CFormText>Please Enter Hour Rate</CFormText>
                    </CCol>
                  </CFormGroup>




                </CForm>
              </CCardBody>
              <CCardFooter>
                <CButton data-testid="toggle" type="submit" size="lg" color="primary" onClick={submit}> Submit</CButton>

              </CCardFooter>
            </CCard>

          </CCol>

    </CRow>

      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
            Overtime Configuration Table
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={listData.lists}
              fields={fields}
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
                'employeeType':
                  (item) => (
                    <td> {item.employeeType.Employee_type} </td>
                  ),
                  'show_details':
          (item, index)=>{
            return (
            <tr>
              <td className="py-2">
                <CButton
                  color="danger"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={()=>{onDelete(item.id)}}

                >
                  Delete
                </CButton>
              </td>
              <td className="py-2">
                <CButton
                  color="danger"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={()=>{onUpdate(item)}}

                >
                  Update
                </CButton>
              </td>
              </tr>
            )
          }
              }}
            />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
        </CTabPane>
        <CTabPane data-tab="SpecialDays">
        <CRow>
        <CCol xs="12" md="6">
            <CCard>
              <CCardHeader>
                Special Days Overtime Configuration Form
              </CCardHeader>
              <CCardBody>
                <CForm action="submit" method="post"  className="form-horizontal">
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Special Date</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="text-input" type="date" name="text-input" placeholder="Special Date" value={SpecialDate} onChange={onChangedate} required/>
                      <CFormText>Please select Special Date</CFormText>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input"> Special Day Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                    <CSelect
                  name="Countries"
                  onChange={onChangespecialday}
                  value={SpecialDayName}
                  required
                  >
                  <option selected>Select the Day</option>
                    {listData2.lists.map((country, key) => (
            <option key={key} value={country.id}>
              {country.HolidayInfo}
            </option>
          ))}
                  </CSelect>

                      <CFormText>Please Select Hour percentage</CFormText>
                    </CCol>
                  </CFormGroup>




                </CForm>
              </CCardBody>
              <CCardFooter>
                <CButton type="submit" size="lg" color="primary" onClick={submitspecial}> Submit</CButton>

              </CCardFooter>
            </CCard>

          </CCol>

    </CRow>

      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
            Overtime Configuration Table
            </CCardHeader>
            <CCardBody>
            <Calendar
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        views={['month', 'day', 'week']}
        style={{height: 450}}
        />

            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
        </CTabPane>
        <CTabPane data-tab="SpecialDaysOT">
        <CRow>
        <CCol xs="12" md="6">
            <CCard>
              <CCardHeader>
                Special Days Overtime Configuration Form
              </CCardHeader>
              <CCardBody>
                <CForm action="submit" method="post"  className="form-horizontal">
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Special Day</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <CInput id="text-input" name="text-input" placeholder="Special Day Name" value={HolidayInfo} onChange={onChangeHolidayInfo} required/>
                      <CFormText>Please Select Special Day</CFormText>
                  </CCol>
                </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input"> Hour Rate Percentage</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                    <CSelect onChange={onChangepercentage} value={otAllowancePercentage} required>
                      <option selected>Select the percentage</option>
                      <option value="1">1</option>
                      <option value="1.5">1.5</option>
                      <option value="2">2</option>
                    </CSelect>
                      <CFormText>Please Select Hour percentage</CFormText>
                    </CCol>
                  </CFormGroup>
                </CForm>
              </CCardBody>
              <CCardFooter>
                <CButton type="submit" size="lg" color="primary" onClick={submitspecialOt}> Submit</CButton>

              </CCardFooter>
            </CCard>

          </CCol>

    </CRow>

      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
            Overtime Configuration Table
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={listData2.lists}
              fields={fields1}
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
                  'show_details':
          (item, index)=>{
            return (

              <td className="py-2">
                <CButton
                  color="danger"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={()=>{onDeleteref(item.id)}}

                >
                  Delete
                </CButton>
              </td>
            )
          },
          'createdAt':
                  (item) => (
                    <td> {moment(item.createdAt).format("MMM Do YY")} </td>
                  )
              }}
            />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
        </CTabPane>
      </CTabContent>
    </CTabs>


    </>
  )
}

export default Tables
