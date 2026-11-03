import {ModelViewerElement} from './assets/model-viewer.min.js';
import {models,galleries} from './content.js';
ModelViewerElement.dracoDecoderLocation=new URL('./assets/draco/',import.meta.url).href;
ModelViewerElement.meshoptDecoderLocation=new URL('./assets/meshopt_decoder.module.js',import.meta.url).href;
ModelViewerElement.modelCacheSize=1;
const viewer=document.createElement('model-viewer');
for(const [key,value] of Object.entries({'camera-controls':'','touch-action':'none','shadow-intensity':'1','shadow-softness':'.85','exposure':'1.1','min-camera-orbit':'auto 5deg 35%','max-camera-orbit':'auto 175deg 250%','interaction-prompt':'none','loading':'eager'}))viewer.setAttribute(key,value);
const status=document.createElement('span');status.className='model-status';status.setAttribute('role','status');
const selected={cotidiano:0,arquitetura:0,esculturas:0};let activeStage=null;
function setModel(key){
 if(!activeStage)return;const item=models[key];
 activeStage.querySelector('[data-model-name]').textContent=item.name;activeStage.querySelector('[data-model-kind]').textContent=item.scan?'RETRATO HISTÓRICO · 3D':'ARTE ROMANA · 3D';activeStage.querySelector('.model-error')?.remove();
 viewer.alt=`${item.name}, modelo 3D interativo. Arraste para girar em 360 graus e use os controles para ajustar o zoom.`;
 viewer.cameraOrbit=item.orbit;viewer.cameraTarget='auto auto auto';activeStage.dataset.model=key;
 activeStage.querySelectorAll('[data-pick]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.pick===key)));
 document.querySelectorAll('[data-architecture-model]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.architectureModel===key)));
 const wanted=new URL(item.file,document.baseURI).href;if(viewer.src===wanted){status.textContent='';return;}
 status.textContent=`Carregando ${item.name.toLowerCase()}…`;viewer.style.opacity='0';viewer.src=wanted;
}
function activateGallery(){
 const section=document.querySelector('.exhibit.is-active');activeStage=section?.querySelector('[data-gallery]')||null;
 if(!activeStage){viewer.pause();return;}
 activeStage.querySelector('.gallery-canvas').append(viewer,status);const group=activeStage.dataset.gallery;setModel(galleries[group][selected[group]]);
}
viewer.addEventListener('load',()=>{status.textContent='';viewer.style.opacity='1';});
viewer.addEventListener('error',()=>{status.textContent='';if(!activeStage)return;const failed=document.createElement('div');failed.className='model-error';failed.innerHTML='<div><p>Não foi possível abrir este modelo.</p><button class="button button-light" type="button">Tentar novamente</button></div>';failed.querySelector('button').addEventListener('click',()=>{const key=activeStage.dataset.model;viewer.removeAttribute('src');failed.remove();setModel(key);});activeStage.querySelector('.gallery-canvas').append(failed);});
document.querySelectorAll('[data-gallery]').forEach(stage=>{
 const group=stage.dataset.gallery,picks=stage.querySelector('.gallery-picks');
 galleries[group].forEach((key,index)=>{const button=document.createElement('button');button.textContent=models[key].short;button.dataset.pick=key;button.setAttribute('aria-label',`Explorar ${models[key].name}`);button.setAttribute('aria-pressed','false');button.addEventListener('click',()=>{selected[group]=index;activeStage=stage;setModel(key);});picks.append(button);});
 function step(direction){const list=galleries[group];selected[group]=(selected[group]+direction+list.length)%list.length;setModel(list[selected[group]]);}
 stage.querySelector('[data-object-prev]').addEventListener('click',()=>step(-1));stage.querySelector('[data-object-next]').addEventListener('click',()=>step(1));
 stage.querySelector('[data-model-zoom-in]').addEventListener('click',()=>zoom(.8));stage.querySelector('[data-model-zoom-out]').addEventListener('click',()=>zoom(1.2));stage.querySelector('[data-model-reset]').addEventListener('click',()=>{viewer.cameraOrbit=models[stage.dataset.model].orbit;viewer.cameraTarget='auto auto auto';});
 stage.addEventListener('keydown',event=>{if(event.target.closest('model-viewer'))return;if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();event.stopPropagation();step(event.key==='ArrowRight'?1:-1);}});
});
function zoom(factor){if(!viewer.loaded)return;const orbit=viewer.getCameraOrbit();viewer.cameraOrbit=`${orbit.theta}rad ${orbit.phi}rad ${orbit.radius*factor}m`;}
function showArchitecture(mode){
 const photo=document.querySelector('#architecture-photo'),stage=document.querySelector('#architecture-gallery');photo.hidden=mode!=='photo';stage.hidden=mode!=='model';
 document.querySelectorAll('[data-architecture-view]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.architectureView===mode)));if(mode==='model')activateGallery();
}
document.querySelectorAll('[data-architecture-model]').forEach(button=>button.addEventListener('click',()=>{const key=button.dataset.architectureModel;selected.arquitetura=galleries.arquitetura.indexOf(key);showArchitecture('model');setModel(key);}));
document.querySelectorAll('[data-architecture-view]').forEach(button=>button.addEventListener('click',()=>showArchitecture(button.dataset.architectureView)));
window.addEventListener('museum:pagechange',activateGallery);activateGallery();
