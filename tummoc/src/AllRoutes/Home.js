import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { CheckAuth } from '../Redux/actions/auth.actions'
export default function Home() {
    const auth = useSelector(s => s.auth)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!auth.isAuth) {
            dispatch(CheckAuth())
        }
    }, [auth.isAuth])
    return (
        <div>Home</div>
    )
}
