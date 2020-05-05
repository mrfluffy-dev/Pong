function setup() {
    createCanvas(1030, 600);
    x = width/2;
    y = height/2
    RPCenter = y;
    LPCenter = y;
    RPyPoss = y-50;
    LPyPoss = y-50;
    console.log(RPyPoss);
    BallPoss = createVector(x, y);
    NewAng =0;
    Ang = 0.01;
    LPScore =0;
    RPScore =0;
    Crash = false;
    BallSpeed =random(-5,5) < 0 ? -3 : 3;
    PongSpeed = 8;
    BallVel = createVector(BallSpeed,random(-1, 1));
    console.log(BallSpeed);
  }
  function draw() {
    clear();
    background(0);
    if (Crash ==true){
        fill(0);
    }
    else{
        fill(255);
    }
    ellipse(BallPoss.x, BallPoss.y, 23);
    fill(255);
    square(width-10, RPyPoss, 10, 100);
    square(0, LPyPoss, 10, 100);
    LeftPlayerScore();
    RightPlayerScore();
    Ball();
    EndGame();
    if (Crash == true){
            textSize(34);
            text("Game Over", x- 80 , y);
            fill(255);
            textSize(20);
            text("Press Space to continue", x-100, y+30);
            fill(255);
    }
    //Key down Testing
    if (keyIsDown(DOWN_ARROW)){
        RPChangeYDown();
    }
    if (keyIsDown(UP_ARROW)){
        RPChangeYUP();
    }
    if (keyIsDown(83)){
        LPChangeYDown();
    }
    if (keyIsDown(87)){
        LPChangeYUP();
    }
  }
  //Displays Left Player's score
  function LeftPlayerScore(){
        textSize(20);
        text(LPScore,x-30,20);
        fill(255);
  }
  //Displays Right Player's score
  function RightPlayerScore(){
        textSize(20);
        text(RPScore,x+30,20);
        fill(255);
}
    //Reset pong and ball possition to origenal when Ball crashes 
  function EndGame(){
        if (Crash == true){
            BallPoss.x = x;
            BallPoss.y = y;
            BallVel.x = 0;
            BallVel.y =0;
            RPCenter = y;
            LPCenter = y;
            RPyPoss = y-50;
            LPyPoss = y-50;
            if (keyIsDown(32)){
                Crash = false;
                BallVel.x = random(-3,3) < 0 ? -3 : 3;
                BallVel.y = random(-1, 1);
            }
        } 
  }
    // Changes the Y possition of the Right Pong Down
   function RPChangeYDown(){
        if ((RPyPoss < height-100)){
        RPyPoss += PongSpeed;
        RPCenter += PongSpeed;
        }
   }

   // Changes the Y possition of the Right Pong UP
   function RPChangeYUP(){
       if ((RPyPoss > 0)){
        RPyPoss -= PongSpeed;
        RPCenter -= PongSpeed;
       }
    }

    // Changes the Y possition of the Left Pong Down
    function LPChangeYDown(){
        if ((LPyPoss < height-100)){
        LPyPoss += PongSpeed;
        LPCenter += PongSpeed;
        }
   }

   // Changes the Y possition of the Left Pong UP
   function LPChangeYUP(){
       if ((LPyPoss > 0)){
        LPyPoss -= PongSpeed;
        LPCenter -= PongSpeed;
       }
    }

    //Movement of the ball
    function Ball(){ 
        //Tests to see if ball is tuching top or bottom sides
        if((BallPoss.y-12.5 <= 0)||(BallPoss.y+12.5>= height)){
            BallVel.y = BallVel.y / -1;
        }
        //Tests to see if ball is not Pass the right pong
        if(BallPoss.x < width-23){
            BallPoss.x = BallPoss.x + BallVel.x
            BallPoss.y = BallPoss.y + BallVel.y
        }
        //Tests see is ball is tuching the right pong
        else if((BallPoss.y<= RPCenter+55) && (BallPoss.y>= RPCenter-55)){
            //tests to see if ball is tuching bottom half of Right pong
            if(BallPoss.y > RPCenter){
                //Creates a new angel for the ball based on how far belowe the center of the Right pong the ball is tuching
                NewAng = map(BallPoss.y,RPCenter,RPCenter+50,0,1);
                BallVel.y = BallVel.y + NewAng;
            }
            //if ball is tuching Top Half of Right pong
            else{
                //Creates a new angel for the ball based on how far above the center of the Right pong the ball is tuching
                NewAng = map(BallPoss.y,RPCenter,RPCenter-50,0,1);
                BallVel.y = BallVel.y - NewAng ;
            }
            //Changes Direction of the ball by 180 degrees
            BallVel.x = BallVel.x / -1;
            BallPoss.x = BallPoss.x + BallVel.x   
        }
        //if ball did not tuch the right pong
        else{
            LPScore +=1;
            Crash= true;
        }
        //Tests to see if ball is not Pass the Left pong
        if(BallPoss.x > 23){
            BallPoss.x = BallPoss.x + BallVel.x
            BallPoss.y = BallPoss.y + BallVel.y
        }
        //Tests see is ball is tuching the left pong
        else if((BallPoss.y<= LPCenter+55) && (BallPoss.y>= LPCenter-55)){
            
            //tests to see if ball is tuching bottom half of Left pong
            if(BallPoss.y > LPCenter){
                //Creates a new angel for the ball based on how far belowe the center of the Left pong the ball is tuching
                NewAng = map(BallPoss.y,LPCenter,LPCenter+50,0,1);
                BallVel.y = BallVel.y + NewAng;
            }
            //if ball is tuching Top Half of Left pong
            else{
                //Creates a new angel for the ball based on how far above the center of the Left pong the ball is tuching
                NewAng = map(BallPoss.y,LPCenter,LPCenter-50,0,1);
                BallVel.y = BallVel.y - NewAng;
            }
            //Changes Direction of the ball by 180 degrees
            BallVel.x = BallVel.x / -1;
            BallPoss.x = BallPoss.x + BallVel.x
        }
        //if ball did not tuch the Left pong
        else{
            RPScore +=1
            Crash=true;
        }  
    }
