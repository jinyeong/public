function gup(name) {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if(results == null)
        return "NO_PARAMETER";
        //return "";
    else return unescape(results[1]);
}

function get_html_table_row (elems, sep){
    var txt="<tr>";
    for(var i=0; i<elems.length; i++){
        txt += ("<"+sep+">"+elems[i]+"</"+sep+">");
    }
    txt += "</tr>";
    return txt;
}

function data_rendering(tbl, q, t, taskId){
    var txt="";
    txt += get_html_table_row(tbl['header'], "th");
    for(var i=0; i<tbl['rows'].length; i++){
        txt += get_html_table_row(tbl['rows'][i], "td");
    }
    $('#table').html(txt);
    $('#question').html(q);
    $('#table_info').html(t);
    
    $("[name~='taskId']").val(taskId.toString());
    $("[name~='taskId']").hide();
    //$("[name~='taskId']").attr('disabled', true);
    
    $("[name~='answer']").focus();
    //$("[name~='answer']").val("");

}

$(document).ready(function(){
    var tbl = {
        'header': ['Player', 'No.', 'Nationality', 'Position', 'Years in Toronto', 'School/Club Team'],
        'rows': [['Aleksandar Radojević', '25', 'Serbia', 'Center', '1999-2000', 'Barton CC (KS)'], ['Shawn Respert', '31', 'United States', 'Guard', '1997-98', 'Michigan State'], ['Quentin Richardson', 'N/A', 'United States', 'Forward', '2013-present', 'DePaul'], ['Alvin Robertson', '7, 21', 'United States', 'Guard', '1995-96', 'Arkansas'], ['Carlos Rogers', '33, 34', 'United States', 'Forward-Center', '1995-98', 'Tennessee State'], ['Roy Rogers', '9', 'United States', 'Forward', '1998', 'Alabama'], ['Jalen Rose', '5', 'United States', 'Guard-Forward', '2003-06', 'Michigan'], ['Terrence Ross', '31', 'United States', 'Guard', '2012-present', 'Washington']]
    };
    var q = "A real question will be displayed here, after you accept the HIT.<br>e.g. &emsp; Q. Which player has a back number of 31? &emsp; A. Shawn Respert";
    var t = "This table is just an example. A real table will be shown after you accept the HIT.";
    var taskId = -1;
    
    if (gup("assignmentId") != "ASSIGNMENT_ID_NOT_AVAILABLE") {
        workerId = gup("workerId");
        $.ajax({
            url: "https://2409bb0d.ngrok.io/get_task/"+workerId,
            type: "GET",
            aync: false,
            // data: {'workerId': gup("workerId")},
            // dataType: "json",
            success: function(res){
                tbl['header'] = res['header'];
                tbl['rows'] = res['rows'];
                q = "Q. "+res['question'];
                taskId = res['taskId'];

                data_rendering(tbl, q, "", taskId);
            },
            failed: function(){
                alert('No tasks are available at the moment.');
            }
        });
    }
    else {
        data_rendering(tbl, q, t, taskId);
    }

});
