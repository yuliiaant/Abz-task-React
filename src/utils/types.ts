export type User = {
  id: string,
  name: string,
  email: string,
  phone: string,
  position: string,
  position_id: number,
  registration_timestamp: number,
  photo: any,
}

export type ResponceData = {
  success: boolean,
  page: number,
  total_pages: number,
  total_users: number,
  count: number,
  links: {
    next_url: string,
    prev_url: null | string,
  },
  users: User[],
}

export type Position = {
  id: number,
  name: string
}

export type ResponcePositions = {
  success: boolean,
  positions: Position[],
}

export type ResponceToken = {
  success: boolean,
  token: string,
}