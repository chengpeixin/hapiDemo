const Joi = require('joi')
const axios = require('axios')
const models = require("../models");
const JWT = require('jsonwebtoken');
const config = require('./../config')
const WXBizDataCrypt = require('./../utils/decrypted-data')

const GROUP_NAME = 'users';

module.exports = [{
    method:'POST',
    path:`/${GROUP_NAME}/wxLogin`,
    handler:async (req,reply)=>{
        const appid = config.wxAppid;
        const secret = config.wxSecret;
        const {code ,encryptedData,iv} = req.payload;
        const response = await axios({
            url:'https://api.weixin.qq.com/sns/jscode2session',
            method:'GET',
            params:{
                appid,
                secret,
                js_code: code,
                grant_type: 'authorization_code'
            }
        })
        const { openid, session_key } = response.data;
        // 基于openid查询 or 创建用户
        const user = await models.users.findOrCreate({
            where: { open_id: openid },
        });
        // decrypt解码
        var pc = new WXBizDataCrypt(appid, session_key)
        var userInfo = pc.decryptData(encryptedData , iv)
        // 更新user信息
        await models.users.update({
            nick_name: userInfo.nickName,
            gender: userInfo.gender,
            avatar_url: userInfo.avatarUrl,
            open_id: userInfo.openId,
            session_key: session_key,
        }, {
            where: { open_id: openid },
        });
        // jwt
        const generateJWT = (jwtInfo) => {
            const payload = {
                userId:jwtInfo.userId,
                name:'很帅',
                exp:Math.floor(new Date().getTime() / 1000 + 7 *24 *60 *60)
            }
            return JWT.sign(payload,config.jwtSecret)
        }
        const resData = await generateJWT({
            userId:user[0].id
        });
        reply({data:resData});
    },
    config:{
        auth:false,
        tags:['api',GROUP_NAME],
        validate:{
            payload:{
                code:Joi.string().required().description('微信用户登陆的临时code'),
                encryptedData:Joi.string().required().description('微信用户信息encryptedData'),
                iv:Joi.string().required().description('微信用户信息iv')
            }
        }
    }
}]