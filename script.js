document.addEventListener('DOMContentLoaded', function() {

    function calcular() {
        // Obtenha os valores dos campos de entrada
        const qmax = document.getElementById("qmax").value;
        const b = document.getElementById("b").value;
        const C = document.getElementById("C").value;
        const T_inicial = document.getElementById("T_inicial").value;
        const T_final = document.getElementById("T_final").value;
    
        // Calcule a adsorção em função da temperatura (adapte a equação de Langmuir)
        const T = [];
        const q = [];
        for (let i = T_inicial; i <= T_final; i++) {
            T.push(i);
            q.push(((qmax * b * C) / (1 + b * C)) * Math.exp((-1000 / (8.314 * i))));
        }
    
        // Crie o gráfico (você pode usar uma biblioteca como Chart.js)
        // Aqui, estou usando um exemplo simples com canvas
        const canvas = document.createElement("canvas");
        canvas.width = 600;
        canvas.height = 400;
        document.getElementById("grafico").appendChild(canvas);
        const ctx = canvas.getContext("2d");
    
        // Desenhe o gráfico (adapte conforme necessário)
        ctx.moveTo(0, 400);
        ctx.lineTo(600, 0);
        ctx.stroke();
    }
    
});



