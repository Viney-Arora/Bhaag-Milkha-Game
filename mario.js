// alert('main javascript aa');
let standingPosition = document.querySelector('.standingPerson');
let animal = document.querySelector('.animal');
let cloud1 = document.querySelector('.cloud1')
let cloud2 = document.querySelector('.cloud2')
let gameover = document.querySelector('.gameover');


let min = 1;
let max = 5

cloud1.classList.add('cloud1animation')
cloud2.classList.add('cloud2animation')

function jump(e) {
    if (e.code == "Space") {
        standingPosition.classList.add('jumpMario');
        setTimeout(() => {
            standingPosition.classList.remove('jumpMario');

        }, 1000);

    }
}


document.addEventListener('keydown', jump)// jump


score = 0;
let game = true;

function generate_random() {
    let num = 100 * (Math.floor(Math.random() * (50 - 1) + 1));
    // console.log(num);
    return num;
}

let delay = generate_random();

function create_animal() {
    if (game) {
        let rndm = (Math.floor(Math.random() * (max - min) + min));
        animal.classList.add('animation');
        animal.src = `images/animal-${rndm}.png`;
        // console.log(animal.src)
        setTimeout(remove_animal, 1200);
    }
}

function remove_animal() {
    animal.classList.remove('animation');
    animal.src = '';
    delay = generate_random();
}

setInterval(create_animal, delay);

let crossed = false;

setInterval(() => {
    if (animal.classList.contains('animation')) {

        dy = (window.getComputedStyle(
            standingPosition, null).transform.match(/(-?[0-9\.]+)/g));
        // match change to array value

        ox = -1 * parseInt(window.getComputedStyle(
            animal, null).transform.match(/(-?[0-9\.]+)/g)[4]);


        if ((ox > 700) && (ox < 900) && (dy == null)) {
            // console.log(ox, dy)
            terminate()
        } else if ((ox > 700) && (ox < 900) && (dy != null)) {
            dy = -1 * parseInt(dy[5])
            console.log(dy)
            if (crossed == false) {
                if (dy > 60) {
                    updateScore()
                } else {
                    terminate()
                }
            }
        }
        else {
            crossed = false;
            console.log('smjh nhi aaya')
        }
    }
}, 10)


function updateScore() {
    crossed = true;
    score += 100;
    scorecount.innerHTML = "Your score : " + score;
}

function terminate() {
    console.log('Game Over')
    game = false;
    document.removeEventListener('keydown', jump)
    cloud1.classList.remove('cloud1animation')
    cloud2.classList.remove('cloud2animation')
    gameover.style.visibility = 'visible';
    gameover.classList.add('gameoveranimate')
    animal.classList.remove('animation');
    standingPosition.style.display = 'none';
    remove_animal();
    clearInterval(create_animal)
    clearInterval(updateScore)

}