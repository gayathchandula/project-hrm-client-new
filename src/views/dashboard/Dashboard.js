import React, { lazy } from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CHeaderNavLink,
  CCol,
  CProgress,
  CRow
} from '@coreui/react'
import {
  CChartBar,
  CChartPie
} from '@coreui/react-chartjs'
import { DocsLink } from 'src/reusable'
import CIcon from '@coreui/icons-react'



const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

const Dashboard = () => {

  return (
    <>
      <WidgetsDropdown />


      {/*<CRow>*/}
      {/*  <CCol  xs="12" md="6" >*/}
      {/*    <CCard>*/}
      {/*      <CCardHeader>*/}
      {/*        Over Time*/}
      {/*      </CCardHeader>*/}

      {/*      <CCardBody>*/}
      {/*        <CHeaderNavLink to="/Chartsot">View More Details</CHeaderNavLink>*/}
      {/*        <CChartBar*/}
      {/*          datasets={[*/}
      {/*            {*/}
      {/*              label: 'Hours',*/}
      {/*              backgroundColor: '#f87979',*/}
      {/*              data: [40, 20, 12, 39, 10, 0, 39, 0, 0, 20, 12, 11]*/}
      {/*            }*/}
      {/*          ]}*/}
      {/*          labels="months"*/}
      {/*          options={{*/}
      {/*            tooltips: {*/}
      {/*              enabled: true*/}
      {/*            }*/}
      {/*          }}*/}
      {/*        />*/}
      {/*      </CCardBody>*/}
      {/*    </CCard>*/}
      {/*  </CCol>*/}
      {/*  <CCol>*/}
      {/*    <CCard>*/}
      {/*      <CCardHeader>*/}
      {/*        Leaves*/}
      {/*      </CCardHeader>*/}
      {/*      <CCardBody>*/}
      {/*        <CHeaderNavLink to="/Chartsleave">View More Details</CHeaderNavLink>*/}
      {/*        <CRow>*/}
      {/*          <CCol xs="12" md="6" xl="6">*/}



      {/*            <hr className="mt-0" />*/}

      {/*            <div className="progress-group mb-4">*/}
      {/*              <div className="progress-group-header">*/}
      {/*                <CIcon className="progress-group-icon" name="cil-user" />*/}
      {/*                <span className="title">Male</span>*/}
      {/*                <span className="ml-auto font-weight-bold">43%</span>*/}
      {/*              </div>*/}
      {/*              <div className="progress-group-bars">*/}
      {/*                <CProgress className="progress-xs" color="info" value="43" />*/}
      {/*              </div>*/}
      {/*            </div>*/}
      {/*            <div className="progress-group mb-5">*/}
      {/*              <div className="progress-group-header">*/}
      {/*                <CIcon className="progress-group-icon" name="cil-user-female" />*/}
      {/*                <span className="title">Female</span>*/}
      {/*                <span className="ml-auto font-weight-bold">37%</span>*/}
      {/*              </div>*/}
      {/*              <div className="progress-group-bars">*/}
      {/*                <CProgress className="progress-xs" color="success" value="37" />*/}
      {/*              </div>*/}
      {/*            </div>*/}



      {/*          </CCol>*/}
      {/*        </CRow>*/}

      {/*      </CCardBody>*/}

      {/*    </CCard>*/}
      {/*  </CCol>*/}
      {/*</CRow>*/}






    </>
  )
}

export default Dashboard
