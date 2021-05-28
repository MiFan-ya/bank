import storage from 'store'
import { login, refreshLogin, getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    hasPer: false,
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_HAS_PER: (state, has) => {
      state.hasPer = has
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(res => {
          console.log(res)
          if (res.data.expires_in < 1800) {
            refreshLogin(userInfo, res.data.refresh_token).then(response => {
              console.log(response)
              storage.set(ACCESS_TOKEN, 'Bearer ' + response.data.access_token, response.data.expires_in / 86400)
              commit('SET_TOKEN', response.data.access_token)
              resolve(response)
            }).catch(error => {
              console.log(error)
              reject(error)
            })
          } else {
            // storage.set(ACCESS_TOKEN, 'Bearer ' + res.data.access_token, 60 / 86400)//86400秒是一天
            storage.set(ACCESS_TOKEN, 'Bearer ' + res.data.access_token, res.data.expires_in / 86400)
            commit('SET_TOKEN', res.data.access_token)
            resolve(res)
          }
        }).catch(err => {
          console.log(err)
          reject(err)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          console.log(response)
          response = {
            'message': '', 'timestamp': 1597387664795, 'result': {
              'id': response.result.id,
              'tenantId': response.result.tenantId,
              'bankBranchId': response.result.bankBranchId,
              'name': response.result.username,
              'username': response.result.username,
              'nickName': response.result.nickName,
              'isAdmin': response.result.isAdmin,
              'color': response.result.color,
              'logoUrl': response.result.logoUrl,
              'bankBranchName': response.result.bankBranchName,
              'hasBranch': response.result.hasBranch,
              'password': '',
              'avatar': '/avatar2.jpg',
              'status': 1,
              'telephone': '',
              'lastLoginIp': '27.154.74.117',
              'lastLoginTime': 1534837621348,
              'creatorId': 'admin',
              'createTime': 1497160610259,
              'merchantCode': 'TLif2btpzg079h15bk',
              'deleted': 0,
              'roleId': 'admin',
              'role': {
                'id': 'admin',
                'name': '管理员',
                'describe': '拥有所有权限',
                'status': 1,
                'creatorId': 'system',
                'createTime': 1497160610259,
                'deleted': 0,
                'permissions': response.result.authoritiesWithChild
              }
            }, 'code': 0
          }
          const result = response.result
          // console.log(JSON.stringify(response))

          if (result.role && result.role.permissions && result.role.permissions.length > 0) {
            const role = result.role
            role.permissions = result.role.permissions
            role.permissions.map(per => {
              per.actionList=[]
              if (per.children.length > 0) {
                const action = per.children.map(action => {
                  return action.authCode
                })
                per.actionList = action
              }
            })
            role.permissionList = role.permissions.map(permission => {
              return permission.authCode
            })
            if (response.result.isAdmin===1 && process.env.NODE_ENV !== 'development'){
              result.role.permissionList=["QuartzList","TenantList","RoleList","AuthList"]
            }
          console.log(result.role)
            // if (response.result.isAdmin===1 && process.env.NODE_ENV === 'development'){
            //   result.tenantId=0
            // }
            commit('SET_ROLES', result.role)
            commit('SET_HAS_PER', true)
            commit('SET_INFO', result)
          } else {
            commit('SET_HAS_PER', false)
            reject(new Error('getInfo: roles must be a non-null array !'))
          }

          commit('SET_NAME', { name: result.name, welcome: welcome() })
          commit('SET_AVATAR', result.avatar)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        storage.remove(ACCESS_TOKEN)
        resolve()
        // logout(state.token).then(() => {
        //   resolve()
        // }).catch(() => {
        //   resolve()
        // }).finally(() => {
        //   commit('SET_TOKEN', '')
        //   commit('SET_ROLES', [])
        //   storage.remove(ACCESS_TOKEN)
        // })
      })
    }

  }
}

export default user
