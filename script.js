var slider = document.getElementById('slider');
var np = document.getElementById('np');
var bp = document.getElementById('bp');
var ppen = document.getElementById('ppen');
var pzdr = document.getElementById('pzdr');
var pvra = document.getElementById('pvra');
var pzab = document.getElementById('pzab');
var prid = document.getElementById('prid');
var pers = document.getElementById('pers');
var procent_pridonesi = document.getElementById('procent_pridonesi');
var vkupen_procent = document.getElementById('vkupen_procent');


var minimalna_neto_plata = 10080;
var minimalna_bruto_plata = 14740; // 14739 http://www.eurokonsaltplus.com.mk/?p=1856
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

var moneyFormat = wNumb({
	mark: ',',
	thousand: '.',
	postfix: ' ден'
});

noUiSlider.create(slider, {
    start: najniska_osnovica,
    step: 1,
    connect: [true, false],
    range: {
        'min': minimalna_bruto_plata,
        'max': 1000000
    }
});

slider.noUiSlider.on('update', function (values, handle) {

    var brutoplata = parseInt(values[handle]);
    var netoplata = 0;

    // Ako bruto platata e pogolema od minimalnata osnovica
    if ((brutoplata >= najniska_osnovica) && (brutoplata <= najvisoka_osnovica_vraboten)) {
        var vkupno_penzisko = Math.round(brutoplata * procent_penzisko);
        var vkupno_zdravstveno = Math.round(brutoplata * procent_zdravstveno);
        var vkupno_vrabotuvanje = Math.round(brutoplata * procent_vrabotuvanje);
        var vkupno_zaboluvanje = Math.round(brutoplata * procent_zaboluvanje);
        var vkupno_pridonesi = vkupno_penzisko + vkupno_zdravstveno + vkupno_vrabotuvanje + vkupno_zaboluvanje;

        var osnovicapdd = brutoplata - vkupno_pridonesi - licno_osloboduvanje;
        var pdd = Math.round(osnovicapdd * procent_personalen);

        netoplata = brutoplata - vkupno_pridonesi - pdd;
    }

    // Ako bruto platata e pomala od minimalnata osnovica
    if (brutoplata < najniska_osnovica) {
        // za plata poniska od najniskata osnovica
        var osnovica_za_doplata = najniska_osnovica - brutoplata;
        var p_doplata = Math.round(osnovica_za_doplata * procent_penzisko);
        var z_doplata = Math.round(osnovica_za_doplata * procent_zdravstveno);
        var v_doplata = Math.round(osnovica_za_doplata * procent_vrabotuvanje);
        var b_doplata = Math.round(osnovica_za_doplata * procent_zaboluvanje);
        var vkupno_doplata = p_doplata + z_doplata + v_doplata + b_doplata;

        var vkupno_penzisko = Math.round(brutoplata * procent_penzisko);
        var vkupno_zdravstveno = Math.round(brutoplata * procent_zdravstveno);
        var vkupno_vrabotuvanje = Math.round(brutoplata * procent_vrabotuvanje);
        var vkupno_zaboluvanje = Math.round(brutoplata * procent_zaboluvanje);
        var vkupno_pridonesi = vkupno_penzisko + vkupno_zdravstveno + vkupno_vrabotuvanje + vkupno_zaboluvanje + vkupno_doplata;

        var osnovicapdd = brutoplata - vkupno_pridonesi - licno_osloboduvanje;
        var pdd = Math.round(osnovicapdd * procent_personalen);

        netoplata = brutoplata - vkupno_pridonesi - pdd;
    }

    // Ako bruto platata e pogolema od minimalnata osnovica
    if (brutoplata > najvisoka_osnovica_vraboten) {
        var vkupno_penzisko = Math.round(najvisoka_osnovica_vraboten * procent_penzisko);
        var vkupno_zdravstveno = Math.round(najvisoka_osnovica_vraboten * procent_zdravstveno);
        var vkupno_vrabotuvanje = Math.round(najvisoka_osnovica_vraboten * procent_vrabotuvanje);
        var vkupno_zaboluvanje = Math.round(najvisoka_osnovica_vraboten * procent_zaboluvanje);
        var vkupno_pridonesi = vkupno_penzisko + vkupno_zdravstveno + vkupno_vrabotuvanje + vkupno_zaboluvanje;

        var osnovicapdd = brutoplata - vkupno_pridonesi - licno_osloboduvanje;
        var pdd = Math.round(osnovicapdd * procent_personalen);

        netoplata = brutoplata - vkupno_pridonesi - pdd;
    }







    var vkupen_procent_pridonesi = (((vkupno_pridonesi) / brutoplata) * 100).toFixed(2);
    var vkupen_procent_davacki = (((vkupno_pridonesi + pdd) / brutoplata) * 100).toFixed(2);


    np.innerHTML = moneyFormat.to(netoplata);
    bp.innerHTML = moneyFormat.to(brutoplata);
    ppen.innerHTML = moneyFormat.to(vkupno_penzisko);
    pzdr.innerHTML = moneyFormat.to(vkupno_zdravstveno);
    pvra.innerHTML = moneyFormat.to(vkupno_vrabotuvanje);
    pzab.innerHTML = moneyFormat.to(vkupno_zaboluvanje);
    prid.innerHTML = moneyFormat.to(vkupno_pridonesi);
    pers.innerHTML = moneyFormat.to(pdd);
    procent_pridonesi.innerHTML = vkupen_procent_pridonesi;
    vkupen_procent.innerHTML = vkupen_procent_davacki;
});