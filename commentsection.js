var comment = [
  {"name": "Naoroz Mahmood", "date":"10 Apr, 2016", "body": "This is a comment 1"},
  {"name": "Naoroz Mahmood1", "date":"10 Apr, 2016", "body": "This is a comment 2"},
  {"name": "Naoroz Mahmood2", "date":"10 Apr, 2016", "body": "This is a comment 3"},
  {"name": "Naoroz Mahmood3", "date":"10 Apr, 2016", "body": "This is a comment 4"},
];

for (var i=0; i<comment.length;i++) {
  var html = '<div class="commentBox"><div class="leftPanelImg"><img src="http://via.placeholder.com/100x100"></div><div class="rightPanel"><span>' +comment[i].name+ '</span><div class="date">'+comment[i].date+'</div><p>'+comment[i].body+'</p></div><div class="clear"></div></div>'
  $('#container').append(html);
}
