(() => {
'use strict';
// Images are hosted by the original clinic and may occasionally be unavailable. Explicit fallback prevents a blank panel.
function fallback(img){
 if(img.dataset.fallbackReady)return;
 img.dataset.fallbackReady='1';
 const parent=img.parentElement;
 if(!parent)return;
 img.style.display='none';
 const placeholder=document.createElement('div');
 placeholder.className='image-fallback';
 placeholder.setAttribute('role','img');
 placeholder.setAttribute('aria-label','Imagem institucional indisponível no momento');
 placeholder.innerHTML='<strong>Maison.</strong><small>Odontologia especializada · Brasília</small>';
 parent.insertBefore(placeholder,img);
}
for(const img of document.querySelectorAll('img[src^="https://maisonodonto.com.br/"]')){
 if(img.complete && img.naturalWidth===0)fallback(img);
 else img.addEventListener('error',()=>fallback(img),{once:true});
}
})();