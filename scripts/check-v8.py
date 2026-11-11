"""Verificacao complementar da Maison V8; nao substitui testes em navegador real."""
from pathlib import Path
from html.parser import HTMLParser
import json
ROOT=Path(__file__).resolve().parents[1]
services={
 'implantes-dentarios.html':'Implante dentário',
 'proteses-dentarias.html':'Prótese dentária',
 'invisalign.html':'Invisalign®',
 'lentes-de-contato-dental.html':'Lentes de contato dentais',
 'cirurgia-dentaria.html':'Cirurgia dentária',
 'clareamento-dental.html':'Clareamento dentário',
 'harmonizacao-orofacial.html':'Harmonização facial',
}
class Info(HTMLParser):
 def __init__(self): super().__init__();self.ids=set();self.refs=[];self.heads=[];self.h1=False;self.forms=0
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='h1':self.h1=True
  if tag=='form':self.forms+=1
  if a.get('id'):
   assert a['id'] not in self.ids,a['id']
   self.ids.add(a['id'])
  if a.get('href'):self.refs.append(a['href'])
 def handle_endtag(self,tag):
  if tag=='h1':self.h1=False
 def handle_data(self,text):
  if self.h1:self.heads.append(text)
html=list(ROOT.glob('*.html'))
assert len(html)==13,len(html)
css=ROOT/'assets/css/maison-v8.css'
assert css.is_file() and css.stat().st_size>2000
for p in html:
 s=p.read_text();i=Info();i.feed(s)
 assert not i.forms,p.name
 assert 'maison-v8.css?v=maison-v8' in s,p.name
 assert 'noindex,nofollow' in s,p.name
 assert 'href="https://wa.me/5561991434312' in s,p.name
 assert len(i.heads)>0,p.name
 if p.name in services:
  assert services[p.name] in ' '.join(i.heads),p.name
  assert 'class="page-hero-tagline"' in s,p.name
  assert 'class="related-links"' in s,p.name
  assert 'Agendar avaliação' in s,p.name
  assert 'class="faq-list"' in s,p.name
 if p.name=='especialidades.html':
  assert s.count('class="care-path"')==4
  assert s.count('class="service-card"')==7
  assert s.count('class="service-card service-card-consult"')==1
  for anchor in ['implantes','proteses','invisalign','lentes','clareamento','cirurgia','harmonizacao']:
   assert f'href="#{anchor}"' in s and anchor in i.ids,anchor
lens=(ROOT/'lentes-de-contato-dental.html').read_text()
faq=lens.split('class="faq-list"',1)[1].split('</div>',1)[0]
assert faq.count('<details>')==3
print(json.dumps({'pages':len(html),'services':len(services),'care_categories':4,'lens_faq':3,'result':'PASS','browser':'NAO TESTADO'},ensure_ascii=False))
