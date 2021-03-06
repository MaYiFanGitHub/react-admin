import ajax from './ajax'

// 登录
export const reqLogin = (username, password) => ajax({
  method: 'POST',
  url: '/login',
  data: {
    username,
    password
  }
})

/* 
  获取所有分类
*/
export const reqCategory = () => ajax.get('/manage/category/list')

/* 
  添加分类
*/
export const reqAddCategory = (categoryName) => ajax.post('/manage/category/add', {
  categoryName
})

/* 
  修改分类
*/
export const reqUpdateCategory = ({
  categoryId,
  categoryName
}) => ajax({
  method: 'POST',
  url: '/manage/category/update',
  data: {
    categoryId,
    categoryName
  }
})

/* 
  获取商品分页列表
*/
export const reqProducts = (pageNum, pageSize) => ajax.get(
  '/manage/product/list', {
    params: {
      pageNum,
      pageSize
    }
  }
)
/* 
  根据Name/desc搜索产品分页列表
*/
export const reqSearchProducts = ({
  pageNum,
  pageSize,
  searchType,
  searchName
}) => ajax.get(
  '/manage/product/search', {
    params: {
      pageNum,
      pageSize,
      [searchType]: searchName
    }
  }
)

/* 
  对商品进行上架/下架处理
*/
export const reqUpdateStatus = (productId, status) => ajax.post(
  '/manage/product/updateStatus', {
    productId,
    status
  }
)

/* 
  根据商品ID获取商品
*/
export const reqProduct = (productId) => ajax({
  method: 'GET',
  url: '/manage/product/info',
  params: {
    productId
  }
})

/* 
  根据ID获取分类名称
*/
export const reqCategoryById = (categoryId) => ajax.get('/manage/category/info', {
  params: {
    categoryId
  }
})

/* e
  根据 图片名称 删除图片
*/
export const reqDeletePicture = (name) => ajax.post(
  '/manage/img/delete', {
    name
  }
)

/* 
  添加或修改商品
*/
export const reqAddOrUpdateProduct = (product) => ajax.post(
  '/manage/product/' + (product._id ? 'update' : 'add'),
  product
)

/* 
  查询角色列表
*/
export const reqRoleList = () => ajax.get('/manage/role/list')
/* 
  添加角色
*/
export const reqAddRole = (roleName) => ajax.post(
  '/manage/role/add', {
    roleName
  }
)

/* 
  更新角色
*/
export const reqUpdateRole = (role) => ajax.post(
  '/manage/role/update',
  role
)

/* 
  获取用户列表
*/
export const reqUserList = () => ajax.get('/manage/user/list')

/* 
  添加用户
*/
export const reqAddOrUpdateUser = (user) => ajax.post(
  '/manage/user/' + (user._id ? 'update' : 'add'),
  user
)
/* 
  删除用户
*/
export const reqDeleteUser = (userId) => ajax.post(
  '/manage/user/delete',
  {
    userId
  }
)