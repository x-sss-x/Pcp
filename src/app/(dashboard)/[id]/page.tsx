"use client"
import React from 'react'
import {useParams} from "next/navigation"

export default function ViewPost() {
  const params = useParams()

  console.log(params)

  return (
    <div>Viewing post {params.id}</div>
  )
}
