(self.webpackChunkrv=self.webpackChunkrv||[]).push([[555],{685:(r,t,a)=>{"use strict";a.d(t,{Ib:()=>n,WT:()=>o});var n=1e-6,o="undefined"!=typeof Float32Array?Float32Array:Array;Math.random,Math.PI,Math.hypot||(Math.hypot=function(){for(var r=0,t=arguments.length;t--;)r+=arguments[t]*arguments[t];return Math.sqrt(r)})},600:(r,t,a)=>{"use strict";a.d(t,{Ue:()=>o});var n=a(685);function o(){var r=new n.WT(9);return n.WT!=Float32Array&&(r[1]=0,r[2]=0,r[3]=0,r[5]=0,r[6]=0,r[7]=0),r[0]=1,r[4]=1,r[8]=1,r}},975:(r,t,a)=>{"use strict";a.d(t,{JG:()=>o,yR:()=>e,U_:()=>f,Jp:()=>i,yl:()=>u,i0:()=>h,j6:()=>s,en:()=>c});var n=a(685);function o(r,t){return r[0]=t[0],r[1]=t[1],r[2]=t[2],r[3]=t[3],r[4]=t[4],r[5]=t[5],r[6]=t[6],r[7]=t[7],r[8]=t[8],r[9]=t[9],r[10]=t[10],r[11]=t[11],r[12]=t[12],r[13]=t[13],r[14]=t[14],r[15]=t[15],r}function e(r){return r[0]=1,r[1]=0,r[2]=0,r[3]=0,r[4]=0,r[5]=1,r[6]=0,r[7]=0,r[8]=0,r[9]=0,r[10]=1,r[11]=0,r[12]=0,r[13]=0,r[14]=0,r[15]=1,r}function f(r,t){var a=t[0],n=t[1],o=t[2],e=t[3],f=t[4],i=t[5],u=t[6],h=t[7],s=t[8],c=t[9],v=t[10],l=t[11],M=t[12],d=t[13],p=t[14],b=t[15],y=a*i-n*f,w=a*u-o*f,m=a*h-e*f,g=n*u-o*i,A=n*h-e*i,q=o*h-e*u,T=s*d-c*M,I=s*p-v*M,W=s*b-l*M,k=c*p-v*d,F=c*b-l*d,x=v*b-l*p,E=y*x-w*F+m*k+g*W-A*I+q*T;return E?(E=1/E,r[0]=(i*x-u*F+h*k)*E,r[1]=(o*F-n*x-e*k)*E,r[2]=(d*q-p*A+b*g)*E,r[3]=(v*A-c*q-l*g)*E,r[4]=(u*W-f*x-h*I)*E,r[5]=(a*x-o*W+e*I)*E,r[6]=(p*m-M*q-b*w)*E,r[7]=(s*q-v*m+l*w)*E,r[8]=(f*F-i*W+h*T)*E,r[9]=(n*W-a*F-e*T)*E,r[10]=(M*A-d*m+b*y)*E,r[11]=(c*m-s*A-l*y)*E,r[12]=(i*I-f*k-u*T)*E,r[13]=(a*k-n*I+o*T)*E,r[14]=(d*w-M*g-p*y)*E,r[15]=(s*g-c*w+v*y)*E,r):null}function i(r,t,a){var n=t[0],o=t[1],e=t[2],f=t[3],i=t[4],u=t[5],h=t[6],s=t[7],c=t[8],v=t[9],l=t[10],M=t[11],d=t[12],p=t[13],b=t[14],y=t[15],w=a[0],m=a[1],g=a[2],A=a[3];return r[0]=w*n+m*i+g*c+A*d,r[1]=w*o+m*u+g*v+A*p,r[2]=w*e+m*h+g*l+A*b,r[3]=w*f+m*s+g*M+A*y,w=a[4],m=a[5],g=a[6],A=a[7],r[4]=w*n+m*i+g*c+A*d,r[5]=w*o+m*u+g*v+A*p,r[6]=w*e+m*h+g*l+A*b,r[7]=w*f+m*s+g*M+A*y,w=a[8],m=a[9],g=a[10],A=a[11],r[8]=w*n+m*i+g*c+A*d,r[9]=w*o+m*u+g*v+A*p,r[10]=w*e+m*h+g*l+A*b,r[11]=w*f+m*s+g*M+A*y,w=a[12],m=a[13],g=a[14],A=a[15],r[12]=w*n+m*i+g*c+A*d,r[13]=w*o+m*u+g*v+A*p,r[14]=w*e+m*h+g*l+A*b,r[15]=w*f+m*s+g*M+A*y,r}function u(r,t,a){var n=t[0],o=t[1],e=t[2],f=t[3],i=n+n,u=o+o,h=e+e,s=n*i,c=n*u,v=n*h,l=o*u,M=o*h,d=e*h,p=f*i,b=f*u,y=f*h;return r[0]=1-(l+d),r[1]=c+y,r[2]=v-b,r[3]=0,r[4]=c-y,r[5]=1-(s+d),r[6]=M+p,r[7]=0,r[8]=v+b,r[9]=M-p,r[10]=1-(s+l),r[11]=0,r[12]=a[0],r[13]=a[1],r[14]=a[2],r[15]=1,r}function h(r,t){return r[0]=t[12],r[1]=t[13],r[2]=t[14],r}function s(r,t){var a=new n.WT(3);!function(r,t){var a=t[0],n=t[1],o=t[2],e=t[4],f=t[5],i=t[6],u=t[8],h=t[9],s=t[10];r[0]=Math.hypot(a,n,o),r[1]=Math.hypot(e,f,i),r[2]=Math.hypot(u,h,s)}(a,t);var o=1/a[0],e=1/a[1],f=1/a[2],i=t[0]*o,u=t[1]*e,h=t[2]*f,s=t[4]*o,c=t[5]*e,v=t[6]*f,l=t[8]*o,M=t[9]*e,d=t[10]*f,p=i+c+d,b=0;return p>0?(b=2*Math.sqrt(p+1),r[3]=.25*b,r[0]=(v-M)/b,r[1]=(l-h)/b,r[2]=(u-s)/b):i>c&&i>d?(b=2*Math.sqrt(1+i-c-d),r[3]=(v-M)/b,r[0]=.25*b,r[1]=(u+s)/b,r[2]=(l+h)/b):c>d?(b=2*Math.sqrt(1+c-i-d),r[3]=(l-h)/b,r[0]=(u+s)/b,r[1]=.25*b,r[2]=(v+M)/b):(b=2*Math.sqrt(1+d-i-c),r[3]=(u-s)/b,r[0]=(l+h)/b,r[1]=(v+M)/b,r[2]=.25*b),r}function c(r,t){var a=t[0],n=t[1],o=t[2],e=t[3],f=a+a,i=n+n,u=o+o,h=a*f,s=n*f,c=n*i,v=o*f,l=o*i,M=o*u,d=e*f,p=e*i,b=e*u;return r[0]=1-c-M,r[1]=s+b,r[2]=v-p,r[3]=0,r[4]=s-b,r[5]=1-h-M,r[6]=l+d,r[7]=0,r[8]=v+p,r[9]=l-d,r[10]=1-h-c,r[11]=0,r[12]=0,r[13]=0,r[14]=0,r[15]=1,r}},945:(r,t,a)=>{"use strict";a.d(t,{Su:()=>u});var n=a(685),o=a(600),e=a(160),f=a(333);function i(){var r=new n.WT(4);return n.WT!=Float32Array&&(r[0]=0,r[1]=0,r[2]=0),r[3]=1,r}function u(r,t,a,n){var o=.5*Math.PI/180;t*=o,a*=o,n*=o;var e=Math.sin(t),f=Math.cos(t),i=Math.sin(a),u=Math.cos(a),h=Math.sin(n),s=Math.cos(n);return r[0]=e*u*s-f*i*h,r[1]=f*i*s+e*u*h,r[2]=f*u*h-e*i*s,r[3]=f*u*s+e*i*h,r}f.d9,f.al,f.JG,f.t8,f.IH,f.bA,f.AK,f.t7,f.kE,f.we;f.Fv;f.I6,f.fS,e.Ue(),e.al(1,0,0),e.al(0,1,0),i(),i(),o.Ue()},160:(r,t,a)=>{"use strict";a.d(t,{Ue:()=>o,kE:()=>e,al:()=>f,JG:()=>i,$X:()=>u,bA:()=>h,TE:()=>s,Fv:()=>c,AK:()=>v,kC:()=>l,fF:()=>M,nI:()=>d,Zh:()=>p});var n=a(685);function o(){var r=new n.WT(3);return n.WT!=Float32Array&&(r[0]=0,r[1]=0,r[2]=0),r}function e(r){var t=r[0],a=r[1],n=r[2];return Math.hypot(t,a,n)}function f(r,t,a){var o=new n.WT(3);return o[0]=r,o[1]=t,o[2]=a,o}function i(r,t){return r[0]=t[0],r[1]=t[1],r[2]=t[2],r}function u(r,t,a){return r[0]=t[0]-a[0],r[1]=t[1]-a[1],r[2]=t[2]-a[2],r}function h(r,t,a){return r[0]=t[0]*a,r[1]=t[1]*a,r[2]=t[2]*a,r}function s(r,t){var a=t[0]-r[0],n=t[1]-r[1],o=t[2]-r[2];return Math.hypot(a,n,o)}function c(r,t){var a=t[0],n=t[1],o=t[2],e=a*a+n*n+o*o;return e>0&&(e=1/Math.sqrt(e)),r[0]=t[0]*e,r[1]=t[1]*e,r[2]=t[2]*e,r}function v(r,t){return r[0]*t[0]+r[1]*t[1]+r[2]*t[2]}function l(r,t,a){var n=t[0],o=t[1],e=t[2],f=a[0],i=a[1],u=a[2];return r[0]=o*u-e*i,r[1]=e*f-n*u,r[2]=n*i-o*f,r}function M(r,t,a){var n=t[0],o=t[1],e=t[2],f=a[3]*n+a[7]*o+a[11]*e+a[15];return f=f||1,r[0]=(a[0]*n+a[4]*o+a[8]*e+a[12])/f,r[1]=(a[1]*n+a[5]*o+a[9]*e+a[13])/f,r[2]=(a[2]*n+a[6]*o+a[10]*e+a[14])/f,r}var d=function(r,t){var a=t[0]-r[0],n=t[1]-r[1],o=t[2]-r[2];return a*a+n*n+o*o},p=e;o()},333:(r,t,a)=>{"use strict";a.d(t,{d9:()=>e,al:()=>f,JG:()=>i,t8:()=>u,IH:()=>h,$X:()=>s,bA:()=>c,bI:()=>v,kE:()=>l,we:()=>M,Fv:()=>d,AK:()=>p,t7:()=>b,I6:()=>y,fS:()=>w});var n,o=a(685);function e(r){var t=new o.WT(4);return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t}function f(r,t,a,n){var e=new o.WT(4);return e[0]=r,e[1]=t,e[2]=a,e[3]=n,e}function i(r,t){return r[0]=t[0],r[1]=t[1],r[2]=t[2],r[3]=t[3],r}function u(r,t,a,n,o){return r[0]=t,r[1]=a,r[2]=n,r[3]=o,r}function h(r,t,a){return r[0]=t[0]+a[0],r[1]=t[1]+a[1],r[2]=t[2]+a[2],r[3]=t[3]+a[3],r}function s(r,t,a){return r[0]=t[0]-a[0],r[1]=t[1]-a[1],r[2]=t[2]-a[2],r[3]=t[3]-a[3],r}function c(r,t,a){return r[0]=t[0]*a,r[1]=t[1]*a,r[2]=t[2]*a,r[3]=t[3]*a,r}function v(r,t){var a=t[0]-r[0],n=t[1]-r[1],o=t[2]-r[2],e=t[3]-r[3];return a*a+n*n+o*o+e*e}function l(r){var t=r[0],a=r[1],n=r[2],o=r[3];return Math.hypot(t,a,n,o)}function M(r){var t=r[0],a=r[1],n=r[2],o=r[3];return t*t+a*a+n*n+o*o}function d(r,t){var a=t[0],n=t[1],o=t[2],e=t[3],f=a*a+n*n+o*o+e*e;return f>0&&(f=1/Math.sqrt(f)),r[0]=a*f,r[1]=n*f,r[2]=o*f,r[3]=e*f,r}function p(r,t){return r[0]*t[0]+r[1]*t[1]+r[2]*t[2]+r[3]*t[3]}function b(r,t,a,n){var o=t[0],e=t[1],f=t[2],i=t[3];return r[0]=o+n*(a[0]-o),r[1]=e+n*(a[1]-e),r[2]=f+n*(a[2]-f),r[3]=i+n*(a[3]-i),r}function y(r,t){return r[0]===t[0]&&r[1]===t[1]&&r[2]===t[2]&&r[3]===t[3]}function w(r,t){var a=r[0],n=r[1],e=r[2],f=r[3],i=t[0],u=t[1],h=t[2],s=t[3];return Math.abs(a-i)<=o.Ib*Math.max(1,Math.abs(a),Math.abs(i))&&Math.abs(n-u)<=o.Ib*Math.max(1,Math.abs(n),Math.abs(u))&&Math.abs(e-h)<=o.Ib*Math.max(1,Math.abs(e),Math.abs(h))&&Math.abs(f-s)<=o.Ib*Math.max(1,Math.abs(f),Math.abs(s))}n=new o.WT(4),o.WT!=Float32Array&&(n[0]=0,n[1]=0,n[2]=0,n[3]=0)},399:(r,t)=>{var a=function(){function r(t,a){this.data=new Array(t.length);for(var n=0,o=t[0].length;n<t.length;n++){this.data[n]=new Array(o);for(var e=0;e<o;e++)this.data[n][e]=t[n][e]}if(a){if("object"!=typeof a[0])for(n=0;n<a.length;n++)a[n]=[a[n]];this.mirror=new r(a)}}return r.prototype.swap=function(r,t){this.mirror&&this.mirror.swap(r,t);var a=this.data[r];this.data[r]=this.data[t],this.data[t]=a},r.prototype.multline=function(r,t){this.mirror&&this.mirror.multline(r,t);for(var a=this.data[r],n=a.length-1;n>=0;n--)a[n]*=t},r.prototype.addmul=function(r,t,a){this.mirror&&this.mirror.addmul(r,t,a);for(var n=this.data[r],o=this.data[t],e=n.length-1;e>=0;e--)n[e]=n[e]+a*o[e]},r.prototype.hasNullLine=function(r){for(var t=0;t<this.data[r].length;t++)if(0!==this.data[r][t])return!1;return!0},r.prototype.gauss=function(){for(var r=0,t=this.data.length,a=this.data[0].length,n=[],o=0;o<a;o++){for(var e=0,f=0,i=r;i<t;i++){var u=this.data[i][o];Math.abs(u)>Math.abs(e)&&(f=i,e=u)}if(0===e)n.push(r);else{this.multline(f,1/e),this.swap(f,r);for(var h=0;h<t;h++)h!==r&&this.addmul(h,r,-this.data[h][o])}r++}for(h=0;h<n.length;h++)if(!this.mirror.hasNullLine(n[h]))throw new Error("singular matrix");return this.mirror.data},t.solve=function(t,a){var n=new r(t,a).gauss();if(n.length>0&&1===n[0].length)for(var o=0;o<n.length;o++)n[o]=n[o][0];return n},t.invert=function(t){return new r(t,function(r){for(var t=new Array(r),a=0;a<r;a++){t[a]=new Array(r);for(var n=0;n<r;n++)t[a][n]=a===n?1:0}return t}(t.length)).gauss()},t}();"object"==typeof r.exports&&(r.exports=a)},409:function(r,t){!function(r){"use strict";r.SVD=function(r,t,a,n,o){if(t=void 0===t||t,a=void 0===a||a,o=1e-64/(n=n||Math.pow(2,-52)),!r)throw new TypeError("Matrix a is not defined");var e,f,i,u,h,s,c,v,l,M,d,p,b=r[0].length,y=r.length;if(y<b)throw new TypeError("Invalid matrix: m < n");for(var w=[],m=[],g=[],A="f"===t?y:b,q=M=c=0;q<y;q++)m[q]=new Array(A).fill(0);for(q=0;q<b;q++)g[q]=new Array(b).fill(0);var T,I=new Array(b).fill(0);for(q=0;q<y;q++)for(e=0;e<b;e++)m[q][e]=r[q][e];for(q=0;q<b;q++){for(w[q]=c,l=0,i=q+1,e=q;e<y;e++)l+=Math.pow(m[e][q],2);if(l<o)c=0;else for(v=(s=m[q][q])*(c=s<0?Math.sqrt(l):-Math.sqrt(l))-l,m[q][q]=s-c,e=i;e<b;e++){for(l=0,f=q;f<y;f++)l+=m[f][q]*m[f][e];for(s=l/v,f=q;f<y;f++)m[f][e]=m[f][e]+s*m[f][q]}for(I[q]=c,l=0,e=i;e<b;e++)l+=Math.pow(m[q][e],2);if(l<o)c=0;else{for(v=(s=m[q][q+1])*(c=s<0?Math.sqrt(l):-Math.sqrt(l))-l,m[q][q+1]=s-c,e=i;e<b;e++)w[e]=m[q][e]/v;for(e=i;e<y;e++){for(l=0,f=i;f<b;f++)l+=m[e][f]*m[q][f];for(f=i;f<b;f++)m[e][f]=m[e][f]+l*w[f]}}M<(d=Math.abs(I[q])+Math.abs(w[q]))&&(M=d)}if(a)for(q=b-1;0<=q;q--){if(0!==c){for(v=m[q][q+1]*c,e=i;e<b;e++)g[e][q]=m[q][e]/v;for(e=i;e<b;e++){for(l=0,f=i;f<b;f++)l+=m[q][f]*g[f][e];for(f=i;f<b;f++)g[f][e]=g[f][e]+l*g[f][q]}}for(e=i;e<b;e++)g[q][e]=0,g[e][q]=0;g[q][q]=1,c=w[q],i=q}if(t){if("f"===t)for(q=b;q<y;q++){for(e=b;e<y;e++)m[q][e]=0;m[q][q]=1}for(q=b-1;0<=q;q--){for(i=q+1,c=I[q],e=i;e<A;e++)m[q][e]=0;if(0!==c){for(v=m[q][q]*c,e=i;e<A;e++){for(l=0,f=i;f<y;f++)l+=m[f][q]*m[f][e];for(s=l/v,f=q;f<y;f++)m[f][e]=m[f][e]+s*m[f][q]}for(e=q;e<y;e++)m[e][q]=m[e][q]/c}else for(e=q;e<y;e++)m[e][q]=0;m[q][q]=m[q][q]+1}}for(n*=M,f=b-1;0<=f;f--)for(var W=0;W<50;W++){for(T=!1,i=f;0<=i;i--){if(Math.abs(w[i])<=n){T=!0;break}if(Math.abs(I[i-1])<=n)break}if(!T)for(h=0,u=i-(l=1),q=i;q<f+1&&(s=l*w[q],w[q]=h*w[q],!(Math.abs(s)<=n));q++)if(c=I[q],I[q]=Math.sqrt(s*s+c*c),h=c/(v=I[q]),l=-s/v,t)for(e=0;e<y;e++)d=m[e][u],p=m[e][q],m[e][u]=d*h+p*l,m[e][q]=-d*l+p*h;if(p=I[f],i===f){if(p<0&&(I[f]=-p,a))for(e=0;e<b;e++)g[e][f]=-g[e][f];break}for(M=I[i],s=(((d=I[f-1])-p)*(d+p)+((c=w[f-1])-(v=w[f]))*(c+v))/(2*v*d),c=Math.sqrt(s*s+1),s=((M-p)*(M+p)+v*(d/(s<0?s-c:s+c)-v))/M,q=i+(l=h=1);q<f+1;q++){if(c=w[q],d=I[q],v=l*c,c*=h,p=Math.sqrt(s*s+v*v),s=M*(h=s/(w[q-1]=p))+c*(l=v/p),c=-M*l+c*h,v=d*l,d*=h,a)for(e=0;e<b;e++)M=g[e][q-1],p=g[e][q],g[e][q-1]=M*h+p*l,g[e][q]=-M*l+p*h;if(p=Math.sqrt(s*s+v*v),s=(h=s/(I[q-1]=p))*c+(l=v/p)*d,M=-l*c+h*d,t)for(e=0;e<y;e++)d=m[e][q-1],p=m[e][q],m[e][q-1]=d*h+p*l,m[e][q]=-d*l+p*h}w[i]=0,w[f]=s,I[f]=M}for(q=0;q<b;q++)I[q]<n&&(I[q]=0);return{u:m,q:I,v:g}},r.VERSION="1.1.1",Object.defineProperty(r,"__esModule",{value:!0})}(t)}}]);
//# sourceMappingURL=555.js.map