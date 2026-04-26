const { json } = require('./_store');
const crypto = require('crypto');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return json(res, 405, { ok:false });

  let body='';
  req.on('data',c=>body+=c);
  req.on('end',()=>{
    try{
      const { email, password } = JSON.parse(body);
      if(!email||!password) return json(res,400,{ok:false});

      const apiKey = crypto.randomBytes(16).toString('hex');

      return json(res,200,{
        ok:true,
        apiKey
      });

    }catch(e){
      return json(res,400,{ok:false});
    }
  });
};
