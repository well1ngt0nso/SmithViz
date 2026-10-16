
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

    //generateCircle(a.re*px_raio +x_center, a.im * px_raio +y_center, 5, "purple", ids, svg); 
    return a;
    
}

console.log(point_initial_arc(50, 50));

