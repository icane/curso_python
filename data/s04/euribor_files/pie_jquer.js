﻿$(document).ready(function(){sHeight=0,$("footer .pie-sup div").each(function(){$(this).outerHeight(false)>sHeight&&(sHeight=$(this).outerHeight(false))}),$("footer .pie-sup div").height(sHeight)});