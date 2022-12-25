export const adminRoute = '/api/admin'
export const userRoute = '/api/user'

export const noAuthAdminRoutes = {
  login: '/login',
}

export const authAdminRoutes = {
  users: '/users',
  projects: '/projects',
  tasks: '/tasks',
}

export const noAuthRoutesToArr = (obj: any, route: string) =>
  Object.entries(obj).map(([_, value]) => {
    return route + value
  })
