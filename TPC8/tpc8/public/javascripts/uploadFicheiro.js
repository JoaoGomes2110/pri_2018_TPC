$(() => {
    $('#ficheiros').load('http://localhost:7088/ficheiro')

    $('#adicionar').click(e=> {
        e.preventDefault()
        
        $('#ficheiros').append('<td>'+ '<a href= ' +  $('#fich').val().split('\\').pop() + '>' + $('#fich').val().split('\\').pop() + ' </a>' + '</td>' +  ' <td>' + $('#desc').val() + '</td')
        ajaxPost()
        ajaxFormPost()
    })
 
    function ajaxPost() {
        $.ajax({
            type:"POST",
            contentType: "application/json",
            url: "http://localhost:7088/ficheiro/guardar",
            data: JSON.stringify({ficheiro: $('#fich').val() + ',' +$('#desc').val()}),
            success: f => alert('Dados gravados com sucesso na Base de Dados!'+ f),
            error: e => {
                alert('Erro no post: ' + JSON.stringify(e))
                console.log('ERRO: '+e)
            }
        })
    }

    function ajaxFormPost(){
        var form_data = new FormData($('#myUploadForm')[0])
        $.ajax({
            type:"POST",
            url: "http://localhost:7088/ficheiro/processa",
            data: form_data,   
            contentType: false,
            processData: false,
            success: file => alert('Ficheiro gravado com sucesso na pasta ' + file),
            error: e =>{
                alert('Erro no post: ' + JSON.stringify(e))
                console.log('ERRO: '+e)
            }  
        })
        $('#desc').val('')
        $('#fich').val('')
    }
})
