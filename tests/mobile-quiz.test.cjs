const {test} = require('node:test');
const assert = require('node:assert/strict');
const {readFileSync} = require('node:fs');
const {join} = require('node:path');
const vm = require('node:vm');
const script = readFileSync(join(__dirname,'..','assets/js/maison-mobile-quiz.js'),'utf8');

function node(dataset={}, textContent='') {
 return {
  dataset, textContent, events:{}, hidden:false, focused:false,
  addEventListener(name,fn){this.events[name]=fn},
  focus(opts){this.focused=opts?.preventScroll===true},
  click(){this.events.click?.({preventDefault(){}})},
  scrollIntoView(){this.scrolled=true}
 };
}
function setup(onMobile=true) {
 const options=[
  node({chooseCare:'reabilitacao',careTitle:'Reabilitação'}),
  node({chooseCare:'alinhamento',careTitle:'Alinhamento'}),
  node({chooseCare:'estetica',careTitle:'Estética do sorriso'}),
  node({chooseCare:'outros',careTitle:'Outros cuidados e harmonização facial'})
 ];
 const services=['reabilitacao','reabilitacao','alinhamento','estetica','estetica','outros','outros'].map(x=>node({wizardService:x}));
 const first=node(),second=node(),back=node(),all=node(),title=node({},'Qual cuidado você procura?');
 const intro=node({},'Selecione uma área para descobrir os tratamentos.'),stepLabel=node(),categoryLabel=node();
 second.hidden=true;
 const targets={
 '[data-step-panel="1"]':first,
 '[data-step-panel="2"]':second,
 '[data-care-back]':back,
 '[data-show-all]':all,
 '[data-care-title]':title,
 '[data-care-intro]':intro,
 '[data-care-step-label]':stepLabel,
 '[data-care-category]':categoryLabel,
 };
 const root={dataset:{step:'1'},querySelector(x){return targets[x]},querySelectorAll(x){
  return x==='[data-choose-care]'?options:x==='[data-wizard-service]'?services:[]},scrollIntoView(){this.scrolled=true}};
 const active=new Set();
 const body={classList:{toggle(cls,on){on?active.add(cls):active.delete(cls)}}};
 const media={matches:onMobile,events:{},addEventListener(evt,fn){this.events[evt]=fn}};
 const window={matchMedia:()=>media};
 vm.runInNewContext(script,{document:{querySelector:()=>root,body},window});
 return {options,services,first,second,back,all,title,intro,stepLabel,categoryLabel,root,active,media};
}

test('telefone inicia etapa 1, sem enviar dados ou ocultar a primeira escolha',()=>{
 const u=setup();
 assert.equal(u.active.has('mobile-care-active'),true);
 assert.equal(u.first.hidden,false);
 assert.equal(u.second.hidden,true);
 assert.equal(u.root.dataset.step,'1');
});
test('selecionar categoria revela apenas os serviços relacionados e permite voltar',()=>{
 const u=setup();
 u.options[3].click();
 assert.equal(u.root.dataset.step,'2');
 assert.equal(u.stepLabel.textContent,'Etapa 2 de 2');
 assert.equal(u.categoryLabel.textContent,'OUTROS CUIDADOS E HARMONIZAÇÃO FACIAL');
 assert.deepEqual(u.services.map(x=>x.hidden),[true,true,true,true,true,false,false]);
 assert.equal(u.title.focused,true);
 u.back.click();
 assert.equal(u.root.dataset.step,'1');
 assert.equal(u.first.hidden,false);
 assert.equal(u.second.hidden,true);
 assert.equal(u.options[3].focused,true);
});
test('botão de ver todos dá acesso aos sete serviços',()=>{
 const u=setup();
 u.options[1].click();
 assert.equal(u.services.filter(x=>!x.hidden).length,1);
 u.all.click();
 assert.equal(u.services.filter(x=>!x.hidden).length,7);
 assert.equal(u.all.hidden,true);
});
test('desktop não ativa a experiência mobile e resize restaura o site',()=>{
 const u=setup(false);
 assert.equal(u.active.has('mobile-care-active'),false);
 u.media.matches=true;
 u.media.events.change();
 assert.equal(u.active.has('mobile-care-active'),true);
 u.media.matches=false;
 u.media.events.change();
 assert.equal(u.active.has('mobile-care-active'),false);
});
