"""Cheque de regressao da composicao minimalista V12.
Nao substitui teste de toque/contraste no Safari real."""
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
class Page(HTMLParser):
 def __init__(self):
  super().__init__()
  self.ids=set();self.forms=0;self.h1=0;self.hrefs=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='h1': self.h1+=1
  if tag=='form': self.forms+=1
  if a.get('id'):
   assert a['id'] not in self.ids,a['id']
   self.ids.add(a['id'])
  if a.get('href'):self.hrefs.append(a['href'])

css=(ROOT/'assets/css/maison-compact-v12.css').read_text(encoding='utf-8')
assert '@media (max-width:720px)' in css
assert 'min-height:48px' in css
assert '.story-chapters{gap:0;' in css
assert '.story-chapter-art{display:none}' in css
assert '@media (prefers-reduced-motion:reduce)' in css
for p,name in services.items():
 html=(ROOT/p).read_text(encoding='utf-8')
 v=Page();v.feed(html)
 assert v.forms==0 and v.h1==1,p
 assert 'assets/css/maison-story-v11.css?v=maison-v11' in html,p
 assert 'assets/css/maison-compact-v12.css?v=maison-v12' in html,p
 assert html.index('maison-story-v11.css')<html.index('maison-compact-v12.css'),p
 assert html.count('data-story-chapter')==3,p
 assert 'Seu próximo passo pode' not in html,p
 assert 'class="story-intro"' not in html,p
 assert 'COMO FUNCIONA' in html and 'Em três etapas.' in html,p
 assert 'id="historia-tratamento"' in html,p
 assert 'id="informacoes-completas"' in html,p
 assert 'Ver detalhes completos' in html,p
 assert 'class="story-ending"' in html,p
 assert 'Falar pelo WhatsApp' in html,p
 assert 'class="service-detail-content"' in html,p
 assert 'class="faq-list"' in html,p
 assert 'especialidades.html' in v.hrefs,p
quiz=(ROOT/'especialidades.html').read_text(encoding='utf-8')
source=(ROOT/'content/mobile-quiz.html').read_text(encoding='utf-8')
assert quiz.count(source)==1
assert '2 passos simples' not in source
assert quiz.count('data-choose-care=')==4 and quiz.count('data-wizard-service=')==7
assert quiz.index('maison-mobile-quiz.css')<quiz.index('maison-compact-v12.css')
assert 'Outros cuidados e harmonização facial' in quiz
assert ('assets/js/maison-mobile-quiz.js?v=maison-v10' in quiz or 'assets/js/maison-mobile-quiz.js?v=maison-v13' in quiz)
print(json.dumps({'status':'PASS','service_pages':7,'chapters':21,'quiz_categories':4,'quiz_services':7,
 'css':'mobile_compact','source_sync':'requires_git_diff','browser':'NOT_TESTED'},ensure_ascii=False))
