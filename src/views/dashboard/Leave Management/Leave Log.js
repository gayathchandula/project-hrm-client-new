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
  CRow
} from '@coreui/react'


const getBadge = reviewstatusId => {
  switch (reviewstatusId) {
    case 1 : return 'success'
    case 2 : return 'danger'
    case 3 : return 'warning'

    default: return 'primary'
  }
}
const changestatus = reviewstatusId => {
  switch (reviewstatusId) {
    case 1 : return "Approved"
    case 2 : return 'Declined'
    case 3 : return 'Pending'

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

  const [listData1, setListData1] = useState({ lists: [] });
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("Token")
  const orgid = localStorage.getItem("id")
  const headers = {
    headers: {

      "Authorization":`Bearer ${token}`
    }
  };

  useEffect(() => {

    const fetchData1 = async () => {
      const result = await axios.get(
        `https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/leaveRequests/list`,headers
      );
      setListData1({ lists: result.data.data.leaveRequestDetails });
      setLoading(false);
    };

    fetchData1();
  }, []);




  if (loading) {
    return <CSpinner />
  }
  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Leave  Table
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={listData1.lists}
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
                  'reviewstatusId':
                    (item)=>(
                      <td>
                        <CBadge color={getBadge(item.reviewstatusId)}>
                          {changestatus(item.reviewstatusId)}
                        </CBadge>
                      </td>
                    ),
                  'leavetype':
                    (item) => (
                      <td> {item.leavetypes.LeaveTypeName} </td>
                    )
                }}

              ></CDataTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Tables
