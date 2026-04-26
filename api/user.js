const { json } = require('./_store');
const { createUser, findUserByLogin } = require('./_db');
const crypto = require('crypto');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return json(res, 405, { ok:false });

  let body='';
  req.on('data',c=>body+=c);
  req.on('end',async ()=>{
    try{
      const { type, login, password, name } = JSON.parse(body);

      if(type==='register'){
        const hash = crypto.createHash('sha256').update(password).digest('hex');
        const user = {
          name,
          email: login.includes('@')?login:null,
          phone: login.match(/^\d+$/)?login:null,
          wechat: login.includes('wx')?login:null,
          password_hash: hash
        };
        const u = await createUser(user);
        return json(res,200,{ok:true,user:u});
      }

      if(type==='login'){
        const u = await findUserByLogin(login);
        if(!u) return json(res,200,{ok:false});
        const hash = crypto.createHash('sha256').update(password).digest('hex');
        if(u.password_hash!==hash) return json(res,200,{ok:false});
        return json(res,200,{ok:true,user:u});
      }

    }catch(e){
      return json(res,400,{ok:false});
    }
  });
};
