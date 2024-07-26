const readline = require('readline');

class pair{
  constructor(first, second){
    this.first = first;
    this.second = second;
  }
}

const infi=1e9;

class Node{
  constructor(vertexNumber){
    this.vertexNumber = vertexNumber;
    this.childern = [];
  }
 addChild(vNumber,length){
   const p=new pair(vNumber,length);
   this.childern.push(p);
 }
}

const r1=readline.createInterface({
  input:process.stdin,
  output:process.stdout
})


r1.question('Enter the number of edges: ',(edges)=>{
  const e=parseInt(edges);
  let edgeCount=0;
  r1.on('line',(line)=>{
    const [src,des,weight] = line.split(' ').map(Number);
    v[src].addchild(des,weight);
    edgeCount++;
    if(edgeCount===e){
      r1.question('Enter the source vertex: ',(source)=>{
        const s=parseInt(source);
        let path=Array(v.length).fill(-1);
        let dist= help(v,s,path);

        for(let i=0;i<dist.length;i++){
          if(dist[i]===infi){
            console.log('not connected')
            continue;
          }
          console.log(i,dist[i]);
          
        }
        r1.close();
      })
    }
  })
})


function help(g,s,path){
  const dist=Array(g.length).fill(infi);
  const visited=Array(g.length).fill(false);
  for(let i=0;i<g.length;i++){
    path[i]=-1;
  }
  dist[s]=0;
  path[s]=-1;
  let current=s;
  const sett=new Set();
  while(true){
    visited[current]=true;
    for(let i=0;i<g[current].childern.length;i++){
      const v=g[current].childern[i];
      if(visited[v.first]){
        continue;
      }
      sett.add(v);
      const alt=dist[current]+v.second;
      if(alt<dist[v.first]){
        dist[v.first]=alt;
        path[v.first]=current;
      }
    }
    sett.delete(current);
    if(sett.size===0) break;
    let mind=infi;
    let index=0;
    for(let i=0;i<sett.length;i++){
      if(dist[sett[i]]<mind){
        mind=dist[sett[i]];
        index=i;
      }
    }
    current=index;
    
  }
  return dist;
}
