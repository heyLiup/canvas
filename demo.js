var Bodywidth=900;
var BodyHeight=600;
var RADIUS=6;
var margin_top=60;
var margin_left=30;
var endTime = new Date("2017/8/18,21:40:02");//const  定义一个不可变的量
var curShowTimeSeconds=0;

var balls=[];
const colors=["red","green","sliver","gray","yellow","orange","blue","black","pink"];


window.onload=function(){
	document.onkeyup=function(e){
		if(e.keyCode==13){
			getTimes();
		}
	}
	var convas=document.getElementById('canvas');
	var context=convas.getContext("2d");
	Bodywidth=document.documentElement.clientWidth;
	BodyHeight=document.documentElement.clientHeight;
	margin_left=Math.round(Bodywidth/5);
	margin_top=Math.round(BodyHeight/5);
	// RADIUS=Math.round(Bodywidth/5*4/108)+1;
	convas.width=Bodywidth;
	convas.height=BodyHeight;

	curShowTimeSeconds=getCurShowTimeSeconds();
	 
	 setInterval(function(){
	 	render(context);
	 	update();
	 },50);
}
//得到计时时间
function getTimes(){
	var date=document.querySelector('#model').value;
	endTime=new Date().getTime()+date*60*1000;
	console.log(endTime);
}
function getCurShowTimeSeconds(){
	var curTime=new Date();
	var ret=endTime-curTime.getTime();
	ret=Math.round(ret/1000);
	// console.log(ret/3600);
	return ret>=0?ret:0;
}

function update(){
	var nextShowTimeSeconds=getCurShowTimeSeconds();
	var nexthours=parseInt(nextShowTimeSeconds/3600);
	var nextminutes = parseInt((nextShowTimeSeconds - nexthours*3600 )/ 60);
	var nextsecond=parseInt(nextShowTimeSeconds%60);

	var curhours=parseInt(curShowTimeSeconds/3600);
	var curminutes = parseInt((curShowTimeSeconds - curhours*3600 )/ 60);
	var cursecond=parseInt(curShowTimeSeconds%60);

	if(nextsecond!=cursecond){
		// 时钟
		if(parseInt(curhours/10)!=parseInt(nexthours/10)){
			addBalls(margin_left+0,margin_top,parseInt(curhours/10));
		}
		if(parseInt(curhours%10)!=parseInt(nexthours%10)){
			addBalls(margin_left+15*(RADIUS+1),margin_top,parseInt(curhours%10));
		}
		//分钟
		if(parseInt(curminutes/10)!=parseInt(nextminutes/10)){
			addBalls(margin_left+39*(RADIUS+1),margin_top,parseInt(curhours/10));
		}
		if(parseInt(curminutes%10)!=parseInt(nextminutes%10)){
			addBalls(margin_left+54*(RADIUS+1),margin_top,parseInt(curminutes%10));
		}
		//秒钟
		if(parseInt(cursecond/10)!=parseInt(nextsecond/10)){
			addBalls(margin_left+79*(RADIUS+1),margin_top,parseInt(cursecond/10));
		}
		if(parseInt(cursecond%10)!=parseInt(nextsecond%10)){
			addBalls(margin_left+94*(RADIUS+1),margin_top,parseInt(cursecond%10));
		}
		curShowTimeSeconds=nextShowTimeSeconds;
	}
	updateBalls();
}

function updateBalls(){
	for(var i=0;i<balls.length;i++){
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		balls[i].vy+=balls[i].g;
	
	if(balls[i].y>=600-RADIUS){
		balls[i].y=600-RADIUS;
		balls[i].vy=-balls[i].vy*0.75;
	}
}

  //   var cnt=0;
  //   for(var j=0;j<balls.length;j++){
  //   	if(balls[j].x+RADIUS>0&&balls[j].x<Bodywidth+RADIUS){
  //   		balls[cnt++]=balls[j];
		// while(balls.length>cnt){
  //   			balls.pop();
  //   		}
  //   	}
  //   }
    		
}



function addBalls(x,y,num){
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]==1){
				var aBall={
					x:x+j*2*(RADIUS+1)+(RADIUS+1),
					y:y+i*2*(RADIUS+1)+(RADIUS+1),
					g:1.5+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4, //Math.ceil  取整  Math.pow 次方
					vy:-5,
					color:colors[Math.floor(Math.random()*colors.length)]
				}
				balls.push(aBall);
			}
		}
	}
}
// oDate.getFullYear();   //获取系统的年；
// oDate.getMonth()+1;   //获取系统月份，由于月份是从0开始计算，所以要加1
// oDate.getDate(); // 获取系统日，
// oDate.getHours(); //获取系统时，
// oDate.getMinutes(); //分
// oDate.getSeconds();
function render(cxt){
	cxt.clearRect(0,0,Bodywidth,BodyHeight);
	var hours=parseInt(curShowTimeSeconds/3600);
	var minutes = parseInt((curShowTimeSeconds - hours*3600 )/ 60);
	var second=parseInt(curShowTimeSeconds%	60);
	
	renderDigit(margin_left,margin_top,parseInt(hours/10),cxt)
	renderDigit(margin_left+15*(RADIUS+1),margin_top,parseInt(hours%10),cxt)
	renderDigit(margin_left+30*(RADIUS+1),margin_top,10,cxt)
	renderDigit(margin_left+39*(RADIUS+1),margin_top,parseInt(minutes/10),cxt)
	renderDigit(margin_left+54*(RADIUS+1),margin_top,parseInt(minutes%10),cxt)
	renderDigit(margin_left+69*(RADIUS+1),margin_top,10,cxt)
	renderDigit(margin_left+79*(RADIUS+1),margin_top,parseInt(second/10),cxt)
	renderDigit(margin_left+94*(RADIUS+1),margin_top,parseInt(second%10),cxt)

	//小球的绘制
	for(var i=0;i<balls.length;i++){
		cxt.fillStyle=balls[i].color;
		cxt.beginPath();
		cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI);
		cxt.closePath();
		cxt.fill();
	}
}
function renderDigit(x,y,num,cxt){

	cxt.fillStyle="rgb(0,102,153)";
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]==1){
				cxt.beginPath();

				cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI)

				cxt.closePath()

				cxt.fill()
			}
		}
	}
}








	
