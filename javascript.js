

// roda quando o DOM estiver pronto (porque usamos "defer" no <script>)
document.addEventListener('DOMContentLoaded', () => {

    const camadasInp = document.getElementById('layer');
    const wrapper = document.getElementById('layers-wrapper');
    //const btnGerar = document.getElementById('btn-gerar');


    /* ─────────────────────────
     Atualiza campos de camada
     ───────────────────────── 
    camadasInp.addEventListener('input', () => {
        const qtd = parseInt(camadasInp.value, 10) || 0;
        if(qtd < 11){
            renderizarCamposCamada(qtd);
        }else{
               renderizarCamposCamada(0);
        }

    });

    ─────────────────────────
    N° entrada mínima e máxima
     ───────────────────────── 

    camadasInp.addEventListener('input', () => {
        const valor = camadasInp.value.trim();
        const qtd = parseInt(valor, 10);

        if (valor === "" || isNaN(qtd) || qtd < 1) {
            camadasInp.setCustomValidity("O mínimo de camadas 1");
            camadasInp.reportValidity();
            camadasInp.value = ""; 
        } else if (qtd > 10){
            camadasInp.setCustomValidity("O máximo de camadas é 10");
            camadasInp.reportValidity();
            camadasInp.value = ""; 
            
            
        }else {
             camadasInp.setCustomValidity(""); // limpa erro
        camadasInp.reportValidity();
        camadasInp.value = qtd;
         
        }
    });




    function renderizarCamposCamada(qtd) {
        wrapper.innerHTML = ''; // limpa SÓ o sub‑contêiner

        for (let i = 1; i <= qtd; i++) {
            const inp = document.createElement('input');
            inp.type = 'number';
            inp.classList.add('parametros', 'layer-field');
            inp.name = `neurons_layer_${i}`;
            inp.placeholder = `Neurônios camada ${i}`;
            inp.min = 1;
            wrapper.appendChild(inp);
        }
    }

    

    /*  
    ─────────────────────────
     Botão "Gerar"
     ───────────────────────── 
    btnGerar.addEventListener('click', () => {
         ───────────
         1. Coletar dados
         ─────────── 
        //const entradas = parseInt(entradasInp.value, 10) || 0;
        //const saidas   = parseInt(saidasInp.value,   10) || 0;
        const camadas = parseInt(camadasInp.value, 10) || 0;

        // obtém quantos neurônios há em cada camada oculta
        const neuroniosOcultas = Array.from(wrapper.querySelectorAll('.layer-field'))
            .map(inp => parseInt(inp.value, 10) || 0);

        // vetor completo [input, hidden1, hidden2, ..., output]
        const estrutura = [neuroniosOcultas[0], ...neuroniosOcultas, neuroniosOcultas[neuroniosOcultas.length - 1]];
        //const estrutura = [entradas, entradas, ...neuroniosOcultas, saidas,saidas];
        
      

       
    }); 
    */



    /* ───────────
    2. Desenhar
    ─────────── */
    desenharRede();

});

function desenharRede() {
    const gerar = document.getElementById('generate');

    const ids = []; //neurônios
    const ids_bias = []; 
    const ids_func = [];
    const ids_line = []; // limhas/setas
    const ids_square = [];
    const ids_legend = []; //apenas simbologia
    const ids_texto = []; // texto em si


    var r = 20;
    var lineDi = 20; // Distãncia entre linhas

    //const colunas = estrutura.length; //nnumero de camadas 
    //const maxNeuro = Math.max(...estrutura); // maior nº de neurônios
    ///const linhasGrade = 1 + maxNeuro; // 1 (bias) + visíveis 
    

    /* ─── dimensões do SVG ─── */
    const wrapper = document.getElementById('network-wrapper');
    wrapper.innerHTML = '';

    const wSVG = 1200
    const hSVG = 1000
    const MwSVG = 1100;
    const MhSVG = hSVG / 2;
    

    // dimensão div pai
    gerar.style.height = (hSVG + 200) + "px";


    /* ─── cria SVG ─── */
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    //console.log(svg);

    svg.setAttribute('width', wSVG);
    svg.setAttribute('height', hSVG);

    svg.style.border = '1px solid #ccc';
    wrapper.appendChild(svg);
    

  
   


    // ===========  FUNC CÍRCULOS ===========

    function generateCircle(cx, cy, r, con, point) {
        // 1) Cria o elemento
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

        // 2) Dá um id (pode gerar automático se quiser)
        const id = `ec-${point.length}`; // gera automático 
        circle.setAttribute("id", id);

        // 3) Atributos visuais — valores dentro do tamanho do SVG
        circle.setAttribute("cx", cx); // centro X
        circle.setAttribute("cy", cy); // centro Y
        circle.setAttribute("r", r); // raio
        circle.setAttribute("fill", "none");
        circle.setAttribute("stroke", con); // contorno para ficar evidente
        //circle.setAttribute("stroke-dasharray", "150 628.32"); // contorno para ficar evidente  

        circle.setAttribute("stroke-width", 1);

        // 4) Adiciona ao SVG
        svg.appendChild(circle);

        // 5) Guarda o id
        point.push(id);

    }




    
    
    // ===========  FUNC CÍRCULOS ===========

    function generateCircle3(cx, cy, cx2, cy2,  p, con, point) {
        // 1) Cria o elemento
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

        // 2) Dá um id (pode gerar automático se quiser)
        const id = `ec-${point.length}`; // gera automático 
        path.setAttribute("id", id);

        // 3) Atributos visuais — valores dentro do tamanho do SVG
        //path.setAttribute( "d",`M  550 0 A ${generate_p(1)} ${generate_p(1)} 0 0 0 950 400` );
        path.setAttribute( "d",`M  ${cx}  ${cy} A ${p} ${p} 0 0 0 ${cx2} ${cy2}` );

        //path.setAttribute("stroke-dasharray", "150 40.32"); // contorno para ficar evidente  

        path.setAttribute("fill", "none");  
        path.setAttribute("stroke", con);
        path.setAttribute("stroke-width", "");
        


 
        // 4) Adiciona ao SVG
        svg.appendChild(path);

        // 5) Guarda o id
        point.push(id);

    }
   




    function generateCircle2(cx, cy, r, con, point) {
        // 1) Cria o elemento
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

        // 2) Dá um id (pode gerar automático se quiser)
        const id = `ec-${point.length}`; // gera automático 
        circle.setAttribute("id", id);

        // 3) Atributos visuais — valores dentro do tamanho do SVG
        circle.setAttribute("cx", cx); // centro X
        circle.setAttribute("cy", cy); // centro Y
        circle.setAttribute("r", r); // raio
        circle.setAttribute("fill", "none");
        circle.setAttribute("stroke", con); // contorno para ficar evidente
        circle.setAttribute("stroke-dasharray", "10, 5"); // contorno para ficar evidente  
        circle.setAttribute("stroke-width", 1);

        // 4) Adiciona ao SVG
        svg.appendChild(circle);

        // 5) Guarda o id
        point.push(id);

    }


    // =========== FUNC QUADRADOS =============

    function generateSquare(cx, cy, point) {
        const square = document.createElementNS("http://www.w3.org/2000/svg", "rect");

        const id = `eq-${point.length}`;
        square.setAttribute("id", id);

        const size = 40; // Tamanho do lado do quadrado

        // Para centralizar o quadrado no ponto (cx, cy)
        square.setAttribute("x", cx - size / 2);
        square.setAttribute("y", cy - size / 2);
        square.setAttribute("width", size);
        square.setAttribute("height", size);
        square.setAttribute("rx", 10);
        square.setAttribute("ry", 10);
        square.setAttribute("fill", "none");
        square.setAttribute("stroke", "black");
        square.setAttribute("stroke-width", 1);

        svg.appendChild(square);
        point.push(id);
    }

    // =========== FUNC POLYGONOS=============

    function generatePolygon(cx, cy, point) {
        const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");

        const id = `ep-${point.length}`;
        polygon.setAttribute("id", id);

        const size = 40; // tamanho do quadrado
        const half = size / 2;

        // Pontos do quadrado (x1,y1 x2,y2 ...)
        const points = [
            [cx - half, cy - half], // canto superior esquerdo
            [cx + half, cy - 9], // canto superior direito
            [cx + half, cy + half], // canto inferior direito
            [cx - half, cy + half] // canto inferior esquerdo
        ];

        // Transformando em string "x1,y1 x2,y2 x3,y3 x4,y4"
        const pointsStr = points.map(p => p.join(",")).join(" ");
        polygon.setAttribute("points", pointsStr);

        polygon.setAttribute("fill", "none");
        polygon.setAttribute("stroke", "blue");
        polygon.setAttribute("stroke-width", 1);

        svg.appendChild(polygon);
        point.push(id);
    }




    // =========== FUNC TEXT =============

    function generateTexto(x, y, ids_) {
        const textt = document.createElementNS("http://www.w3.org/2000/svg", "text");

        const id = `et-${ids_.length}`;
        textt.setAttribute("id", id);

        const font_size = 40; // tamanho do texto

        textt.setAttribute("x", x);
        textt.setAttribute("y", y);

        //polygon.setAttribute("fill", "none");
        textt.setAttribute("font-size", "40");
        //polygon.setAttribute("stroke-width", 1);
        textt.textContent = "testedsasad";

        svg.appendChild(textt);
        ids_.push(id);
    }

    //generateTexto(30, 30, ids_texto);
    //generateTexto(60, 30, ids_texto);


    //gerar legenda
    generateSquare(wSVG - 400 , hSVG - 29, ids_legend);
    const square_legend = document.getElementById(ids_legend[0]);
    square_legend.setAttribute('id', "ele_0");
    ids_legend[0] = "ele_0";

    generateCircle(wSVG - 300, hSVG - 29, 20, "black", ids_legend);
    const circle_legend = document.getElementById(ids_legend[1]);
    circle_legend.setAttribute('id', "ele_1");
    ids_legend[1] = "ele_1";

    generatePolygon(wSVG -200, hSVG - 29, ids_legend);
    const polygon_legend = document.getElementById(ids_legend[2]);
    polygon_legend.setAttribute('id', "ele_2");
    ids_legend[2] = "ele_2";

    generateCircle(wSVG - 100 , hSVG - 29, 20, "red", ids_legend);
    const bias_legend = document.getElementById(ids_legend[3]);
    bias_legend.setAttribute('id', "ele_3");
    ids_legend[0] = "ele_3";

    var x_center = 550;
    var y_center = 340;
    var px_raio = 320;

    function generate_x(r){

    	return (r/(r+1))* px_raio + x_center;

    }

    function generate_r(b){

    	return 1/(b + 1) * px_raio ;

    }

    function generate_x2(x){

    	return px_raio + x_center;

    }

    function generate_p(x){

    	return 1/math.abs(x) * px_raio ;

    }


    
    function point_initial_arc(X, Z_0){
          console.log('Entrada point: ')
          const Zl = math.complex(0, X) ;    
          const Z0 = math.complex(Z_0,0) ; 

          const zl = math.divide(Zl, Z_0);
          console.log(Zl);
          const z0 = math.complex(1,0) ; 
          console.log('Entrada normalizada: point ')
          console.log(zl)
          console.log(z0)


          var a = math.divide(math.subtract(zl, z0), math.add(zl, z0));
          console.log('Coeficiente de reflexão: pooint')

          console.log(a);

                   a =   math.conj(a);                   

          generateCircle(a.re*px_raio +x_center, a.im * px_raio +y_center, 5, "purple", ids); 
          return a;
            
    }

    console.log(point_initial_arc(50, 50));
    var teste =  point_initial_arc(150, 50);




    function plot_point(R, X, Z_0){
          console.log('Entrada: ')
          const Zl = math.complex(R, X) ;    
          const Z0 = math.complex(Z_0,0) ; 

          const zl = math.divide(Zl, Z0)
          console.log(Zl);
          const z0 = math.complex(1,0) ; 


            console.log('Entrada normalizada: ')

            console.log(zl)

          var a = math.divide(math.subtract(zl, z0), math.add(zl, z0));
          console.log('Coeficiente de reflexão: ')
          a =   math.conj(a);                     // Complex 2 - 3i

          console.log(a);

          generateCircle(a.re*px_raio +x_center, a.im * px_raio +y_center, 5, "purple", ids); 

          return a;
            
    }


    //plot_point(100, 20, 50);

    //console.log(generate_r(2));
  
    function plot_circles_r(){ //plotagem de circulos reais

        var colors = "blue";
        generateArrow(100, y_center, 1000, y_center, r = 0); // gerar eixo x
        generateArrow(x_center, 900,x_center, 2, r = 0); //gerar eixo y
        generateCircle(x_center, y_center, px_raio, "black", ids); //gerar contorno circle == 1

        generateCircle(generate_x(0.1),  y_center, generate_r(0.1),  colors, ids);
        generateCircle(generate_x(0.2),  y_center, generate_r(0.2),  colors, ids);
        generateCircle(generate_x(0.3),  y_center, generate_r(0.3),  colors, ids);
        generateCircle(generate_x(0.4),  y_center, generate_r(0.4),  colors, ids);
        generateCircle(generate_x(0.5),  y_center, generate_r(0.5),  colors, ids);
        generateCircle(generate_x(0.6),  y_center, generate_r(0.6),  colors, ids);
        generateCircle(generate_x(0.7),  y_center, generate_r(0.7),  colors, ids);
        generateCircle(generate_x(0.8),  y_center, generate_r(0.8),  colors, ids);
        generateCircle(generate_x(0.9),  y_center, generate_r(0.9),  colors, ids);
        generateCircle(generate_x(1,0),  y_center, generate_r(1.0),  colors, ids);
        generateCircle(generate_x(1.2),  y_center, generate_r(1.2),  colors, ids);
        generateCircle(generate_x(1.4),  y_center, generate_r(1.4),  colors, ids);
        generateCircle(generate_x(1.6),  y_center, generate_r(1.6),  colors, ids);
        generateCircle(generate_x(1.8),  y_center, generate_r(1.8),  colors, ids); 
        generateCircle(generate_x(2.0),  y_center, generate_r(2.0),  colors, ids); 
        generateCircle(generate_x(3.0),  y_center, generate_r(3.0),  colors, ids); 
        generateCircle(generate_x(5.0),  y_center, generate_r(5.0),  colors, ids);
        generateCircle(generate_x(11.0), y_center, generate_r(11.0), colors, ids); 

    }
    plot_circles_r();

    function plot_circles_x(){

    var colors_x = "red";
    
    //generateCircle(generate_x2(1), y_center - generate_p(1), generate_p(1), colors_x, ids); 
    //generateCircle(generate_x2(3), y_center - generate_p(3), generate_p(3), colors_x, ids); 
    //generateCircle(generate_x2(2), y_center - generate_p(2), generate_p(2), colors_x, ids); 
    //generateCircle(generate_x2(1.5), y_center - generate_p(1.5), generate_p(1.5), colors_x, ids); 
    //generateCircle(generate_x2(0.5), y_center - generate_p(0.5), generate_p(0.5), colors_x, ids); 



    }
    plot_circles_x();


    generateCircle3(550, -px_raio + y_center, px_raio + x_center, y_center, generate_p(1), "red",ids)
    generateCircle3(teste.re*px_raio +x_center,  teste.im * px_raio +y_center, px_raio + x_center, y_center, generate_p(3), "red",ids)


    //generateCircle(zz.re*px_raio +x_center+400, zz.im * px_raio +y_center, 5, "black", ids); 




    plot_point(100, 50, 50);
    plot_point(150, 150, 50);

    

    const a = math.complex(2, 3)     // Complex 2 + 3i
    const b = math.complex('4 - 2i') // Complex 4 - 2i

    math.re(a)                       // Number 2
    math.im(a)                       // Number 3
    math.conj(a)                     // Complex 2 - 3i

    //console.log(math.add(a, b));                   // Complex 6 + i
    math.multiply(a, 2)              // Complex 4 + 6i
    math.sqrt(-4)


 




   


    // Função para criar o marcador, com refX = largura do marcador (10)
    function createArrowMarker() {
        const defs = document.createElementNS(svgNS, 'defs');
        const marker = document.createElementNS(svgNS, 'marker');
        marker.setAttribute('id', 'arrowhead');
        marker.setAttribute('markerWidth', 10);
        marker.setAttribute('markerHeight', 10);
        marker.setAttribute('refX', 10); // importante!
        marker.setAttribute('refY', 5);
        marker.setAttribute('orient', 'auto');
        marker.setAttribute('markerUnits', 'strokeWidth');
        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', 'M0,0 L10,5 L0,10 Z');
        path.setAttribute('fill', 'black');
        marker.appendChild(path);
        defs.appendChild(marker);
        svg.appendChild(defs);
    }



    createArrowMarker();
    // Função para gerar linha:
    function generateArrow(x1, y1, x2, y2, r = 20) {
        const line = document.createElementNS(svgNS, 'line');
        x1 += r;
        x2 -= r;
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', 'black');
        line.setAttribute('stroke-width', 1);
        line.setAttribute('marker-end', 'url(#arrowhead)');
        svg.appendChild(line);
    }








  


// seu SVG já criado e adicionado ao DOM
svgPanZoom(svg, {
    zoomEnabled: true,
    controlIconsEnabled: false,
    fit: false,
    center: false,
    minZoom: 0.5,
    maxZoom: 3
});

}


