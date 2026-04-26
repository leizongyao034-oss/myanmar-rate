const MR_KEY='myanmar_rate_v6_data';
const MR_DEFAULT={
 lang:'en',views:0,notice:'Commercial reference rates only. Contact us for exchange cooperation, advertising and API partnership.',
 adEnabled:false,sideAdEnabled:false,adTitle:'Premium Banner Advertising',adText:'Advertise your exchange, brand or payment service here.',sideAdTitle:'Brand Cooperation',sideAdText:'Sponsor this market section.',
 telegram:'https://t.me/',whatsapp:'https://wa.me/',email:'business@myanmar-rate.com',apiEnabled:false,apiUrl:'',
 rates:{usd:{name:'USD',full:'US Dollar',value:4210,change:1.2,trend:'up',spread:25},rmb:{name:'RMB',full:'Chinese Yuan',value:610,change:.4,trend:'up',spread:6},thb:{name:'THB',full:'Thai Baht',value:115,change:-.3,trend:'down',spread:2},usdt:{name:'USDT',full:'Tether',value:4235,change:.8,trend:'up',spread:30},sgd:{name:'SGD',full:'Singapore Dollar',value:3130,change:.2,trend:'up',spread:20}}
};
function mrClone(o){return JSON.parse(JSON.stringify(o))}
function mrMerge(a,b){for(const k in b){if(b[k]&&typeof b[k]==='object'&&!Array.isArray(b[k]))a[k]=mrMerge(a[k]||{},b[k]);else a[k]=b[k]}return a}
function mrLoad(){try{return mrMerge(mrClone(MR_DEFAULT),JSON.parse(localStorage.getItem(MR_KEY)||'{}'))}catch(e){return mrClone(MR_DEFAULT)}}
function mrSave(data){localStorage.setItem(MR_KEY,JSON.stringify(data));localStorage.setItem('myanmar_rate_v5_data',JSON.stringify(data));window.dispatchEvent(new StorageEvent('storage',{key:MR_KEY,newValue:JSON.stringify(data)}))}
function mrFmt(n){return Number(n||0).toLocaleString('en-US')}
function mrToast(t){let x=document.getElementById('toast');if(!x)return alert(t);x.textContent=t;x.classList.add('show');setTimeout(()=>x.classList.remove('show'),1800)}
