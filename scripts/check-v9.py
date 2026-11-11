"""Regressoes de estrutura e dados para a experiencia Maison V9.
Valida o HTML gerado, nao simula clique ou Safari real."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, parse_qs, unquote
import json

ROOT=Path(__file__).resolve().parents[1]
source=json.loads((ROOT/'content/concierge.json').read_text(encoding='utf-8'))
page=(ROOT/'especialidades.html').read_text(encoding='utf-8')
assert len(source['categories'])==4, "Expected four care categories"

class Review(HTMLParser):
 def __init__(self):
  super().__init__()
  self.tabs=[];self.panels=[];self.targets=set();self.links=[];self.images=[];self.forms=0;self.start_section=False
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='form':self.forms+=1
  if a.get('id'):self.targets.add(a['id'])
  if 'data-concierge-tab' in a:self.tabs.append((a['data-concierge-tab'],a.get('href')))
  if 'data-concierge-panel' in a:self.panels.append((a['data-concierge-panel'],a.get('id'),a.get('aria-labelledby')))
  if a.get('href'):self.links.append(a['href'])
  if tag=='img':self.images.append((a.get('src'),a.get('alt'),a.get('width'),a.get('height')))
v=Review();v.feed(page)
assert not v.forms, "Unexpected form"
expected=[x['id'] for x in source['categories']]
assert [x[0] for x in v.tabs]==expected,v.tabs
assert [x[0] for x in v.panels]==expected,v.panels
assert len(v.panels)==4
assert all(link==f'#concierge-{ident}' for ident,link in v.tabs)
assert all(id==f'concierge-{ident}' and label==f'concierge-heading-{ident}' for ident,id,label in v.panels)
assert all(f'concierge-heading-{ident}' in v.targets for ident in expected)
assert 'class="service-grid-heading" id="todos-tratamentos"' in page
assert page.count('class="service-card"')==7
assert page.count('class="service-card service-card-consult"')==1
assert 'data-concierge-counter' in page
assert 'assets/css/maison-v9.css?v=maison-v9' in page
assert 'assets/js/maison-concierge.js?v=maison-v9' in page
assert (ROOT/'assets/css/maison-v9.css').is_file()
assert (ROOT/'assets/js/maison-concierge.js').is_file()
assert 'hidden' not in [a[0] for a in v.panels], "All panels should be accessible without JS"
for group in source['categories']:
 assert group['choice_title'] in page,group['id']
 assert group['headline'] in page,group['id']
 assert any(src=='assets/img/'+group['image'] and alt for src,alt,*_ in v.images),group['image']
 for label in group['treatments']:
  links={
    'implantes':'implantes-dentarios.html',
    'proteses':'proteses-dentarias.html',
    'invisalign':'invisalign.html',
    'lentes':'lentes-de-contato-dental.html',
    'clareamento':'clareamento-dental.html',
    'cirurgia':'cirurgia-dentaria.html',
    'harmonizacao':'harmonizacao-orofacial.html'
  }
  assert links[label] in v.links,label
 assert any(group['whatsapp_message'] in unquote(link) for link in v.links if link.startswith('https://wa.me/')),group['id']
assert 'Outros cuidados e harmonização facial' in page
print(json.dumps({'result':'PASS','care_choices':4,'panels':4,'service_cards':7,'whatsapp':'contextual','no_js':'panels_not_hidden_by_default','browser':'NOT_TESTED'},ensure_ascii=False))
