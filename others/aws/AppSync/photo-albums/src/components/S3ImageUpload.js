import React, { Component } from 'react'
import { Storage } from 'aws-amplify'
import { v4 as uuid } from 'uuid'
import { Form } from 'semantic-ui-react'

class S3ImageUpload extends Component {
  state = { uploading: false }

  onChange = async e => {
    const file = e.target.files[0]
    const fileName = uuid()

    this.setState({ uploading: true })
    const result = await Storage.put(fileName, file, {
      customPrefix: { public: 'uploads/' },
      metadata: { albumid: this.props.albumId },
    })

    console.log('Uploaded file: ', result)
    this.setState({ uploading: false })
  }

  render() {
    const { uploading } = this.state

    return (
      <div>
        <Form.Button
          onClick={() => document.getElementById('add-image-file-input').click()}
          disabled={uploading}
          icon="file image outline"
          content={uploading ? 'Uploading...' : 'Add Image'}
        />
        <input
          id="add-image-file-input"
          type="file"
          accept="image/*"
          onChange={this.onChange}
          style={{ display: 'none' }}
        />
      </div>
    )
  }
}

export default S3ImageUpload
