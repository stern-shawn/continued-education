// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateAlbum = `subscription OnCreateAlbum {
  onCreateAlbum {
    id
    name
    owner
    photos {
      items {
        id
        bucket
      }
      nextToken
    }
  }
}
`;
export const onUpdateAlbum = `subscription OnUpdateAlbum {
  onUpdateAlbum {
    id
    name
    owner
    photos {
      items {
        id
        bucket
      }
      nextToken
    }
  }
}
`;
export const onDeleteAlbum = `subscription OnDeleteAlbum {
  onDeleteAlbum {
    id
    name
    owner
    photos {
      items {
        id
        bucket
      }
      nextToken
    }
  }
}
`;
export const onCreatePhoto = `subscription OnCreatePhoto {
  onCreatePhoto {
    id
    album {
      id
      name
      owner
      photos {
        nextToken
      }
    }
    bucket
    fullsize {
      key
      width
      height
    }
    thumbnail {
      key
      width
      height
    }
  }
}
`;
export const onUpdatePhoto = `subscription OnUpdatePhoto {
  onUpdatePhoto {
    id
    album {
      id
      name
      owner
      photos {
        nextToken
      }
    }
    bucket
    fullsize {
      key
      width
      height
    }
    thumbnail {
      key
      width
      height
    }
  }
}
`;
export const onDeletePhoto = `subscription OnDeletePhoto {
  onDeletePhoto {
    id
    album {
      id
      name
      owner
      photos {
        nextToken
      }
    }
    bucket
    fullsize {
      key
      width
      height
    }
    thumbnail {
      key
      width
      height
    }
  }
}
`;
