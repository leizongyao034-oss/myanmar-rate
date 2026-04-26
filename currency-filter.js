(function(){
  const KEEP = ['usd','thb','rmb'];
  const OLD_FETCH = window.fetch;
  window.fetch = async function(){
    const res = await OLD_FETCH.apply(this, arguments);
    try{
      const url = String(arguments[0] || '');
      if(url.includes('/api/rates')){
        const clone = res.clone();
        const json = await clone.json();
        if(json && json.rates){
          json.rates = Object.fromEntries(KEEP.map(k=>[k,json.rates[k]]).filter(x=>x[1]));
          return new Response(JSON.stringify(json), {status: res.status, headers: {'Content-Type':'application/json'}});
        }
      }
    }catch(e){}
    return res;
  };
  window.MR_KEEP_CURRENCIES = KEEP;
})();
