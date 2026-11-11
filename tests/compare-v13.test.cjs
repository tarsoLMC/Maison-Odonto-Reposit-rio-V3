const {test} = require('node:test');
const assert = require('node:assert/strict');
const {readFileSync} = require('node:fs');
const {join} = require('node:path');
const vm = require('node:vm');
const script = readFileSync(join(__dirname,'..','assets/js/maison-compare-v13.js'),'utf8');

function element(dataset={}) {
  return {
    dataset, events:{}, attrs:{}, hidden:false, focused:false, tabIndex:0,
    classes:new Set(),
    classList:{add(name){element.lastRoot?.classes.add(name)}},
    addEventListener(name,cb){this.events[name]=cb},
    setAttribute(name,value){this.attrs[name]=value},
    focus(args){this.focused=!!args?.preventScroll},
    click(){const e={prevented:false,preventDefault(){this.prevented=true}};this.events.click?.(e);return e},
    key(key){const e={key,prevented:false,preventDefault(){this.prevented=true}};this.events.keydown?.(e);return e}
  };
}
function setup({withComparison=true,fromSpecialties=false}={}) {
  const tabs=[element({compareTab:'implantes'}),element({compareTab:'proteses'})];
  const panels=[element({comparePanel:'implantes'}),element({comparePanel:'proteses'})];
  const list=element();
  const root=element();
  element.lastRoot=root;
  root.querySelector=(x)=>x==='[data-compare-tabs]'?list:null;
  root.querySelectorAll=(x)=>x==='[data-compare-tab]'?tabs:x==='[data-compare-panel]'?panels:[];
  const back=element();
  let didGoBack=false;
  const window={
    location:{href:'https://example.com/implantes-dentarios.html'},
    history:{length:2,back(){didGoBack=true}}
  };
  const document={
    referrer:fromSpecialties?'https://example.com/especialidades.html':'https://google.com/',
    querySelector:(q)=>q==='[data-care-compare]'?(withComparison?root:null):q==='[data-return-to-quiz]'?back:null
  };
  vm.runInNewContext(script,{document,window,URL});
  return {root,tabs,panels,list,back,historyBack:()=>didGoBack};
}

test('abas iniciam corretamente com primeiro painel ativo',()=>{
  const u=setup();
  assert.equal(u.root.classes.has('is-enhanced'),true);
  assert.equal(u.list.attrs.role,'tablist');
  assert.deepEqual(u.panels.map(p=>p.hidden),[false,true]);
  assert.equal(u.tabs[0].attrs['aria-selected'],'true');
  assert.equal(u.tabs[1].attrs['aria-selected'],'false');
});
test('toque e teclado alternam tratamentos sem perder foco',()=>{
  const u=setup();
  u.tabs[1].click();
  assert.deepEqual(u.panels.map(p=>p.hidden),[true,false]);
  assert.equal(u.tabs[1].attrs['aria-selected'],'true');
  u.tabs[1].key('ArrowRight');
  assert.equal(u.tabs[0].focused,true);
  assert.deepEqual(u.panels.map(p=>p.hidden),[false,true]);
  assert.equal(u.tabs[0].key('End').prevented,true);
  assert.equal(u.tabs[1].attrs['aria-selected'],'true');
});
test('retorno preserva entrada anterior do quiz somente se referrer for da Maison',()=>{
  const yes=setup({fromSpecialties:true});
  assert.equal(yes.back.click().prevented,true);
  assert.equal(yes.historyBack(),true);
  const no=setup({fromSpecialties:false});
  assert.equal(no.back.click().prevented,false);
  assert.equal(no.historyBack(),false);
});
test('sem comparação, script não interfere na navegação',()=>{
  const u=setup({withComparison:false,fromSpecialties:true});
  assert.equal(u.historyBack(),false);
  assert.equal(u.back.click().prevented,true);
  assert.equal(u.historyBack(),true);
});
