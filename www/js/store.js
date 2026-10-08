const S={d:{},
init(){try{this.d=JSON.parse(localStorage.getItem("g0cns")||"{}")}catch(e){this.d={}}},
g(id){return this.d[id]||(this.d[id]={best:0,last:0,plays:0,time:0,state:null})},
save(){try{localStorage.setItem("g0cns",JSON.stringify(this.d))}catch(e){}}};
S.init();
