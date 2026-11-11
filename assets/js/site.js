(() => {
'use strict';
const $=(q,root=document)=>root.querySelector(q);
const menu=$('.menu-toggle'),nav=$('.nav');
if(menu && nav){
 const close=()=>{nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menu');document.body.classList.remove('menu-open')};
 menu.addEventListener('click',()=>{let willOpen=!nav.classList.contains('is-open');nav.classList.toggle('is-open',willOpen);menu.setAttribute('aria-expanded',String(willOpen));menu.setAttribute('aria-label',willOpen?'Fechar menu':'Abrir menu');document.body.classList.toggle('menu-open',willOpen)});
 nav.addEventListener('click',e=>{if(e.target.closest('a'))close()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
 window.addEventListener('resize',()=>{if(window.innerWidth>1010)close()});
}
const panel=$('.wa-tooltip'),fab=$('.wa-fab'),x=$('.wa-tooltip-close');
if(panel&&fab){const toggle=open=>{panel.classList.toggle('is-open',open);fab.setAttribute('aria-expanded',String(open))};fab.addEventListener('click',()=>toggle(!panel.classList.contains('is-open')));x?.addEventListener('click',()=>toggle(false));document.addEventListener('keydown',e=>{if(e.key==='Escape')toggle(false)});document.addEventListener('click',e=>{if(!e.target.closest('.wa-box'))toggle(false)})}
const opener=$('#opening');
if(opener){const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;let seen=false;try{seen=sessionStorage.getItem('maisonIntroV3')==='1'}catch(e){};const close=()=>{if(opener.classList.contains('is-hidden'))return;opener.classList.add('is-hidden');document.body.style.overflow='';try{sessionStorage.setItem('maisonIntroV3','1')}catch(e){};setTimeout(()=>{opener.remove()},700)};
 if(seen||reduced){opener.remove()}else{document.body.style.overflow='hidden';opener.querySelector('.opening-skip')?.addEventListener('click',close);setTimeout(close,window.innerWidth<=720?1250:1850)}}
if('IntersectionObserver'in window){document.documentElement.classList.add('js-motion');const io=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}},{threshold:.08});document.querySelectorAll('.reveal').forEach(e=>io.observe(e))}
})();