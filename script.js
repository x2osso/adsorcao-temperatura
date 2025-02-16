document.addEventListener('DOMContentLoaded', function() {

    $('body').on('click','.calcular',function(){
        calcular();
        console.log('Teste');
    });

    function calcular() {
        // Obtenha os valores dos campos de entrada, convertendo para números
        const qmax = parseFloat(document.getElementById("qmax").value);
        const b = parseFloat(document.getElementById("b").value);
        const C = parseFloat(document.getElementById("C").value);
        const T_inicial = parseInt(document.getElementById("T_inicial").value);
        const T_final = parseInt(document.getElementById("T_final").value);

        // Validação dos inputs (muito importante!)
        if (isNaN(qmax) || isNaN(b) || isNaN(C) || isNaN(T_inicial) || isNaN(T_final)) {
            alert("Por favor, insira apenas números nos campos.");
            return; // Impede a execução do resto da função
        }

        if (T_inicial >= T_final) {
            alert("A temperatura inicial deve ser menor que a temperatura final.");
            return;
        }

        // Calcule a adsorção em função da temperatura (adapte a equação de Langmuir)
        const T = [];
        const q = [];
        for (let i = T_inicial; i <= T_final; i++) {
            T.push(i);
            q.push(((qmax * b * C) / (1 + b * C)) * Math.exp((-1000) / (8.314 * i)));
        }

        // Crie o gráfico (você pode usar uma biblioteca como Chart.js)
        // Aqui, estou usando um exemplo simples com canvas
        const canvas = document.createElement("canvas");
        canvas.width = 600;
        canvas.height = 400;
        document.getElementById("grafico").appendChild(canvas);
        const ctx = canvas.getContext("2d");

        // Limpa o canvas antes de desenhar o novo gráfico (importante!)
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Desenhe o gráfico (adapte conforme necessário)
        ctx.moveTo(0, canvas.height); // Começa no canto inferior esquerdo
        for (let i = 0; i < T.length; i++) {
            const x = (T[i] - T_inicial) / (T_final - T_inicial) * canvas.width;
            const y = canvas.height - (q[i] / qmax) * canvas.height; // Escala q de 0 a qmax
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.strokeStyle = "blue"; // Cor da linha
        ctx.stroke();

        // Adicione labels aos eixos (opcional)
        ctx.font = "12px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Temperatura (K)", canvas.width / 2 - 50, canvas.height - 10);
        ctx.save(); // Salva o estado atual do contexto
        ctx.translate(10, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText("Adsorção (mg/g)", 0, 0);
        ctx.restore(); // Restaura o estado salvo
    }
});
