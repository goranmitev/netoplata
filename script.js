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
var mainLabel = document.getElementById('main-label');
var outputLabel = document.getElementById('output-label');

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

var currency = 'MKD';
var exchangeRates = { MKD: 1, EUR: 61.5, USD: 57.0 };
var currencySymbols = { MKD: 'ден', EUR: '€', USD: '$' };

var mode = 'gross'; // 'gross' or 'net'
var GROSS_MIN = 40000, GROSS_MAX = 3000000;
var NET_MIN = 26000, NET_MAX = 2400000;

function formatMoney(value) {
    var rate = exchangeRates[currency];
    var symbol = currencySymbols[currency];
    var converted = value / rate;
    if (currency === 'MKD') {
        return Math.round(converted).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' ' + symbol;
    }
    return converted.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ' + symbol;
}

function sliderToSalary(pos) {
    var min = mode === 'gross' ? GROSS_MIN : NET_MIN;
    var mid = mode === 'gross' ? 300000 : 240000;
    var max = mode === 'gross' ? GROSS_MAX : NET_MAX;
    if (pos <= 600) {
        var t = pos / 600;
        return Math.round((min + (mid - min) * t * t) / 1000) * 1000;
    } else {
        var t = (pos - 600) / 400;
        return Math.round((mid + (max - mid) * t * t) / 1000) * 1000;
    }
}

function calculateFromGross(brutoplata) {
    var vkupno_penzisko, vkupno_zdravstveno, vkupno_vrabotuvanje, vkupno_zaboluvanje, vkupno_pridonesi, pdd, netoplata;

    if (brutoplata >= najniska_osnovica && brutoplata <= najvisoka_osnovica_vraboten) {
        vkupno_penzisko = Math.round(brutoplata * procent_penzisko);
        vkupno_zdravstveno = Math.round(brutoplata * procent_zdravstveno);
        vkupno_vrabotuvanje = Math.round(brutoplata * procent_vrabotuvanje);
        vkupno_zaboluvanje = Math.round(brutoplata * procent_zaboluvanje);
        vkupno_pridonesi = vkupno_penzisko + vkupno_zdravstveno + vkupno_vrabotuvanje + vkupno_zaboluvanje;
        pdd = Math.round((brutoplata - vkupno_pridonesi - licno_osloboduvanje) * procent_personalen);
        netoplata = brutoplata - vkupno_pridonesi - pdd;

    } else if (brutoplata < najniska_osnovica) {
        var osnovica_za_doplata = najniska_osnovica - brutoplata;
        var vkupno_doplata = Math.round(osnovica_za_doplata * (procent_penzisko + procent_zdravstveno + procent_vrabotuvanje + procent_zaboluvanje));
        vkupno_penzisko = Math.round(brutoplata * procent_penzisko);
        vkupno_zdravstveno = Math.round(brutoplata * procent_zdravstveno);
        vkupno_vrabotuvanje = Math.round(brutoplata * procent_vrabotuvanje);
        vkupno_zaboluvanje = Math.round(brutoplata * procent_zaboluvanje);
        vkupno_pridonesi = vkupno_penzisko + vkupno_zdravstveno + vkupno_vrabotuvanje + vkupno_zaboluvanje + vkupno_doplata;
        pdd = Math.round((brutoplata - vkupno_pridonesi - licno_osloboduvanje) * procent_personalen);
        netoplata = brutoplata - vkupno_pridonesi - pdd;

    } else {
        vkupno_penzisko = Math.round(najvisoka_osnovica_vraboten * procent_penzisko);
        vkupno_zdravstveno = Math.round(najvisoka_osnovica_vraboten * procent_zdravstveno);
        vkupno_vrabotuvanje = Math.round(najvisoka_osnovica_vraboten * procent_vrabotuvanje);
        vkupno_zaboluvanje = Math.round(najvisoka_osnovica_vraboten * procent_zaboluvanje);
        vkupno_pridonesi = vkupno_penzisko + vkupno_zdravstveno + vkupno_vrabotuvanje + vkupno_zaboluvanje;
        pdd = Math.round((brutoplata - vkupno_pridonesi - licno_osloboduvanje) * procent_personalen);
        netoplata = brutoplata - vkupno_pridonesi - pdd;
    }

    return { brutoplata: brutoplata, netoplata: netoplata,
             vkupno_penzisko: vkupno_penzisko, vkupno_zdravstveno: vkupno_zdravstveno,
             vkupno_vrabotuvanje: vkupno_vrabotuvanje, vkupno_zaboluvanje: vkupno_zaboluvanje,
             vkupno_pridonesi: vkupno_pridonesi, pdd: pdd };
}

function grossFromNet(targetNet) {
    var lo = GROSS_MIN, hi = GROSS_MAX;
    for (var i = 0; i < 60; i++) {
        var mid = (lo + hi) / 2;
        if (calculateFromGross(mid).netoplata < targetNet) lo = mid;
        else hi = mid;
    }
    return Math.round((lo + hi) / 2 / 1000) * 1000;
}

document.querySelectorAll('#currency-switcher .currency-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        document.querySelectorAll('#currency-switcher .currency-btn').forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');
        currency = this.dataset.currency;
        slider.dispatchEvent(new Event('input'));
    });
});

document.querySelectorAll('#mode-switcher .currency-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        document.querySelectorAll('#mode-switcher .currency-btn').forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');
        mode = this.dataset.mode;
        slider.value = 0;
        slider.dispatchEvent(new Event('input'));
    });
});

slider.addEventListener('input', function () {
    var inputSalary = sliderToSalary(parseInt(this.value));
    var r;

    if (mode === 'gross') {
        r = calculateFromGross(inputSalary);
        mainLabel.textContent = 'Бруто плата';
        outputLabel.textContent = 'Нето плата';
        bp.innerHTML = formatMoney(r.brutoplata);
        np.innerHTML = formatMoney(r.netoplata);
    } else {
        var bruto = grossFromNet(inputSalary);
        r = calculateFromGross(bruto);
        mainLabel.textContent = 'Нето плата';
        outputLabel.textContent = 'Бруто плата';
        bp.innerHTML = formatMoney(inputSalary);
        np.innerHTML = formatMoney(r.brutoplata);
    }

    // Update filled-track visual
    var pct = (parseInt(this.value) / 1000) * 100;
    slider.style.setProperty('--pct', pct + '%');

    var vkupen_procent_pridonesi = ((r.vkupno_pridonesi / r.brutoplata) * 100).toFixed(2);
    var vkupen_procent_davacki = (((r.vkupno_pridonesi + r.pdd) / r.brutoplata) * 100).toFixed(2);

    ppen.innerHTML = formatMoney(r.vkupno_penzisko);
    pzdr.innerHTML = formatMoney(r.vkupno_zdravstveno);
    pvra.innerHTML = formatMoney(r.vkupno_vrabotuvanje);
    pzab.innerHTML = formatMoney(r.vkupno_zaboluvanje);
    prid.innerHTML = formatMoney(r.vkupno_pridonesi);
    pers.innerHTML = formatMoney(r.pdd);
    procent_pridonesi.innerHTML = vkupen_procent_pridonesi;
    vkupen_procent.innerHTML = vkupen_procent_davacki;
});

// Populate initial values on page load
slider.dispatchEvent(new Event('input'));
