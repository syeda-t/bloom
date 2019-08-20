function render(data) {
  var html = '<div class="commentBox"><div class="leftPanelImg"><img src="http://via.placeholder.com/75x75"></div><div class="rightPanel"><span>'+data.name+'</span><div class="date">'+data.date+'</div><p>'+data.body+'</p></div><div class="clear"></div></div>';
  $('#container').append(html);
}

$(document).ready(function() {

  var comment = [];

  if(!localStorage.commentData){
    localStorage.commentData = [];
  }else{
    comment = JSON.parse(localStorage.commentData);
  };

    for(var i=0; i<comment.length;i++){
      render(comment[i]);
    }

  $("#addComment").click(function(){
    var add0bj = {
      "name": $("#name").val(),
      "date": $("#date").val(),
      "body": $("#bodyText").val(),
    };
    comment.push(add0bj);
    localStorage.commentData = JSON.stringify(comment);
    render(add0bj);
    $("#name").val('');
    $("#date").val('dd/mm/yyyy');
    $("#bodyText").val('');
  });

});
