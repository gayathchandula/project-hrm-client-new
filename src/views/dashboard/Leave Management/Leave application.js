import React, { useState, useEffect } from 'react';
import axios from "axios";
import {Link,useHistory } from 'react-router-dom';
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
  CSpinner,
    CLabel,
    CRow,
} from '@coreui/react'
import { DocsLink } from 'src/reusable'

import usersData from '../../users/UsersData'

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = ['Leave Type','No of days', 'Date', 'Requested Date','Status', {
  key: 'show_details',
  label: 'Action',

  sorter: false,
  filter: false
}]

const Tables = () => {
  const [LeaveTypeId, setLeaveTypeId] = useState("");
    const [Reason, setReason] = useState("");
    const [Date, setDate] = useState("");
    const [employeeTypeId, setemployeeTypeId] = useState("");
    const [epf, setepf] = useState("");
    const [listData, setListData] = useState({ lists: [] });
  const [listData1, setListData1] = useState({ lists: [] });
  const [listData2, setListData2] = useState({ lists: [] });
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
    const onChangeemployeeTypeId = (e) => {
        setemployeeTypeId( e.target.value );
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


        const body = ({ epf,LeaveTypeId,Reason,Date,employeeTypeId,numberOfDays} );


    const headers = {
        headers: {

          "Authorization":`Bearer ${token}`
        }
    };

    axios.post(`https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/leaveRequests/create`, body, headers)
    .then((res) => {
        if (res.status === 200) {
          window.location.reload();
            alert('upload success');
        }
    }).catch((err) => {
        console.error(err);
        alert('Error please try again');
    });
    };

    const onDelete = async (rfid) => {


      const body = ({rfid} );


  const headers = {
      headers: {

        "Authorization":`Bearer ${token}`
      }
  };

  axios.post(`https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/employeeslist/delete`, body, headers)
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
                <CForm action="submit" method="post"  className="form-horizontal">



                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input"> Employee EPF No: </CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="text-input" name="text-input" placeholder="EPF No:" value={epf} onChange={onChangeepf}/>
                      <CFormText>Please Enter Epf No:</CFormText>
                    </CCol>
                  </CFormGroup>
  <br></br>
    <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Leave Type</CLabel>
                  </CCol>
                  <CCol>
                  <CSelect
                  name="Countries"
                  onChange={onChangeLeaveTypeId}
                  value={LeaveTypeId}
                  >
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
                      <CInput id="text-input" name="text-input" placeholder="Reason" value={Reason} onChange={onChangeReason}/>
                      <CFormText>Please Enter Reason</CFormText>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Date</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="text-input" type="date" name="text-input" placeholder="Special Date" value={Date} onChange={onChangeDate} />
                      <CFormText>Please select Date</CFormText>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input"> Hour Rate Percentage</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                    <CSelect onChange={onChangenumberOfDays} value={numberOfDays}>
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
                <CButton type="submit" size="lg" color="primary" onClick={onSubmit}> Submit Request</CButton>

              </CCardFooter>
            </CCard>

          </CCol>


    </CRow>

      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              My Leaves
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

              <td className="py-2">
                <CButton
                  color="danger"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={()=>{onDelete(item.rfid)}}

                >
                  Delete
                </CButton>
              </td>
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
