/* ==============================================
 * widget-range-slider v0.02
 * ==============================================
 * Copyright (c) 2018 paraNorth
 * https://paranorth.com
 *
 * Simple setup and easy to use range-widget
 *
 * https://github.com/paraNorth/widget_range
 * License: MIT
 * ============================================= */

function wrs_widget(widget, settings) {

  var wgt = document.getElementById(widget);

  //helper
  function off(elm) {
    var off = elm.getBoundingClientRect();
    return {
      t: (off.top),
      b: (off.bottom),
      l: (off.left),
      r: (off.right),
      w: (off.width),
      h: (off.height)
    };
  }

  function colorShader(amt) {
    var t = wgt.parentNode;
    var p = window.getComputedStyle(t, null).getPropertyValue('background-color');
    p = p.substring(4, p.length - 1).replace(/ /g, '').split(',');
    var tnt = Math.round(p[0] / amt) + ', ' + Math.round(p[1] / amt) + ', ' + Math.round(p[2] / amt)
    return tnt
  }

  function colorInverter() {
    var t = wgt.parentNode;
    var p = window.getComputedStyle(t, null).getPropertyValue('background-color');
    p = p.substring(4, p.length - 1).replace(/ /g, '').split(',');
    var tnt = Math.round(255 - p[0]) + ', ' + Math.round(255 - p[1]) + ', ' + Math.round(255 - p[2]);
    if ((p[0] == p[1] && p[0] == p[2]) && (p[0] >= 85)) {
      tnt = [34, 34, 34];
    } else if ((p[0] == p[1] && p[0] == p[2]) && (p[0] < 85)) {
      tnt = [174, 174, 174];
    }
    return tnt;
  }

  function thumbDimension() {
    if (off(wgt).w > off(wgt).h) {
      w = 24 + 'px';
      h = off(wgt).h + 'px';
    } else if (off(wgt).w < off(wgt).h) {
      h = off(wgt).w + 'px';
      w = 24 + 'px';
    }
    return [w, h];
  }

  function decimalCount() {
    if (Math.floor(step) === step)
      return 0;
    return step.toString().split(".")[1].length || 0;
  }

  function rmPx(elm) {
    var sub = elm.substring(0, elm.length - 2);
    return parseInt(sub);
  }

  function isTouchDevice() {
    return true == ('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch);
  }

  //defaults object
  var internal_defaults = {
    wrs_widget_radius: '4px',
    wrs_widget_background: 'rgb(' + colorShader(1.2) + ')',
    wrs_widget_shadow_bottom: 'rgb(' + colorShader(0.6) + ')',
    wrs_widget_shadow_top: 'rgb(' + colorShader(1.8) + ')',
    wrs_thumb_width: thumbDimension()[0],
    wrs_thumb_height: thumbDimension()[1],
    wrs_thumb_radius: '2px',
    wrs_thumb_shadow_top: 'rgb(' + colorShader(0.6) + ')',
    wrs_thumb_shadow_bottom: 'rgb(' + colorShader(1.8) + ')',
    wrs_thumb_shadow_drop: 'rgb(' + colorShader(1.8) + ')',
    wrs_thumb_background: 'rgb(' + colorShader(0.95) + ')',
    wrs_thumb_border_top: 'rgb(' + colorShader(0.6) + ')',
    wrs_thumb_border_bottom: 'rgb(' + colorShader(2.8) + ')',
    wrs_thumb_guage_on: true,
    wrs_thumb_guage_on_width: '4px',
    wrs_thumb_guage_on_height: '4px',
    wrs_thumb_guage_on_radius: '100%',
    wrs_thumb_guage_on_border_top: 'rgb(' + colorShader(4) + ')',
    wrs_thumb_guage_on_border_bottom: 'rgb(' + colorShader(0.6) + ')',
    wrs_thumb_guage_on_background: 'rgba(' + colorInverter() + ', 1)',
    wrs_progress_background: 'rgba(' + colorInverter() + ', 1)',
    wrs_ticks_on: true,
    wrs_ticks_size1: '1px',
    wrs_ticks_size2: '4px',
    wrs_ticks_radius: '0',
    wrs_ticks_background: 'rgba(' + colorInverter() + ', 1)',
    wrs_tooltip_on: 4,
    wrs_tooltip_position: 1,
    wrs_tooltip_radius: '3px',
    wrs_tooltip_font_color: 'rgb(' + colorShader(1.3) + ')',
    wrs_tooltip_font_size: '12px',
    wrs_tooltip_background: 'rgba(' + colorInverter() + ', 1)',
    wrs_tooltip_shadow_drop: 'rgb(' + colorShader(1.4) + ')'
  }

  //edit settings from head
  Object.assign(internal_defaults, settings);

  //create elements
  var thm = document.createElement('div');
  var wrp = document.createElement('div');
  var trk = document.createElement('div');
  var gd1 = document.createElement('div');
  var gd2 = document.createElement('div');
  var tip = document.createElement('div');
  var aro = document.createElement('div');
  var txt = document.createElement('span');

  //global vars
  var min = Number(wgt.dataset.min);
  var max = Number(wgt.dataset.max);
  var value = Math.min(Number(wgt.dataset.value));
  var step = wgt.dataset.step;
  var fixMin = min.toString().split('-').join('');
  var tot = (Number(max) + Number(fixMin));
  var def = internal_defaults;
  var op0 = 0;
  var oValue;
  var tik1;
  var tik2;
  var w;
  var h;
  var y;

  //element styler
  function styler(elm, pos, top, bot, lef, rig, mar, pad, wid, hei, rad, col, bac, box, borT, borB, fon, lin, tra, cur, cls) {
    elm.style.position = pos;
    elm.style.top = top;
    elm.style.bottom = bot;
    elm.style.left = lef;
    elm.style.right = rig;
    elm.style.margin = mar;
    elm.style.padding = pad;
    elm.style.width = wid;
    elm.style.height = hei;
    elm.style.borderRadius = rad;
    elm.style.color = col;
    elm.style.background = bac;
    elm.style.boxShadow = box;
    elm.style.borderTop = borT;
    elm.style.borderBottom = borB;
    elm.style.fontSize = fon;
    elm.style.textAlign = 'center';
    elm.style.lineHeight = lin;
    elm.style.transform = tra;
    elm.style.cursor = cur;
    elm.className = cls;
  }

  //append elements
  wgt.appendChild(wrp);
  wrp.appendChild(trk);
  wrp.appendChild(thm);
  wgt.setAttribute('data-thumb-current', value);
  wgt.setAttribute('data-event-down', 'false');
  txt.textContent = wgt.dataset.thumbCurrent;

  if (step != Math.round(step)) {
    var isDecimal = true;
    var pointUp = step * Math.pow(10, decimalCount());
    tot = Math.round(tot * Math.pow(10, decimalCount()) / pointUp);
    max = Math.round(max * Math.pow(10, decimalCount()));
    value = Math.round(value * Math.pow(10, decimalCount()));
  } else {
    isDecimal = false;
    tot = (Number(max) + Number(fixMin)) / step;
  }

  if (def.wrs_thumb_guage_on == true) {
    thm.appendChild(gd1);
    thm.appendChild(gd2);
  }

  if (def.wrs_ticks_on == true) {
    tickGen();
  }

  if (def.wrs_tooltip_on != 0) {
    tip.appendChild(txt);
    tip.appendChild(aro);
    wgt.appendChild(tip);
  }

  if (def.wrs_tooltip_on == 2 || def.wrs_tooltip_on == 4) {
    tip.style.opacity = '0';
    thm.addEventListener('mouseover', addOpacity);
    thm.addEventListener('mouseout', opacityTimer);
  }

  if (def.wrs_tooltip_on == 3 || def.wrs_tooltip_on == 4) {
    wrp.addEventListener('mousemove', onTrackTip);
    thm.addEventListener('mouseover', onTrackTip);
  }

  //set styles
  if (off(wgt).w > off(wgt).h) {
    styler(wrp, 'relative', '', '', '', '', '', '', '100%', '100%', def.wrs_widget_radius, '', def.wrs_widget_background, 'inset 1px -1px 0px ' + def.wrs_widget_shadow_bottom + ', inset -1px 1px 0px ' + def.wrs_widget_shadow_top, '', '', '', '', '', '', 'wrs-trackWrap');
    styler(trk, 'absolute', '0', '0', '0', '0', 'auto', '', '100%', 'calc(100% - 2px)', def.wrs_widget_radius, '', '', '', '', '', '', '', '', '', 'wrs-track');
    styler(thm, 'absolute', '0', '0', '', '', 'auto', '', def.wrs_thumb_width, def.wrs_thumb_height, def.wrs_thumb_radius, '', def.wrs_thumb_background, ' inset -1px 1px 0px ' + def.wrs_thumb_shadow_top + ', inset 1px -1px 1px ' + def.wrs_thumb_shadow_bottom + ', -1px 2px 8px ' + def.wrs_thumb_shadow_drop, ' 1px solid ' + def.wrs_thumb_border_top, ' 1px solid ' + def.wrs_thumb_border_bottom, '', '', '', ' ew-resize', 'wrs-thumb');
    styler(gd1, 'absolute', '-22px', '0', 'calc(50% - 2px)', '50%', 'auto', '', def.wrs_thumb_guage_on_width, def.wrs_thumb_guage_on_height, def.wrs_thumb_guage_on_radius, '', def.wrs_thumb_guage_on_background, '', '1px solid ' + def.wrs_thumb_guage_on_border_top, '1px solid ' + def.wrs_thumb_guage_on_border_bottom, '', '', '', 'translateY(-50%)', 'wrs-thumbGuage')
    styler(gd2, 'absolute', '0', '-20px', 'calc(50% - 2px)', '50%', 'auto', '', def.wrs_thumb_guage_on_width, def.wrs_thumb_guage_on_height, def.wrs_thumb_guage_on_radius, '', def.wrs_thumb_guage_on_background, '', '1px solid ' + def.wrs_thumb_guage_on_border_top, '1px solid ' + def.wrs_thumb_guage_on_border_bottom, '', '', '', 'translateY(-50%)', 'wrs-thumbGuage')
    if (def.wrs_tooltip_position == 1) {
      styler(tip, 'absolute', '', off(wgt).h + off(gd1).h + rmPx(def.wrs_ticks_size2) + 5 + 'px', '', '', '', '0px 8px', off(txt).w + 'px', off(txt).h + 'px', def.wrs_tooltip_radius, def.wrs_tooltip_font_color, def.wrs_tooltip_background, ' -2px 2px 2px ' + def.wrs_tooltip_shadow_drop, '', '', '11px', off(tip).h + 'px', '', 'wrs-tooltip');
      styler(aro, 'absolute', '', '-3px', '50%', '50%', 'auto', '', '12px', '12px', '', '', 'linear-gradient(to bottom right, transparent 0%, transparent 60%, ' + def.wrs_tooltip_background + ' 60%, ' + def.wrs_tooltip_background + ' 100%)', '', '', '', '', '', 'translateX(-50%)rotate(45deg)', 'wrs-tooltipArrow');
      styler(txt, 'absolute', '0', '0', '0', '0', 'auto', '', '', '', '', def.wrs_tooltip_font_color, '', '', '', '', def.wrs_tooltip_font_size, off(tip).h + 'px', '', '', 'wrs-tooltipText');
    } else if (def.wrs_tooltip_position == 2) {
      styler(tip, 'absolute', off(wgt).h + off(gd1).h + rmPx(def.wrs_ticks_size2) + 6 + 'px', '', '', '', '', '0px 8px', off(txt).w + 'px', off(txt).h + 'px', def.wrs_tooltip_radius, def.wrs_tooltip_font_color, def.wrs_tooltip_background, '', '', '', '11px', off(tip).h + 'px', '', 'wrs-tooltip')
      styler(aro, 'absolute', '-3px', '', '50%', '50%', 'auto', '', '20px', '20px', '', '', 'linear-gradient(to bottom right, transparent 0%, transparent 60%, ' + def.wrs_tooltip_background + ' 60%, ' + def.wrs_tooltip_background + ' 100%)', '', '', '', '', '', 'translateX(-50%)rotate(-135deg)', 'wrs-tooltipArrow');
      styler(txt, 'absolute', '0', '0', '0', '0', 'auto', '', '', '', '', def.wrs_tooltip_font_color, '', '', '', '', def.wrs_tooltip_font_size, off(tip).h + 'px', '', '', 'wrs-tooltipText');
    }
  } else {
    styler(wrp, 'relative', '', '', '', '', '', '', '100%', '100%', def.wrs_widget_radius, '', def.wrs_widget_background, 'inset 1px -1px 0px ' + def.wrs_widget_shadow_bottom + ', inset -1px 1px 0px ' + def.wrs_widget_shadow_top, '', '', '', '', '', '', 'wrs-trackWrap');
    styler(trk, 'absolute', '0', '0', '0', '0', 'auto', '', 'calc(100% - 2px)', '100%', def.wrs_widget_radius, '', '', '', '', '', '', '', '', '', 'wrs-track');
    styler(thm, 'absolute', '', '', '50%', '50%', 'auto', '', def.wrs_thumb_width, def.wrs_thumb_height, def.wrs_thumb_radius, '', def.wrs_thumb_background, ' inset -1px 1px 0px ' + def.wrs_thumb_shadow_top + ', inset 1px -1px 1px ' + def.wrs_thumb_shadow_bottom + ', -1px 2px 8px ' + def.wrs_thumb_shadow_drop, ' 1px solid ' + def.wrs_thumb_border_top, ' 1px solid ' + def.wrs_thumb_border_bottom, '', '', 'translateX(-50%)', ' ns-resize', 'wrs-thumb');
    styler(gd1, 'absolute', 'calc(50% - 2px)', '50%', '-32px', '0', 'auto', '', def.wrs_thumb_guage_on_width, def.wrs_thumb_guage_on_height, def.wrs_thumb_guage_on_radius, '', def.wrs_thumb_guage_on_background, '', '1px solid ' + def.wrs_thumb_guage_on_border_top, '1px solid ' + def.wrs_thumb_guage_on_border_bottom, '', '', '', 'translateY(-50%)', 'wrs-thumbGuage')
    styler(gd2, 'absolute', 'calc(50% - 2px)', '50%', '0', '-34px', 'auto', '', def.wrs_thumb_guage_on_width, def.wrs_thumb_guage_on_height, def.wrs_thumb_guage_on_radius, '', def.wrs_thumb_guage_on_background, '', '1px solid ' + def.wrs_thumb_guage_on_border_top, '1px solid ' + def.wrs_thumb_guage_on_border_bottom, '', '', '', 'translateY(-50%)', 'wrs-thumbGuage')
    if (def.wrs_tooltip_position == 1) {
      styler(tip, 'absolute', '', '', '', off(tip).w + off(thm).w / 2 + off(gd1).w + rmPx(def.wrs_ticks_size2) + 'px', '', '0px 8px', off(txt).w + 'px', off(txt).h + 'px', def.wrs_tooltip_radius, def.wrs_tooltip_font_color, def.wrs_tooltip_background, ' -3px 3px 5px ' + def.wrs_tooltip_shadow_drop,  '', '', '11px', off(tip).h + 'px', '', 'wrs-tooltip');
      styler(aro, 'absolute', '50%', '50%', '', '-8px', 'auto', '', '13px', '13px', '', '', 'linear-gradient(to bottom right, transparent 0%, transparent 60%, ' + def.wrs_tooltip_background + ' 60%, ' + def.wrs_tooltip_background + ' 100%)', '', '', '', '', '', 'translateX(-50%)rotate(-45deg)', 'wrs-tooltipArrow');
      styler(txt, 'absolute', '0', '0', '0', '0', 'auto', '', '', '', '', def.wrs_tooltip_font_color, '', '', '', '', def.wrs_tooltip_font_size, off(tip).h + 'px', '', '', 'wrs-tooltipText');
    } else if (def.wrs_tooltip_position == 2) {
      styler(tip, 'absolute', '', '', off(tip).w + off(thm).w / 2 + off(gd1).w + rmPx(def.wrs_ticks_size2) + 'px', '', '', '0px 8px', off(txt).w + 'px', off(txt).h + 'px', def.wrs_tooltip_radius, def.wrs_tooltip_font_color, def.wrs_tooltip_background, '', '', '', '11px', off(tip).h + 'px', '', 'wrs-tooltip')
      styler(aro, 'absolute', '0', '0', '-2px', '', 'auto', '', '13px', '13px', '', '', 'linear-gradient(to bottom right, transparent 0%, transparent 60%, ' + def.wrs_tooltip_background + ' 60%, ' + def.wrs_tooltip_background + ' 100%)', '', '', '', '', '', 'rotate(135deg)', 'wrs-tooltipArrow');
      styler(txt, 'absolute', '0', '0', '0', '0', 'auto', '', '', '', '', def.wrs_tooltip_font_color, '', '', '', '', def.wrs_tooltip_font_size, off(tip).h + 'px', '', '', 'wrs-tooltipText');
    }
  }
  txt.style.fontWeight = 'bold';

  //tick generator
  function tickGen() {
    var posLen = (tot + 1),
      negLen = tot + 1,
      posSpacing = 100 / (posLen - 1),
      negSpacing = 100 / (negLen - 1);
    if (off(wgt).w > off(wgt).h) {
      for (var i = 0; i < posLen; i++) {
        var tik1 = document.createElement('span');
        tik2 = document.createElement('span');
        styler(tik1, 'absolute', '', '', '', '', '', '', def.wrs_ticks_size1, def.wrs_ticks_size2, def.wrs_ticks_radius, '', def.wrs_ticks_background, '', '', '', '', '', '', '', 'wrs-ticks');
        styler(tik2, 'absolute', '', '', '', '', '', '', def.wrs_ticks_size1, def.wrs_ticks_size2, def.wrs_ticks_radius, '', def.wrs_ticks_background, '', '', '', '', '', '', '', 'wrs-ticks');
        tik1.style.left = posSpacing * (i) + '%';
        tik1.style.top = off(wgt).h + 3 + 'px';
        tik2.style.left = (posSpacing * (i)) + '%';
        tik2.style.bottom = off(wgt).h + 3 + 'px';
        wgt.appendChild(tik1);
        wgt.appendChild(tik2);
      }
    } else if (off(wgt).w < off(wgt).h) {
      for (var i = 0; i < negLen; i++) {
        var tik1 = document.createElement('span');
        tik2 = document.createElement('span');
        styler(tik1, 'absolute', '', '', '', '', '', '', def.wrs_ticks_size2, def.wrs_ticks_size1, def.wrs_ticks_radius, '', def.wrs_ticks_background, '', '', '', '', '', '', '', 'wrs-ticks');
        styler(tik2, 'absolute', '', '', '', '', '', '', def.wrs_ticks_size2, def.wrs_ticks_size1, def.wrs_ticks_radius, '', def.wrs_ticks_background, '', '', '', '', '', '', '', 'wrs-ticks');
        tik1.style.bottom = negSpacing * (i) + '%';
        tik1.style.left = -(rmPx(def.wrs_ticks_size2) / 2) - 10 + 'px';
        tik2.style.bottom = negSpacing * (i) + '%';
        tik2.style.right = -(rmPx(def.wrs_ticks_size2) / 2) - 10 + 'px';
        wgt.appendChild(tik1);
        wgt.appendChild(tik2);
      }
    }
    tik1.style.zIndex = '-1';
    tik2.style.zIndex = '-1';
  }

  function intSetup() {
    if (min < 0) {
      value = value + tot / 2;
    }
    if (off(wgt).w > off(wgt).h) {
      thm.style.left = ((value * off(trk).w / tot) - (off(thm).w / 2)) + "px";
      tip.style.left = ((off(thm).l - off(wgt).l)) + ((off(thm).w / 2) - off(tip).w / 2) + 'px';
    } else {
      value = tot - value;
      thm.style.top = ((value * off(trk).h / tot) - (off(thm).h / 2)) + "px";
      tip.style.top = ((off(thm).t - off(wgt).t)) + ((off(thm).h / 2) - off(tip).h / 2) + 'px';
    }
  }

  function testDevice(e) {
    if (isTouchDevice()) {
      if (off(wgt).w > off(wgt).h) {
        x = e.targetTouches[0].pageX;
      } else {
        y = e.targetTouches[0].pageY;
      }
    } else {
      if (off(wgt).w > off(wgt).h) {
        x = e.pageX;
      } else {
        y = e.pageY;
      }
    }
  }

function addOpacity() {
  tip.style.opacity = '1';
}

  function opacityTimer() {
    tip.style.opacity = '1';
    window.clearTimeout(op0);
    op0 = window.setTimeout(function() {
      tip.style.opacity = '0';
    }, 800);
  }

  function eventDown(e) {
    wgt.setAttribute('data-event-down', 'true');
    if (off(wgt).w > off(wgt).h) {
      document.body.style.cursor = 'ew-resize';
    } else {
      document.body.style.cursor = 'ns-resize';
    }
    document.body.style.userSelect = 'none';
    document.body.style.MozUserSelect = 'none';
    e.preventDefault();
  }

  function eventMove(e) {
    if (wgt.dataset.eventDown == 'true') {
      testDevice(e);
      if (off(wgt).w > off(wgt).h) {
        value = Math.round((x - off(trk).l) * (tot / off(trk).w));
        value = Math.max(min, Math.min(value, tot));
        thm.style.left = (value * off(trk).w / tot - (off(thm).w / 2)) + "px";
        widgetProgress();
        if (value <= 0) {
          value = 0;
          thm.style.left = 0 - off(thm).w / 2 + 'px';
        } else if (value >= tot) {
          value = tot;
        }
      } else {
        value = Math.round((y - off(trk).t) * (tot / off(trk).h));
        value = Math.max(min, Math.min(value, tot));
        thm.style.top = (value * off(trk).h / tot - (off(thm).h / 2)) + "px";
        widgetProgress();
        if (value <= 0) {
          value = 0;
          thm.style.top = 0 - off(thm).h / 2 + 'px';
        } else if (value >= tot) {
          value = tot;
        }
      }
      tip.style.opacity = '1';
      currentOutput();
    }
  }

  function eventUp() {
    wgt.setAttribute('data-event-down', 'false');
    document.body.style.cursor = '';
    if (def.wrs_tooltip_on == 2 || def.wrs_tooltip_on == 4) {
      opacityTimer();
    }
  }

  function onThumbTip(e) {
    if (wgt.dataset.eventDown == 'true') {
      if (off(wgt).w > off(wgt).h) {
        tip.style.left = ((off(thm).l - off(wgt).l)) + ((off(thm).w / 2) - off(tip).w / 2) + 'px';
      } else {
        if ((e.pageY > off(thm).t - 5) && (e.pageY < off(thm).t + off(thm).h + 5)) {
          tip.style.top = ((off(thm).t - off(wgt).t)) + ((off(thm).h / 2) - off(tip).h / 2) + 'px';
        } else {
          tip.style.top = ((off(thm).t - off(wgt).t)) + ((off(thm).h / 2) - off(tip).h / 2) + 'px';
        }
      }
    }
  }

  function onTrackTip(e) {
    if (wgt.dataset.eventDown == 'false') {
      if (off(wgt).w > off(wgt).h) {
        if ((e.pageX > off(thm).l - 5) && (e.pageX < off(thm).l + off(thm).w + 5)) {
          tip.style.left = ((off(thm).l - off(wgt).l)) + ((off(thm).w / 2) - off(tip).w / 2) + 'px';
          txt.textContent = wgt.dataset.thumbCurrent;
        } else {
          tip.style.left = e.pageX - off(wgt).l - (off(tip).w / 2) + 'px';
          txt.textContent = wgt.dataset.trackCurrent;
        }
        wrp.addEventListener('mouseout', function() {
          tip.style.left = ((off(thm).l - off(wgt).l)) + ((off(thm).w / 2) - off(tip).w / 2) + 'px';
          txt.textContent = wgt.dataset.thumbCurrent;
          if (def.wrs_tooltip_on == 4) {
            opacityTimer();
          }
        });
      } else {
        if ((e.pageY > off(thm).t - 5) && (e.pageY < off(thm).t + off(thm).h + 5)) {
          tip.style.top = ((off(thm).t - off(wgt).t)) + ((off(thm).h / 2) - off(tip).h / 2) + 'px';
          txt.textContent = wgt.dataset.thumbCurrent;
        } else {
          tip.style.top = e.pageY - off(wgt).t - (off(tip).h / 2) + 'px';
          txt.textContent = wgt.dataset.trackCurrent;
        }
        wrp.addEventListener('mouseout', function() {
          tip.style.top = ((off(thm).t - off(wgt).t)) + ((off(thm).h / 2) - off(tip).h / 2) + 'px';
          txt.textContent = wgt.dataset.thumbCurrent;
        });
      }
      trackOutput(e);
    }
    if (def.wrs_tooltip_on == 4) {
      tip.style.opacity = '1';
    }
    tip.style.transition = 'opacity 180ms ease';
  }

  function widgetProgress() {
    if (min < 0) {
      if (off(wgt).w > off(wgt).h) {
        if (value < tot / 2) {
          trk.style.background = 'linear-gradient(to right, transparent 0%, transparent ' + (
          value / tot) * 100 + '%, ' + def.wrs_progress_background + (value / tot) * 100 + '%, ' + def.wrs_progress_background + ' 50%, transparent 50%,transparent 100%)';
        } else if (value >= tot / 2) {
          trk.style.background = 'linear-gradient(to right, transparent 0%, transparent 50%, ' + def.wrs_progress_background + ' 50%, ' + def.wrs_progress_background + (value / tot) * 100 + '%, ' + def.wrs_progress_background + ' 50%, transparent 50%, transparent 100%)';
        }
      } else if (off(wgt).w < off(wgt).h) {
        if (value < tot / 2) {
          trk.style.background = 'linear-gradient(to bottom, transparent 0%, transparent ' + (
          value / tot) * 100 + '%, ' + def.wrs_progress_background + (value / tot) * 100 + '%, ' + def.wrs_progress_background + ' 50%, transparent 50%, transparent 100%)';
        } else if (value >= tot / 2) {
          trk.style.background = 'linear-gradient(to bottom, transparent 0%, transparent 50%, ' + def.wrs_progress_background + ' 50%, ' + def.wrs_progress_background + (value / tot) * 100 + '%, ' + def.wrs_progress_background + ' 50%, transparent 50%, transparent 100%)';
        }
      }
    } else if (min >= 0) {
      if (off(wgt).w > off(wgt).h) {
        trk.style.background = 'linear-gradient(to right, ' + def.wrs_progress_background + ' 0%, ' + def.wrs_progress_background + value / tot * 100 + '%, transparent ' + value / max * 100 + '%, transparent 100%)';
      } else if (off(wgt).w < off(wgt).h) {
        trk.style.background = 'linear-gradient(to bottom, transparent 0%, transparent ' + value / tot * 100 + '%, ' + def.wrs_progress_background + value / tot * 100 + '%, ' + def.wrs_progress_background + ' 100%)';
      }
    }
  }

  function currentOutput() {
    var output = wgt.getElementsByTagName('output')[0];
    if (off(wgt).w > off(wgt).h) {
      if (isDecimal) {
        if (min >= 0) {
          cVal = (value / Math.pow(10, decimalCount()));
          wgt.setAttribute('data-thumb-current', (cVal * pointUp).toFixed(decimalCount()));
        } else {
          cVal = value - tot / 2;
          wgt.setAttribute('data-thumb-current', (cVal * step).toFixed(decimalCount()));
        }
      } else {
        if (min >= 0) {
          wgt.setAttribute('data-thumb-current', value * step);
        } else {
          value -= tot / 2;
          wgt.setAttribute('data-thumb-current', Math.round(value * step));
        }
      }
    } else if (off(wgt).w < off(wgt).h) {
      if (isDecimal) {
        if (min >= 0) {
          value = tot - value;
          cVal = (value / Math.pow(10, decimalCount()));
          wgt.setAttribute('data-thumb-current', (cVal * pointUp).toFixed(decimalCount()));
        } else {
          value = tot - value - tot / 2;
          cVal = (value / Math.pow(10, decimalCount()));
          wgt.setAttribute('data-thumb-current', (cVal * pointUp).toFixed(decimalCount()));
        }
      } else {
        if (min >= 0) {
          value = tot - value;
          wgt.setAttribute('data-thumb-current', (value * step));
        } else {
          value = tot - value - tot / 2;
          wgt.setAttribute('data-thumb-current', Math.round(value * step));
        }
      }
    }
    txt.textContent = wgt.dataset.thumbCurrent;
    if (output) {
      output.innerHTML = wgt.dataset.thumbCurrent;
    }
  }

  function trackOutput(e) {
    if (off(wgt).w > off(wgt).h) {
      value = Math.round((e.pageX - off(trk).l) * (tot / off(trk).w));
      value = Math.max(min, Math.min(value, tot));
      if (isDecimal) {
        if (min >= 0) {
          cVal = (value / Math.pow(10, decimalCount()));
          wgt.setAttribute('data-track-current', (cVal * pointUp).toFixed(decimalCount()));
        } else {
          cVal = value - tot / 2;
          wgt.setAttribute('data-track-current', (cVal * step).toFixed(decimalCount()));
        }
      } else {
        if (min >= 0) {
          wgt.setAttribute('data-track-current', value * step);
        } else {
          value -= tot / 2;
          wgt.setAttribute('data-track-current', Math.round(value * step));
        }
      }
    } else if (off(wgt).w < off(wgt).h) {
      value = Math.round((e.pageY - off(trk).t) * (tot / off(trk).h));
      value = Math.max(min, Math.min(value, tot));

      if (isDecimal) {
        if (min >= 0) {
          value = tot - value;
          cVal = (value / Math.pow(10, decimalCount()));
          wgt.setAttribute('data-track-current', (cVal * pointUp).toFixed(decimalCount()));
        } else {
          value = tot - value - tot / 2;
          cVal = (value / Math.pow(10, decimalCount()));
          wgt.setAttribute('data-track-current', (cVal * pointUp).toFixed(decimalCount()));
        }
      } else {
        if (min >= 0) {
          value = tot - value;
          wgt.setAttribute('data-track-current', (value * step));
        } else {
          value = tot - value - tot / 2;
          wgt.setAttribute('data-track-current', Math.round(value * step));
        }
      }
    }
    txt.textContent = wgt.dataset.trackCurrent;

  }

  //int
  value = Math.min(Number(wgt.dataset.value) / step);
  intSetup();
  widgetProgress();
  //mouse events
  thm.addEventListener('mousedown', eventDown);
  window.addEventListener('mousemove', eventMove);
  window.addEventListener('mouseup', eventUp);
  window.addEventListener('mousemove', onThumbTip);
  //touch events
  thm.addEventListener('touchstart', eventDown, false);
  window.addEventListener('touchmove', eventMove, false);
  window.addEventListener('touchend', eventUp, false);
  window.addEventListener('touchmove', onThumbTip, false);
}
