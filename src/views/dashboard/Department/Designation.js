import React, { useState, useEffect } from 'react';
import axios from "axios";
import CreatableSelect from 'react-select/creatable';
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
  CLabel,
  CRow,
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
  const [Designation, setDesignation] = useState("");
  const [Department, setDepartment] = useState("");
  const [listData, setListData] = useState({ lists: [] });

  const orgid = localStorage.getItem("id")
  const components = {
    DropdownIndicator: null,
  };
  const onChangeDepartment = (e) => {
    setDepartment( e.target.value );
  };

  const handleChange = (newValue: any, actionMeta: any) => {
    console.group('Value Changed');
    console.log(newValue);
    setDesignation( newValue );
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();

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
      console.log(result)
    };


    fetchData();


  }, []);
  const onSubmit = async (data) => {


    const body = ({Department,Designation} );
    axios.defaults.baseURL = "https://hrm-innovigent.herokuapp.com/api/v1";



    axios.post(`/organizations/${orgid}/employeetypes`, body, headers)
      .then((res) => {
        if (res.status === 200) {
          alert('upload success');
        }
      }).catch((err) => {
      console.error(err);
      alert('Error please try again');
    });
  };
  const onDelete = async (id) => {


    const body = ({id} );




    axios.post(`https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/delete`, body, headers)
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

  return (

    <>
      <CRow>
        <CCol xs="12" >
          <CCard>
            <CCardHeader align='center'>
              <b> Add Department</b>
            </CCardHeader>
            <CCardBody>
              <CForm action="submit" method="post"  className="form-horizontal">


                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Department Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="6">
                    <CInput id="text-input" name="text-input" placeholder="Employee Type Name" value={Department} onChange={onChangeDepartment}/>
                    <CFormText>Enter New Department</CFormText>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Designation</CLabel>
                  </CCol>
                  <CCol xs="12" md="6">
                    <CreatableSelect
                      isMulti
                      onChange={handleChange}

                      placeholder="Type Designation and press enter..."
                      components={components}
                    />
                    <CFormText>Enter New Designation</CFormText>
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
              Department Table
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
