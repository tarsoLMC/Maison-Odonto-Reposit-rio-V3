"""Maison V15 — estrutura desktop, conteúdo editorial e fallback.
Os testes de layout visual e Safari físico permanecem pendentes."""
from pathlib import Path
from html.parser import HTMLParser
from html import escape
import json

ROOT=Path(__file__).resolve().parents[1]
html=(ROOT/'especialidades.html').read_text(encoding='utf-8')
style=(ROOT/'assets/css/maison-desktop-v15.css').read_text(encoding='utf-8')
groups=json.loads((ROOT/'content/concierge.json').read_text(encoding='utf-8'))['categories']
compare=json.loads((ROOT/'content/maison-compare.json').read_text(encoding='utf-8'))

class Check(HTMLParser):
 def __init__(self):
  super().__init__(); self.ids=set();self.forms=0;self.tabs=[];self.panels=[];self.deep=0
  self.comparisons=0;self.first=0;self.links=[];self.quick=0;self.images=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if a.get('id'):
   assert a['id'] not in self.ids, a['id']
   self.ids.add(a['id'])
  if tag=='form':self.forms+=1
  if tag=='a' and a.get('href'):self.links.append(a['href'])
  if tag=='img':self.images.append(a.get('src',''))
  if 'data-concierge-tab' in a:self.tabs.append(a['data-concierge-tab'])
  if 'data-concierge-panel' in a:self.panels.append(a['data-concierge-panel'])
  if 'data-desktop-deep-dive' in a:
   assert tag=='details'
   assert 'open' not in a
   self.deep+=1
  if 'concierge-compare-rows' in a.get('class',''):self.comparisons+=1
  if 'concierge-deep-dive-question' in a.get('class',''):self.quick+=1
  if 'concierge-first-visit' in a.get('class',''):self.first+=1

p=Check();p.feed(html)
assert p.forms==0
assert p.tabs==[x['id'] for x in groups]
assert p.panels==[x['id'] for x in groups]
assert p.deep==4 and p.comparisons==2 and p.quick==2 and p.first==1
assert html.count('class="service-card"')==7
assert 'data-mobile-care-wizard' in html and html.count('data-choose-care=')==4
assert 'maison-mobile-quiz.js?v=maison-v13' in html
assert 'maison-concierge.js?v=maison-v9' in html
assert 'assets/css/maison-desktop-v15.css?v=maison-v15' in html
assert html.index('maison-compact-v12.css')<html.index('maison-desktop-v15.css')
assert '@media(min-width:921px)' in style
assert '@media(max-width:920px)' in style
assert '.concierge-choices' in style and 'grid-template-columns:1fr' in style
assert '.concierge-panels' in style and 'grid-column:2' in style
assert '.concierge-deep-dive' in style and 'prefers-reduced-motion:reduce' in style
assert 'data-concierge-counter' in html
assert 'data-desktop-deep-dive' in html
assert 'Sem pressa. No seu tempo.' in html
for line in ['Explore com calma','Converse com a equipe','Conheça as possibilidades na avaliação']:
 assert line in html,line
for g in groups:
 assert f'id="concierge-{g["id"]}"' in html,g['id']
 assert 'assets/img/'+g['image'] in p.images,g['id']
 assert escape(g['whatsapp_message']) in html or g['whatsapp_message'].replace(' ','%20')[:20] in html,g['id']
for pair in compare['pairs']:
 assert escape(pair['intro']) in html
 for item in pair['services']:
  assert escape(item['summary']) in html
  assert escape(item['detail']) in html
assert len([x for x in p.links if x.startswith('https://wa.me/')])>=4
assert 'aria-labelledby="concierge-first-title"' in html
print(json.dumps({'result':'PASS','desktop_categories':4,'compare_groups':2,'faq_groups':2,
 'service_cards':7,'mobile_quiz':'preserved','javascript_fallback':'native_details','browser':'NOT_TESTED'},ensure_ascii=False))
