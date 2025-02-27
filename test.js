const controller = {
    async test(numero){
        setTimeout(()=>{
            console.log("Resultado Função")
        },numero)
    }
}

controller.test(3000)