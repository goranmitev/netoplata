var slider = document.getElementById('slider');
var np = document.getElementById('np');
var bp = document.getElementById('bp');
var ppen = document.getElementById('ppen');
var pzdr = document.getElementById('pzdr');
var pvra = document.getElementById('pvra');
var pzab = document.getElementById('pzab');
var procent = document.getElementById('procent');
var penzisko = 0.18;
var zdravstveno = 0.073;
var vrabotuvanje = 0.012;
var zaboluvanje = 0.005;
var personalen = 0.10;
var osloboduvanje = 7357;

noUiSlider.create(slider, {
    start: 22000,
    step: 500,
    connect: [true, false],
    //tooltips: [ wNumb({ thousand: '.', postfix: ' ден', decimals: 0 }) ],
//    format: wNumb({
//        thousand: '.', 
//        postfix: ' ден', 
//        decimals: 0
//    }),
    range: {
        'min': 16000,
        'max': 200000
    }
});

slider.noUiSlider.on('update', function (values, handle) {
    var brutoplata = values[handle];
    var p = brutoplata * penzisko;
    var z = brutoplata * zdravstveno;
    var v = brutoplata * vrabotuvanje;
    var b = brutoplata * zaboluvanje;
    var pridonesi = p + z + v + b;    
    var osnovicapdd = brutoplata - pridonesi - osloboduvanje;
    var pdd = osnovicapdd * personalen;    
    var n = brutoplata - pridonesi - pdd;
    var vkupen_procent = ( (pridonesi + pdd) / brutoplata ) * 100;
    //console.log(n);
    np.innerHTML = n;
    bp.innerHTML = brutoplata;
    ppen.innerHTML = p;
    pzdr.innerHTML = z;
    pvra.innerHTML = v;
    pzab.innerHTML = b;
    procent.innerHTML = vkupen_procent;
});