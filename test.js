class Calculadora{
    constructor(a, b){
        this.a = a;
        this.b = b;
    }

    somar(){
        return this.a + this.b
    }
}

function resultado(){
    return new Calculadora(6,2).somar()
}

console.log(resultado())