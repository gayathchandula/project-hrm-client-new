import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
    }
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Company Calender',
    to: '/Companycalender',
    icon: <CIcon name="cil-calendar" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
    }
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Admin',
    to: '/Admin',
    icon: <CIcon name="cil-shield-alt" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
    }
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Admin']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Attendance Management',
    icon: 'cil-group-plus',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'RFID check',
        to: '/',
        icon: <CIcon name="cil-address-card" customClasses="c-sidebar-nav-icon"/>,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Attendence Log',
        to: '/attendence',
        icon: <CIcon name="cil-address-book" customClasses="c-sidebar-nav-icon"/>,
      }
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Shift Management',
    icon: 'cil-loop-circular',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Shift Configuration',
        to: '/Shift Configuration',
        icon: 'cil-settings',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Shift Swaps',
        to: '/Leaveswap',
        icon: 'cil-loop-circular',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Employee Management',
    route: '/Employee',
    icon: 'cil-people',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Employee',
        to: '/Employee',
        icon: 'cil-people',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Employee Type',
        to: '/AddEmployeeType',
        icon: 'cil-user-secret',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Department',
        to: '/Department',
        icon: <CIcon name="cil-shield"
                     customClasses="c-sidebar-nav-icon"/>,
        badge: {
          color: 'info',
        }
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Over Time Management',
    icon: 'cis-timer',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Overtime Logs',
        to: '/Overtime logs',
        icon: 'cis-book',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Overtime Configuration',
        to: '/Overtime Configuration',
        icon: 'cil-settings-alt',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Overtime Acceptance',
        to: '/Overtime Acceptance',
        icon: 'cil-folder-arrow-right',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Leave Management',
    route: '/buttons',
    icon: 'cis-people-minus',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Leave Logs',
        to: '/leavelogs',
        icon: 'cis-book',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Leave Types',
        to: '/Leave Types',
        icon: 'cil-user-secret',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Leave Configuration',
        to: '/Leave Configuration',
        icon: 'cil-settings-alt',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Leave Acceptance',
        to: '/Leave Acceptance',
        icon: 'cil-folder-arrow-right',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'UnAuthorized Leaves',
        to: '/Unauthleave',
        icon: 'cid-people-x',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Leave Application(employee)',
        to: '/Leave Application',
        icon: 'cid-applications',
      },
    ],
  },


]

export default _nav
