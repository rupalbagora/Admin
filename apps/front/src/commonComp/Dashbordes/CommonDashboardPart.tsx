import React from 'react'
import CopyReferralLink from '../ReffrenceLink/CopyReferralLink'
import { useAppSelector } from '../../redux/hooks'

const  CommonDashboardPart:React.FC=()=> {
    const {user}=useAppSelector((state)=>state.auth)
  return (
    <div>SuperUserDeshboard
       <CopyReferralLink userId={user?._id as string}/> 
    </div>
  )
}

export default CommonDashboardPart;