import React from 'react'
import styled, {keyframes} from 'styled-components'
import { tokens } from '../styles/tokens'

const shimmer = keyframes`
  0%{background-position:-200px 0}
  100%{background-position:200px 0}
`

const Box = styled.div`
  background: linear-gradient(90deg,#f3f4f6 25%, #e6eef8 37%, #f3f4f6 63%);
  background-size:400px 100%;
  animation:${shimmer} 1.2s linear infinite;
  border-radius:${tokens.radii.sm};
`

export default function Skeleton({height='16px', width='100%', style}){
  return <Box style={{height, width, ...style}} aria-hidden="true" />
}
