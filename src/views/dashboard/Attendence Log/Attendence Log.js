import React, { useEffect, useState}  from 'react';
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CSpinner,
  CRow
} from '@coreui/react'
import axios from 'axios';
import moment from 'moment';

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = [{
  key: "id",
  label: "ID"
},{
  key: "firstName",
  label: "First Name"
},{
  key: "lastName",
  label: "Last Name"
},{
  key: "createdAt",
  label: "Time"
},{
  key: "entry",
  label: "status"
},{
  key: "temperature",
  label: "Temperature"
},'shiftName']

const Tables = () => {
  const [listData, setListData] = useState({ lists: [] });
  const token = localStorage.getItem("Token")
  const orgid = localStorage.getItem("id")
  const [loading, setLoading] = useState(true);

  const headers = {
    headers: {

      "Authorization":`Bearer ${token}`
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
          `https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/movements`,headers
      );
      setListData({ lists: result.data.data.movementLogs});
      setLoading(false);
      console.log(result.data.data.movementLogs)
    };
    fetchData();
  }, []);
   if (loading) {
    return (
      <div style={{ padding: "10px 20px", textAlign: "center"}}>
    <CSpinner />
    </div>
    )
  }
  return (
    <>

      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Attendence Table
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={listData.lists}
              fields={fields}
              columnFilter
              hover
              striped
              bordered
              size="sm"
              itemsPerPage={20}
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
                'firstName':
                  (item) => (
                    <td> {item.employee.firstName} </td>
                  ),
                'lastName':
                  (item) => (
                    <td> {item.employee.lastName} </td>
                  ),
                'entry':
                  (item) => (
                    <td> {item.status.name} </td>
                  ),
                'id':
                  (item) => (
                    <td> {item.employee.id} </td>
                  ),
                'temperature':
                  (item) => (
                    <td> {item.temperature} </td>
                  ),
                  'createdAt':
                  (item) => (
                    <td> {moment(item.createdAt).format("MMM Do YY, h:mm:ss a")} </td>
                  ),


              }}
            >

            </CDataTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

    </>
  )
}

export default Tables
