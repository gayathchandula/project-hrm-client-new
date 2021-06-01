import React, { useState, useEffect } from 'react';
import axios from "axios";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CButton,
  CForm,
  CFormGroup,
  CFormText,
  CCardFooter,
  CInput,
  CSpinner,
  CLabel,
  CRow, CAlert,
} from '@coreui/react'
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
const fields = ['id','Employee_type', 'createdAt', 'updatedAt', {
  key: 'show_details',
  label: 'Action',

  sorter: false,
  filter: false
}]

const Tables = () => {
    const [Employee_type, setEmployee_type] = useState("");
    const [err, setErr] = useState();
    const [listData, setListData] = useState({ lists: [] });
  const [loading, setLoading] = useState(true);
    const orgid = localStorage.getItem("id")

    const onChangeemployeeTypeId = (e) => {
        setEmployee_type( e.target.value );
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
          `https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/emptypelist`,headers
        );
        setListData({ lists: result.data.data.EmployeeTypeDetails });
         setLoading(false);
        console.log(result)
    };


      fetchData();


  }, []);
    const onSubmit = async (data) => {
      setErr("");

        const body = ({Employee_type} );
    axios.defaults.baseURL = "https://hrm-innovigent.herokuapp.com/api/v1";

    const headers = {
        headers: {

          "Authorization":`Bearer ${token}`
        }
    };

    axios.post(`/organizations/${orgid}/employeetypes`, body, headers)
    .then((res) => {
        if (res.status === 200) {
            alert('upload success');
        }
    }).catch((err) => {
        console.error(err);
      err.response.data.message && setErr(err.response.data.message)
    });
    };

    const onDelete = async (id) => {

      setErr("");
      const body = ({id} );


  const headers = {
      headers: {

        "Authorization":`Bearer ${token}`
      }
  };

  axios.post(`https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/delete`, body, headers)
  .then((res) => {
      if (res.status === 200) {
        window.location.reload();
          alert('delete success');
      }
  }).catch((err) => {
      console.error(err);
    err.response.data.message && setErr(err.response.data.message)
  });
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
        <CCol xs="12" >
            <CCard>
              <CCardHeader align='center'>
              <b> Add Employee Type</b>
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
                      <CLabel htmlFor="text-input">Employee Type</CLabel>
                    </CCol>
                    <CCol xs="12" md="6">
                      <CInput id="text-input" name="text-input" placeholder="Employee Type Name" value={Employee_type} onChange={onChangeemployeeTypeId}/>
                      <CFormText>Enter New Employee Type</CFormText>
                    </CCol>
                  </CFormGroup>



                </CForm>
              </CCardBody>
              <CCardFooter>
                <CButton type="submit"  size="lg" color="primary" onClick={onSubmit}> Submit</CButton>

              </CCardFooter>
            </CCard>

          </CCol>

    </CRow>
    <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Employee Type Table
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
                  'createdAt':
                  (item) => (
                    <td> {moment(item.createdAt).format("MMM Do YY")} </td>
                  ),
                  'updatedAt':
                  (item) => (
                    <td> {moment(item.updatedAt).format("MMM Do YY")} </td>
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
                  onClick={()=>{onDelete(item.id)}}

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
