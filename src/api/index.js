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