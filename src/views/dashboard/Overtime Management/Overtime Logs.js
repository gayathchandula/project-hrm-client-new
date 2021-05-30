import React, { useEffect, useState,useContext} from 'react';
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
import { DocsLink } from 'src/reusable'
import axios from 'axios';
import usersData from '../../users/UsersData'
import moment from 'moment';
import UserContext from '../../../userContext';

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
const fields = ['createdAt','employeeId',{
  key: "firstName",
  label: "First Name"
},'shiftId','OTHrs','OTDayRate',{
  key: 'reviewstatusId',
  label: 'Review Status',

  sorter: false,
  filter: false
}]

const Tables = () => {
  const [listData, setListData] = useState({ lists: [] });
   const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("Token")
  const orgid = localStorage.getItem("id")
  const { userData, setUserData } = useContext(UserContext);
  const headers = {
    headers: {

      "Authorization":`Bearer ${token}`
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/overtime/all`,headers
      );
      setListData({ lists: result.data.data.allOTDetails });
      setLoading(false);
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
              Overtime Log Table
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
                'reviewstatusId':
                  (item)=>(
                    <td>
                      <CBadge color={getBadge(item.reviewstatusId)}>
                      {changestatus(item.reviewstatusId)}
                      </CBadge>
                    </td>
                  ),
                  'createdAt':
                  (item) => (
                    <td> {moment(item.createdAt).format("MMM Do YY")} </td>
                  ),
                'firstName':
                  (item) => (
                    <td> {item.employee.firstName} </td>
                  )

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
