import {request} from  './require';
export function getDiscussPosts(current,limit) {
  return request({
    url:'/index',
    params:{
      current,
      limit
    }
  })
}


// export function getHomeMultidata(){
//   return request({
//     url:'/home/multidata'
//   })
// }
// export function getHomeGoods(type,page){
//   return request({
//     url:'/home/data',
//     params:{
//       type,
//       page,
//     },
//   })
// }