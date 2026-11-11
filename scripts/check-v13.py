"""Maison V13: conteúdo factual, links contextuais, comparação e regressão mobile."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import unquote, urlsplit
from html import escape
import json

ROOT=Path(__file__).resolve().parents[1]
inventory=json.loads((ROOT/'content/maison.json').read_text(encoding='utf-8'))
compare=json.loads((ROOT/'content/maison-compare.json').read_text(encoding='utf-8'))
slugs={
 'Implante dentário':('implantes','implantes-dentarios.html'),
 'Prótese dentária':('proteses','proteses-dentarias.html'),
 'Invisalign®':('invisalign','invisalign.html'),
 'Lentes de contato dentais':('lentes','lentes-de-contato-dental.html'),
 'Cirurgia dentária':('cirurgia','cirurgia-dentaria.html'),
 'Clareamento dentário':('clareamento','clareamento-dental.html'),
 'Harmonização facial':('harmonizacao','harmonizacao-orofacial.html')
}
class Extract(HTMLParser):
 def __init__(self):
  super().__init__();self.ids=set();self.q=0;self.tabs=[];self.panels=[];self.links=[];self.forms=0;self.h1=0
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='h1':self.h1+=1
  if tag=='form':self.forms+=1
  if 'id' in a:
   assert a['id'] not in self.ids,a['id']
   self.ids.add(a['id'])
  if a.get('href'):self.links.append(a['href'])
  if 'data-compare-tab' in a:
   self.tabs.append((a['data-compare-tab'],a.get('id'),a.get('aria-controls')))
  if 'data-compare-panel' in a:
   self.panels.append((a['data-compare-panel'],a.get('id'),a.get('aria-labelledby'),a.get('hidden')))
  if tag=='section' and 'story-quickfaq' in a.get('class',''):self.q+=1

faq_total=0
for name,(ident,path) in slugs.items():
 html=(ROOT/path).read_text(encoding='utf-8')
 info=Extract();info.feed(html)
 source=next(x for x in inventory['services'] if x['name']==name)
 assert info.forms==0 and info.h1==1,path
 assert info.q==1,path
 assert 'maison-v13.css?v=maison-v13' in html,path
 assert 'maison-compare-v13.js?v=maison-v13' in html,path
 assert 'data-return-to-quiz' in html,path
 assert 'data-story-expand' in html and 'id="informacoes-completas"' in html,path
 for faq in source['faqs'][:3]:
  assert escape(faq['question'],quote=True) in html,path
  assert escape(faq['answer'],quote=True) in html,path
  faq_total+=1
 found=next((pair for pair in compare['pairs'] if ident in [x['id'] for x in pair['services']]),None)
 if found:
  assert len(info.tabs)==2 and len(info.panels)==2,path
  assert 'data-care-compare' in html
  for key,tid,controls in info.tabs:
   assert tid=='compare-tab-'+key and controls=='compare-'+key,path
  for key,pid,label,hidden in info.panels:
   assert pid=='compare-'+key and label=='compare-tab-'+key and hidden is None,path
  for x in found['services']:
   assert escape(x['summary']) in html and escape(x['detail']) in html,path
 else:
  assert len(info.tabs)==0 and len(info.panels)==0,path
  assert 'data-care-compare' not in html,path
 context='Olá, Maison! Gostaria de agendar uma avaliação sobre '+name.lower()+'.'
 footer=html.split('<div class="contact-float">',1)[-1]
 assert footer!=html,path
 assert sum(context in unquote(link) for link in info.links if urlsplit(link).netloc=='wa.me')>=3,path
 # Os dois links fixos/floating devem ser sobre o tratamento, não genéricos
 assert footer.count('https://wa.me/5561991434312?text=')==2,path
 assert all(context in unquote(link) for link in [
   link for link in info.links if urlsplit(link).netloc=='wa.me'
   and link in footer]),path

specialties=(ROOT/'especialidades.html').read_text(encoding='utf-8')
assert 'maison-mobile-quiz.js?v=maison-v13' in specialties
assert 'data-mobile-care-wizard' in specialties
quiz=(ROOT/'assets/js/maison-mobile-quiz.js').read_text()
assert 'history.replaceState' in quiz and 'history?.state?.maisonCare' in quiz
assert 'sessionStorage.getItem(' not in quiz and 'sessionStorage.setItem(' not in quiz
assert 'localStorage.getItem(' not in quiz and 'localStorage.setItem(' not in quiz
js=(ROOT/'assets/js/maison-compare-v13.js').read_text()
assert 'data-return-to-quiz' in js and 'previous.origin === current.origin' in js
assert '@media(max-width:720px)' in (ROOT/'assets/css/maison-v13.css').read_text()
print(json.dumps({'status':'PASS','pages':len(slugs),'quick_faqs':faq_total,'compare_pages':4,
 'whatsapp_footer':'contextual','continuity':'history_state','safari_physical':'NOT_TESTED'},ensure_ascii=False))
