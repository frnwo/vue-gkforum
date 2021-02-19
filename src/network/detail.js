import {request} from './require'
export function getDeatail(iid){
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}
export function getRecommend(){
  return request({
    url:'/recommend'
  })
}
export class Goods{
  constructor(itemInfo,columns,services){
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    // this.newPrice = itemInfo.newPrice
    this.oldPrice = itemInfo.oldPrice
    this.discountDesc = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}
export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}