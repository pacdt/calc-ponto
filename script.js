document.getElementById('dias-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const diasTrabalhados = document.getElementById('dias-trabalhados').value;
    const sabadosTrabalhados = document.getElementById('sabados-trabalhados').value;
    gerarTabelas(diasTrabalhados, sabadosTrabalhados);
});

function gerarTabelas(dias, sabados) {
    const diasContainer = document.getElementById('dias-container');
    const sabadosContainer = document.getElementById('sabados-container');
    diasContainer.innerHTML = '';
    sabadosContainer.innerHTML = '';

    for (let i = 1; i <= dias; i++) {
        diasContainer.innerHTML += `
            <div>
                <h3>Dia ${i}</h3>
                <label for="entrada${i}">Entrada:</label>
                <input type="time" id="entrada${i}" oninput="calcularSaldoDia(${i})">
                <label for="saidaAlmoco${i}">Saída Almoço:</label>
                <input type="time" id="saidaAlmoco${i}" oninput="calcularSaldoDia(${i})">
                <label for="entradaAlmoco${i}">Entrada Almoço:</label>
                <input type="time" id="entradaAlmoco${i}" oninput="calcularSaldoDia(${i})">
                <label for="saida${i}">Saída:</label>
                <input type="time" id="saida${i}" oninput="calcularSaldoDia(${i})">
                <span id="saldo${i}">XXh</span>
            </div>
        `;
    }

    for (let i = 1; i <= sabados; i++) {
        sabadosContainer.innerHTML += `
            <div>
                <h3>Sábado ${i}</h3>
                <label for="entradaSabado${i}">Entrada:</label>
                <input type="time" id="entradaSabado${i}" oninput="calcularSaldoSabado(${i})">
                <label for="saidaSabado${i}">Saída:</label>
                <input type="time" id="saidaSabado${i}" oninput="calcularSaldoSabado(${i})">
                <span id="saldoSabado${i}">XXh</span>
            </div>
        `;
    }
}

function calcularDiferencaHoras(horaInicial, horaFinal) {
    const [hInicial, mInicial] = horaInicial.split(':').map(Number);
    const [hFinal, mFinal] = horaFinal.split(':').map(Number);

    let minutosTrabalhados = (hFinal * 60 + mFinal) - (hInicial * 60 + mInicial);
    return minutosTrabalhados / 60;
}

function formatarSaldo(saldo) {
    const horas = Math.floor(Math.abs(saldo));
    const minutos = Math.round((Math.abs(saldo) - horas) * 60);
    const sinal = saldo < 0 ? '-' : '';
    const horasFormatadas = horas.toString().padStart(2, '0');
    const minutosFormatados = minutos.toString().padStart(2, '0');

    return `${sinal}${horasFormatadas}:${minutosFormatados}h`;
}

function calcularSaldoDia(dia) {
    const entrada = document.getElementById(`entrada${dia}`).value;
    const saidaAlmoco = document.getElementById(`saidaAlmoco${dia}`).value;
    const entradaAlmoco = document.getElementById(`entradaAlmoco${dia}`).value;
    const saida = document.getElementById(`saida${dia}`).value;

    if (entrada && saidaAlmoco && entradaAlmoco && saida) {
        const horasTrabalhadasManha = calcularDiferencaHoras(entrada, saidaAlmoco);
        const horasTrabalhadasTarde = calcularDiferencaHoras(entradaAlmoco, saida);
        const horasTrabalhadasTotais = horasTrabalhadasManha + horasTrabalhadasTarde;
        const saldoDia = horasTrabalhadasTotais - 8; // Considerando 8 horas de trabalho por dia

        document.getElementById(`saldo${dia}`).innerText = formatarSaldo(saldoDia);
        calcularSaldoTotal();
    }
}

function calcularSaldoSabado(dia) {
    const entrada = document.getElementById(`entradaSabado${dia}`).value;
    const saida = document.getElementById(`saidaSabado${dia}`).value;

    if (entrada && saida) {
        const horasTrabalhadas = calcularDiferencaHoras(entrada, saida);
        const saldoDia = horasTrabalhadas - 4; // Considerando 4 horas de trabalho por sabado

        document.getElementById(`saldoSabado${dia}`).innerText = formatarSaldo(saldoDia);
        calcularSaldoTotal();
    }
}

function calcularSaldoTotal() {
    const diasTrabalhados = document.getElementById('dias-trabalhados').value;
    const sabadosTrabalhados = document.getElementById('sabados-trabalhados').value;

    let saldoTotal = 0;

    for (let i = 1; i <= diasTrabalhados; i++) {
        const saldoDia = document.getElementById(`saldo${i}`).innerText;
        if (saldoDia !== 'XXh') {
            const [horas, minutos] = saldoDia.replace('h', '').split(':').map(Number);
            saldoTotal += (horas + (minutos / 60)) * (saldoDia.startsWith('-') ? -1 : 1);
        }
    }

    for (let i = 1; i <= sabadosTrabalhados; i++) {
        const saldoSabado = document.getElementById(`saldoSabado${i}`).innerText;
        if (saldoSabado !== 'XXh') {
            const [horas, minutos] = saldoSabado.replace('h', '').split(':').map(Number);
            saldoTotal += (horas + (minutos / 60)) * (saldoSabado.startsWith('-') ? -1 : 1);
        }
    }

    document.getElementById('saldo-total').innerText = formatarSaldo(saldoTotal);
}
function gerarTabelas(dias, sabados) {
    const diasContainer = document.getElementById('dias-container');
    const sabadosContainer = document.getElementById('sabados-container');
    const nome = document.getElementById('nome').value;
    const mes = document.getElementById('mes').value;
    
    diasContainer.innerHTML = '';
    sabadosContainer.innerHTML = '';

    // Adicionando o cabeçalho para impressão
    const printHeader = document.createElement('div');
    printHeader.className = 'print-header';
    printHeader.innerHTML = `<h1>${nome}</h1><span>Mês: ${mes}</span>`;
    document.body.insertBefore(printHeader, document.getElementById('dias-container'));

    for (let i = 1; i <= dias; i++) {
        diasContainer.innerHTML += `
            <div class="days">
                <h3>Dia ${i}</h3>
                <label for="entrada${i}">Entrada:</label>
                <input type="time" id="entrada${i}" oninput="calcularSaldoDia(${i})">
                <label for="saidaAlmoco${i}">Saída Almoço:</label>
                <input type="time" id="saidaAlmoco${i}" oninput="calcularSaldoDia(${i})">
                <label for="entradaAlmoco${i}">Entrada Almoço:</label>
                <input type="time" id="entradaAlmoco${i}" oninput="calcularSaldoDia(${i})">
                <label for="saida${i}">Saída:</label>
                <input type="time" id="saida${i}" oninput="calcularSaldoDia(${i})">
                <span id="saldo${i}">XXh</span>
            </div>
        `;
    }

    for (let i = 1; i <= sabados; i++) {
        sabadosContainer.innerHTML += `
            <div class="days">
                <h3>Sábado ${i}</h3>
                <label for="entradaSabado${i}">Entrada:</label>
                <input type="time" id="entradaSabado${i}" oninput="calcularSaldoSabado(${i})">
                <label for="saidaSabado${i}">Saída:</label>
                <input type="time" id="saidaSabado${i}" oninput="calcularSaldoSabado(${i})">
                <span id="saldoSabado${i}">XXh</span>
            </div>
        `;
    }
}
