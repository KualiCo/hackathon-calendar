exports.SIDE_BY_SIDE = function (event, i, collisions) {
  event.conflicted = true;
  var day = moment(event.start).day();
  var w = 100 / 7 / collisions.length;
  var l = (day * (100 / 7)) + w * i;
  event.width = 'calc(' + w + '% - 10px)';
  event.left = 'calc(' + l + '% + 5px)';
};

exports.ONLY_SHOW_ONE = function (event, i, collisions) {
  event.conflicted = true;
  if (i !== 0) event.visible = false;
};
