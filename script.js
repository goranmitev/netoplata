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


var minimalna_neto_plata = 26046;  // od mart 2026
var minimalna_bruto_plata = 38600; // od mart 2026
var prosecna_bruto_plata = 69141;  // januari 2026 http://www.ujp.gov.mk/mk/javnost/soopstenija/pogledni/1187
var najniska_osnovica = prosecna_bruto_plata * 0.5;
var najvisoka_osnovica_vraboten = prosecna_bruto_plata * 16;
var najvisoka_osnovica_samovraboten = prosecna_bruto_plata * 12;

var procent_penzisko = 0.188;
var procent_zdravstveno = 0.075;
var procent_vrabotuvanje = 0.012;
var procent_zaboluvanje = 0.005;
var procent_personalen = 0.10;
var licno_osloboduvanje = 10932; // mesecno licno osloboduvanje 2026

function formatMoney(value) {
    return Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' ден';
}

slider.addEventListener('input', function () {

    var brutoplata = parseInt(this.value);
    var netoplata = 0;

    // Update filled-track visual
    var pct = ((brutoplata - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.setProperty('--pct', pct + '%');

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

    // Ako bruto platata e pogolema od maximalnata osnovica
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

    np.innerHTML = formatMoney(netoplata);
    bp.innerHTML = formatMoney(brutoplata);
    ppen.innerHTML = formatMoney(vkupno_penzisko);
    pzdr.innerHTML = formatMoney(vkupno_zdravstveno);
    pvra.innerHTML = formatMoney(vkupno_vrabotuvanje);
    pzab.innerHTML = formatMoney(vkupno_zaboluvanje);
    prid.innerHTML = formatMoney(vkupno_pridonesi);
    pers.innerHTML = formatMoney(pdd);
    procent_pridonesi.innerHTML = vkupen_procent_pridonesi;
    vkupen_procent.innerHTML = vkupen_procent_davacki;
});

// Populate initial values on page load
slider.dispatchEvent(new Event('input'));
