import React from 'react'
import { 
  Text, 
  View
} from 'react-native';

import { List } from 'react-native-paper';

function Page({ page, notes }) {
  console.log(page)
  return (
    <List.Section>

      <List.Subheader>{page.title}</List.Subheader>
        {/* <List> */}
      {page.notes.map( (noteID, index) => {
        let note = notes[noteID]
        
        if (note.type === 'note') {
          return (
            <List.Item 
            // title={note.content}
            title='test'
            />
            // <Text>test</Text>
            )
          } 
          
          else if (note.type === 'task') {
            return (
              <List.Item 
              title={note.content}
              />
              )
            }
            
          })}
          {/* </List> */}
    </List.Section>
      

  )
}

export default Page
