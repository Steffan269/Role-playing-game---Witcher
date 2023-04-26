import characterData from "./data.js"
import Character from '/Character.js'

let monstersArray = ["ghoul", "wraith", "griffin"]
let isWaiting = false

function getNewMonster() {
    const nextMonsterData = characterData[monstersArray.shift()]
    return nextMonsterData ? new Character(nextMonsterData) : {}
}

function attack() {
    if(!isWaiting){
        geralt.setDiceHtml()
        monster.setDiceHtml()
        geralt.takeDamage(monster.currentDiceScore)
        monster.takeDamage(geralt.currentDiceScore)
        render()

        if(geralt.dead){
            endGame()
        }
        else if(monster.dead){
            isWaiting = true
            if(monstersArray.length > 0){
                setTimeout(()=>{
                    monster = getNewMonster()
                    render()
                    isWaiting = false
                }, 1500)
            }
            else {
                endGame()
            }
        }
    }
}

function endGame() {
    isWaiting = true
    const endMessage = geralt.health > 0 ? "Quest Completed" :
    "You Are Dead" 
   
    setTimeout(()=>{
        document.body.innerHTML = `
        <div class="end-game">
            <h2>${endMessage}</h2>
            </div>`
    }, 1500)
}

document.getElementById("attack-button").addEventListener('click', attack)

function render(){
    document.getElementById('hero').innerHTML = geralt.getCharacterHtml();
    document.getElementById('monster').innerHTML = monster.getCharacterHtml();
}

const geralt = new Character(characterData.hero)
let monster = getNewMonster()
render()