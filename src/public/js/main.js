function limite(lit, c){
    var now = new Date().getTime();
    var gap = lit - now;

    var segundos = 1000;
    var minutos = segundos * 60;
    var horas = minutos * 60;
    var dias = horas * 24;

    var d = Math.floor(gap / (dias));
    var h = Math.floor((gap % (dias)) / (horas));
    var m = Math.floor((gap % (horas)) / (minutos));
    var s = Math.floor((gap % (minutos)) / (segundos));
    if(d < 0 || h < 0 || m < 0 || s < 0){
        $('#contador'+c).html('0 Días - 00:00:00');
        location.reload();
        // funcion ajax necesaria para eliminar al llegar a 0
    }else{
        if(s<10){
            s = '0'+s;
        }
        if(m<10){
            m = '0'+m;
        }
        if(h<10){
            h = '0'+h;
        }
        if(d == 0){
            $('#contador'+c).addClass('text-warning');
        }
        $('#contador'+c).html(d+' Días - '+h+':'+m+':'+s);
    }
}

$(document).ready(function () {
    var c = $('#con').val();
    for(let i = 0; i < c; i++){
        setInterval(function(){
            limite(new Date($('#fecha'+(1+i)).val()), (1+i));
        }, 1000)
    }

    $(document).on('click', '#ssd', function (e) {
        e.preventDefault();
        var d = elemento(e);
        let info = "/membresias/listado/"+$(d).attr('ide');
        $.ajax({
            type: "GET",
            url: info,
            success: function (response) {
                var tabla = `
                    <table class="table table-hover">
                        <thead>
                            <tr class="table-active">
                                <th>N°</th>
                                <th>CLIENTE</th>
                                <th>DINERO</th>
                            </tr>
                        </thead>
                        <tbody>
                `;
                if(response.length < 1){
                    tabla = tabla+`
                    <tr>
                        <td colspan="3"><p class="text-center">No se encuentra ningún cliente registrado</p></td>
                    </tr>
                    </tbody>
                    </table>
                    `;
                    $('.modal-body').html(tabla);
                }else{
                    let fin = `
                    </tbody>
                    </table>`;
                    for(let i = 0; i < response.length; i++){
                        tabla = tabla+`
                        <tr>
                            <th>`+(i+1)+`</th>
                            <th>`+response[i].nombrePersona+`</th>
                            <th>`+response[i].ganancia+`</th>
                        </tr>`;
                    }
                    $('.modal-body').html(tabla+fin);
                }
                
            }
        });
    });
    
});

function elemento(e){
    if (e.srcElement)
        tag = e.srcElement;
    else if (e.target)
          tag = e.target;
    
    return tag;
}




