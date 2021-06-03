import React, {useState} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormGroup,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInput,
 CAlert
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from "axios";


const Changepassword = () => {

  const orgid = localStorage.getItem("id")
  const token = localStorage.getItem("Token")
  const [oldpassword, setoldpassword] = useState();
  const [newpassword, setnewpassword] = useState();
  const [err, setErr] = useState();
  const [confirmNewpassword, setconfirmNewpassword] = useState();
  const onChangeoldpassword = (e) => {
    setoldpassword(e.target.value );
  };
  const onChangenewpassword = (e) => {
    setnewpassword(e.target.value );
  };
  const onChangeconfirmNewpassword = (e) => {
    setconfirmNewpassword(e.target.value );
  };
  const onSubmit = async (data) => {

    setErr("");
    const body = ({oldpassword,newpassword,confirmNewpassword});


    const headers = {
      headers: {

        "Authorization":`Bearer ${token}`
      }
    };

    axios.post(`https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/users/changepassword`, body, headers)
      .then((res) => {
        if (res.status === 200) {
          alert('upload success');
        }
      }).catch((err) => {
      console.error(err);
      err.response.data.message && setErr(err.response.data.message)
    });
  };

  return (
    <>


      <hr/>

      <CCard>
        <CCardHeader>
        <b> CHANGE PASSWORD</b>
        </CCardHeader>
        <CCardBody>
          {err ? (
            <CAlert color="info" closeButton fade={5}>
              {err}
            </CAlert>
          ) : null}
           <CForm action="" method="post">
           <CFormGroup>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText><CIcon name="cil-asterisk" /></CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" id="oldpassword" name="oldpassword" value={oldpassword} placeholder="type old Password" autoComplete="current-password" onChange={onChangeoldpassword}/>
                  </CInputGroup>
                </CFormGroup>

                <CFormGroup>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText><CIcon name="cil-asterisk" /></CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" id="newpassword" name="newpassword" value={newpassword} onChange={onChangenewpassword}  placeholder="enter new Password" autoComplete="current-password"/>
                  </CInputGroup>
                </CFormGroup>

                <CFormGroup>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText><CIcon name="cil-asterisk" /></CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" id="confirmNewpassword" name="confirmNewpassword" value={confirmNewpassword} onChange={onChangeconfirmNewpassword}  placeholder="re enter Password" autoComplete="current-password"/>
                  </CInputGroup>
                </CFormGroup>
                <CFormGroup className="form-actions">
                  <CButton  size="lg" color="success" onClick={onSubmit}>Submit</CButton>
                </CFormGroup>
              </CForm>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Changepassword;
