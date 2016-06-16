var board=new Array();
var score=0;            //存储游戏数据的数组
$(function(){
    newgame();
});

function newgame(){
    // 初始化游戏棋盘格
    init();
    // 随机两个格子中生成数字
    generateOneNumber();
    generateOneNumber();
};

function init(){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            // 初始化方格位置
            var gridCell=$("#grid-cell-"+i+"-"+j);
            gridCell.css('top',getPosTop(i,j));
            gridCell.css('left',getPosLeft(i,j));
        }
    }
    for(var i=0;i<4;i++){
        // 初始化游戏数据（方格中的值）
        board[i]=new Array();
        for(var j=0;j<4;j++){
            board[i][j]=0;
        }
    }
    updateBoardView();
}

function updateBoardView(){
    // 根据board的值操作数字值
    $('.number-cell').remove();
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            // number-cell里面放数字
            $('#grid-container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell=$("#number-cell-"+i+'-'+j);
            if(board[i][j]==0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j)+50);
                theNumberCell.css('left',getPosLeft(i,j)+50);
            }else{
                theNumberCell.css('width','100px');
                theNumberCell.css('height','100px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color',getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
        }
    }
}
// 判断是否可以生成随机数
function generateOneNumber(){
    if(noscpace(board)){
        return false;
    }
    // 随机一个位置
    var randx=parseInt(Math.floor(Math.random()*4));
    var randy=parseInt(Math.floor(Math.random()*4));
    while(true){
        if(board[randx][randy]==0){
            break;
        }
        randx=parseInt(Math.floor(Math.random()*4));
        randy=parseInt(Math.floor(Math.random()*4));
    }
    // 在随机位置上随机一个数字
    var randNumber=Math.random()<0.5?2:4;
    // 显示数字
    board[randx][randy]=randNumber;
    showNumberWidthAnimate(randx,randy,randNumber);     //动画函数
    return true;
}
