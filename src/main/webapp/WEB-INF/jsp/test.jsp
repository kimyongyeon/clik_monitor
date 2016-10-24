<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>TEST PAGE</title>
    <script type="text/javascript" src="<c:url value="/assets/jquery/dist/jquery.min.js"/>"></script>
</head>
<body>
<h1>TEST 페이지... 쩝</h1>
<script>
    // Ajax TEST
    function fnAjaxUiData(page) {

        var url = "test.do/한글";

        if(page === undefined) {
            page = 1;
        }

        var arrayData = [];
        for(i=0; i<10; i++) {
            arrayData.push({
                name: "charse, " + i,
                number: "num, " + i
            });
        }

        var params = {
            page: page,
            data: "data1",
            param: "한글테스트",
            name: "rasmblyNm_1",
            number: "systemSttusCode_1",
            channel: "1,2,kim",
            arrayData : JSON.stringify(arrayData)

        }

        $.ajax({
            url: url,
            type: 'GET',
            dataTye: 'json',
            contentType:"application/json; charset=utf-8",
            data: params,
            success: function(data, textStatus, jqXHR) {
                console.log(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
            },
            statusCode: {
                404: function() {
                    alert("[url: " + url + "]  page not found");
                }
            }
        });
    }
</script>
</body>
</html>