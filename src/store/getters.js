const getters = {
  permissionRouters: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  accessToken: state => state.user.accessToken,
  userInfo: state => state.user.userInfo,
  minute: state => state.screen.minute,
  dayNumber: state => state.screen.dayNumber,
  realNumber: state => state.screen.realNumber,
  historyDay: state => state.screen.historyDay,
  historyYear: state => state.screen.historyYear,
  hotPoint: state => state.screen.hotPoint,
  duration: state => state.screen.duration,
  tags: state => state.screen.tags,
}
export default getters
