const GROUP_NAME = 'shops';
const Joi = require('joi')
const models = require('./../models')
const { paginationDefine } = require('../utils/router-helper');

module.exports = [
    {
        method:'GET',
        path:`/${GROUP_NAME}`,
        handler: async (request,reply) => {
            const {rows:results,count:totalCount} = await models.shops.findAndCountAll({
                attributes:['id','name'],
                limit:request.query.limit,
                offset:(request.query.page-1)*request.query.limit
            })
            // 开启分页插件，返回数据接口，需要带上result和totalcount字段
            reply({results,totalCount})
        },
        config:{
            tags:['api',GROUP_NAME],
            description:'获取店铺列表',
            auth:false,
            validate:{
                query:{
                    ...paginationDefine
                }
            }
        }
    },
    {
        method:'GET',
        path:`/${GROUP_NAME}/{shopId}/goods`,
        handler:async (request,reply) =>{
            reply()
        },
        config:{
            tags:['api',GROUP_NAME],
            description:'获取店铺的商品列表'
        }
    }

]