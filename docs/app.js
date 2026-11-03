import {pages} from './content.js';
const sections=pages.map(page=>document.getElementById(page.id));
const dots=document.querySelector('#tour-dots');
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
let current=0,transition=0;
let motionController=null;
const curtain=document.createElement('div');
curtain.className='transition-shutter';curtain.hidden=true;curtain.setAttribute('aria-hidden','true');
document.querySelector('main').append(curtain);
function clearMotion(){
 motionController?.abort();motionController=null;
 sections.forEach(section=>section.classList.remove('motion-enter','motion-exit'));
 curtain.hidden=true;curtain.classList.remove('motion-cover','motion-reveal');
 document.body.classList.remove('is-changing-page');
}
function waitForMotion(element,duration,signal){
 return new Promise(resolve=>{
  let timer;
  const finish=()=>{clearTimeout(timer);element?.removeEventListener('animationend',onEnd);signal?.removeEventListener('abort',finish);resolve();};
  const onEnd=event=>{if(event.target===element)finish();};
  element?.addEventListener('animationend',onEnd);signal?.addEventListener('abort',finish,{once:true});
  timer=setTimeout(finish,duration+50);if(signal?.aborted)finish();
 });
}
const siteRoot=new URL('.',document.baseURI);
document.querySelector('base').href=siteRoot.href;
const pagePath=page=>new URL(page.path.slice(1),siteRoot).pathname;
const routeIndex=()=>Math.max(0,pages.findIndex(page=>pagePath(page)===(location.pathname.replace(/index\.html$/,'').endsWith('/')?location.pathname.replace(/index\.html$/,''):`${location.pathname}/`)));
pages.forEach((page,index)=>{
 const button=document.createElement('button');button.textContent=String(index+1).padStart(2,'0');
 button.setAttribute('aria-label',`${index+1}. ${page.label}`);button.addEventListener('click',()=>navigate(index));dots.append(button);
});
function showPage(index){
 current=index;
 sections.forEach((section,i)=>{section.hidden=i!==index;section.inert=i!==index;section.classList.toggle('is-active',i===index);section.classList.remove('motion-exit','motion-enter');section.setAttribute('aria-hidden',String(i!==index));});
 [...dots.children].forEach((dot,i)=>i===index?dot.setAttribute('aria-current','true'):dot.removeAttribute('aria-current'));
 document.querySelector('#tour-counter').textContent=`${String(index+1).padStart(2,'0')} / 06`;
 document.querySelector('#tour-title').textContent=pages[index].label;
 document.querySelector('#tour-prev').disabled=index===0;
 document.querySelector('#tour-next').disabled=index===pages.length-1;
 document.querySelector('#tour-next-text').disabled=index===pages.length-1;
 document.querySelector('#page-progress').style.width=`${(index+1)/pages.length*100}%`;
 document.body.dataset.page=pages[index].id;document.title=`${pages[index].label} — Ars Romana · Artes · 9º ano`;
 document.querySelectorAll('.site-header a[data-page]').forEach(link=>Number(link.dataset.page)===index?link.setAttribute('aria-current','page'):link.removeAttribute('aria-current'));
 window.dispatchEvent(new CustomEvent('museum:pagechange',{detail:{index}}));
}
async function navigate(index,{historyMode='push',animate=true}={}){
 index=Math.max(0,Math.min(pages.length-1,index));
 const version=++transition,previous=current;clearMotion();if(index===current)return;
 const animated=animate&&!reducedMotion.matches;
 document.documentElement.dataset.motionDirection=index>current?'forward':'backward';
 const controller=new AbortController();motionController=controller;
 if(animated){
  document.body.classList.add('is-changing-page');
  sections[current].classList.add('motion-exit');curtain.hidden=false;curtain.classList.add('motion-cover');
  await waitForMotion(curtain,450,controller.signal);if(version!==transition)return;
 }
 showPage(index);if(historyMode==='push')history.pushState({page:index},'',pagePath(pages[index]));
 if(animated){sections[index].classList.add('motion-enter');curtain.classList.replace('motion-cover','motion-reveal');}
 const focus=document.activeElement;if(focus&&sections[previous].contains(focus)){sections[index].setAttribute('tabindex','-1');sections[index].focus({preventScroll:true});}
 if(animated){await Promise.all([waitForMotion(curtain,620,controller.signal),waitForMotion(null,1120,controller.signal)]);if(version!==transition)return;}
 clearMotion();
}
showPage(routeIndex());
if(!reducedMotion.matches){sections[current].classList.add('motion-enter');setTimeout(()=>{if(transition===0)sections[current].classList.remove('motion-enter');},1200);}
reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches)clearMotion();});
document.querySelectorAll('a[data-page]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();navigate(Number(link.dataset.page));}));
document.querySelectorAll('[data-start]').forEach(button=>button.addEventListener('click',()=>navigate(1)));
document.querySelectorAll('[data-restart]').forEach(button=>button.addEventListener('click',()=>navigate(0)));
document.querySelector('#tour-prev').addEventListener('click',()=>navigate(current-1));
document.querySelector('#tour-next').addEventListener('click',()=>navigate(current+1));
document.querySelector('#tour-next-text').addEventListener('click',()=>navigate(current+1));
window.addEventListener('popstate',()=>navigate(routeIndex(),{historyMode:'none'}));
document.addEventListener('keydown',event=>{
 if(document.querySelector('dialog[open]')||event.target.closest('input,textarea,select,model-viewer,[data-gallery],summary'))return;
 if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();navigate(current+(event.key==='ArrowRight'?1:-1));}
 if(event.key==='Home'){event.preventDefault();navigate(0);}if(event.key==='End'){event.preventDefault();navigate(5);}
});
let swipe=null;
document.querySelector('main').addEventListener('touchstart',event=>{swipe=event.target.closest('model-viewer,[data-gallery],button,a')?null:{x:event.changedTouches[0].clientX,y:event.changedTouches[0].clientY};},{passive:true});
document.querySelector('main').addEventListener('touchend',event=>{if(!swipe)return;const dx=swipe.x-event.changedTouches[0].clientX,dy=swipe.y-event.changedTouches[0].clientY;if(Math.abs(dx)>65&&Math.abs(dx)>Math.abs(dy)*1.5)navigate(current+(dx>0?1:-1));swipe=null;},{passive:true});
document.querySelectorAll('[data-credits]').forEach(button=>button.addEventListener('click',()=>document.querySelector('#credits-dialog').showModal()));
const dialog=document.querySelector('#detail-dialog'),photo=document.querySelector('#detail-photo');let zoom=1;
const artifacts={
 mosaic:{src:'assets/mosaic.webp',category:'PINTURAS E MOSAICOS',title:'Mosaico das pombas',description:'Observe como pequenas tesselas formam contornos, sombras e detalhes. O mosaico das pombas veio da Villa Adriana e está nos Musei Capitolini, em Roma.',credit:'Villa Adriana · século II d.C. · Musei Capitolini. Fotografia: Carole Raddato · CC BY-SA 2.0.'},
 bust:{src:'assets/roman-bust.webp',category:'ESCULTURAS E IDENTIDADE',title:'Retrato de Caracalla',description:'Observe o cabelo, o olhar e o trabalho do escultor sobre a superfície do mármore.',credit:'Romano · 212–217 d.C. · The Metropolitan Museum of Art, 40.11.1a · CC0.'}
};
function updateZoom(){photo.style.transform=`scale(${zoom})`;document.querySelector('#zoom-label').textContent=`${Math.round(zoom*100)}%`;document.querySelector('#zoom-out').disabled=zoom<=1;document.querySelector('#zoom-in').disabled=zoom>=3;}
document.querySelectorAll('[data-detail]').forEach(button=>button.addEventListener('click',()=>{const item=artifacts[button.dataset.detail];photo.src=item.src;photo.alt=item.title;document.querySelector('#detail-category').textContent=item.category;document.querySelector('#detail-title').textContent=item.title;document.querySelector('#detail-description').textContent=item.description;document.querySelector('#detail-credit').textContent=item.credit;zoom=1;updateZoom();dialog.showModal();}));
document.querySelector('#zoom-out').addEventListener('click',()=>{zoom=Math.max(1,zoom-.25);updateZoom();});document.querySelector('#zoom-in').addEventListener('click',()=>{zoom=Math.min(3,zoom+.25);updateZoom();});document.querySelector('#zoom-reset').addEventListener('click',()=>{zoom=1;updateZoom();});
document.querySelectorAll('dialog').forEach(modal=>modal.addEventListener('click',event=>{if(event.target!==modal)return;const r=modal.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)modal.close();}));
