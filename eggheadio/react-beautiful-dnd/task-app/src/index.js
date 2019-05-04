import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import '@atlaskit/css-reset'
import { DragDropContext } from 'react-beautiful-dnd'
import Column from './Column'
import initialData from './initialData'

const App = () => {
  const [state, setState] = useState(initialData)

  const onDragEnd = result => {
    // nothing yet, but this is a required prop
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {state.columnOrder.map(columnId => {
        const column = state.columns[columnId]
        const tasks = column.taskIds.map(taskId => state.tasks[taskId])

        return <Column key={column.id} column={column} tasks={tasks} />
      })}
    </DragDropContext>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
