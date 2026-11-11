const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '..', 'assets/js/maison-story-v11.js'), 'utf8');

function element() {
  const classes = new Set();
  return {
    classes, events: {}, attrs: {}, textContent: '',
    classList: { add(x){classes.add(x)}, toggle(x,enabled) {
      if (enabled) classes.add(x); else classes.delete(x);
    }},
    setAttribute(name,value){this.attrs[name]=value},
    addEventListener(name,listener){this.events[name]=listener},
    click(){this.events.click?.()},
    scrollIntoView(args){this.scrollArgs=args}
  };
}

function setup({isMobile=true,reduce=false,observerEnabled=true,detailsPresent=true}={}) {
  const root = element(), details=element(), journey=element(), expand=element();
  const chapters = [element(),element(),element()];
  root.querySelector = selector => selector === '[data-story-expand]' ? expand : null;
  root.querySelectorAll = selector => selector === '[data-story-chapter]' ? chapters : [];
  const body = element();
  const mobileMedia = {matches:isMobile,events:{}, addEventListener(event,fn){this.events[event]=fn}};
  const reducedMedia = {matches:reduce};
  const window={
    matchMedia: query => query.includes('max-width')?mobileMedia:reducedMedia,
    requestAnimationFrame(fn){fn()}
  };
  let observerInstance;
  if (observerEnabled) {
    window.IntersectionObserver = class {
      constructor(fn, config){this.fn=fn;this.config=config;this.observed=[];this.removed=[];observerInstance=this;}
      observe(x){this.observed.push(x);}
      unobserve(x){this.removed.push(x);}
      enter(el){this.fn([{target:el,isIntersecting:true}]);}
    };
  }
  const document = {
    body,
    querySelector(selector){
      return {
        '[data-treatment-story]':root,
        '.service-details':detailsPresent ? details : null,
        '.treatment-journey':journey
      }[selector] || null;
    }
  };
  vm.runInNewContext(source,{window,document});
  return {root,details,journey,expand,chapters,body,mobileMedia,reducedMedia,
    observer:()=>observerInstance};
}

test('ativa a experiência simplificada somente no celular',()=>{
  const u=setup();
  assert.equal(u.body.classes.has('story-ready'),true);
  u.mobileMedia.matches=false;
  u.mobileMedia.events.change();
  assert.equal(u.body.classes.has('story-ready'),false);
  u.mobileMedia.matches=true;
  u.mobileMedia.events.change();
  assert.equal(u.body.classes.has('story-ready'),true);
});

test('CTA para conteúdo completo expande em vez de travar ou fechar páginas',()=>{
  const u=setup();
  u.expand.click();
  assert.equal(u.body.classes.has('story-details-open'),true);
  assert.equal(u.expand.attrs['aria-expanded'],'true');
  assert.equal(u.details.attrs.id,'informacoes-completas');
  assert.equal(u.details.scrollArgs.block,'start');
  u.expand.click();
  assert.equal(u.body.classes.has('story-details-open'),true);
});

test('redução de movimento evita animação e usa rolagem imediata',()=>{
  const u=setup({reduce:true});
  assert.equal(u.observer(),undefined);
  u.expand.click();
  assert.equal(u.details.scrollArgs.behavior,'auto');
});

test('IntersectionObserver revela somente capítulos que entram na tela',()=>{
  const u=setup();
  assert.equal(u.observer().observed.length,3);
  assert.equal(u.chapters.some(x=>x.classes.has('is-inview')),false);
  u.observer().enter(u.chapters[1]);
  assert.equal(u.chapters[1].classes.has('is-inview'),true);
  assert.equal(u.chapters[0].classes.has('is-inview'),false);
  assert.equal(u.observer().removed.length,1);
});

test('fallback: ausência de conteúdo completo não ativa classes que ocultem texto',()=>{
  const u=setup({detailsPresent:false});
  assert.equal(u.body.classes.has('story-ready'),false);
});
