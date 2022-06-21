"use strict";
var botaoAtualizar = document.getElementById('atualizar-saldo');
var botaoLimpar = document.getElementById('limpar-saldo');
var soma = document.getElementById('soma');
var campoSaldo = document.getElementById('campo-saldo');
campoSaldo.innerHTML = '0';
document.getElementById("erro").style.color = "red";
function somarAoSaldo(soma) {
    if (campoSaldo.innerHTML.length == 0) {
        campoSaldo.innerHTML = soma + '';
        return;
    }
    campoSaldo.innerHTML = (parseFloat(campoSaldo.innerHTML) + soma) + '';
}
function limparSaldo() {
    campoSaldo.innerHTML = '0';
}
botaoAtualizar.addEventListener('click', function () {
    if (soma.value.length == 0) {
        setErro("Digite pelo menos 1 número!");
        return;
    }
    if (/[^0-9]/g.test(soma.value)) {
        setErro("Digite apenas números!");
        return;
    }
    somarAoSaldo(parseFloat(soma.value));
});
botaoLimpar.addEventListener('click', function () {
    limparSaldo();
});
var timeOutErro = null;
function setErro(erro) {
    var span = document.getElementById("erro");
    if (timeOutErro) {
        clearTimeout(timeOutErro);
    }
    span.innerHTML = erro + "<br><br>";
    timeOutErro = setTimeout(function () {
        span.innerHTML = '<br><br>';
        timeOutErro = null;
    }, 5000);
}
//# sourceMappingURL=desafio3.js.map