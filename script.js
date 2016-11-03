var slider = document.getElementById('slider');
var np = document.getElementById('np');
var bp = document.getElementById('bp');
var ppen = document.getElementById('ppen');
var pzdr = document.getElementById('pzdr');
var pvra = document.getElementById('pvra');
var pzab = document.getElementById('pzab');
var prid = document.getElementById('prid');
var procent = document.getElementById('procent');


var minimalna_neto_plata = 10080;
var minimalna_bruto_plata = 14223; // http://www.eurokonsaltplus.com.mk/?p=1856
var prosecna_bruto_plata = 32268; // January 2016 http://www.ujp.gov.mk/mk/javnost/soopstenija/pogledni/547
var najniska_osnovica = prosecna_bruto_plata * 0.5;
var najvisoka_osnovica_vraboten = prosecna_bruto_plata * 12;
var najvisoka_osnovica_samovraboten = prosecna_bruto_plata * 8;

var procent_penzisko = 0.18;
var procent_zdravstveno = 0.073;
var procent_vrabotuvanje = 0.012;
var procent_zaboluvanje = 0.005;
var procent_personalen = 0.10;
var licno_osloboduvanje = 7357;

noUiSlider.create(slider, {
    start: najniska_osnovica,
    step: 1,
    connect: [true, false],
    //tooltips: [ wNumb({ thousand: '.', postfix: ' ден', decimals: 0 }) ],
//    format: wNumb({
//        thousand: '.', 
//        postfix: ' ден', 
//        decimals: 0
//    }),
    range: {
        'min': najniska_osnovica,
        'max': 100000
    }
});

slider.noUiSlider.on('update', function (values, handle) {
    
    var brutoplata = parseInt(values[handle]);
    
    // Ako bruto platata e pogolema od minimalnata osnovica
    if( (brutoplata >= najniska_osnovica) && (brutoplata <= najvisoka_osnovica_vraboten) ){
        var vkupno_penzisko = Math.round(brutoplata * procent_penzisko);
        var vkupno_zdravstveno = Math.round(brutoplata * procent_zdravstveno);
        var vkupno_vrabotuvanje = Math.round(brutoplata * procent_vrabotuvanje);
        var vkupno_zaboluvanje = Math.round(brutoplata * procent_zaboluvanje);
        var vkupno_pridonesi = vkupno_penzisko + vkupno_zdravstveno + vkupno_vrabotuvanje + vkupno_zaboluvanje;
        
        var osnovicapdd = brutoplata - vkupno_pridonesi - licno_osloboduvanje;
        var pdd = osnovicapdd * procent_personalen;
        
        var netoplata = brutoplata - vkupno_pridonesi - pdd;
    }
    
    
    
    
    
    
    
    
    
    
    var vkupen_procent = (( (vkupno_pridonesi + pdd) / brutoplata ) * 100).toFixed(2);
    
    
    // za plata poniska od najniskata osnovica
    var osnovica_za_doplata = najniska_osnovica - brutoplata;
    
    
    
    
//    var p_doplata = osnovica_za_doplata  * penzisko;
//    var z_doplata = osnovica_za_doplata * zdravstveno;
//    var v_doplata = osnovica_za_doplata * vrabotuvanje;
//    var b_doplata = osnovica_za_doplata * zaboluvanje;
//    
//    var pridonesi = p + z + v + b;    
//    var osnovicapdd = brutoplata - pridonesi - osloboduvanje;
//    var pdd = osnovicapdd * personalen;    
//    var n = brutoplata - pridonesi - pdd;
//    var vkupen_procent = ( (pridonesi + pdd) / brutoplata ) * 100;
    
    
    np.innerHTML = netoplata;
    bp.innerHTML = brutoplata;
    ppen.innerHTML = vkupno_penzisko;
    pzdr.innerHTML = vkupno_zdravstveno;
    pvra.innerHTML = vkupno_vrabotuvanje;
    pzab.innerHTML = vkupno_zaboluvanje;
    prid.innerHTML = vkupno_pridonesi;
    procent.innerHTML = vkupen_procent;
});