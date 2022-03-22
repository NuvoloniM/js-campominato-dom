/*
Consegna
Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).
Il computer deve generare 16 numeri casuali nel range dei numeri della griglia: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una b.
BONUS:
1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste
3- l'utente indica un livello di difficoltà in base al quale viene generato un numero variabile di celle:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Le bombe dovranno essere generate nello stesso range delle caselle di gioco.
Consigli del giorno: :party_wizard:
Scriviamo prima cosa vogliamo fare passo passo in italiano, dividiamo il lavoro in micro problemi. Ad esempio: Di cosa ho bisogno per generare i numeri? Proviamo sempre prima con dei console.log() per capire se stiamo ricevendo i dati giusti. Le validazioni e i controlli possiamo farli anche in un secondo momento.
*/


//Variabili Globali
let btn = document.getElementById('btn');
let btnReset = document.getElementById('btn_reset');

let diff = document.getElementById('difficult');
let container = document.getElementById('container');
let min = 1;
let max = 100;

//eventi 
btn.addEventListener('click', play);
btnReset.addEventListener('click',reset)


function play() {
    //Reset del contenuto interno per non far accumulare più griglie
    container.innerHTML = '';
    //Nascondi il placeholder o home di gioco 
    let placeholder = document.getElementById('placeholder');
    placeholder.className = 'd-none';
    //fai apparire la griglia
    container.classList.remove('d-none');
    let diff = document.getElementById('difficult');
    let x = diff.value;
    let array = [];
    
    if (x == 'hard') {
        document.documentElement.style.setProperty('--column', '7');
        max = 49;
    } else if (x == 'normal'){
        document.documentElement.style.setProperty('--column', '9');
        max = 81;
    } else {
        document.documentElement.style.setProperty('--column', '10');
        max = 100;
    }
    //creo array di numeri da un min e un max a seconda della difficoltà
    array = arrayCreation(min,max);
    //mischio gli elementi dell'array per non stampare numeri sequenziali
    array = shuffleArray(array);
    console.log(array)
    //creo un array bombe lungo quanto le celle ed estraggo i primi 16 numeri
    let bombe = shuffleArray(arrayCreation(min,max));
    bombe = sixteen(bombe);
    console.log(bombe)
    for (let i = 0; i < max; i++) {
        //a ogni giro creo un div
        let card = document.createElement('div');
        //ad ogni div assegno la classe css creata
        card.classList.add('card');
        //in ogni div stampo un numero casuale tra min e max
        // let casualN = randomInt(min,max); 
        card.innerHTML += `${array[i]}`;
        //appendo il div creato al container
        container.appendChild(card);
        
        card.addEventListener('click', selected);
        //creo funzione
        let counter = 0;
        function selected() {
            if (bombe.includes(Number(card.innerHTML)) == true) {
                card.classList.add('bomb');
                alert('BOOM!');
                game = false;
            } else {
                card.classList.add('selected');
                game = true;
                //conta il punteggio
                counter += 1;
            }
            console.log(counter);
        }

        // creo evento
        let game = true;
        if (game == false) {
            card.removeEventListener('click',selected);
        }
    }
    
}




//Funzioni Generali

//creo array da min a max 
function arrayCreation(min,max) {
    let array = []; 
    for (let i = min; i <= max; i++) {
        array.push(i);
    }
    return array
 }

 //funzione shuffle (Funzione che mischia gli indici di un array)
function shuffleArray(array){
    array.sort(()=> Math.random() - 0.5);
    return array
}

//funzione reset
function reset() {
    return history.go(0);
}

//prendi le prime 16 i di un array
function sixteen(array) {
    let array2 = [];
    for (let i = 0; i < 16; i++) {
        array2.push(array[i]);
    }
    return array2;
}