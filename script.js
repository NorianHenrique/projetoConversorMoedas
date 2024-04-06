async function buscarTaxaDeCambio(moedaDe,moedaPra){
    const url = `https://api.exchangerate-api.com/v4/latest/${moedaDe}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.rates[moedaPra];
}

async function realizarConversao(){
    const valorEconomico = document.getElementById('valor');
    const moedaOriginalElemento = document.getElementById('moedaOriginal');
    const moedaParaConverterElemento = document.getElementById('moedaParaConverter');
    const resultadoElemento = document.getElementById('resultado');

    const valor = parseFloat(valorEconomico.value);
    const moedaDe = moedaOriginalElemento.value;
    const moedaPra = moedaParaConverterElemento.value;

    if(isNaN(valor)){
        alert("Por favor, insira um valor numérico válido.");
        return;
    }

    const taxaDeCambio = await buscarTaxaDeCambio(moedaDe,moedaPra);
    const valorConvertido = valor * taxaDeCambio;

    resultadoElemento.innerHTML = `Resultado: ${valorConvertido.toFixed(2)} ${moedaPra}`;
}

window.addEventListener('load',()=>{
    const botaoConveter = document.getElementById('converter');
    botaoConveter.addEventListener('click',realizarConversao);
});