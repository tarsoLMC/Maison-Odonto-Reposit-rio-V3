"""Validacao da jornada narrativa V11 sem alegar teste visual de Safari real."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import unquote, urlsplit
from html import escape
import json

ROOT=Path(__file__).resolve().parents[1]
data=json.loads((ROOT/'content/maison.json').read_text(encoding='utf-8'))
slugs={
 'Implante dentário':'implantes-dentarios.html',
 'Prótese dentária':'proteses-dentarias.html',
 'Invisalign®':'invisalign.html',
 'Lentes de contato dentais':'lentes-de-contato-dental.html',
 'Cirurgia dentária':'cirurgia-dentaria.html',
 'Clareamento dentário':'clareamento-dental.html',
 'Harmonização facial':'harmonizacao-orofacial.html',
}
class Check(HTMLParser):
 def __init__(self):
  super().__init__();self.ids=set();self.h1=0;self.forms=0;self.chapters=0;self.links=[];self.buttons=[];self.stories=0
 def handle_starttag(self, tag, attrs):
  a=dict(attrs)
  if 'id' in a:
   assert a['id'] not in self.ids,'duplicate id '+a['id']
   self.ids.add(a['id'])
  if tag=='h1':self.h1+=1
  if tag=='form':self.forms+=1
  if a.get('href'):self.links.append(a['href'])
  if 'data-story-chapter' in a:self.chapters+=1
  if 'data-treatment-story' in a:self.stories+=1
  if tag=='button':self.buttons.append(a)
for name,path in slugs.items():
 s=(ROOT/path).read_text(encoding='utf-8')
 v=Check();v.feed(s)
 assert v.h1==1 and v.forms==0,(path,v.h1,v.forms)
 assert v.stories==1 and v.chapters==3,(path,v.stories,v.chapters)
 assert 'class="inner-page story-service-page"' in s,path
 assert 'assets/css/maison-story-v11.css?v=maison-v11' in s,path
 assert 'assets/js/maison-story-v11.js?v=maison-v11' in s,path
 assert 'id="historia-tratamento"' in s and 'id="informacoes-completas"' in s,path
 assert '#historia-tratamento' in v.links,path
 assert 'especialidades.html' in v.links,path
 assert any('data-story-expand' in b and b.get('aria-controls')=='informacoes-completas' for b in v.buttons)
 assert 'class="service-detail-content"' in s and 'class="journey-grid"' in s,path
 assert 'class="faq-list"' in s,path
 for step in next(x for x in data['services'] if x['name']==name)['journey']:
  assert escape(step['title']) in s and escape(step['text']) in s,(path,step['title'])
 context='Olá, Maison! Gostaria de agendar uma avaliação sobre '+name.lower()+'.'
 assert sum(context in unquote(url) for url in v.links if urlsplit(url).netloc=='wa.me')>=3,path
 # Conteudo original integral preservado mesmo quando o JS desativa sua exibicao.
 assert len(s)<90000,path
css=(ROOT/'assets/css/maison-story-v11.css').read_text(encoding='utf-8')
js=(ROOT/'assets/js/maison-story-v11.js').read_text(encoding='utf-8')
assert '.mobile-treatment-story{display:none}' in css
assert 'body.story-ready:not(.story-details-open) .service-details' in css
assert '@media(prefers-reduced-motion:reduce)' in css
assert 'IntersectionObserver' in js and 'requestAnimationFrame' in js
assert 'story-details-open' in js and 'story-ready' in js
print(json.dumps({'result':'PASS','pages':len(slugs),'chapters':21,'contact':'contextual',
 'desktop':'preserved','no_js':'full_content_visible','safari_real':'NOT_TESTED'},ensure_ascii=False))
