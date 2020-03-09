import React from 'react'
import authorizedOnly from '../decorators/authorizedOnly'

const Dashboard = () => <h1>Dashboard</h1>

export default authorizedOnly(Dashboard)
