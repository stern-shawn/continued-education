// eslint-disable
// this is an auto generated file. This will be overwritten

export const createAlbum = `mutation CreateAlbum($input: CreateAlbumInput!) {
  createAlbum(input: $input) {
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
export const updateAlbum = `mutation UpdateAlbum($input: UpdateAlbumInput!) {
  updateAlbum(input: $input) {
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
export const deleteAlbum = `mutation DeleteAlbum($input: DeleteAlbumInput!) {
  deleteAlbum(input: $input) {
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
export const createPhoto = `mutation CreatePhoto($input: CreatePhotoInput!) {
  createPhoto(input: $input) {
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
export const updatePhoto = `mutation UpdatePhoto($input: UpdatePhotoInput!) {
  updatePhoto(input: $input) {
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
export const deletePhoto = `mutation DeletePhoto($input: DeletePhotoInput!) {
  deletePhoto(input: $input) {
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
