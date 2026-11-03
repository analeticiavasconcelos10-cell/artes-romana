export const pages = [
 {id:'inicio',path:'/',label:'Abertura'},
 {id:'cotidiano',path:'/cotidiano/',label:'Arte no cotidiano'},
 {id:'arquitetura',path:'/arquitetura/',label:'Arquitetura'},
 {id:'mosaicos',path:'/mosaicos/',label:'Pinturas e mosaicos'},
 {id:'esculturas',path:'/esculturas/',label:'Esculturas'},
 {id:'projeto',path:'/encerramento/',label:'Encerramento'}
];
export const presenters = ['Leticia','Enzo','beatriz','mayra','Gabriel'];
export const subject = 'Artes · 9º ano';
export const speeches = [
 'Quando pensamos em arte romana, normalmente lembramos de grandes estátuas e monumentos. Mas a arte estava muito mais presente no cotidiano dos romanos, aparecendo desde suas casas até objetos utilizados no dia a dia.',
 'A arquitetura era uma das formas mais visíveis da presença romana. Construções como o Coliseu, as termas e os aquedutos não serviam apenas como monumentos: elas faziam parte da rotina e da vida social da população.',
 'A arte também fazia parte do interior das casas. Os romanos utilizavam pinturas e mosaicos para decorar seus ambientes e representar diferentes aspectos da vida, da natureza e da mitologia.',
 'As esculturas também tinham uma função social. Elas representavam deuses, autoridades e pessoas importantes, ajudando a mostrar religião, identidade, posição social e poder.'
];
export const models = {
 arch:{name:'Arco romano',short:'Arco',file:'models/arco-romano.glb',orbit:'0deg 75deg auto'},
 statue:{name:'Estátua romana',short:'Estátua',file:'models/estatua-romana.glb',orbit:'0deg 78deg auto'},
 column:{name:'Coluna romana',short:'Coluna',file:'models/coluna-romana.glb',orbit:'0deg 78deg auto'},
 colosseum:{name:'Coliseu',short:'Coliseu',file:'models/coliseu.glb',orbit:'30deg 65deg auto'},
 coin:{name:'Moeda romana',short:'Moeda',file:'models/moeda-romana.glb',orbit:'90deg 78deg auto'},
 bust:{name:'Busto romano',short:'Busto',file:'models/busto-romano.glb',orbit:'0deg 78deg auto'},
 temple:{name:'Templo romano',short:'Templo',file:'models/templo-romano.glb',orbit:'25deg 65deg auto'},
 pedestal:{name:'Estátua em pedestal',short:'Em pedestal',file:'models/estatua-pedestal.glb',orbit:'0deg 78deg auto'},
 scan:{name:'Retrato romano anônimo',short:'Acervo real',file:'assets/roman-bust.glb',orbit:'0deg 78deg auto',scan:true}
};
export const galleries = {cotidiano:['statue','coin','column','arch','colosseum','bust','temple','pedestal'],arquitetura:['colosseum','arch','column','temple'],esculturas:['bust','statue','pedestal','scan']};
