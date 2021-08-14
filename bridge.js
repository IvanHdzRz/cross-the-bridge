
const solutions=[];

crossTheBridge({start:[1,2,5,10],end:[],timeElapsed:0})
console.log( 'numero de soluciones'+solutions.length)

function crossTheBridge({start,end,timeElapsed}){
    
    const partners=getCombinationsOfTwo(start);
    let additionalTime=0;
    let totalTime;

    //---------------CASOS BASE------------------------------------
    //si no hay nadie en el inicio del puente entonces ya todos cruzaron
    //regresa el tiempo que tardaron en hacerlo
    if(start.length===0){
        totalTime=additionalTime+timeElapsed
        console.log('tiempo transcurrido: '+totalTime)
        solutions.push(totalTime)
        return totalTime;
    }
    if(start.length===1){
        console.log('tiempo transcurrido: '+start[0])
        solutions.push(start[0])
        return start[0];
    }
    //ya solo falta una pareja por cruzar, regresa el tiempo del mas lento sumado 
    //al tiempo transcurrido
    if(partners.length===1){
        const slowerPartner=Math.max(...partners[0]);
        totalTime=slowerPartner+timeElapsed;
        console.log('tiempo transcurrido: '+totalTime)
        solutions.push(totalTime)
        return totalTime
    }
    //-----------------CASOS RECURSIVOS----------------------------
    
    // se calcula el tiempo que tardara en pasar cada pareja  
    // se obtiene quienes ya cruzaron
    // se escoge a quien regresara con la lampara
    // el tiempo se obtiene sumando el tiempo en cruzar y el tiempo de regresar
    //se vuelve a llamar a la funcion crosss bridge pero ahora con el tiempo 
    //total como tiempo transcurrido 
    
    //por cada paraje se calcula....
    partners.forEach((partner)=>{
        //el tiempo que le toma a la pareja en pasar, es el del compañero mas lento
        const slowerPartner=Math.max(...partner);
        //quienes ya cruzaron son los que estaban ya del otro lado mas la pareja
        const alredyCrossed=[...end,...partner]
        const indexFirsPartner=start.indexOf(partner[0]);
        const indexSecondPartner=start.indexOf(partner[1]);
        //quienes faltan por cruzar
        const stillToCross=start.filter((val,index)=>index!==indexFirsPartner && index !==indexSecondPartner )
        //logs para debugear
        /* console.log('-------inicio del viaje------s')
        console.log(start,end)
        console.log('se quedan')
        console.log(stillToCross);
        console.log('se van')
        console.log(partner)
        console.log('ya del otro lado')
        console.log(alredyCrossed)
        console.log('-------posibilidades----------') */
        //se considera cada uno de los tiempos que le tomara aquienes ya cruzaron 
        //el regresar con la lampara
        alredyCrossed.forEach((val,indexOfLambGuy)=>{
            // los que ya estan al otro lado del puente menos el que regresa
            const whoKeepInEnd=alredyCrossed.filter((val,i)=>i!==indexOfLambGuy)
            const theLampGuy=alredyCrossed[indexOfLambGuy];
            
            totalTime=slowerPartner+theLampGuy+timeElapsed;
            //logs para debugear
            /* console.log('se regresa')
            console.log(theLampGuy)
            console.log('se quedaron ya del otro lado')
            console.log(whoKeepInEnd)
            console.log('como quedo todo al final')
            console.log([...stillToCross,theLampGuy],whoKeepInEnd)
            console.log('tiempo de ida y venida: '+totalTime)
             */
            crossTheBridge({
                start:[...stillToCross,theLampGuy],
                end:whoKeepInEnd,
                timeElapsed:totalTime
            })
        })
        
    })

}

 


function getCombinationsOfTwo(arr){
    
    let combinations=[];
    
    for(let i=0;i<arr.length;i++){
        for(let j=0;j<arr.length;j++){
            if(i!==j && j>i){
                combinations.push([arr[i],arr[j]])
            }
        }
    }
    return combinations;
}






