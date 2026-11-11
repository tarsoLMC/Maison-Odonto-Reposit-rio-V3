"""Maison V16 — verifica fatos, fontes, perguntas e UX desktop em 7 tratamentos.
Nao substitui revisão clínica responsável nem teste visual no Safari/Firefox."""
from pathlib import Path
from html.parser import HTMLParser
from html import escape
from urllib.parse import unquote, urlsplit
import json

ROOT=Path(__file__).resolve().parents[1]
source=json.loads((ROOT/'content/treatment-guide-v16.json').read_text(encoding='utf-8'))
clinical=json.loads((ROOT/'content/maison.json').read_text(encoding='utf-8'))
concierge=json.loads((ROOT/'content/concierge.json').read_text(encoding='utf-8'))
assert len(source['guides'])==7
assert len({x['id'] for x in source['guides']})==7
assert len(concierge['categories'])==4

files={
 'implantes':'implantes-dentarios.html',
 'proteses':'proteses-dentarias.html',
 'invisalign':'invisalign.html',
 'lentes':'lentes-de-contato-dental.html',
 'cirurgia':'cirurgia-dentaria.html',
 'clareamento':'clareamento-dental.html',
 'harmonizacao':'harmonizacao-orofacial.html'
}
names={
 'implantes':'Implante dentário',
 'proteses':'Prótese dentária',
 'invisalign':'Invisalign®',
 'lentes':'Lentes de contato dentais',
 'cirurgia':'Cirurgia dentária',
 'clareamento':'Clareamento dentário',
 'harmonizacao':'Harmonização facial'
}
class Inspect(HTMLParser):
 def __init__(self):
  super().__init__()
  self.ids=set();self.links=[];self.guide=0;self.fact=0;self.h1=0;self.faq=0;self.forms=0
  self.description='';self.og_description='';self.sections=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:
   assert a['id'] not in self.ids, 'id duplicado: '+a['id']
   self.ids.add(a['id'])
  if a.get('href'):self.links.append(a)
  if tag=='h1':self.h1+=1
  if tag=='form':self.forms+=1
  if tag=='meta' and a.get('name')=='description':self.description=a.get('content')
  if tag=='meta' and a.get('property')=='og:description':self.og_description=a.get('content')
  if 'desktop-treatment-guide' in a.get('class',''):self.guide+=1
  if 'treatment-guide-fact' in a.get('class','').split():self.fact+=1

for g in source['guides']:
 ident=g['id'];path=ROOT/files[ident]
 html=path.read_text(encoding='utf-8')
 p=Inspect();p.feed(html)
 assert p.guide==1 and p.fact==3,(path,p.guide,p.fact)
 assert p.h1==1 and p.forms==0,path
 assert len(g['facts'])==3,path
 assert p.description==g['meta_description']==p.og_description,path
 assert len(p.description)<=160,path
 assert 'assets/css/maison-guide-v16.css?v=maison-v16' in html,path
 assert 'id="guia-tratamento"' in html and 'id="treatment-guide-heading"' in html
 assert html.index('id="guia-tratamento"') < html.index('data-treatment-story') < html.index('id="informacoes-completas"')
 for target in ['informacoes-completas','etapas-tratamento','duvidas-tratamento','opcoes-relacionadas']:
  assert target in p.ids, (path,target)
  assert any(link.get('href')=='#'+target for link in p.links),(path,target)
 for fact in g['facts']:
  assert escape(fact['title'],quote=True) in html,(path,fact['title'])
  assert escape(fact['text'],quote=True) in html,(path,fact['text'])
 assert escape(g['heading']) in html
 assert escape(g['question']) in html
 assert g['source']['url'].startswith('https://')
 assert any(link.get('href')==g['source']['url'] and link.get('target')=='_blank'
  and 'noopener' in link.get('rel','') for link in p.links),(path,'source')
 context='Olá, Maison! Tenho uma dúvida sobre '+names[ident].lower()+': '+g['question']
 assert any(context in unquote(link.get('href','')) for link in p.links if
  urlsplit(link.get('href','')).netloc=='wa.me'),(path,'context whatsapp')
 item=next(x for x in clinical['services'] if x['name']==names[ident])
 assert escape(item['intro'],quote=True) in html,(path,'intro')
 benefit=next((x['text'] for x in item.get('sections',[]) if x['heading']=='Principais benefícios'),None)
 if benefit: assert escape(benefit,quote=True) in html,(path,'benefit')
 assert 'data-story-chapter' in html and 'class="faq-list"' in html
 assert 'assets/js/maison-story-v11.js?v=maison-v11' in html
 assert 'noindex,nofollow' in html

con=(ROOT/'especialidades.html').read_text(encoding='utf-8')
for item in concierge['categories']:
 assert escape(item['headline'],quote=True) in con,item['id']
 assert escape(item['description'],quote=True) in con,item['id']
assert 'Implante substitui a raiz; prótese repõe o dente.' in con
assert 'data-mobile-care-wizard' in con and 'data-maison-concierge' in con
css=(ROOT/'assets/css/maison-guide-v16.css').read_text(encoding='utf-8')
assert '.desktop-treatment-guide{display:none}' in css
assert '@media(min-width:921px)' in css
assert '@media(max-width:920px)' in css
assert 'prefers-reduced-motion' not in css or 'reduce' in css
print(json.dumps({'result':'PASS','service_pages':7,'facts':21,'clinical_sources':7,'prefilled_questions':7,
 'desktop_anchors':28,'mobile':'preserved','real_browser':'NOT_TESTED'},ensure_ascii=False))
