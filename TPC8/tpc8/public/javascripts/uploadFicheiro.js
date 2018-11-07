$(() => {
    $('#ficheiros').load('http://localhost:7088/ficheiro')
 
    $('#adicionar').click(e=> {
        e.preventDefault()
        $('#ficheiros').append('<li>'+ $('#fich').val().split('\\').pop() + '</li>')
        ajaxPost()
    })
 
    function ajaxPost() {
        $.ajax({
            type:"POST",
            contentType: "application/json",
            url: "http://localhost:7088/ficheiro/guardar",
            data: JSON.stringify({ficheiro: $('#fich').val() + ',' +$('#desc').val()}),
            success: f => alert('Ficheiro gravado com sucesso!'+ f),
            error: e => {
                alert('Erro no post: ' + JSON.stringify(e))
                console.log('ERRO: '+e)
            }
        })
        $('#desc').val('')
    }
})
