const readline=require('readline');

const x=readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

x.question('String one ', (s1) =>{
  x.question( 'String two ',(s2)=>{
    console.log(s1.length);
    console.log(s2.length);
    const ans=lcs(s1,s2);
    console.log(ans);
    x.close();
  })
})

var lcs=function(s1,s2){
  const dp=new Array(s1.length+1);
  for(let i=0;i<dp.length;i++){
    dp[i]=new Array(s2.length+1).fill(-1);
  }
  return solve(s1,0,s2,0,dp);
}

function solve(s1,i,s2,j,dp){
  if(i==s1.length || j==s2.length){
    return 0;
  }
  if(dp[i][j]!=-1){
    return dp[i][j];
  }

  let help=0;

  if(s1[i]===s2[j]){
    help=1 + solve(s1,i+1,s2,j+1,dp);
  }else{
    help=Math.max(solve(s1,i+1,s2,j,dp),solve(s1,i,s2,j+1,dp));
  }
  return dp[i][j]=help;
}
