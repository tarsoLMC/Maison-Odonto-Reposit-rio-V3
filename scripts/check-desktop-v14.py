"""Maison V14: garantir abertura emocional, caminhos desktop e integridade."""
from html.parser import HTMLParser
from pathlib import Path
import json

ROOT=Path(__file__).resolve().parents[1]
html=(ROOT/'index.html').read_text(encoding='utf-8')
css=(ROOT/'assets/css/maison-desktop-v14.css').read_text(encoding='utf-8')
class Parse(HTMLParser):
 def __init__(self):
  super().__init__();self.ids=set();self.h1=0;self.links=[];self.guide_paths=0;self.forms=0
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='h1':self.h1+=1
  if tag=='form':self.forms+=1
  if a.get('id'):
   assert a['id'] not in self.ids, a['id']
   self.ids.add(a['id'])
  if tag=='a' and a.get('href'):self.links.append(a['href'])
  if tag=='a' and 'home-desktop-guide-path' in a.get('class',''):self.guide_paths+=1
p=Parse();p.feed(html)
assert p.h1==1 and p.forms==0
assert p.guide_paths==3
assert 'Seu sorriso guarda' in html and 'Vamos cuidar das próximas.' in html
assert 'autoestima, bem-estar e presença nos momentos' in html
assert html.count('id="home-guide-title"')==1
assert 'UMA JORNADA COM MAIS SENTIDO' in html
assert 'assets/css/maison-desktop-v14.css?v=maison-v14' in html
assert html.index('id="home-guide-title"') < html.index('id="tratamentos"') < html.index('id="planos"')
for target in ['especialidades.html','convenios.html','a-maison.html']:
 assert target in p.links and (ROOT/target).is_file(),target
assert '#tratamentos' in p.links
assert '@media (min-width:921px)' in css
assert '@media (max-width:920px)' in css
assert '@media(prefers-reduced-motion:reduce)' in css
assert 'scrollIntoView' not in css
assert 'noindex,nofollow' in html
assert 'wa.me/5561991434312' in html
print(json.dumps({'result':'PASS','homepage':True,'desktop_paths':p.guide_paths,
 'navigation':'treatments_before_plans','mobile':'preserved','browser':'NOT_TESTED'},ensure_ascii=False))
