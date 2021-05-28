export const PERMISSION_ENUM = {
  'add': { key: 'add', label: '新增' },
  'delete': { key: 'delete', label: '删除' },
  'edit': { key: 'edit', label: '编辑' },
  'query': { key: 'query', label: '查询' },
  'get': { key: 'get', label: '详情' },
  'enable': { key: 'enable', label: '启用' },
  'disable': { key: 'disable', label: '禁用' },
  'import': { key: 'import', label: '导入' },
  'export': { key: 'export', label: '导出' },
  'exp1ort': { key: 'export', label: '营销列表-' }
}

function plugin (Vue) {
  if (plugin.installed) {
    return
  }

  !Vue.prototype.$auth && Object.defineProperties(Vue.prototype, {
    $auth: {
      get () {
        const _this = this
        return (permissions) => {
          if (permissions && permissions.length>0 && _this.$store.getters.roles.permissions && _this.$store.getters.roles.permissions.length>0){
            const [permission, action] = permissions.split('.')
            const permissionList = _this.$store.getters.roles.permissions
            let authCode=permissionList.find((val) => {
              return val.authCode === permission
            })
            let bool=false
            if (authCode && authCode.actionList && authCode.actionList.length>0){
              if (authCode.actionList.findIndex((val) => {
                return val === action
              }) > -1){
                bool=true
              }
            }
            return bool
          }
        }
      }
    }
  })

  !Vue.prototype.$enum && Object.defineProperties(Vue.prototype, {
    $enum: {
      get () {
        // const _this = this;
        return (val) => {
          let result = PERMISSION_ENUM
          val && val.split('.').forEach(v => {
            result = result && result[v] || null
          })
          return result
        }
      }
    }
  })
}

export default plugin
