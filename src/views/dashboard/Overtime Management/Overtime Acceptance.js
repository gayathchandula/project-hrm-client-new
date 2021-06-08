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
  CRow, CAlert
} from '@coreui/react'


const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = ['id','employeeId','employeeTypeId','shiftId','OTHrs',{
  key: 'show_details',
  label: 'Action',

  sorter: false,
  filter: false
}]

const Tables = () => {
  const [listData, setListData] = useState({ lists: [] });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState();
  const token = localStorage.getItem("Token")
  const orgid = localStorage.getItem("id")
  const headers = {
    headers: {

      "Authorization":`Bearer ${token}`
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/movements/pendingOT`,headers
      );
      setListData({ lists: result.data.data.allPendingDetails });
      setLoading(false);
    };
    fetchData();
  }, []);

  const Submit = async (OTLogId) => {
    const reviewStatus = 1 ;
    //setstatus('accept');
    setErr("");
    try{
      const body = ({reviewStatus,OTLogId});
      const loginResponse = await axios.post(`https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/overtime/update`, body,headers);
      console.log(loginResponse);
      window.location.reload();

    } catch(err) {
      err.response.data.message && setErr(err.response.data.message)
    }

  };
  const SubmitDecline = async (OTLogId) => {
    const reviewStatus = 2 ;
    //setstatus('accept');
    setErr("");
    try{
      const body = ({reviewStatus,OTLogId});
      const loginResponse = await axios.post(`https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/overtime/update`, body,headers);
      console.log(loginResponse);
      window.location.reload();

    } catch(err) {
      err.response.data.message && setErr(err.response.data.message)
    }

  };

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
              Overtime Acceptance Table
            </CCardHeader>
            <CCardBody>
              {err ? (
                <CAlert color="info" closeButton Time={5}>
                  {err}
                </CAlert>
              ) : null}
              <CDataTable
                items={listData.lists}
                fields={fields}
                columnFilter
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
                              color="success"
                              variant="outline"
                              shape="square"
                              size="sm"
                              onClick={()=>{Submit(item.id)}}

                            >
                              Accept
                            </CButton>
                          </td>
                          <td className="py-2">
                            <CButton
                              color="danger"
                              variant="outline"
                              shape="square"
                              size="sm"
                              onClick={()=>{SubmitDecline(item.id)}}

                            >
                              Decline
                            </CButton>
                          </td>
                        </tr>
                      )
                    },
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
