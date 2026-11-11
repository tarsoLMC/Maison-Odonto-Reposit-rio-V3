"""Quick audit V17: context-aware header WhatsApp and useful hero alt.
Static regression checks only; no claim of browser/Hostinger testing."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import json

ROOT=Path(__file__).resolve().parents[1]
names={
 'implantes-dentarios.html':'Implante dentário',
 'proteses-dentarias.html':'Prótese dentária',
 'invisalign.html':'Invisalign®',
 'lentes-de-contato-dental.html':'Lentes de contato dentais',
 'cirurgia-dentaria.html':'Cirurgia dentária',
 'clareamento-dental.html':'Clareamento dentário',
 'harmonizacao-orofacial.html':'Harmonização facial',
}
class Tags(HTMLParser):
 def __init__(self):
  super().__init__();self.links=[];self.images=[]
 def handle_starttag(self,t,attrs):
  a=dict(attrs)
  if t=='a' and a.get('href'):self.links.append(a['href'])
  if t=='img':self.images.append(a)
for file,name in names.items():
 html=(ROOT/file).read_text(encoding='utf-8')
 header, rest=html.split('</header>',1)
 tag=Tags();tag.feed(header)
 message='Olá, Maison! Gostaria de agendar uma avaliação sobre '+name.lower()+'.'
 contact=[url for url in tag.links if urlsplit(url).netloc=='wa.me']
 assert len(contact)==2,(file,'header contact count',len(contact))
 assert all(message in unquote(url) for url in contact),(file,'non-specific header links')
 hero=rest.split('class="page-hero',1)[1].split('</section>',1)[0]
 image=Tags();image.feed(hero)
 assert len(image.images)==1,(file,'hero image count')
 assert image.images[0]['alt']=='Imagem ilustrativa relacionada a '+name.lower(),(file,'generic alt')
 assert image.images[0].get('loading')=='eager' and image.images[0].get('fetchpriority')=='high'
 assert '<span class="page-photo-label">Imagem ilustrativa</span>' in hero,(file,'visible photo label changed')
 assert 'noindex,nofollow' in html,(file,'staging SEO changed')
# Non-treatment pages must retain their general appointment link.
home=(ROOT/'index.html').read_text(encoding='utf-8')
head=home.split('</header>',1)[0]
assert 'Gostaria%20de%20agendar%20uma%20consulta.' in head, 'Homepage header changed'
assert (ROOT/'robots.txt').read_text(encoding='utf-8').startswith('User-agent: *\nDisallow: /')
assert 'cornflowerblue-reindeer-259674.hostingersite.com' in (ROOT/'sitemap.xml').read_text()
print(json.dumps({'result':'PASS','header_context_pages':7,'header_links':14,'descriptive_hero_alt':7,
 'staging_indexing':'unchanged','browser':'NOT_TESTED'},ensure_ascii=False))
