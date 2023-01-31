export function generartablero(){
    for(let i=0; i<TAM_MAX; i++){
        tablero[i] = new Array(TAM_MAX);
        for(let j = 0; j<TAM_MAX; j++){
            tablero[i][j]=0;
        }
    }
}

export let numeroAletorio = () => {
    return parseInt(10*Math.random())
}


export function colocarbombas(){
    let cont = 0
    let i = 0
    let j =0
    while(cont <= (TAM_MAX*TAM_MAX)/2){
        i = numeroAletorio()
        j = numeroAletorio()
        if(tablero[i][j] == 0){
            tablero[i][j] = 1;
            cont++;
        }
    }
}