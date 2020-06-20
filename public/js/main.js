/*  ---------------------------------------------------
  Template Name: Deerhost
  Description:  Deerhost Hosting HTML Template
  Author: Colorlib
  Author URI: https://colorlib.com
  Version: 1.0
  Created: Colorlib
---------------------------------------------------------  */

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
    });


})(jQuery);


class Consumo {
    constructor(id, pacote, tempo, servico, caminhoImg, altImg, pesoConsumo) {
        this.id = id;
        this.pacote = pacote;
        this.tempo = tempo;
        this.servico = servico;
        this.caminhoImg = caminhoImg;
        this.altImg = altImg;
        this.pesoConsumo = pesoConsumo;
    }
}

function calcula(){
    let divTemplate = $('#divTemplate');

    divTemplate.html("");


    $.ajax({
        url: '/',
        contentType: 'application/json',
        type: 'GET',
        success: function(data) {
           let response = [
                new Consumo( 1,"3000", 1, 'Netflix','nt.png','Cálculo de gasto de internet Netflix',0.533 ),
                new Consumo(2 ,"2200", 1, 'Youtube' ,'yt.png','Cálculo de gasto de internet Youtube',0.391 ),
                new Consumo( 3,"210", 1, 'WhatsApp','wht.png','Cálculo de gasto de internet WhatsApp',0.037  ),
                new Consumo( 4,"120", 1, 'Facebook','fb.png','Cálculo de gasto de internet Facebook',0.021 ),
                new Consumo(5 ,"90", 1, 'Instagram','insta.png','Cálculo de gasto de internet Instagram',0.016  )
            ];
            if(response.length > 0){
                response.forEach(function(consumo) {
                    divTemplate.append(
                        '        <div class="col-md-12">\n' +
                        '            <div class="row">\n' +
                        '                <div class="col-md-3 mt-4">\n' +
                        '                    <img src="img/' + consumo.caminhoImg + '" class="img-sider-bar " alt="' + consumo.caminhoImg + '">\n' +
                        '                </div>\n' +
                        '                <div class="col-md-9">\n' +
                        '                    <div class="row">\n' +
                        '                        <div class="range">\n' +
                        '                            <input type="range" min="0" max="10" step="0.1" value="0" id="input_' + consumo.servico + '">\n' +
                        '                            <p class="rangeLabel rangeLabel_' + consumo.servico + ' ">0%</p>\n' +
                        '                        </div>\n' +
                        '                        <span class="value span-' + consumo.servico + ' " >0</span>\n' +
                        '                        <p style="padding-top: 30px; font-size: 25px">Min <a style="font-size: 20px">de uso</a></p>\n' +
                        '                    </div>\n' +
                        '                </div>\n' +
                        '            </div>\n' +
                        '        </div>\n'
                    );

                    let elem = document.getElementById('input_' + consumo.servico);

                    let entradaValue = document.getElementById('entrada').value;
                    let unidade = document.getElementById('unidade').value;
                    let entrada = entradaValue;



                    let rangeValue = function(){
                        let target = document.querySelector('.span-'+ consumo.servico);
                        let percent = this.value;
                        percent = percent/10;
                        let horasLabel = ((unidade==='GB'?entrada*1000*percent:entrada*percent) / consumo.pacote);
                        target.innerHTML =  horasLabel.toFixed(2);

                        response.forEach(function(consumoFaixa) {

                            let novaTaxa = 1 - consumo.pesoConsumo;
                            let novaTaxaIndividual = ((consumoFaixa.pesoConsumo * 100)/novaTaxa);
                            let novoValor = entrada * percent;
                            let novoValorTotal = entrada - novoValor;

                            let horasLabel = ((unidade==='GB'?entrada*1000*percent:entrada*percent) / consumo.pacote);
                            horasLabel =  horasLabel  * 60;
                            target.innerHTML =  horasLabel.toFixed(2);

                            if(consumoFaixa.id !== consumo.id){
                                let taxa = novaTaxaIndividual/100;
                                taxa = taxa.toFixed(2);
                                let pacote = novoValorTotal*taxa;

                                let target = document.querySelector('.span-'+ consumoFaixa.servico);
                                let horasLabel = (unidade==='GB'?pacote.toFixed(2)*1000:pacote.toFixed(2)) /consumoFaixa.pacote;
                                horasLabel =  horasLabel  * 60;
                                target.innerHTML =  horasLabel.toFixed(2);

                                let taxaPeso = parseFloat(taxa) * 10;
                                taxaPeso = taxaPeso.toFixed(2);
                                let label = $('.rangeLabel_' + consumoFaixa.servico);
                                let labelPercent = (taxaPeso * 10) + '%';

                                label.text(labelPercent + ' de ' + novoValorTotal.toFixed(2) + ' ' + unidade);

                                let mousemove = $('#input_' + consumoFaixa.servico);

                                mousemove.val(taxaPeso);

                                let val = (mousemove.val() - mousemove.attr('min')) / (mousemove.attr('max') - mousemove.attr('min'));

                                let taxaPeso2 = val * 100;

                                mousemove.css('background-image',
                                    '-webkit-gradient(linear, left top, right top, ' +
                                    'color-stop(' + taxaPeso2 + '%, rgba(40, 80, 49, 0.97)), ' +
                                    'color-stop(' + taxaPeso2 + '%, #9F9F9F)' +
                                    ')');
                                mousemove.css('background-image',
                                    '-moz-linear-gradient(left center, rgba(40, 80, 49, 0.97) 0%, rgba(40, 80, 49, 0.97) ' + taxaPeso2 + '%,#9F9F9F' + taxaPeso2 + '%, #9F9F9F 100%)');


                            }
                        });
                    };

                    elem.addEventListener("input", rangeValue);

                    let mousemove = $('#input_' + consumo.servico);

                    function targetLabel(unidade,servico, pesoConsumo, entrada, pacote ){
                        let target = document.querySelector('.span-'+ servico);
                        let horasLabel = ((unidade==='GB'?entrada*1000*pesoConsumo:entrada*pesoConsumo) / pacote);
                        horasLabel =  horasLabel  * 60;
                        target.innerHTML =  horasLabel.toFixed(2);
                    }

                    targetLabel(unidade, consumo.servico, consumo.pesoConsumo, entrada, consumo.pacote );


                    let taxaPeso = parseFloat(consumo.pesoConsumo) * 10;
                    taxaPeso = taxaPeso.toFixed(2);

                    let label = $('.rangeLabel_' + consumo.servico);
                    let labelPercent = (taxaPeso * 10) + '%';

                    label.text(labelPercent + ' de ' + entradaValue + ' ' + unidade);

                    mousemove.val(taxaPeso);

                    mousemove.css('background-image',
                        '-webkit-gradient(linear, left top, right top, ' +
                        'color-stop(' + (taxaPeso * 10) + '%, rgba(40, 80, 49, 0.97)), ' +
                        'color-stop(' + (taxaPeso * 10) + '%, #9F9F9F)' +
                        ')');
                    mousemove.css('background-image',
                        '-moz-linear-gradient(left center, rgba(40, 80, 49, 0.97) 0%, rgba(40, 80, 49, 0.97) ' + taxaPeso + '%,#9F9F9F' + taxaPeso + '%, #9F9F9F 100%)');


                    mousemove.click(function (e) {

                        let val = ($(this).val() - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min'));

                        let taxaPeso = val * 100;
                        taxaPeso = taxaPeso.toFixed(2);

                        let label = $('.rangeLabel_' + consumo.servico);
                        let labelPercent = (taxaPeso) + '%';


                        label.text(labelPercent + ' de ' + entradaValue + ' ' + unidade);

                        // label.css('margin-left', (percent - labelPercent.length) + '%');

                        $(this).css('background-image',
                            '-webkit-gradient(linear, left top, right top, ' +
                            'color-stop(' + taxaPeso + '%, rgba(40, 80, 49, 0.97)), ' +
                            'color-stop(' + taxaPeso + '%, #9F9F9F)' +
                            ')');

                        $(this).css('background-image',
                            '-moz-linear-gradient(left center, rgba(40, 80, 49, 0.97) 0%, rgba(40, 80, 49, 0.97) ' + taxaPeso + '%,#9F9F9F' + taxaPeso + '%, #9F9F9F 100%)');
                    });

                });
            }
        }
    });


}

function converteMB(){
    let entrada = document.getElementById('entrada').value;
    let unidade = document.getElementById('unidade').value;

    if(unidade === 'MB')
       return  entrada;
    else
        return entrada*1000;
}

$(document).ready(function() {

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #header').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });

});
