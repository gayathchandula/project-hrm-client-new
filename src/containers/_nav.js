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
    name: 'Attendence Log',
    to: '/attendence',
    icon: <CIcon name="cil-pencil" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
    }
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Employee Management',
    route: '/Employee',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Employee',
        to: '/Employee',
        icon: 'cil-chart-pie',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Employee Type',
        to: '/AddEmployeeType',
        icon: 'cil-star',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Department',
        to: '/Department',
        icon: <CIcon name="cil-puzzle"
                     customClasses="c-sidebar-nav-icon"/>,
        badge: {
          color: 'info',
        }
      },
    ],
  },

  {
    _tag: 'CSidebarNavItem',
    name: 'Admin',
    to: '/Admin',
    icon: <CIcon name="cil-cursor" customClasses="c-sidebar-nav-icon"/>,
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
    name: 'Over Time Management',
    route: '/Overtime logs',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Overtime Logs',
        to: '/Overtime logs',
        icon: 'cil-chart-pie',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Overtime Configuration',
        to: '/Overtime Configuration',
        icon: 'cil-star',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Overtime Acceptance',
        to: '/Overtime Acceptance',
        icon: 'cil-bell',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Shift Configuration',
        to: '/Shift Configuration',
        icon: 'cil-calculator',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Leave Management',
    route: '/buttons',
    icon: 'cil-cursor',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Leave Logs',
        to: '/leavelogs',
        icon: 'cil-pencil',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Leave Types',
        to: '/Leave Types',
        icon: 'cil-pencil',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Leave Swaps',
        to: '/Leaveswap',
        icon: 'cil-pencil',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Leave Configuration',
        to: '/Leave Configuration',
        icon: 'cil-calculator',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Leave Acceptance',
        to: '/Leave Acceptance',
        icon: 'cil-calculator',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Leave Application(employee)',
        to: '/Leave Application',
        icon: 'cil-cursor',
      },
    ],
  },


]

export default _nav
