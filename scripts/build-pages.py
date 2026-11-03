from pathlib import Path
import re
root=Path(__file__).resolve().parents[1]/'docs'
source=(root/'index.html').read_text()
routes=[('cotidiano','cotidiano',1),('arquitetura','arquitetura',2),('mosaicos','mosaicos',3),('esculturas','esculturas',4),('projeto','encerramento',5)]
for page,route,index in routes:
 text=source.replace('<base href="./">','<base href="../">')
 text=text.replace('data-page="inicio"','data-page="'+page+'"')
 text=text.replace('class="hero exhibit is-active"','class="hero exhibit"')
 text=text.replace('id="inicio" data-section','id="inicio" hidden inert aria-hidden="true" data-section')
 text=text.replace('id="'+page+'" hidden inert aria-hidden="true"','id="'+page+'"')
 text=re.sub(r'(<section class=")([^"\n]+)(" id="'+page+'")',lambda m:m.group(1)+m.group(2)+' is-active'+m.group(3),text)
 d=root/route;d.mkdir(exist_ok=True);(d/'index.html').write_text(text)
print('Created five routes plus the opening page')
