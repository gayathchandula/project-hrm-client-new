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
    CFormGroup,
    CFormText,
    CCardFooter,
    CInput,
    CLabel,
    CRow,
} from '@coreui/react'

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
const fields = ['shiftName','start_time', 'end_time', 'ot_startTime', {
  key: 'show_details',
  label: 'Action',

  sorter: false,
  filter: false
}]

const Tables = () => {
  const [ot_startTime, setot_startTime] = useState([]);;
  const [shiftName, setshiftName] = useState([]);
  const [start_time, setstart_time] = useState([]);
  const [end_time, setend_time] = useState([]);
  const [listData, setListData] = useState({ lists: [] });
  const history = useHistory();
  const orgid = localStorage.getItem("id")



  const onChangeshiftName = (e) => {
    setshiftName(e.target.value);
  };
  const onChangestart_time = (e) => {
    setstart_time(e.target.value );
  };
  const onChangeend_time = (e) => {
    setend_time( e.target.value );
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

    const fetchData = async () => {
      const result = await axios(
        `https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/shifttypes`,headers
      );

      setListData({ lists: result.data.data.shiftDetails});


    };

    fetchData();

  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try{
      const body = ({shiftName, start_time,end_time,ot_startTime} );
      const loginResponse = await axios.post(`https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/shift`, body,headers);
      console.log(loginResponse);
      setshiftName('')
      setstart_time('')
      setend_time('' )
      setot_startTime('')
      window.location.reload();

    } catch(err) {
      //err.response.data.message&& setErr(err.response.data.message)
    }
  };

  const onDelete = async (id) => {


    const body = ({id} );


const headers = {
    headers: {

      "Authorization":`Bearer ${token}`
    }
};

axios.post(`https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/shift/Delete`, body, headers)
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

  history.push({pathname: '/updateshift',
  state: item
})
}
  return (

    <>
    <CRow>
        <CCol xs="12" md="6">
            <CCard>
              <CCardHeader>
              Shift Configuration Form
              </CCardHeader>
              <CCardBody>
                <CForm action="submit" method="post" className="form-horizontal">

                <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Shift Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="text-input" name="text-input" placeholder="Shift Name" value={shiftName} onChange={onChangeshiftName}/>
                      <CFormText>Please Enter Shift Name</CFormText>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="start-time-input">Shift Start Time</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="time" id="start-time-input" name="start-time-input" placeholder="start Time" value={start_time} onChange={onChangestart_time} />
                    <CFormText>Please Select Shift Start Time</CFormText>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="end-time-input">Shift End Time</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="time" id="end-time-input" name="end-time-input" placeholder="End Time" value={end_time} onChange={onChangeend_time} />
                    <CFormText>Please Select Shift End Time</CFormText>
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
                    <CFormText>Select OT Start Time</CFormText>
                  </CCol>
                </CFormGroup>

                </CForm>
              </CCardBody>
              <CCardFooter>
                <CButton type="submit" size="lg" color="primary" onClick={submit}> Submit</CButton>

              </CCardFooter>
            </CCard>

          </CCol>

    </CRow>

      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
            Shift Configuration Table
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

    </>
  )
}

export default Tables
