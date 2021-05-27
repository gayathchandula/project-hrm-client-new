import React, { useState, useEffect,useContext } from 'react';
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
  CSelect,
  CFormGroup,
  CFormText,
  CCardFooter,
  CInput,
  CInputFile,
  CLabel,
  CRow, CAlert,
} from '@coreui/react'
import { DocsLink } from 'src/reusable'

import usersData from '../../users/UsersData'
import moment from 'moment';
import UserContext from '../../../userContext';
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
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [designationName, setDesignation] = useState("");
  const [departmentName, setDepartment] = useState("");
  const [Employee_type, setEmployee_type] = useState("");
  const [rfid, setrfid] = useState("");
  const [err, setErr] = useState();
  const [listData, setListData] = useState({ lists: [] });
  const { userData, setUserData } = useContext(UserContext);
  const orgid = localStorage.getItem("id")
  const components = {
    DropdownIndicator: null,
  };
   const onChangeDepartment = (e) => {
    setDepartment( e.target.value );
  };
  const onChangeDesignation = (e) => {
    //setDesignation( e.target.value );

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

    setErr("");
    const body = ({departmentName,designationName} );
    axios.defaults.baseURL = "https://hrm-innovigent.herokuapp.com/api/v1";

    const headers = {
      headers: {

        "Authorization":`Bearer ${token}`
      }
    };

    axios.post(`/organizations/${orgid}/department/create`, body, headers)
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

  return (

    <>
      <CRow>
        <CCol xs="12" >
          <CCard>
            <CCardHeader align='center'>
              <b> Add Department</b>
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
                    <CLabel htmlFor="text-input">Department Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="6">
                    <CInput id="text-input" name="text-input" placeholder="Employee Type Name" value={departmentName} onChange={onChangeDepartment}/>
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
