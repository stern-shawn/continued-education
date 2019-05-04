import React from 'react'
import styled from 'styled-components/macro'

const Task = ({ task }) => (
  <div
    css={`
      border: 1px solid lightgrey;
      border-radius: 2px;
      padding: 8px;
      margin-bottom: 8px;
    `}
  >
    {task.content}
  </div>
)

export default Task
