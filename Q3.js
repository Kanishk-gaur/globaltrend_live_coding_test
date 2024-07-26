const readline=require('readline');
const r1=readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

let w, n;
let wt=[];
let val=[];

r1.question('Enter the number of items: ',(items)=>{
  n=parseInt(items);
  r1.question('Enter the weight',(weights)=>{
    wt=weights.split(' ').map(Number);
    r1.question('Enter the values',(values)=>{
      val=values.split(' ').map(Number);
      r1.question('Enter Capacity ', (capacity)=>{
        w=parseInt(capacity);
        let solution=new Solution();
        console.log(solution.knapSack(w, n, wt, val));
        r1.close();
      })
    })
  })
})

class Solution{

  solve(w,wt,val,n,dp){
    if(n==0){
      if(wt[0]<w){
        return val[0];
      }else{
        return 0;
      }
    }

    if(dp[n][w]!==-1){
      return dp[n][w];
    }
    let help=0;
    if(wt[n]<w){
      help=val[n]+this.solve(w-wt[n],wt,val,n-1,dp);
    }

    let help2=this.solve(w,wt,val,n-1,dp);

    dp[n][w]=Math.max(help,help2);
    return dp[n][w];
  }
  
  knapSack(w, n, wt, val){
    let dp=Array.from({length:n},()=>Array(w+1).fill(-1));
    let ans=this.solve(w,wt,val,n-1,dp);
    return ans;
  }
}
