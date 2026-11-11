"""Static regression checks; run from any directory with Python 3."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json, re
ROOT=Path(__file__).resolve().parents[1]
class Page(HTMLParser):
 def __init__(self):
  super().__init__();self.ids=set();self.refs=[];self.h1=0;self.forms=0;self.meta={};self.title='';self.in_title=False;self.jsonld=[];self.in_json=False;self.jsontext=''
 def handle_starttag(self,t,attrs):
  a=dict(attrs)
  if t=='h1':self.h1+=1
  if t=='form':self.forms+=1
  if 'id' in a:
   assert a['id'] not in self.ids, 'duplicate id: '+a['id']
   self.ids.add(a['id'])
  if t=='meta':self.meta[a.get('name',a.get('property',''))]=a.get('content','')
  if t=='title':self.in_title=True
  if t=='script' and a.get('type')=='application/ld+json':self.in_json=True;self.jsontext=''
  for k in ('src','href'):
   if k in a:self.refs.append(a[k])
  if t=='source' and 'srcset' in a:self.refs.extend(s.strip().split()[0] for s in a['srcset'].split(','))
 def handle_data(self,data):
  if self.in_title:self.title+=data
  if self.in_json:self.jsontext+=data
 def handle_endtag(self,t):
  if t=='title':self.in_title=False
  if t=='script' and self.in_json:self.jsonld.append(json.loads(self.jsontext));self.in_json=False
pages={p:Page() for p in ROOT.glob('*.html')}
for p,s in pages.items():s.feed(p.read_text())
titles=set();refs=0;whatsapp=0
for p,s in pages.items():
 assert s.h1==1,(p.name,'H1 count',s.h1)
 assert s.forms==0,(p.name,'unexpected form')
 assert s.title and s.title not in titles,(p.name,'missing or duplicate title')
 titles.add(s.title)
 assert 60<=len(s.meta.get('description',''))<=200,(p.name,'description length')
 assert s.meta.get('robots')=='noindex,nofollow',(p.name,'test-site indexing changed')
 assert len(s.jsonld)==1,(p.name,'missing JSON-LD')
 for v in s.refs:
  u=urlsplit(v)
  if u.netloc=='wa.me':
   whatsapp+=1;assert u.path=='/5561991434312',(p.name,'wrong WhatsApp')
  if u.scheme or u.netloc:continue
  target=p.parent/unquote(u.path) if u.path else p;refs+=1
  assert target.exists(),(p.name,'missing file',v)
  if u.fragment and target in pages:assert u.fragment in pages[target].ids,(p.name,'missing anchor',v)
for p in (ROOT/'assets/css').glob('maison.css'):
 css=re.sub(r'url\("data:[^"]*"\)', '', p.read_text())
 for v in re.findall(r'url\([\"\']?([^\)\"\']+)',css):
  if not urlsplit(v).scheme:assert (p.parent/v).exists(),('missing CSS asset',v)
home=(ROOT/'index.html').read_text()
assert home.index('</main>')<home.index('id="opening"')
assert '#conteudo:target~#opening{display:none}' in home
assert 'maison-opening-exit 2.3s both' in home
assert '100%{opacity:0;visibility:hidden;pointer-events:none}' in home
assert 'href="#conteudo" class="opening-skip">Entrar direto' in home
assert 'body.style.overflow' not in (ROOT/'assets/js/maison.js').read_text()
print(json.dumps({'pages':len(pages),'local_references':refs,'whatsapp_links':whatsapp,'result':'PASS'},ensure_ascii=False))

assert len(pages)==13
assert home.count('data-gallery data-caption')==10
assert home.count('class="plan-logo"')==5
assert home.count('class="service-card"')==7
assert '3204-3436' not in home
