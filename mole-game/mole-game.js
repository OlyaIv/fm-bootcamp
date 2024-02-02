function setTimeInterval(ms) {
    return Date.now() + ms;
}
let score = 0;

function getRoyalStatus(){
    console.log('inside getRoyalStatus()')
    return Math.random > 0.9;
     // 10% chance of being true 
}

const moles = [
    {
        status: "sad",
        next: setTimeInterval(1000),
        king: false,
        node: document.querySelector('#hole-0')
    },
    {
        status: "sad",
        next: setTimeInterval(1000),
        king: false,
        node: document.querySelector('#hole-1')
    },
    {
        status: "sad",
        next: setTimeInterval(1000),
        king: false,
        node: document.querySelector('#hole-2')
    },
    {
        status: "sad",
        next: setTimeInterval(1000),
        king: false,
        node: document.querySelector('#hole-3')
    },
    {
        status: "sad",
        next: setTimeInterval(1000),
        king: false,
        node: document.querySelector('#hole-4')
    },
    {
        status: "sad",
        next: setTimeInterval(1000),
        king: false,
        node: document.querySelector('#hole-5')
    },
    {
        status: "sad",
        next: setTimeInterval(1000),
        king: false,
        node: document.querySelector('#hole-6')
    },
    {
        status: "sad",
        next: setTimeInterval(1000),
        king: false,
        node: document.querySelector('#hole-7')
    },
    {
        status: "sad",
        next: setTimeInterval(1000),
        king: false,
        node: document.querySelector('#hole-8')
    },
    {
        status: "sad",
        next: setTimeInterval(1000),
        king: false,
        node: document.querySelector('#hole-9')
    }
]

function getNextStatus(mole){
    let sadInterval = setTimeInterval(1000);
    let getGone = setTimeInterval(Math.floor(Math.random() * 1800) + 2000)
    let getHungry = setTimeInterval(Math.floor(Math.random() * 3000) + 2000)

    switch(mole.status){
        case "sad":
        case "fed":
            mole.next = sadInterval;
            mole.status = 'leaving';
            if (mole.king)  {
                mole.node.children[0].src = './static/mole-game/king-mole-leaving.png';
            } else {
                mole.node.children[0].src = './static/mole-game/mole-leaving.png';
            }
            break;
        case "leaving":
            mole.next = getGone;
            mole.status = 'gone';
            mole.node.children[0].classList.add('gone');
            break;
        case "gone":
            mole.status = 'hungry';
            mole.king = getRoyalStatus();
            mole.next = getHungry;
            mole.node.children[0].classList.add('hungry');
            mole.node.children[0].classList.remove('gone');
            if (mole.king){
                mole.node.children[0].src = './static/mole-game/king-mole-hungry.png';
            } else {
            mole.node.children[0].src = './static/mole-game/mole-hungry.png';
            }
            break;
        case "hungry":
            mole.next = sadInterval;
            mole.status = 'sad';
            mole.node.children[0].classList.remove('hungry');
            if (mole.king){
                mole.node.children[0].src = './static/mole-game/king-mole-sad.png';
            } else {
            mole.node.children[0].src = './static/mole-game/mole-sad.png';
            }
            break;
    } 
}



function feed(event){
    if(event.target.tagName !== 'IMG' || !event.target.classList.contains('hungry')){
        return;
    }

    const mole = moles[parseInt(event.target.dataset.index)];
    console.log(event)

    mole.status = 'fed';
    mole.next = setTimeInterval(1000);
    if (mole.king){
        score += 2;
        mole.node.children[0].src = './static/mole-game/king-mole-fed.png';
    } else {
    mole.node.children[0].src = './static/mole-game/mole-fed.png';
    }
    mole.node.children[0].classList.remove('hungry');

    score++;
        if (score >= 10){
        win();
    }
    
    document.querySelector('.worm-container').style.width = `${10 * score}%`
}

function win(){
    document.querySelector('.background').classList.add('hide');
    document.querySelector('.win').classList.remove('hide');
}

let runAgainAt = setTimeInterval(100)

function nextFrame(){
    const now = Date.now();

    if( runAgainAt <= now){
        for (let i = 0; i < moles.length; i++){
            if (moles[i].next <= now){ //goes through every mole and checks if the next time is less than now i.e time to update the status
                getNextStatus(moles[i]);
            }
        }
        runAgainAt = now + 100;
    }
    requestAnimationFrame(nextFrame);
}

document.querySelector('.background').addEventListener('click', feed)

nextFrame();

