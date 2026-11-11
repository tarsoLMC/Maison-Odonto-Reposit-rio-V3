"""Verificações estruturais da jornada mobile de tratamentos.
Não substituem o teste em Safari/iPhone físico."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, parse_qs, unquote
import json

root=Path(__file__).resolve().parents[1]
page=(root/'especialidades.html').read_text(encoding='utf-8')
wizard=(root/'content/mobile-quiz.html').read_text(encoding='utf-8')
assert page.count(wizard)==1, 'HTML da enquete difere da fonte'
class Inspector(HTMLParser):
 def __init__(self):
  super().__init__(); self.categories=[];self.services=[];self.forms=0;self.ids=set();self.headings=0
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='form':self.forms+=1
  if tag=='h1':self.headings+=1
  if a.get('id'):
   assert a['id'] not in self.ids,a['id']
   self.ids.add(a['id'])
  if 'data-choose-care' in a:
   assert tag=='button' and a.get('type')=='button'
   self.categories.append(a['data-choose-care'])
  if 'data-wizard-service' in a:
   assert tag=='a' and (root/a['href']).is_file(),a.get('href')
   self.services.append((a['data-wizard-service'],a['href']))
p=Inspector();p.feed(page)
assert p.forms==0
assert p.headings==1, p.headings
assert p.categories==['reabilitacao','alinhamento','estetica','outros'],p.categories
assert len(p.services)==7, p.services
assert set(g for g,_ in p.services)==set(p.categories)
assert len({href for _,href in p.services})==7
assert 'Outros cuidados e harmonização facial' in wizard
assert 'data-care-back' in wizard and 'data-show-all' in wizard
assert 'data-step-panel="2" hidden' in wizard
assert 'role="heading" aria-level="1"' in wizard
assert 'aria-live="polite"' in wizard
assert 'https://wa.me/5561991434312?' in wizard
assert '<input ' not in wizard and '<textarea' not in wizard
assert 'assets/css/maison-mobile-quiz.css?v=maison-v10' in page
assert 'assets/js/maison-mobile-quiz.js?v=maison-v10' in page
assert (root/'assets/css/maison-mobile-quiz.css').is_file()
assert (root/'assets/js/maison-mobile-quiz.js').is_file()
# Teste essencial de fallback: a ocultação das áreas desktop exige classe adicionada por JS.
css=(root/'assets/css/maison-mobile-quiz.css').read_text()
assert '.mobile-care-wizard{display:none}' in css
assert 'body.mobile-care-active .mobile-care-wizard{display:block}' in css
assert '.mobile-care-wizard [hidden]{display:none!important}' in css
print(json.dumps({'result':'PASS','categories':len(p.categories),'treatments':len(p.services),
 'personal_data_collected':False,'desktop':'preserved','safari_device':'NOT_TESTED'},ensure_ascii=False))
